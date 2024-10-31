export default () => ({

  initMenu() {},

  closeMenu: {
    ["x-ref"] : "closeMenu",

    ["@click.prevent"]() {
      this.$store.navigation.goToLastVisited();
    }
  }
 
});
