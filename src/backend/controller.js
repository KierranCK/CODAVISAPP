//import axios to handle requests
import axios from "axios";
//import backend config
import { API_HOST, API_KEY, API_URL } from "./config.js";

//export for list of countries available through the API
exports.countries = (req, res) => {
  const options = {
    method: "GET",
    url: API_URL + "/countries",
    headers: {
      "X-RapidAPI-Host": API_HOST,
      "X-RapidAPI-Key": API_KEY,
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.send(response.data.response);
    })
    .catch((err) => {
      console.error(err);
    });
};

//export for current global stats
exports.statistics = (req, res) => {
  const options = {
    method: "GET",
    url: API_URL + "/statistics",
    headers: {
      "X-RapidAPI-Host": API_HOST,
      "X-RapidAPI-Key": API_KEY,
    },
  };
  axios
    .request(options)
    .then((response) => {
      res.send(response.data.response);
    })
    .catch((err) => {
      console.error(err);
    });
};

//export for historical country data
exports.history = (req, res) => {
  console.log(req.query);
  const query = req.query;
  const requests = query.countries.map((country) => {
    country = JSON.parse(country);
    const options = {
      method: "GET",
      url: API_URL + "/history",
      params: { country: country.country, day: country.day },
      headers: {
        "X-RapidAPI-Host": API_HOST,
        "X-RapidAPI-Key": API_KEY,
      },
    };
    return axios.request(options);
  });

  //request all country data
  Promise.all(requests)
    .then((response) => {
      const results = [];
      response.map((item) => {
        results.push(item.data.response[0]);
      });
      console.log(results);
      if (results.length > 1) {
        //algorith to calculate difference in stats between countries
        let difference0 = {
          difference: {
            active:
              results[0].cases.active === null
                ? 0 - results[1].cases.active
                : results[0].cases.active - results[1].cases.active,
            critical:
              results[0].cases.critical === null
                ? 0 - results[1].cases.critical
                : results[0].cases.critical - results[1].cases.critical,
            recovered:
              results[0].cases.receovered === null
                ? 0 - results[1].cases.recovered
                : results[0].cases.recovered - results[1].cases.recovered,
            totalCases:
              results[0].cases.total === null
                ? 0 - results[1].cases.total
                : results[0].cases.total - results[1].cases.total,
            totalDeaths:
              results[0].deaths.total === null
                ? 0 - results[1].deaths.total
                : results[0].deaths.total - results[1].deaths.total,
            newCases:
              results[0].cases.new === null
                ? 0 - results[1].cases.new
                : results[0].cases.new - results[1].cases.new,
            newDeaths:
              results[0].deaths.new === null
                ? 0 - results[1].deaths.new
                : results[0].deaths.new - results[1].deaths.new,
          },
        };

        let difference1 = {
          difference: {
            active:
              results[1].cases.active === null
                ? 0 - results[0].cases.active
                : results[1].cases.active - results[0].cases.active,
            critical:
              results[1].cases.critical === null
                ? 0 - results[0].cases.critical
                : results[1].cases.critical - results[0].cases.critical,
            recovered:
              results[1].cases.receovered === null
                ? 0 - results[0].cases.recovered
                : results[1].cases.recovered - results[0].cases.recovered,
            totalCases:
              results[1].cases.total === null
                ? 0 - results[0].cases.total
                : results[1].cases.total - results[0].cases.total,
            totalDeaths:
              results[1].deaths.total === null
                ? 0 - results[0].deaths.total
                : results[1].deaths.total - results[0].deaths.total,
            newCases:
              results[1].cases.new === null
                ? 0 - results[0].cases.new
                : results[1].cases.new - results[0].cases.new,
            newDeaths:
              results[1].deaths.new === null
                ? 0 - results[0].deaths.new
                : results[1].deaths.new - results[0].deaths.new,
          },
        };

        //add difference to object before sending
        const finalResults = [
          Object.assign(results[0], difference0),
          Object.assign(results[1], difference1),
        ];
        console.log(finalResults);
        res.send(finalResults);
      } else {
        let difference = {
          difference: {
            active: null,
            critical: null,
            receovered: null,
            totalCases: null,
            totalDeaths: null,
          },
        };

        const finalResults = [Object.assign(results[0], difference)];
        res.send(finalResults);
      }
    })
    .catch((err) => {
      console.error(err);
    });
};

exports.index = (req, res) => {
  console.log("Index reached!");
  console.log(req);
};
