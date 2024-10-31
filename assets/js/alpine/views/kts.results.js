export default () => ({
  
  answersHaveLatencies: false,
  
  initKtsResults() {
    this.answersHaveLatencies = this.$store.answers.answersHaveLatencies;
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

  groupMe: {
    ["x-text"]() {
      return this.$store.keirsey.getGroup("me");
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
  },

  toClipboard: {
    async ["@click.prevent"]() {
      try {
        await navigator.clipboard.writeText(this.$store.answers["me"].compressedAnswers);
        console.log('content copied to clipboard');
      } catch (err) {
        console.error('failed to copy: ', err);
      }
    }
  }
});
