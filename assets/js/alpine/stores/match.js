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

  get roleSelf() {
    return this.getRole(this.self);
  },

  get roleOther() {
    return this.getRole(this.other);
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

  getItemsWithAnswersSelf() {
    return this.getItemsWithAnswers(this.self.answers);
  },

  getItemsWithAnswersOther() {
    return this.getItemsWithAnswers(this.other.answers);
  },

  getTypeWithCoherenceValue(person) {
    return [["I","E"], ["N","S"], ["T","F"], ["J","P"]]
      .map(couples => couples.map(single => [ single, person.dimensions.counts[single] ]))
      .map(couples => couples.sort((a, b) => b.at(1) - a.at(1)))
      .map(couples => [ couples.at(0).at(0), couples.at(0).at(1) - couples.at(1).at(1)])
  },

  getType(person) {
    const type = this.getTypeWithCoherenceValue(person)
      .map(el => el[0]).join("");
    return "EINSFTJP".split("").filter(el => type.indexOf(el) > -1).join("");
  },

  getRole(person) {
    const type = this.getType(person)
    return Alpine.store("questionnaire").roles[type];
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

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
