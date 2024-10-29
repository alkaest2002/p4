export default () => ({
  initResults() {},

  "role": {
    ["x-text"]() {
      return this.$store.keirsey.getRole("self");
    },
  },

  "roleLink": {
    ["@click.prevent"]() {
      this.$store.navigation.goToPage(this.$store.keirsey.getType("self"));
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
