import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  [ "gdpr", false],
  [ "languageDropdownIsOpen", false],
  [ "envIsDevelopment", false],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine, "_app"),

  toggleLanguageDropdown() {
    this.languageDropdownIsOpen = !this.languageDropdownIsOpen;
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
