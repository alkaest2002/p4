export default () => ({
  initResults() {},

  "type": {
    ["x-text"]() {
      return this.$store.questionnaire.type;
    },
  },

  "typeLink": {
    ["@click.prevent"]() {
      this.$store.url.goToPage(this.$store.questionnaire.type);
    },
  },

  "answersLink": {
    ["@click.prevent"]() {
      this.$store.url.goToPage("answers");
    },
  },

  "compressedAnswers": {
    ["x-text"]() {
      return this.$store.questionnaire.compressedAnswers;
    }
  }
});
