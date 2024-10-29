import { initState, wipeState } from "../usables/useAlpineStore";
import { compressString } from "../usables/useCompressDecompress";

const stateFn = () => [
  [ "items", []],
  [ "answers", []],
  [ "currentItemIndex", 0],
  [ "roles", {}],
  [ "dimensions", { 
      "counts":    { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
      "latencies": { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
    }
  ]
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

  get typeWithCoherenceValue() {
    return [["I","E"], ["N","S"], ["T","F"], ["J","P"]]
      .map(couples => couples.map(single => [ single, this.dimensions.counts[single] ]))
      .map(couples => couples.sort((a, b) => b.at(1) - a.at(1)))
      .map(couples => [ couples.at(0).at(0), couples.at(0).at(1) - couples.at(1).at(1)])
  },

  get type() {
    const type = this.typeWithCoherenceValue.map(el => el[0]).join("");
    return "EINSFTJP".split("").filter(el => type.indexOf(el) > -1).join("");
  },

  get role() {
    return this.roles[this.type];
  },

  resetItemIndex() {
    this.currentItemIndex = 0;
  },

  setItems(items) {
    this.items = items;
    this.currentItemIndex = 0;
  },

  setRoles(roles) {
    this.roles = roles;
  },

  setAnswer(answerValue, answerlatency = 0) {
    const previousLatency = this.currentAnswer?.latency || 0;
    const latency = previousLatency + answerlatency;
    const dimension = this.currentItem.options[answerValue].dimension;
    this.answers.splice(this.currentItemIndex, 1, { answerValue, dimension, latency });
    // reset counts
    this.dimensions = stateFn().at(-1).at(-1);
    // re-compute counts
    Object.values(this.answers).forEach(el => {
      this.dimensions.counts[el.dimension] += 1;
      this.dimensions.latencies[el.dimension] += el.latency;
    });
  },

  goToNextItem() {
    this.currentItemIndex = this.nextItemIndex;
  },

  goToPreviousItem() {
    this.currentItemIndex = this.previousItemIndex;
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
