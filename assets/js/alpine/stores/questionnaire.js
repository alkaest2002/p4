import { initState, wipeState } from "../usables/useAlpineStore";

const stateFn = () => [
  [ "items", []],
  [ "currentItemIndex", 0],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine, "_questionnaire"),

  get isComplete() {
    const answers =  Alpine.store("answers")["me"].answers;
    return answers.length > 0 && answers.length === this.items.length;
  },

  get nextItemIndex() {
    return Math.min(this.currentItemIndex +1, this.items.length -1);
  },

  get previousItemIndex() {
    return Math.max(0, this.currentItemIndex -1);
  },

  get currentItem() {
    return this.items[this.currentItemIndex]
  },

  get isLastItem() {
    return this.currentItemIndex === this.items.length -1;
  },

  setItems(items) {
    this.items = items;
    this.currentItemIndex = 0;
  },

  increaseItemIndex() {
    this.currentItemIndex = this.nextItemIndex;
  },

  decreaseItemIndex() {
    this.currentItemIndex = this.previousItemIndex;
  },

  resetItemIndex() {
    this.currentItemIndex = 0;
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
