export default () => ({

  observer: null,
  headings: null,

  initBookArticle() {
    const offset = window.innerHeight
      - (this.$refs.dropdownContainer?.getBoundingClientRect()?.top || 0);
    this.observer = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          entry.isIntersecting && this.$dispatch("tocIntersect", { text: entry.target.innerHTML });
        }
      },
      { rootMargin: `0px 0px -${offset}px 0px` }
    );
    this.headings = document.querySelectorAll('#content h2, #content h3');
    this.headings.forEach(el => this.observer.observe(el));
  },

  destroty() {
    this.headings.forEach(el => this.observer.unobserve(el));
  }
});
