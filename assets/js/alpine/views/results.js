export default () => ({
  initResults() {},

  "role": {
    ["x-text"]() {
      return this.$store.keirsey.getRole("me");
    },
  },

  "roleLink": {
    ["@click.prevent"]() {
      this.$store.navigation.goToPage(this.$store.keirsey.getType("me"));
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
