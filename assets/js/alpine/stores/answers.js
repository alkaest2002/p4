import { initState, wipeState } from "../usables/useAlpineStore";
import { compressString, decompressString } from "../usables/useCompressDecompress";

const stateFn = () => [
  [
    "me", 
    {
      "compressedAnswers": "",
      "answers": [],
    },
  ],
  [
    "you", 
    {
      "compressedAnswers": "",
      "answers": [],
    },
  ]
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine, "_answers"),

  getCurrentAnswer(person = "me") {
    const currentAnswerIndex = Alpine.store("questionnaire").currentItemIndex;
    return this[person].answers[currentAnswerIndex];
  },

  getCurrentAnswerValue(person = "me") {
    return this.getCurrentAnswer(person)?.answerValue;
  },

  getCompressedAnswers(person = "me") {
    const answers = this[person].answers.map(({ answerValue }) => answerValue).join("");
    return answers.length > 0
      ? compressString(answers)
      : undefined
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

  checkValidityofCompressedString(compressedString) {
    return /^[A-Za-z0-9+/]+$/.test(compressedString);
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
    Alpine.store("keirsey").computeDimensions(`keirsey${person}`, this[person].answers);
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
