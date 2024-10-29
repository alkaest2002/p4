export default () => ({

  itemsWithAnswers: null,
  orderBy: "itemId",

  initAnswers() {
    this.itemsWithAnswers = this.$store.questionnaire.itemsWithAnswers;
    this.$watch("orderBy", val => {
      val === "itemId" && (this.itemsWithAnswers = this.$store.questionnaire.itemsWithAnswers)
      val === "latency" && (this.itemsWithAnswers = this.$store.questionnaire.itemsWithAnswers
        .sort((a, b) => b.answer.latency - a.answer.latency))
    })
  },

  sortBy: {
    ["@click.prevent"]() {
      this.orderBy = this.orderBy === "itemId"
        ? "latency"
        : "itemId";
    }
  },

  items: {
    
    ["x-for"]: "{ itemId, itemA, itemB, answer } in itemsWithAnswers",
    
    [":key"]: "itemId"
  },

  item(itemText, optionValue, answer) {
    return {
      
      "x-text"() {
        return itemText
      },
      
      ":class"() {
        return answer.answerValue === optionValue
          ? "font-semibold"
          : "text-sm italic text-gray-400"
      }
    }
  },

});
