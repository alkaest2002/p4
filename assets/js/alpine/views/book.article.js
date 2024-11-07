export default () => ({

  observer: null,
  headings: null,

  initBookArticle() {
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          const intersecting = entry.isIntersecting;
          intersecting && this.$dispatch("tocIntersect", { currentHeadingText: entry.target.innerHTML });
        }
      },
      { rootMargin: "1000px 0px -900px 0px" }
    );
    this.headings = document.querySelectorAll('#content h2, #content h3');
    this.headings.forEach(el => this.observer.observe(el));
  },

  destroty() {
    this.headings.forEach(el => this.observer.unobserve(el));
  }
});
