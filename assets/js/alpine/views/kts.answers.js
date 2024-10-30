export default () => ({

  itemsWithAnswers: null,
  orderBy: "itemId",

  initKtsAnswers() {
    this.itemsWithAnswers = this.$store.answers.getItemsWithAnswers("me");
    this.$watch("orderBy", val => {
      val === "itemId" && (this.itemsWithAnswers  = this.$store.answers.getItemsWithAnswers("me"))
      val === "latency" && (this.itemsWithAnswers = this.$store.answers.getItemsWithAnswers("me")
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
