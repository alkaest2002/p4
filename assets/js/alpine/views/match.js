export default () => ({

  compressedAnswersMe: "",
  compressedAnswersYou: "",
  passValidationMe: true,
  passValidationYou: true,

  initMatch() {},

  meInput: {

    ["x-ref"]: "meInput",

    ["x-model"]: "compressedAnswersMe",

    [":class"]() {
      return this.passValidationMe
        ? "focus:ring-indigo-700 focus:border-indigo-700"
        : "ring-red-700 border-red-700 text-red-700"
    }
  },

  validationError: {
    
    ["x-ref"]: "validationError",

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
      this.passValidationMe  = this.$store.match.checkValidityofCompressedString(this.compressedAnswersMe); 
      this.passValidationYou = this.$store.match.checkValidityofCompressedString(this.compressedAnswersYou);       
      this.passValidationMe
        && this.passValidationYou
        && this.$store.match.setAnswersAndYou(this.compressedAnswersMe, this.compressedAnswersYou);
      this.$store.navigation.goToPage("match/roles");
    }
  }
});
