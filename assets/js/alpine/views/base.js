export default () => ({

  gdpr: false,
  requestedPath: null,
  whitelistUrls: [],

  initBase() {
    this.$store.app.envIsDevelopment = this.$refs.base.dataset.env == "true";
    this.whitelistUrls = Object
      .entries(this.$store.navigation.urls || {})
      .filter(([key, _]) => ["base", "menu", "consent"].includes(key))
      .map(el => el?.[1]);
  },

  htmxEvents: {
    
    ["@htmx:before-request.camel"](event) {
      if (!this.gdpr) {
        if (!this.whitelistUrls.some(el => el.indexOf(event.detail.pathInfo.requestPath) > -1)) {
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
