export default () => ({
  
  initRoles() {},

  roleSelf: {
    ["x-ref"]: "roleSelf",

    ["x-text"]() {
      return this.$store.keirsey.roleSelf
    }
  },

  roleOther: {
    ["x-ref"]: "roleOther",

    ["x-text"]() {
      return this.$store.keirsey.roleOther
    }
  }
});
