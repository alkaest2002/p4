import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  [ "urls", {} ],
  [ "lastVisitedUrl", null ]
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine, "_navigation"),

  setUrls(urls) {
    this.urls = urls;
  },

  goToUrl(url) {
    url && window.htmx.ajax("GET", url);
  },

  goToPage(page) {
    const url = this.urls[page];
    this.goToUrl(url);
  },

  goToLastVisited() {
    this.goToUrl(this.lastVisitedUrl);
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
