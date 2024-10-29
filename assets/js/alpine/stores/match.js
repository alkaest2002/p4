import { initState, wipeState } from "../usables/useAlpineStore";
import { decompressString } from "../usables/useCompressDecompress";

const stateFn = () => [
  [
    "self", {
      "compressedAnswers": "",
      "answers": [],
    }
  ],
  [
    "other", {
      "compressedAnswers": "",
      "answers": [],
    }
  ]
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

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

  getItemsWithAnswersSelf() {
    return this.getItemsWithAnswers(this.self.answers);
  },

  getItemsWithAnswersOther() {
    return this.getItemsWithAnswers(this.other.answers);
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

  setAnswersSelfAndOther(compressedAnswersSelf, compressedAnswersOther) {
    this.wipeState();
    this["self"].compressedAnswers = compressedAnswersSelf;
    this["other"].compressedAnswers = compressedAnswersOther;
    this.setAnswers("self");
    this.setAnswers("other");
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
