//module to export handlers
// import "https";
// const fetch = require("node-fetch");
import axios from "axios";
import config  from "./config.js";

exports.countries = (req, res) => {
    const options = {
        method: 'GET',
        url: config.URL + "/countries",
        headers: {
            'X-RapidAPI-Host': config.HOST,
            'X-RapidAPI-Key': config.API_KEY
        }
    }

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}

exports.statistics = (req, res) => {
    const options = {
        method: 'GET',
        url: config.URL + "/statistics",
        headers: {
            'X-RapidAPI-Host': config.HOST,
            'X-RapidAPI-Key': config.API_KEY
        }
    }

    axios.request(options).then(function (response) {
        console.log(response.data);
    }).catch(function (error) {
        console.error(error);
    });
}