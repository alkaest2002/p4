export default () => ({

  initMenu() {},

  closeMenu: {
    ["x-ref"] : "cloaseMenu",

    ["@click.prevent"]() {
      this.$store.navigation.goToLastVisited();
    }
  }
 
});
