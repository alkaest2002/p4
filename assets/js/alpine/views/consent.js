export default () => ({
  initConsent() {
  },

  consentButton: {
    ["x-ref"]: "consentButton",
    
    ["@click.prevent"]() {
      this.$store.app.gdpr = true;
      this.$store.navigation.goToUrl(this.$store.app.requestedPath);
    }
  },
});
