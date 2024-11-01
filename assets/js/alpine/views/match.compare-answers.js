export default () => ({

  itemsWithAnswers: [],
  showList: ["all", "same", "different"],
  showIndex: 0,  

  initMatchCompareAnswers() {
    this.itemsWithAnswers = this.getAllAnswers();
    this.$watch("showIndex", (val, oldVal) =>
      val !== oldVal && (this.itemsWithAnswers = this.getAnswers(val)))
  },

  getAllAnswers() {
    return this.$store.answers.getItemsWithAnswers();
  },
  
  getSameAnswers() {
    return this.getAllAnswers()
      .filter(el => el.answerMe.answerValue === el.answerYou.answerValue);
  },
  
  getDifferentAnswers() {
    return this.getAllAnswers()
      .filter(el => el.answerMe.answerValue != el.answerYou.answerValue)
  },

  getAnswers(val)  {
    return val == 0
      ? this.getAllAnswers()
      : val == 1
        ? this.getSameAnswers()
        : this.getDifferentAnswers()
  },

  get show() {
    return this.showList[this.showIndex]
  },

  items: {
    
    ["x-for"]: "{ itemId, itemA, itemB, answerMe, answerYou } in itemsWithAnswers",
    
    [":key"]: "itemId"
  },

  showAllLink: {
    ["x-ref"]: "showAllLink",

    ["x-show"]: "showIndex == 0",

    ["@click.prevent"]() {
      this.showIndex = 1;
    }
  },

  showSameLink: {
    ["x-ref"]: "showSameLink",

    ["x-show"]: "showIndex == 1",

    ["@click.prevent"]() {
      this.showIndex = 2;
    }
  },

  showDifferentLink: {
    ["x-ref"]: "showDifferentLink",

    ["x-show"]: "showIndex == 2",

    ["@click.prevent"]() {
      this.showIndex = 0;
    }
  },

 })