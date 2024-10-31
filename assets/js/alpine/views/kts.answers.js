export default () => ({

  itemsWithAnswers: null,
  answersHaveLatencies: false,
  orderBy: "itemId",

  initKtsAnswers() {
    this.answersHaveLatencies = this.$store.answers.answersHaveLatencies;
    this.itemsWithAnswers = this.$store.answers.itemsWithAnswers;
    this.answersHaveLatencies && (this.itemsWithAnswers = this.itemsWithAnswers
      .sort((a, b) => b.answer.latency - a.answer.latency)
    );
  },

  items: {
    
    ["x-for"]: "{ itemId, itemA, itemB, answerMe } in itemsWithAnswers",
    
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
