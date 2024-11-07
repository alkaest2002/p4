export default () => ({

  currentAnchor: null,

  initDropdownToc() {},

  dropdownTocContainer: {
    ["@toc-intersect.camel.window"]({ detail: { currentHeadingText }}) {
      this.currentAnchor = currentHeadingText;
    },

    ["@dropdown-link.camel"]({ detail: { text }}) {
      this.currentAnchor = text;
    },
  },

  dropdownTocLink: {   

    [":class"]() {
      return this.currentAnchor === this.$el.innerHTML && "font-bold"
    }
  }
})