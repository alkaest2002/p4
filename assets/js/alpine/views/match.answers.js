export default () => ({

  compressedAnswersMe: "",
  compressedAnswersYou: "",
  passValidationMe: true,
  passValidationYou: true,

  initMatchAnswers() {
    this.compressedAnswersMe = this.$store.answers["me"].compressedAnswers;
    this.compressedAnswersYou = this.$store.answers["you"].compressedAnswers;
  },

  meInput: {

    ["x-ref"]: "meInput",

    ["x-model"]: "compressedAnswersMe",

    [":class"]() {
      return this.passValidationMe
        ? "focus:ring-indigo-700 focus:border-indigo-700"
        : "ring-red-700 border-red-700 text-red-700"
    }
  },

  validationErrorMe: {
    
    ["x-ref"]: "validationErrorMe",

    [":class"]() {
      return this.passValidationMe
        ? "invisible"
        : "block"
    }
  },

  youInput: {

    ["x-ref"]: "youInput",

    ["x-model"]: "compressedAnswersYou",

    [":class"]() {
      return this.passValidationYou
        ? "focus:ring-indigo-700 focus:border-indigo-700"
        : "ring-red-700 border-red-700"
    }
  },

  validationErrorYou: {
    ["x-ref"]: "validationErrorYou",

    [":class"]() {
      return this.passValidationYou
        ? "invisible"
        : "block"
    }
  },

  compressedAnswersButton: {

    ["x-ref"]: "compressedAnswersButton",

    ["@click.prevent"]() {     
      this.passValidationMe  = this.$store.answers.checkValidityOfCompressedString(this.compressedAnswersMe); 
      this.passValidationYou = this.$store.answers.checkValidityOfCompressedString(this.compressedAnswersYou);       
      this.passValidationMe && this.passValidationYou
        && this.$store.answers.setAnswersMeAndYou(this.compressedAnswersMe, this.compressedAnswersYou);
      this.passValidationMe && this.passValidationYou && this.$store.navigation.goToPage("match/convergence");
    }
  }
});
