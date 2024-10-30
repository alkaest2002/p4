import { initState, wipeState } from "../usables/useAlpineStore";
import { compressString, decompressString } from "../usables/useCompressDecompress";

const stateFn = () => [
  [
    "me", {
      "compressedAnswers": "",
      "answers": [],
    }
  ],
  [
    "you", {
      "compressedAnswers": "",
      "answers": [],
    }
  ]
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  get currentAnswer() {
    const currentAnswerIndex = Alpine.store("questionnaire").currentItemIndex;
    console.log(this)
    return this["me"].answers[currentAnswerIndex];
  },

  get currentAnswerValue() {
    return this.currentAnswer?.answerValue;
  },

  get compressedAnswers() {
    const answers = this["me"].answers.map(({ answerValue }) => answerValue).join("");
    return answers.length > 0
      ? compressString(answers)
      : undefined
  },

  checkValidityofCompressedString(compressedString) {
    return /^[A-Za-z0-9+/]+$/.test(compressedString);
  },

  getItemsWithAnswers(answers) {
    return Object.values(this.$store.questionnaire.items)
      .map((el, index) => ({
        itemId: el.id,
        itemA: `${el.text}... ${el.options.a.text}`,
        itemB: `${el.text}... ${el.options.b.text}`,
        answer: answers[index]
      }));
  },

  getItemsWithAnswersMe() {
    return this.getItemsWithAnswers(this["me"].answers);
  },

  getItemsWithAnswersYou() {
    return this.getItemsWithAnswers(this["you"].answers);
  },

  setAnswer(answerValue, answerlatency = 0) {
    const currentItemIndex = Alpine.store("questionnaire").currentItemIndex;
    const currentItem = Alpine.store("questionnaire").currentItem;
    const isLastItem = Alpine.store("questionnaire").isLastItem
    const dimension = currentItem.options[answerValue].dimension;
    console.log(this.currentAnswer)
    const latency = (this.currentAnswer?.latency || 0) + answerlatency;
    this["me"].answers.splice(currentItemIndex, 1, { answerValue, dimension, latency });
    isLastItem && Alpine.store("keirsey").computeDimensions("me", this["me"].answers);
  },

  setAnswers(person) {
    this[person].answers = decompressString(this[person].compressedAnswers, 13)
      .split("")
      .map((answerValue, index) => {
        return { 
          answerValue,
          dimension: Alpine.store("questionnaire").items[index].options[answerValue].dimension,
          latency: null
        } 
      });
    Alpine.store("keirsey").computeDimensions(person, this[person].answers);
  },

  setAnswersMeAndYou(compressedAnswers, compressedAnswersYou) {
    this.wipeState();
    this["me"].compressedAnswers = compressedAnswers;
    this["you"].compressedAnswers = compressedAnswersYou;
    this.setAnswers("me");
    this.setAnswers("you");
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
