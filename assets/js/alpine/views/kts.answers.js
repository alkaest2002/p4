export default () => ({

  itemsWithAnswers: null,
  itemsWithAnswersFiltered: null,
  showList: ["all", "difficult", "easy"],
  showIndex: 0,  

  initKtsAnswers() {
    this.itemsWithAnswers = this.getAllAnswers();
    console.log(this.itemsWithAnswers)
    this.itemsWithAnswersFiltered = this.itemsWithAnswers;
    this.$watch("showIndex", (val, oldVal) =>
      val !== oldVal && (this.itemsWithAnswersFiltered = this.getAnswers(val)))
  },

  getAllAnswers() {
    const answers = this.itemsWithAnswers || this.$store.answers.getItemsWithAnswers();
    return this.$store.answers.answersHaveLatencies
      ? answers.sort((a, b) => b.answerMe.latency - a.answerMe.latency)
      : answers;
  },
  
  getDifficultAnswers() {
    return this.itemsWithAnswers.slice(0, Math.round(this.itemsWithAnswers.length * .25));
  },
  
  getEasyAnswers() {
    return this.itemsWithAnswers.slice(-Math.round(this.itemsWithAnswers.length * .25));
  },

  getAnswers(val)  {
    return val == 0
      ? this.getAllAnswers()
      : val == 1
        ? this.getDifficultAnswers()
        : this.getEasyAnswers()
  },

  items: {
    ["x-for"]: "{ itemId, itemTextA, itemTextB, answerMe } in itemsWithAnswersFiltered",
    
    [":key"]: "itemId"
  },

  itemNumber: {

  },

  itemA: {
    "x-text"() {
      return this.$refs.itemA.dataset.itemText
    },
      
    ":class"() {
      return this.$refs.itemA.dataset.answerValue === this.$refs.itemA.dataset.optionValue
        ? "font-semibold"
        : "text-sm text-gray-400"
    }
  },

  itemB: {
    "x-text"() {
      return this.$refs.itemB.dataset.itemText
    },
      
    ":class"() {
      return this.$refs.itemB.dataset.answerValue === this.$refs.itemB.dataset.optionValue
        ? "font-semibold"
        : "text-sm text-gray-400"
    }
  },

  showFilters: {
    ["x-ref"]: "showFilters",

    ["x-show"]() {
      return  this.$store.answers.answersHaveLatencies;
    }
  },

  showLatency: {
    ["x-ref"]: "showLatency",

    ["x-show"]() {
      return this.$store.answers.answersHaveLatencies;
    },
  },

  showAllAnswersLink: {
    ["x-ref"]: "showAllAnswersLink",

    ["x-show"]: "showIndex == 0",

    ["@click.prevent"]() {
      this.showIndex = 1;
    }
  },

  showDifficultAnswersLink: {
    ["x-ref"]: "showDifficultAnswersLink",

    ["x-show"]: "showIndex == 1",

    ["@click.prevent"]() {
      this.showIndex = 2;
    }
  },

  showEasyAnswersLink: {
    ["x-ref"]: "showEasyAnswersLink",

    ["x-show"]: "showIndex == 2",

    ["@click.prevent"]() {
      this.showIndex = 0;
    }
  },
});
