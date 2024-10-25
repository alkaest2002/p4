export default () => ({
  
  async initHome() {
    const urlBase = this.$refs.home.dataset.urlBase;
    const urlItems = `${urlBase}items/index.json`;
    const items = await fetch(urlItems).then(res => res.json());
    this.$store.questionnaire.setItems(items);
    const urls = await fetch("index.json").then(res => res.json());
    this.$store.url.setUrl(urls);
  },

});
