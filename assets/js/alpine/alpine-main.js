import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

// stores
import sApp from "./stores/app";
import sNavigation from "./stores/navigation";
import sQuestionnaire from "./stores/questionnaire";

// views
import vBase from "./views/base";
import vMenu from "./views/menu";
import vHome from "./views/home";
import vQuestionnaire from "./views/questionnaire";
import vAnswers from "./views/answers";
import vResults from "./views/results";

// components
import cDropdown from "./components/dropdown";

Alpine.plugin(persist);
Alpine.store("app", sApp(Alpine));
Alpine.store("navigation", sNavigation(Alpine));
Alpine.store("questionnaire", sQuestionnaire(Alpine));
Alpine.data("base", vBase);
Alpine.data("menu", vMenu);
Alpine.data("home", vHome);
Alpine.data("questionnaire", vQuestionnaire);
Alpine.data("answers", vAnswers);
Alpine.data("results", vResults);

Alpine.data("dropdown", cDropdown);

window.Alpine ?? (window.Alpine = Alpine).start();
