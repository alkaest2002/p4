export default () => ({

  lodaing: false,
  error: false,
  clickedButton: null,
  textBaseClass: "text-gray-700 ",
  textHighilightClass: "text-indigo-700",
  optionBaseClass: "bg-transparent",
  optionHighlightClass: "bg-indigo-50",
  epoch: Date.now(),

  async initQuestionnaire() {
    this.$watch("$store.questionnaire.currentItemIndex", () => this.epoch = Date.now());
    // just in case (this data should already be present by now)
    if (
      this.$store.questionnaire.items.length == 0 
        || Object.values(this.$store.navigation.urls || []).length == 0) {
      try {
        this.loading = true;
        const urlBase = this.$refs.base.dataset.urlBase;
        const items = await fetch(`${urlBase}items/index.json`).then(res => res.json());
        const urls = await fetch(`${urlBase}index.json`).then(res => res.json());
        this.$store.questionnaire.setItems(items);
        this.$store.navigation.setUrls(urls);
      } catch (err) {
        this.error = true;
      } finally {
        this.loading = false;
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

  "notifyFetching": {
    ["x-ref"]: "notifyFetching",

    ["x-show"]() {
      return this.loading;
    },

    ["x-html"]() {
      return this.$refs.questionnaire.dataset.fetchingMessage;
    }
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
      return !this.error && !this.loading;
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
        &middot; ${this.$store.questionnaire.items.length}`;
    },
  },

  "optionA": {
    ["x-ref"]: "optionA",

    ["x-text"]() {
      return this.$store.questionnaire.currentItem?.options?.a?.text;
    },

    [":class"]() {
      return this.$store.questionnaire.currentAnswerValue === "a"
        ? this.optionHighlightClass
        : this.optionBaseClass
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
        ? this.optionHighlightClass
        : this.optionBaseClass
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
        this.canNavigateAway && this.$store.navigation.goToPage("kts/results");
      } else {
        setTimeout(() => {
          this.canNavigateAway && this.$store.questionnaire.goToNextItem();
          this.clickedButton = null;
        }, 150);
      }
    },

    [":class"]() {
      return this.clickedButton === "next"
        ? this.textHighilightClass
        : this.textBaseClass
    },
  },

  "prevButton": {
    ["x-ref"]: "prevButton",

    ["@click.prevent"]() {
      this.clickedButton = "prev";
      setTimeout(() => {
        this.$store.questionnaire.goToPreviousItem();
        this.clickedButton = null; 
      }, 150);
    },

    [":class"]() {
      return this.clickedButton === "prev"
        ? this.textHighilightClass
        : this.textBaseClass
    }
  }
});
