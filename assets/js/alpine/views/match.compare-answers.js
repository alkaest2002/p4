export default () => ({

  itemsWithAnswers: [],
  showList: ["all", "same", "different"],
  showIndex: 0,  

  initMatchCompareAnswers() {
    this.itemsWithAnswers = this.allAnswers;
    this.$watch("showIndex", (val, oldVal) =>
      val !== oldVal && (this.itemsWithAnswers = this.getAnswers(val)))
  },

  getAnswers(val)  {
    return val == 0
      ? this.allAnswers
      : val == 1
        ? this.sameAnswers
        : this.differentAnswers
  },

  get allAnswers() {
    return this.$store.answers.itemsWithAnswers
  },
  
  get sameAnswers() {
    return this.allAnswers
      .filter(el => el.answerMe.answerValue === el.answerYou.answerValue);
  },
  
  get differentAnswers() {
    return this.allAnswers
      .filter(el => el.answerMe.answerValue != el.answerYou.answerValue)
  },

  get show() {
    return this.showList[this.showIndex]
  },

  items: {
    
    ["x-for"]: "{ itemId, itemA, itemB, answerMe, answerYou } in itemsWithAnswers",
    
    [":key"]: "itemId"
  },

 })