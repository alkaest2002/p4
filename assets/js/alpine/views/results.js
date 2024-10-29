export default () => ({
  initResults() {},

  "role": {
    ["x-text"]() {
      return this.$store.questionnaire.role;
    },
  },

  "roleLink": {
    ["@click.prevent"]() {
      this.$store.navigation.goToPage(this.$store.questionnaire.type);
    },
  },

  "answersLink": {
    ["@click.prevent"]() {
      this.$store.navigation.goToPage("kts/answers");
    },
  },

  "compressedAnswers": {
    ["x-text"]() {
      return this.$store.questionnaire.compressedAnswers;
    }
  }
});
