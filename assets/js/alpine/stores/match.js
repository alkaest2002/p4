import { initState, wipeState } from "../usables/useAlpineStore";
import { decompressString } from "../usables/useCompressDecompress";

const stateFn = () => [
  [
    "self", {
      "answers": [],
      "dimensions": { 
        "counts":    { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
      }
    }
  ],
  [
    "other", {
      "answers": [],
      "dimensions": { 
        "counts":    { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
      }
    }
  ]
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  checkValidityofCompressedString(compressedString) {
    return /^[A-Za-z0-9+/]+$/.test(compressedString);
  },

  setAnswers(person) {
    person.answers = decompressString(person.compressedAnswers, 13)
      .split("")
      .map((el, index) => {
        return { 
          answerValue: el,
          dimension: Alpine.store("questionnaire").items[index].options[el].dimension,
          latency: null
        } 
      });
      person.answers.forEach(el => person.dimensions.counts[el.dimension] += 1);
  },

  setAnswersSelfAndOther(compressedAnswersSelf, compressedAnswersOther) {
    this.wipeState();
    this.self.compressedAnswers = compressedAnswersSelf;
    this.other.compressedAnswers = compressedAnswersOther;
    this.setAnswers(this.self);
    this.setAnswers(this.other);
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

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
