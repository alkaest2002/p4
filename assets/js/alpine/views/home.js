export default () => ({
  
  async initHome() {
    const urlBase = this.$refs.base.dataset.urlBase;
    const urlItems = `${urlBase}items/index.json`;
    try {
      const items = await fetch(urlItems).then(res => res.json());
      this.$store.questionnaire.setItems(items);
      const { urls, roles, groups } = await fetch("index.json").then(res => res.json());
      this.$store.navigation.setUrls(urls);
      this.$store.keirsey.setRoles(roles);
      this.$store.keirsey.setGroups(groups);
    } catch(err) {
      console.log(err);
    }
  },
});
