export default () => ({
  
  initRoles() {},

  roleSelf: {
    ["x-ref"]: "roleSelf",

    ["x-html"]() {
      return this.$store.match.roleSelf
    }
  },

  roleOther: {
    ["x-ref"]: "roleOther",

    ["x-html"]() {
      return this.$store.match.roleOther
    }
  }
});
