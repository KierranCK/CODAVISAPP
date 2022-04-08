import React, { useState, useEffect, forwardRef } from "react";
import "./Report.css";
import Layout from "../../components/Layout/Layout";
import StatsBar from "../../components/StatsBar/StatsBar";
import Header from "../../components/Header/Header";
import Loading from "../../components/Loading/Loading";
import config from "../../config.js";
import {
  Modal,
  Button,
  Row,
  Col,
  InputGroup,
  FormControl,
  Form,
} from "react-bootstrap";
import axios from "axios";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import PieChart from "../../components/PieChart/PieChart";
import BarChart from "../../components/BarChart/BarChart";
import { addCommas, formatDateTime } from "../../common/common";
const Report = () => {
  const [countries, setCountries] = useState([]);
  const [loading, setLoading] = useState(false);
  const [modalShow, setModalShow] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [country1Data, setCountry1Data] = useState(null);
  const [country2Data, setCountry2Data] = useState(null);
  const [date, setDate] = useState(new Date());
  const [lastUpdated, setLastUpdated] = useState(null);
  const [countryData, setcountryData] = useState([]);

  //request list of countries from API
  useEffect(() => {
    if (modalShow === true) {
      axios
        .request({
          method: "GET",
          url: config.BACKEND + "/countries",
        })
        .then((res) => setCountries(res.data))
        .catch((err) => {
          console.log(err);
        });
    }
  }, [modalShow]);

  //function to format date as yyyy-mm-dd
  const formatDate = (date) => {
    const dateString =
      date.getFullYear() +
      "-" +
      ("0" + (date.getMonth() + 1)).slice(-2) +
      "-" +
      ("0" + date.getDate()).slice(-2);
    return dateString;
  };

  //function to retrieve data for reports
  const viewReports = (e) => {
    e.preventDefault();
    setModalShow(false);
    setLoading(true);
    let params;
    !multiSelect
      ? (params = {
          countries: [{ country: country1, day: formatDate(date) }],
        })
      : (params = {
          countries: [
            { country: country1, day: formatDate(date) },
            { country: country2, day: formatDate(date) },
          ],
        });

    axios
      .request({
        method: "GET",
        url: config.BACKEND + "/history",
        params: params,
      })
      .then((res) => {
        console.log("Country 1: " + res.data);
        setCountry1Data(res.data[0]);
        multiSelect && setCountry2Data(res.data[1]);
        setLastUpdated("Last updated: " + formatDateTime(new Date()));
        setMultiSelect(false);
        setLoading(false);
      })
      .catch((err) => {
        console.error(err);
        setMultiSelect(false);
        setLoading(false);
      });
  };

  //check whether user has made valid selections
  const validSelections = () => {
    if (!multiSelect) {
      if (country1 === "" || country1 === "--select country--") return false;
      return true;
    }

    if (
      country1 === "" ||
      country1 === "--select country--" ||
      country2 === "" ||
      country2 === "--select country--" ||
      country1 === country2
    )
      return false;

    return true;
  };

  const DateInput = forwardRef(({ value, onClick }, ref) => (
    <InputGroup size="sm" className="input-group-sm">
      <FormControl
        aria-label="Small"
        aria-describedby="inputGroup-sizing-sm"
        value={value}
        readOnly
      />
      <Button
        variant="warning"
        id="button-addon2"
        className="input-btn"
        onClick={onClick}
        ref={ref}
      >
        <span className="material-icons calendar-icon">calendar_today</span>
      </Button>
    </InputGroup>
  ));

  useEffect(() => {
    console.log(multiSelect);
  }, [multiSelect]);
  useEffect(() => {
    console.log(country1);
  }, [country1]);

  useEffect(() => {
    console.log(date);
  }, [date]);

  useEffect(() => {
    console.log(country1Data);
    console.log(multiSelect);
    if (country1Data !== null) setcountryData([country1Data]);
  }, [country1Data]);

  useEffect(() => {
    console.log(country2Data);
    if (country1Data !== null && country2Data !== null)
      setcountryData([country1Data, country2Data]);
  }, [country2Data]);

  useEffect(() => {
    console.log(countryData);
  }, [countryData]);

  return (
    <Layout>
      <Row>
        <Col>
          <Header title="Report" timestamp={lastUpdated} />
        </Col>
        <Col className="col-md-auto">
          <Button
            variant="warning"
            size="sm"
            onClick={() => setModalShow(true)}
          >
            Select Country
          </Button>
        </Col>
      </Row>
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        id="modal"
      >
        {/* <Modal.Header closeButton> */}
        <Modal.Header>
          <Modal.Title id="contained-modal-title-vcenter">
            Country Selection
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form onSubmit={viewReports}>
            <Row>
              <Col>
                <h3>Country 1</h3>
                <Form.Group size="sm" className="mb-3">
                  <Form.Select
                    className="form-select-sm"
                    onChange={(e) => setCountry1(e.target.value)}
                  >
                    <option>--select country--</option>
                    {countries.map((country, i) => (
                      <option key={i}>{country}</option>
                    ))}
                  </Form.Select>
                  {country1 === "--select country--" && (
                    <p className="warning-text">Please select a country</p>
                  )}
                </Form.Group>
              </Col>
              {multiSelect && (
                <Col>
                  <h3>Country 2</h3>
                  <Form.Group className="mb-3">
                    <Form.Select
                      className="form-select-sm"
                      onChange={(e) => setCountry2(e.target.value)}
                    >
                      <option>--select country--</option>
                      {countries.map((country, i) => (
                        <option key={i}>{country}</option>
                      ))}
                    </Form.Select>
                    {country2 === "--select country--" && (
                      <p className="warning-text">Please select a country</p>
                    )}
                    {country1 === country2 &&
                      country1 !== "" &&
                      country1 !== "--select country--" && (
                        <p className="warning-text">
                          Country 1 and Country 2 cannot be the same
                        </p>
                      )}
                  </Form.Group>
                </Col>
              )}
              <Col>
                <h3>Date</h3>
                <DatePicker
                  selected={date}
                  onChange={(date) => setDate(date)}
                  customInput={<DateInput />}
                  dateFormat="dd/MM/yyyy"
                  maxDate={new Date()}
                />
              </Col>
              <Row>
                <Form.Group className="mb-3" controlId="formBasicCheckbox">
                  <Form.Check
                    type="checkbox"
                    label="Multi select"
                    onChange={() => {
                      setMultiSelect(!multiSelect);
                    }}
                  />
                </Form.Group>
              </Row>
              <Row>
                <Col>
                  <Button
                    type="submit"
                    variant="warning"
                    size="sm"
                    disabled={!validSelections()}
                  >
                    {"View Report" + (multiSelect ? "s" : "")}
                  </Button>
                </Col>
              </Row>
            </Row>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button
            variant="danger"
            size="sm"
            onClick={() => {
              setModalShow(false);
              setMultiSelect(false);
              setCountry1("");
              setCountry2("");
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
      {loading && <Loading />}
      <Row>
        {!loading &&
          countryData.map((country, i) => (
            <Col key={i} md={6}>
              <div className="p-3 rounded bg-dark">
                <Row className="country-header">
                  <Col md="auto">
                    <h2>{country.country.toUpperCase()}</h2>
                  </Col>
                  <Col className="px-0">
                    <p className="data-label">
                      {"Continent: " + country.continent}
                    </p>
                    <p className="data-label">
                      {"Population: " + addCommas(country.population)}
                    </p>
                  </Col>
                </Row>
                <Row className="py-0 my-0">
                  <p>As of {country.day}</p>
                </Row>
                <Row>
                  <Col className="px-0 py-3">
                    <StatsBar
                      data={{
                        cases: {
                          critical: country.cases.critical,
                          recovered: country.cases.recovered,
                          active: country.cases.active,
                          total: country.cases.total,
                        },
                        deaths: {
                          total: country.deaths.total,
                        },
                        comparison: {
                          active: country.difference.active,
                          critical: country.difference.critical,
                          recovered: country.difference.recovered,
                          totalCases: country.difference.totalCases,
                          totalDeaths: country.difference.totalDeaths,
                        },
                        population: country.population,
                      }}
                      horizontal={false}
                    />
                  </Col>
                  <Col className="px-0 py-4">
                    <Row>
                      <Col>
                        <PieChart
                          labels={["Active", "Critical"]}
                          data={countryData[i]}
                          cutout={55}
                        />
                      </Col>
                    </Row>
                    <Row>
                      <Col className="py-4 px-3">
                        <BarChart
                          label=""
                          categories={["Active", "Critical", "Recovered"]}
                          values={[
                            countryData[i].cases.active,
                            countryData[i].cases.critical,
                            countryData[i].cases.recovered,
                          ]}
                        />
                      </Col>
                    </Row>
                  </Col>
                </Row>
              </div>
            </Col>
          ))}
      </Row>
    </Layout>
  );
};
export default Report;
