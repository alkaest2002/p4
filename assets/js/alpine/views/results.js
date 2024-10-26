export default () => ({
  initResults() {},

  "type": {
    ["x-text"]() {
      return this.$store.questionnaire.type;
    },
  },

  "typeLink": {
    ["@click.prevent"]() {
      this.$store.navigation.goToPage(this.$store.questionnaire.type);
    },
  },

  "answersLink": {
    ["@click.prevent"]() {
      this.$store.navigation.goToPage("answers");
    },
  },

  "compressedAnswers": {
    ["x-text"]() {
      return this.$store.questionnaire.compressedAnswers;
    }
  }
});
