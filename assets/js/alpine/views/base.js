export default () => ({

  requestedPath: null,
  whitelistUrls: [],

  initBase() {
    this.$store.app.envIsDevelopment = this.$refs.base.dataset.env == "true";
  },

  htmxEvents: {
    
    ["@htmx:before-request.camel"](event) {
      if (!this.$store.app.gdpr) {
        if (event.detail.pathInfo.requestPath.indexOf("kts") > -1) {
          event.preventDefault();
          this.requestedPath = event.detail.pathInfo.requestPath;
          window.htmx.ajax("GET", this.$refs.base.dataset.urlConsent);
        }
      }      
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
