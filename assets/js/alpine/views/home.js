export default () => ({
  
  async initHome() {
    const urlBase = this.$refs.base.dataset.urlBase;
    const urlItems = `${urlBase}items/index.json`;
    try {
      const items = await fetch(urlItems).then(res => res.json());
      const urls = await fetch("index.json").then(res => res.json());
      this.$store.questionnaire.setItems(items);
      this.$store.navigation.setUrls(urls);
    } catch(err) {
      console.log(err);
    }
  },
});
