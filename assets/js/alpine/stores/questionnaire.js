import { initState, wipeState } from "../usables/useAlpineStore";
import { compressString } from "../usables/useCompressDecompress";

const stateFn = () => [
  [ "items", []],
  [ "answers", []],
  [ "currentItemIndex", 0],
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  get isComplete() {
    return this.answers.length > 0 && this.answers.length === this.items.length;
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

  get currentAnswer() {
    return this.answers[this.currentItemIndex]
  },

  get currentAnswerValue() {
    return this.currentAnswer?.answerValue;
  },

  get itemsWithAnswers() {
    return Object.values(this.items)
      .map((el, index) => ({
        itemId: el.id,
        itemA: `${el.text}... ${el.options.a.text}`,
        itemB: `${el.text}... ${el.options.b.text}`,
        answer: this.answers[index]
      }));
  },

  get compressedAnswers() {
    const answers = this.answers.map(({ answerValue }) => answerValue).join("");
    return answers.length > 0
      ? compressString(answers)
      : undefined
  },

  setItems(items) {
    this.items = items;
    this.currentItemIndex = 0;
  },

  setAnswer(answerValue, answerlatency = 0) {
    const previousLatency = this.currentAnswer?.latency || 0;
    const latency = previousLatency + answerlatency;
    const dimension = this.currentItem.options[answerValue].dimension;
    this.answers.splice(this.currentItemIndex, 1, { answerValue, dimension, latency });
    this.isLastItem && Alpine.store("keirsey").computeDimensions("self", this.answers);
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
