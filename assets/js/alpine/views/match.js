export default () => ({

  compressedAnswersSelf: "",
  compressedAnswersOther: "",
  passValidationSelf: true,
  passValidationOther: true,

  initMatch() {},

  selfInput: {

    ["x-ref"]: "selfInput",

    ["x-model"]: "compressedAnswersSelf",

    [":class"]() {
      return this.passValidationSelf
        ? "focus:ring-indigo-700 focus:border-indigo-700"
        : "ring-red-700 border-red-700 text-red-700"
    }
  },

  validationErrorSelf: {
    
    ["x-ref"]: "validationErrorSelf",

    [":class"]() {
      return this.passValidationSelf
        ? "invisible"
        : "block"
    }
  },

  otherInput: {

    ["x-ref"]: "otherInput",

    ["x-model"]: "compressedAnswersOther",

    [":class"]() {
      return this.passValidationOther
        ? "focus:ring-indigo-700 focus:border-indigo-700"
        : "ring-red-700 border-red-700"
    }
  },

  validationErrorOther: {
    ["x-ref"]: "validationErrorOther",

    [":class"]() {
      return this.passValidationOther
        ? "invisible"
        : "block"
    }
  },

  compressedAnswersButton: {

    ["x-ref"]: "compressedAnswersButton",

    ["@click.prevent"]() {     
      this.passValidationSelf = this.$store.match
        .checkValidityofCompressedString(this.compressedAnswersSelf); 
      this.passValidationOther = this.$store.match
        .checkValidityofCompressedString(this.compressedAnswersOther);       
      this.passValidationSelf
        && this.passValidationOther
        && this.$store.match.setAnswersSelfAndOther(this.compressedAnswersSelf, this.compressedAnswersOther);
      this.$store.navigation.goToPage("match/roles");
    }
  }
});
