import { initState, wipeState } from "../usables/useAlpineStore";
import { decompressString } from "../usables/useCompressDecompress";

const stateFn = () => [
  [
    "self", {
      "compressedAnswers": "",
      "answers": [],
      "dimensions": { 
        "counts":    { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
      }
    }
  ],
  [
    "other", {
      "compressedAnswers": "",
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

  setAnswers(decompressedAnswers, person) {
    const answers = decompressedAnswers.map((el, index) => {
      return { 
        answerValue: el,
        dimension: this.$store.questionnaire.items[index].options[el].dimension,
        latency: null
      } 
    });
    const dimensions = Object.values(answers).forEach(el => {
      person.dimensions.counts[el.dimension] += 1;
    });
    person = { ...person, answers, dimensions }
  },

  setAnswersSelf(compressedAnswers) {
    const decompressedAnswers = decompressString(compressedAnswers);
    this.setAnswers(decompressedAnswers, this.self);
  },

  setAnswersOther(compressedAnswers) {
    const decompressedAnswers = decompressString(compressedAnswers);
    this.setAnswers(decompressedAnswers, this.other);
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
