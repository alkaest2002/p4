export default () => ({
  
  initMatchRoles() {},

  roleMe: {
    ["x-ref"]: "roleMe",

    ["x-text"]() {
      return this.$store.keirsey.roleMe
    }
  },

  roleYou: {
    ["x-ref"]: "roleYou",

    ["x-text"]() {
      return this.$store.keirsey.roleYou
    }
  }
});
