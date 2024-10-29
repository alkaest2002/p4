import { initState, wipeState } from "../usables/useAlpineStore";

const getBlanckDimensions = () => ({
  "dimensions": { 
    "counts":    { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
    "latencies": { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
  }
});

const stateFn = () => [
  [ "roles", []],
  [ "self", {} ],
  [ "other", {} ]
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine),

  get roleSelf() {
    return this.getRole("self");
  },

  get roleOther() {
    return this.getRole("other");
  },

  getRole(person = "self") {
    const type = this.getType(person);
    return this.roles[type];
  },

  setRoles(roles) {
    this.roles = roles;
  },

  computeDimensions(person = "self", answers) {
    this[person] = getBlanckDimensions();
    Object.values(answers).forEach(answer => {
      const { dimension, latency}  = answer;
      this[person].dimensions.counts[dimension] += 1;
      this[person].dimensions.latencies[dimension] += latency;
    });
  },

  getTypeWithCoherenceValue(person = "self") {
    return [["I","E"], ["N","S"], ["T","F"], ["J","P"]]
      .map(couples => couples.map(single => [ single, this[person].dimensions.counts[single] ]))
      .map(couples => couples.sort((a, b) => b.at(1) - a.at(1)))
      .map(couples => [ couples.at(0).at(0), couples.at(0).at(1) - couples.at(1).at(1)])
  },

  getType(person = "self") {
    const type = this.getTypeWithCoherenceValue(person).map(el => el[0]).join("");
    return "EINSFTJP".split("").filter(el => type.indexOf(el) > -1).join("");
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
