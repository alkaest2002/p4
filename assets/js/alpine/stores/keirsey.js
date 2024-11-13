import { initState, wipeState } from "../usables/useAlpineStore";

const getBlankDimensions = () => ({
  "dimensions": { 
    "counts":    { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
    "latencies": { "E": 0, "I": 0, "S": 0, "N":0, "F": 0, "T": 0, "P":0, "J": 0 },
  }
});

const stateFn = () => [
  [ "groups", []],
  [ "roles", []],
  [ "me", {}],
  [ "you", {}]
];

export default (Alpine) => ({
  
  ...initState(stateFn, Alpine, "_keirsey"),

  get groupMe() {
    return this.getGroup("me");
  },

  get groupYou() {
    return this.getGroup("you");
  },

  get roleMe() {
    return this.getRole("me");
  },

  get roleYou() {
    return this.getRole("you");
  },

  get rolesConvervenge() {
    const quartetMe = this.getQuartet("me").split("");
    const quartetYou = this.getQuartet("you").split("");
    const quartetRatio = quartetMe.filter((el) => quartetYou.indexOf(el) >= 0).length / 4;
    const dimensionsMe = Object.values(this["me"].dimensions.counts);  
    const dimensionsYou = Object.values(this["you"].dimensions.counts);
    const dimensionsDiff = dimensionsMe.reduce((acc, itr, index) => acc += Math.abs(itr - dimensionsYou[index]), 0);
    const dimensionsRatio = dimensionsDiff / (Alpine.store("questionnaire").items.length * 2);
    return ((1 - dimensionsRatio) * 100 * Math.max(0, quartetRatio)).toFixed(0);
  },

  getGroup(person = "me") {
    const type = this.getQuartet(person);
    return this.groups[type]
  },

  getRole(person = "me") {
    const quartet = this.getQuartet(person);
    return this.roles[quartet];
  },

  getQuartetWithStats(person = "me") {
    return [["I","E"], ["N","S"], ["T","F"], ["J","P"]]
      .map(couples => couples.map(single => [ single, this[person].dimensions.counts[single] ]))
      .map(couples => couples.sort((a, b) => b.at(1) - a.at(1)))
      .map(couples => [ couples.at(0).at(0), couples.at(0).at(1) - couples.at(1).at(1)])
  },

  getQuartet(person = "me") {
    const type = this.getQuartetWithStats(person).map(el => el[0]).join("");
    return "EINSFTJP".split("").filter(el => type.indexOf(el) > -1).join("");
  },

  setGroups(groups) {
    this.groups = groups;
  },

  setRoles(roles) {
    this.roles = roles;
  },

  computeDimensions(person = "me", answers) {
    this[person] = getBlankDimensions();
    Object.values(answers).forEach(answer => {
      const { dimension, latency }  = answer;
      this[person].dimensions.counts[dimension] += 1;
      this[person].dimensions.latencies[dimension] += latency;
    });
    console.log(this[person].dimensions.counts)
  },

  wipeState(omit = []) {
    wipeState.call(this, stateFn, omit);
  },
});
