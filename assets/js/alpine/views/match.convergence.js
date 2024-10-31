export default () => ({
  
  initMatchConvergence() {},

  groupMe: {
    ["x-ref"]: "groupMe",

    ["x-text"]() {
      return this.$store.keirsey.groupMe
    }
  },

  roleMe: {
    ["x-ref"]: "roleMe",

    ["x-text"]() {
      return this.$store.keirsey.roleMe
    }
  },

  groupYou: {
    ["x-ref"]: "groupYou",

    ["x-text"]() {
      return this.$store.keirsey.groupYou
    }
  },

  roleYou: {
    ["x-ref"]: "roleYou",

    ["x-text"]() {
      return this.$store.keirsey.roleYou
    }
  },

  convergence: {
    ["x-ref"]: "convergence",

    ["x-text"]() {
      return this.$store.keirsey.computeConvergenceScoreBetweenMeandYou();
    }
  }
});
