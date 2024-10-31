export default () => ({

  itemsWithAnswers: [],
  showList: ["all", "same", "different"],
  showIndex: 0,  

  initMatchCompareAnswers() {
    this.itemsWithAnswers = this.$store.answers.itemsWithAnswers;
    this.$watch("showIndex", (val, oldVal) => {
      if (val !== oldVal) {
        val === 0 
          && (this.itemsWithAnswers = this.$store.answers.itemsWithAnswers)
        val === 1 
          && (this.itemsWithAnswers = this.$store.answers.itemsWithAnswers
            .filter(el => el.answerMe.answerValue === el.answerYou.answerValue))
        val === 2 
          && (this.itemsWithAnswers = this.$store.answers.itemsWithAnswers
            .filter(el => el.answerMe.answerValue !== el.answerYou.answerValue))
      }
    })
  },

  get show() {
    return this.showList[this.showIndex]
  },

  items: {
    
    ["x-for"]: "{ itemId, itemA, itemB, answerMe, answerYou } in itemsWithAnswers",
    
    [":key"]: "itemId"
  },

 })