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

const Dashboard = () => {
  const [data, setData] = useState(null);
  const [lastUpdated, setLastUpdated] = useState(null);
  const [highestCases, setHighestCases] = useState([]);
  const [topFiveCases, setTopFiveCases] = useState({});
  const [topFiveDeaths, setTopFiveDeaths] = useState({});
  const [highestDeaths, setHighestDeaths] = useState([]);
  const headers = [
    "#",
    "Region",
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
    const options = {
      method: "GET",
      url: config.URL + "/statistics",
      headers: {
        "X-RapidAPI-Host": config.HOST,
        "X-RapidAPI-Key": config.API_KEY,
      },
    };
    axios
      .request(options)
      .then((res) => {
        console.log(res.data.response);

        let countryData1 = res.data.response;
        let countryData2 = res.data.response;
        let countryData3 = res.data.response;

        console.log(countryData1);
        console.log(countryData2);
        console.log(countryData3);

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

        //setDate for 'last updated' value
        const date = new Date();
        const dateString =
          ("0" + date.getDate()).slice(-2) +
          "/" +
          ("0" + (date.getMonth() + 1)).slice(-2) +
          "/" +
          date.getFullYear() +
          " " +
          ("0" + date.getHours()).slice(-2) +
          ":" +
          ("0" + date.getMinutes()).slice(-2) +
          ":" +
          ("0" + date.getSeconds()).slice(-2);

        setLastUpdated("Last updated: " + dateString);
      })
      .catch((err) => {
        console.error(err);
      });
  }, []);

  useEffect(() => {
    const topFive = highestCases.splice(1, 5);
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

  useEffect(() => {
    console.log("data: " + data);
  }, [data]);

  return (
    <Layout>
      <Header title="Dashboard" timestamp={lastUpdated} />

      {data &&
        data.map((datapoint, i) => {
          <p key={i}>{datapoint}</p>;
        })}

      {!data ? (
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
                  <StatsBar data={data[0]} />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <p>Global Stats By Region</p>
                <Row>
                  <Col className="gy-1">
                    {/* <Dropdown>
  <Dropdown.Toggle variant="success" id="dropdown-basic">
    Dropdown Button
  </Dropdown.Toggle>

  <Dropdown.Menu>
    <Dropdown.Item href="#/action-1">Action</Dropdown.Item>
    <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
    <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
  </Dropdown.Menu>
</Dropdown> */}
                  </Col>
                </Row>

                <Table headers={headers} data={data} nullValue={nullValue} />
              </div>
            </Col>
            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <p>Global Chart</p>
                <div className="d-flex justify-content-center">
                  <PieChart labels={[]} data={[]} colors={[]} />
                </div>
              </div>
            </Col>
          </Row>

          <Row>
            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <p>Cases</p>
                <div className="d-flex justify-content-center">
                  <BarChart
                    label={"Cases"}
                    categories={topFiveCases.categories}
                    values={topFiveCases.values}
                  />
                </div>
              </div>
            </Col>

            <Col className="gy-4">
              <div className="p-3 rounded bg-dark">
                <p>Deaths</p>
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
