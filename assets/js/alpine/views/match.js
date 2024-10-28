export default () => ({

  initMatch() {},

  "selfInput": {

    ["x-ref"]: "selfInput",

    ["x-model"]: "$store.match.self.compressedAnswers"
  },

  "otherInput": {

    ["x-ref"]: "otherInput",

    ["x-model"]: "$store.match.other.compressedAnswers"
  },


  "compressedAnswersButton": {

    ["x-ref"]: "compressedAnswersButton",

    ["@click.prevent"]() {
      console.log("click")
    }
  }
});
