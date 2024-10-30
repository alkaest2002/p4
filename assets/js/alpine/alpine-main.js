import Alpine from "alpinejs";
import persist from "@alpinejs/persist";

// stores
import sApp from "./stores/app";
import sNavigation from "./stores/navigation";
import sKeirsey from "./stores/keirsey";
import sQuestionnaire from "./stores/questionnaire";
import sAnswers from "./stores/answers";

// views
import vBase from "./views/base";
import vMenu from "./views/menu";
import vHome from "./views/home";
import vQuestionnaire from "./views/questionnaire";
import vAnswers from "./views/answers";
import vResults from "./views/results";
import vMatch from "./views/match";
import vRoles from "./views/roles";

// components
import cDropdown from "./components/dropdown";

Alpine.plugin(persist);
Alpine.store("app", sApp(Alpine));
Alpine.store("navigation", sNavigation(Alpine));
Alpine.store("keirsey", sKeirsey(Alpine));
Alpine.store("questionnaire", sQuestionnaire(Alpine));
Alpine.store("answers", sAnswers(Alpine));
Alpine.data("base", vBase);
Alpine.data("menu", vMenu);
Alpine.data("home", vHome);
Alpine.data("questionnaire", vQuestionnaire);
Alpine.data("answers", vAnswers);
Alpine.data("results", vResults);
Alpine.data("match", vMatch);
Alpine.data("roles", vRoles);

Alpine.data("dropdown", cDropdown);

window.Alpine ?? (window.Alpine = Alpine).start();
