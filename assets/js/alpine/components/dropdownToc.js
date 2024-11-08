export default () => ({

  currentAnchor: null,

  initDropdownToc() {},

  dropdownTocContainer: {
    ["@toc-intersect.camel.window"]({ detail: { text }}) {
      this.currentAnchor = text;
    },

    ["@dropdown-link.camel"]({ detail: { text }}) {
      this.currentAnchor = text;
    },
  },

  dropdownTocLink: {   

    [":class"]() {
      return this.currentAnchor === this.$el.innerHTML && "font-bold";
    }
  }
})