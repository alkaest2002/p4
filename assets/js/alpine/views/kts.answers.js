export default () => ({

  itemsWithAnswers: null,
  answersHaveLatencies: false,
  orderBy: "itemId",

  initKtsAnswers() {
    this.answersHaveLatencies = this.$store.answers.getAnswersHaveLatencies("me");
    this.itemsWithAnswers = this.$store.answers.getItemsWithAnswers("me");
    this.answersHaveLatencies && (this.itemsWithAnswers = this.itemsWithAnswers
      .sort((a, b) => b.answer.latency - a.answer.latency)
    );
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
        return answer?.answerValue === optionValue
          ? "font-semibold"
          : "text-sm text-gray-400"
      }
    }
  },
});
