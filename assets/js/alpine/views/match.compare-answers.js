export default () => ({

  itemsWithAnswers: null,
  itemsWithAnswersFiltered: null,
  showList: ["all", "different", "same"],
  showIndex: 0,  

  initMatchCompareAnswers() {
    this.itemsWithAnswers = this.getAllAnswers();
    this.itemsWithAnswersFiltered = this.itemsWithAnswers;
    this.$watch("showIndex", (val, oldVal) =>
      val !== oldVal && (this.itemsWithAnswersFiltered = this.getAnswers(val)))
  },

  getAllAnswers() {
    return this.itemsWithAnswers || this.$store.answers.getItemsWithAnswers();
  },
  
  getSameAnswers() {
    return this.itemsWithAnswers
      .filter(el => el.answerMe.answerValue === el.answerYou.answerValue);
  },
  
  getDifferentAnswers() {
    return this.itemsWithAnswers
      .filter(el => el.answerMe.answerValue != el.answerYou.answerValue)
  },

  getAnswers(val)  {
    return val == 0
      ? this.getAllAnswers()
      : val == 1
        ? this.getDifferentAnswers()
        : this.getSameAnswers()
  },

  get show() {
    return this.showList[this.showIndex]
  },

  items: {
    
    ["x-for"]: "{ itemId, itemTextA, itemTextB, answerMe, answerYou } in itemsWithAnswersFiltered",
    
    [":key"]: "itemId"
  },

  showAllLink: {
    ["x-ref"]: "showAllLink",

    ["x-show"]: "showIndex == 0",

    ["@click.prevent"]() {
      this.showIndex = 1;
    }
  },

  showDifferentLink: {
    ["x-ref"]: "showDifferentLink",

    ["x-show"]: "showIndex == 1",

    ["@click.prevent"]() {
      this.showIndex = 2;
    }
  },

  showSameLink: {
    ["x-ref"]: "showSameLink",

    ["x-show"]: "showIndex == 2",

    ["@click.prevent"]() {
      this.showIndex = 0;
    }
  },

 })