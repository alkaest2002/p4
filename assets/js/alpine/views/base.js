export default () => ({

  initBase() {
    this.$store.app.envIsDevelopment = this.$refs.base.dataset.env == "true";
  },

  htmxEvents: {

    ["@htmx:after-swap.camel"]() {
      window.location.pathname.indexOf("menu") === -1 
        && (this.$store.navigation.lastVisitedUrl = window.location.pathname);
    },
    
    ["@htmx:before-swap.camel"]({ detail }) {
      const res = detail.serverResponse;
      if (res.indexOf("canonical") > -1) {
        const match = res.match(/http-equiv.+url=(.+)"/m);
        detail.shouldSwap = !match;
        match.length > 0 && window.htmx.ajax("GET", match[1]);
      }
    }
  },
});
