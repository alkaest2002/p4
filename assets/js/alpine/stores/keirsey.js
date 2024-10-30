import { initState, wipeState } from "../usables/useAlpineStore";

const getBlanckDimensions = () => ({
  "dimensions": { 
    "counts":    { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
    "latencies": { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
  }
});

const stateFn = () => [
  [ "groups", []],
  [ "roles", []],
  [ "me", {}, "" ],
  [ "you", {}, "" ]
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine, "_keirsey"),

  get groupMe() {
    return this.getGroup("me");
  },

  get groupYou() {
    return this.getGroup("you");
  },

  getGroup(person = "me") {
    const type = this.getType(person);
    return this.groups[type]
  },

  get roleMe() {
    return this.getRole("me");
  },

  get roleYou() {
    return this.getRole("you");
  },

  getRole(person = "me") {
    const type = this.getType(person);
    return this.roles[type]
  },

  getTypeWithCoherenceValue(person = "me") {
    return [["I","E"], ["N","S"], ["T","F"], ["J","P"]]
      .map(couples => couples.map(single => [ single, this[person].dimensions.counts[single] ]))
      .map(couples => couples.sort((a, b) => b.at(1) - a.at(1)))
      .map(couples => [ couples.at(0).at(0), couples.at(0).at(1) - couples.at(1).at(1)])
  },

  getType(person = "me") {
    const type = this.getTypeWithCoherenceValue(person).map(el => el[0]).join("");
    return "EINSFTJP".split("").filter(el => type.indexOf(el) > -1).join("");
  },

  setGroups(groups) {
    this.groups = groups;
  },

  setRoles(roles) {
    this.roles = roles;
  },

  computeDimensions(person = "me", answers) {
    this[person] = getBlanckDimensions();
    Object.values(answers).forEach(answer => {
      const { dimension, latency}  = answer;
      this[person].dimensions.counts[dimension] += 1;
      this[person].dimensions.latencies[dimension] += latency;
    });
  },

  computeConvergenceScoreBetweenMeandYou() {
    const me = Object.entries(this["me"].dimensions.counts)
      .sort((a,b) => a[0].localeCompare(b[0])).map(el => el[1]);  
    const you = Object.entries(this["you"].dimensions.counts)
      .sort((a,b) => a[0].localeCompare(b[0])).map(el => el[1]);
    const sumOfDifferences = me.reduce((acc, itr, index) => acc += Math.abs(itr - you[index]), 0);
    console.log(you, me, sumOfDifferences)
    const ratio = sumOfDifferences / (Alpine.store("questionnaire").items.length * 2);
    console.log(sumOfDifferences)
    return 100 - Number(ratio.toFixed(2))*100;
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
