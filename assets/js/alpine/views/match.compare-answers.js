export default () => ({

  itemsWithAnswers: [],
  show: "all",

  initMatchCompareAnswers() {
    this.itemsWithAnswers = this.$store.answers.itemsWithAnswers;
    this.$watch("show", (val, oldVal) => {
      if (val !== oldVal) {
        val === "all" 
          && (this.itemsWithAnswers = this.$store.answers.itemsWithAnswers)
        val === "same" 
          && (this.itemsWithAnswers = this.$store.answers.itemsWithAnswers
            .filter(el => el.answerMe.answerValue === el.answerYou.answerValue))
        val === "different" 
          && (this.itemsWithAnswers = this.$store.answers.itemsWithAnswers
            .filter(el => el.answerMe.answerValue !== el.answerYou.answerValue))
      }
    })
  },

  items: {
    
    ["x-for"]: "{ itemId, itemA, itemB, answerMe, answerYou } in itemsWithAnswers",
    
    [":key"]: "itemId"
  },

 })