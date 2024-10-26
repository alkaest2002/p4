export default () => ({
  initBase() {
    this.$store.app.envIsDevelopment = this.$refs.base.dataset.env == "true";
  },

  htmxEvents: {
    ["@htmx:before-swap.camel"]({ detail }) {
      const res = detail.serverResponse;
      if (res.indexOf("canonical") > -1) {
        const match = res.match(/http-equiv.+url=(.+)"/m);
        detail.shouldSwap = !match;
        match.length > 0 && window.htmx.ajax("GET", match[1]);
      }
    }
  },

  opacity: {
    [":class"]() {
      return this.$store.app.burgerIsOpen ? css.display["opacity-20"] : null;
    },
  },
});
