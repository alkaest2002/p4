import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  ["languageDropdownIsOpen", false],
  ["envIsDevelopment", false],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  toggleLanguageDropdown() {
    this.languageDropdownIsOpen = !this.languageDropdownIsOpen;
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
