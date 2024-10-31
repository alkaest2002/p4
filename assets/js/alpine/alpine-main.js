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
import vKtsQuestionnaire from "./views/kts.questionnaire";
import vKtsAnswers from "./views/kts.answers";
import vKtsResults from "./views/kts.results";
import vMatchAnswers from "./views/match.answers";
import vMatchConvergence from "./views/match.convergence";
import vMatchCompareAnswers from "./views/match.compare-answers";

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
Alpine.data("ktsQuestionnaire", vKtsQuestionnaire);
Alpine.data("ktsAnswers", vKtsAnswers);
Alpine.data("ktsResults", vKtsResults);
Alpine.data("matchAnswers", vMatchAnswers);
Alpine.data("matchConvergence", vMatchConvergence);
Alpine.data("matchCompareAnswers", vMatchCompareAnswers);

Alpine.data("dropdown", cDropdown);

window.Alpine ?? (window.Alpine = Alpine).start();
