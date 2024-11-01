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

  getItemsWithAnswers() {
    return Object.values(Alpine.store("questionnaire").items)
      .map((el, index) => ({
        itemId: el.id,
        itemA: `${el.text}... ${el.options.a.text}`,
        itemB: `${el.text}... ${el.options.b.text}`,
        answerMe: this["me"].answers[index],
        answerYou: this["you"].answers[index]
      }));
  },

  get answersHaveLatencies() {
    return this["me"].answers.every(answer => {
      return !isNaN(answer.latency) && answer.latency !== null && answer.latency !== '' && isFinite(answer.latency)
    })
  },

  getCurrentAnswer(person = "me") {
    const currentAnswerIndex = Alpine.store("questionnaire").currentItemIndex;
    return this[person].answers[currentAnswerIndex];
  },

  getCurrentAnswerValue(person = "me") {
    return this.getCurrentAnswer(person)?.answerValue;
  },

  checkValidityofCompressedString(compressedString) {
    return /^[A-Za-z0-9+/]+$/.test(compressedString);
  },

  setAnswer(answerValue, answerlatency = 0) {
    const currentItemIndex = Alpine.store("questionnaire").currentItemIndex;
    const currentItem = Alpine.store("questionnaire").currentItem;
    const isLastItem = Alpine.store("questionnaire").isLastItem
    const dimension = currentItem.options[answerValue].dimension;
    const latency = (this.currentAnswer?.latency || 0) + answerlatency;
    this["me"].answers.splice(currentItemIndex, 1, { answerValue, dimension, latency });
    isLastItem && Alpine.store("keirsey").computeDimensions("me", this["me"].answers);
    isLastItem && this.setCompressedAnswers("me");
  },

  setAnswers(person) {
    const decompressedString = decompressString(
      this[person].compressedAnswers,
      Alpine.store("questionnaire").items.length
    );
    this[person].answers = decompressedString
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

  setCompressedAnswers(person = "me") {
    const answers = this[person].answers.map(({ answerValue }) => answerValue).join("");
    this[person].compressedAnswers = answers.length > 0
      ? compressString(answers)
      : undefined
  },

  setAnswersMeAndYou(compressedAnswersMe, compressedAnswersYou) {
    const shouldComputeMe = compressedAnswersMe !== this["me"].compressedAnswers
    const omit = shouldComputeMe ? null : ["me"];
    this.wipeState(omit);
    shouldComputeMe && (this["me"].compressedAnswers = compressedAnswersMe);
    shouldComputeMe && this.setAnswers("me");
    this["you"].compressedAnswers = compressedAnswersYou;
    this.setAnswers("you");
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
