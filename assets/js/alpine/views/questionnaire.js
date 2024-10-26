export default () => ({

  error: true,
  clickedButton: null,
  highilightClass: "bg-indigo-50",
  epoch: Date.now(),
  
  async initQuestionnaire() {
    this.currentSelectedOption = this.$store.questionnaire.currentAnswerValue;
    this.elapsedEpoch = this.$store.questionnaire.currentAnswer?.latency;
    this.$watch("$store.questionnaire.currentItemIndex", () => this.epoch = Date.now());
    // just in case
    if (this.$store.questionnaire.items.length == 0) {
      const urlBase = this.$refs.questionnaire.dataset.urlBase;
      const urlItems = `${urlBase}items/index.json`;
      try {
        const items = await fetch(urlItems).then(res => res.json());
        const urls = await fetch(`${urlBase}index.json`).then(res => res.json());
        this.$store.questionnaire.setItems(items);
        this.$store.url.setUrl(urls);
      } catch (err) {
        this.error = true;
      }
    }
  },

  destroy() {
    this.$store.questionnaire.resetItemIndex();
  },  

  get canNavigateAway() {
    return this.$store.questionnaire.currentAnswerValue;
  },

  toggleOption() {
    const currentAnswerValue = this.$store.questionnaire.currentAnswerValue;
    if (currentAnswerValue === "a") return this.$refs.optionB.click();
    if (currentAnswerValue === "b") return this.$refs.optionA.click();
    this.$refs.optionA.click();
  },

  keyboardActions() {
    return {
      "arrowdown": () => this.toggleOption(),
      "arrowup": () => this.toggleOption(),
      "arrowleft": () => this.$refs.prevButton.click(),
      "arrowright": () => this.$refs.nextButton.click(),
      "enter": () => this.$refs.nextButton.click()
    }
  },

  setAnswer(option) {
    this.$store.questionnaire.setAnswer(option, Date.now()-this.epoch);
  },

  "notifyError": {
    ["x-ref"]: "notifyError",

    ["x-show"]() {
      return this.error;
    },

    ["x-html"]() {
      return this.$refs.questionnaire.dataset.fetchErrorMessage;
    }
  },

  "item": {
    ["x-ref"]: "item",

    ["x-show"]() {
      return !this.error;
    },

    ["@keyup.window.prevent"]({ key }) {
      const functioToCall = this.keyboardActions()[key.toLowerCase()];
      functioToCall && functioToCall();
    }
  },

  "itemNumber": {
    ["x-ref"]: "itemNumber",

    ["x-text"]() {
      return this.$store.questionnaire.currentItemIndex +1;
    },
  },

  "itemText": {
    ["x-ref"]: "itemText",

    ["x-text"]() {
      return this.$store.questionnaire.currentItem?.text;
    },
  },

  "counter": {
    ["x-ref"]: "counter",

    ["x-html"]() {
      return `${this.$store.questionnaire.currentItemIndex +1}
        &middot;${this.$store.questionnaire.items.length}`;
    },
  },

  "optionA": {
    ["x-ref"]: "optionA",

    ["x-text"]() {
      return this.$store.questionnaire.currentItem?.options?.a?.text;
    },

    [":class"]() {
      return this.$store.questionnaire.currentAnswerValue === "a"
        ? this.highilightClass
        : "bg-tranpsarent"
    },

    ["@click.prevent"]($event) {
      this.setAnswer("a");
      [ "mouse", "touch", "pen" ].includes($event.pointerType) && this.$refs.nextButton.click();
    }
  },

  "optionB": {
    ["x-ref"]: "optionB",

    ["x-text"]() {
      return this.$store.questionnaire.currentItem?.options?.b?.text;
    },

    [":class"]() {
      return this.$store.questionnaire.currentAnswerValue === "b"
        ? this.highilightClass
        : "bg-tranpsarent"
    },

    ["@click.prevent"]($event) {
      this.setAnswer("b");
      [ "mouse", "touch", "pen" ].includes($event.pointerType) && this.$refs.nextButton.click();
    }
  },

  "nextButton": {
    ["x-ref"]: "nextButton",

    ["@click.prevent"]() {
      this.clickedButton = "next";
      if (this.$store.questionnaire.isComplete && this.$store.questionnaire.isLastItem) {
        this.canNavigateAway && this.$store.url.goToPage("results");
      } else {
        this.canNavigateAway && this.$store.questionnaire.goToNextItem();
        setTimeout(() => this.clickedButton = null, 150);
      }
    },

    [":class"]() {
      return this.clickedButton === "next"
        ? this.highilightClass
        : "bg-tranpsarent"
    },
  },

  "prevButton": {
    ["x-ref"]: "prevButton",

    ["@click.prevent"]() {
      this.clickedButton = "prev";
      this.$store.questionnaire.goToPreviousItem();
      setTimeout(() => this.clickedButton = null, 150);
    },

    [":class"]() {
      return this.clickedButton === "prev"
        ? this.highilightClass
        : "bg-tranpsarent"
    }
  }
});
