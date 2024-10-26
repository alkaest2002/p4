import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  ["urls", {}],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  setUrls(urls) {
    this.urls = urls;
  },

  getUrlPage(page) {
    return this.urls[page];
  },

  goToPage(page) {
    const url = this.getUrlPage(page);
    url && window.htmx.ajax("GET", url);
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
