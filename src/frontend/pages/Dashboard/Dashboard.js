import React, { useEffect, useState } from "react";
import "./Dashboard.css";
import Layout from "../../components/Layout/Layout";
import Table from "../../components/Table/Table";
import StatsBar from "../../components/StatsBar/StatsBar";
import Loading from "../../components/Loading/Loading";
import axios from "axios";
import config from "../../config.js";
import Header from "../../components/Header/Header";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";
import { Button, Row, Col, Dropdown } from "react-bootstrap";
import { formatDateTime } from "../../common/common";

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [globalStats, setGlobalStats] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [highestCases, setHighestCases] = useState([]);
  const [topFiveCases, setTopFiveCases] = useState({});
  const [topFiveDeaths, setTopFiveDeaths] = useState({});
  const [highestDeaths, setHighestDeaths] = useState([]);

  const headers = [
    "#",
    "Region",
    "Population",
    "Active",
    "Critical",
    "New Cases",
    "Recovered",
    "New Deaths",
    "Total Cases",
    "Total Deaths",
  ];
  const nullValue = "0";

  // retrieve data for api
  useEffect(() => {
    axios
      .request({
        method: "GET",
        url: config.BACKEND + "/statistics",
      })
      .then((res) => {
        let countryData1 = res.data;
        let countryData2 = res.data;
        let countryData3 = res.data;
        let countryData4 = res.data;
        console.log(res.data);

        //sort data in decsending active case order
        const sortedByCases = countryData2.sort((a, b) => {
          return b.cases.active - a.cases.active;
        });
        setData(countryData1);
        setHighestCases(sortedByCases);

        const sortedByDeaths = countryData3.sort((a, b) => {
          return b.deaths.total - a.deaths.total;
        });
        setHighestDeaths(sortedByDeaths);
        setGlobalStats(res.data[0]);

        //setDate for 'last updated' value
        setLastUpdated("Last updated: " + formatDateTime(new Date()));
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    console.log(highestCases);
    const topFive = highestCases.splice(1, 5);
    console.log(topFive);
    let regions = [];
    let values = [];
    topFive.map((datapoint) => {
      regions.push(datapoint.country);
      values.push(datapoint.cases.active);
    });

    setTopFiveCases({ categories: regions, values: values });
    console.log(topFiveCases);
  }, [highestCases]);

  useEffect(() => {
    const topFive = highestDeaths.splice(1, 5);
    let regions = [];
    let values = [];
    topFive.map((datapoint) => {
      regions.push(datapoint.country);
      values.push(datapoint.deaths.total);
    });

    setTopFiveDeaths({ categories: regions, values: values });
  }, [highestDeaths]);

  // useEffect(() => {
  //   console.log("data: " + data);
  // }, [data]);

  useEffect(() => {
    globalStats && console.log(globalStats);
  }, [globalStats]);

  useEffect(() => {
    console.log(topFiveCases);
  }, [topFiveCases]);

  return (
    <Layout>
      <Header title="Dashboard" timestamp={lastUpdated} />

      {!globalStats ? (
        <div className="centre">
          <Loading />
        </div>
      ) : (
        <div className="container overflow-hidden">
          <Row>
            <Col>
              <div className="p-3 rounded bg-dark">
                <p>Global Stats</p>
                <div className="text-center">
                  <StatsBar data={globalStats} />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <Row>
                  <Col>
                    <p>Global Stats By Region</p>
                  </Col>
                </Row>

                <Table headers={headers} data={data} nullValue={nullValue} />
              </div>
            </Col>
            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <p>Global Charts</p>
                <div className="d-flex justify-content-center">
                  <PieChart
                    labels={["Active", "Recovered"]}
                    data={[
                      globalStats.cases.active,
                      globalStats.cases.recovered,
                    ]}
                    colors={["#BD00FF", "#FFB800"]}
                  />

                  <PieChart
                    labels={["New Cases", "New Deaths"]}
                    data={[globalStats.cases.new, globalStats.deaths.new]}
                    colors={["#FFFFFF", "#000000"]}
                  />

                  <PieChart
                    labels={["Recovered", "Total Deaths"]}
                    data={[
                      globalStats.cases.recovered,
                      globalStats.deaths.total,
                    ]}
                    colors={["#FFB800", "#FF0000"]}
                  />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="gy-4" md="6">
              <div className="p-3 rounded bg-dark">
                <p>Top 5 Regions Cases</p>
                <div className="d-flex justify-content-center">
                  <BarChart
                    label={"Cases"}
                    categories={topFiveCases.categories}
                    values={topFiveCases.values}
                  />
                </div>
              </div>
            </Col>

            <Col className="gy-4" md="6">
              <div className="p-3 rounded bg-dark">
                <p>Top 5 Regions Deaths</p>
                <div className="d-flex justify-content-center">
                  <BarChart
                    label={"Deaths"}
                    categories={topFiveDeaths.categories}
                    values={topFiveDeaths.values}
                  />
                </div>
              </div>
            </Col>
          </Row>
        </div>
      )}
    </Layout>
  );
};

export default Dashboard;
