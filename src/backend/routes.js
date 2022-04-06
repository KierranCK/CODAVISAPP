import controller from "./controller.js";

//routes directs app to exports in controller
export default (app) => {
  app.route("/countries").get(controller.countries);

  app.route("/statistics").get(controller.statistics);

  app.route("/history").get(controller.history);

  app.route("/").get(controller.index);
};
