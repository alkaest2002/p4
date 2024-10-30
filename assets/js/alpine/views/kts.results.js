export default () => ({
  
  answersHaveLatencies: false,
  
  initKtsResults() {
    this.answersHaveLatencies = this.$store.answers.getAnswersHaveLatencies("me");
  },

  roleMe: {
    ["x-text"]() {
      return this.$store.keirsey.getRole("me");
    },
  },

  roleMeLink: {
    ["@click.prevent"]() {
      this.$store.navigation.goToPage(this.$store.keirsey.getType("me"));
    },
  },

  answersMeLink: {
    ["@click.prevent"]() {
      this.$store.navigation.goToPage("kts/answers");
    },
  },

  compressedAnswersMe: {
    ["x-text"]() {
      return this.$store.answers["me"].compressedAnswers;
    }
  }
});
