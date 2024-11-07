export default () => ({

  open: false,

  initDropDown(prop) {
    prop && this.$watch("open", (val) => prop = val);
  },

  toggle() {
    if (this.open) {
      return this.close();
    }
    this.$refs.button.focus();
    this.open = true;
  },

  close(focusAfter) {
    if (!this.open) return;
    this.open = false;
    focusAfter && focusAfter.focus();
  },

  dropdownContainer: {

    ["x-id"]() {
      return [ "dropdown-button" ];
    },

    ["@keydown.escape.prevent.stop"]() {
      this.close(this.$refs.button);
    },
    
    ["@focusin.window"]({ target }) {
      !this.$refs.panel.contains(target) && this.close();
    },
  },

  dropdownButton: {

    ["x-ref"]: "button",

    [":aria-expanded"]() {
      return this.open;
    },

    [":aria-controls"]() {
      return this.$id("dropdown-button");
    },

    ["@click.prevent"]() {
      this.toggle();
    }
  },

  dropdownPanel: {

    ["x-ref"]: "panel",
    
    [":id"]() {
      return this.$id('dropdown-button');
    },
    
    ["x-show"]() {
      return this.open;
    },
    
    ["@click.outside"]() {
      this.close(this.$refs.button);
    }
  },

  dropdownLink: {
    
    ["@click"]() {
      this.toggle();
      this.$dispatch("dropdownLink", { text: this.$el.innerText });
    }
  }
})