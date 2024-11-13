export default () => ({
  
  initMatchConvergence() {},

  roleMe: {
    ["x-ref"]: "roleMe",

    ["@click"]() {
      this.$store.navigation.goToPage(this.$store.keirsey.getQuartet("me"))
    },

    ["x-text"]() {
      return this.$store.keirsey.roleMe
    }
  },

  roleYou: {
    ["x-ref"]: "roleYou",

    ["@click"]() {
      this.$store.navigation.goToPage(this.$store.keirsey.getQuartet("you"))
    },

    ["x-text"]() {
      return this.$store.keirsey.roleYou
    }
  },

  rolesConvergence: {
    ["x-ref"]: "rolesConvergence",

    ["x-text"]() {
      return this.$store.keirsey.rolesConvervenge;
    }
  },

  answersConvergence: {
    ["x-ref"]: "answersConvergence",

    ["x-text"]() {
      return this.$store.answers.answersConvergence;
    }
  }
});
