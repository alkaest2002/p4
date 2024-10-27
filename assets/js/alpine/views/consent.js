export default () => ({
  initConsent() {
  },

  consentButton: {
    ["x-ref"]: "consentButton",
    
    ["@click.prevent"]() {
      this.gdpr = true;
      this.$store.navigation.goToUrl(this.requestedPath);
    }
  },
});
