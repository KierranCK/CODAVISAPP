import React, { useState, useEffect } from "react";
import "./Report.css";
import Layout from "../../components/Layout/Layout";
import StatsBar from "../../components/StatsBar/StatsBar";
import Header from "../../components/Header/Header";
import config from "../../config.js";
import {
  Modal,
  Button,
  Dropdown,
  Row,
  Col,
  InputGroup,
  FormControl,
  ListGroup,
  Form,
} from "react-bootstrap";
import axios from "axios";
import { DatePicker } from "react-datepicker";

const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);
  const [country1, setCountry1] = useState("");
  const [country2, setCountry2] = useState("");
  const [date, setDate] = useState(new Date());
  const [selected, setSelected] = useState("");
  const [inputValue, setInputValue] = useState("");

  useEffect(() => {
    if (modalShow === true) {
      const options = {
        method: "GET",
        url: config.URL + "/countries",
        headers: {
          "X-RapidAPI-Host": config.HOST,
          "X-RapidAPI-Key": config.API_KEY,
        },
      };
      axios
        .request(options)
        .then((res) => {
          setCountries(res.data.response);
        })
        .catch((err) => {
          console.error(err);
        });
    }
  }, [modalShow]);

  const viewReports = (e) => {
    e.preventDefault();
    modalShow(false);
    const options = {
      method: "GET",
      url: config.URL + "/countries",
      headers: {
        "X-RapidAPI-Host": config.HOST,
        "X-RapidAPI-Key": config.API_KEY,
      },
    };
    axios
      .request(options)
      .then((res) => {
        setCountries(res.data.response);
      })
      .catch((err) => {
        console.error(err);
      });
  };

  //check whether user has made valid selections
  const validSelections = () => {
    if (!multiSelect) {
      if (country1 === "" || country1 === "--select country--") return true;
      return false;
    }
    if (
      country1 === "" ||
      country1 === "--select country--" ||
      country2 === "" ||
      country2 === "--select country--"
    )
      return true;
    return false;
  };

  return (
    <Layout>
      <Header title="Report" />

      <Button variant="warning" onClick={() => setModalShow(true)}>
        Select Country
      </Button>

      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
        id="modal"
      >
        {/* <Modal.Header closeButton> */}
        <Modal.Header closeButton>
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
                    <option selected>--select country--</option>
                    {countries.map((country, i) => (
                      <option key={i}>{country}</option>
                    ))}
                  </Form.Select>
                  {/* {validSelections && <p>Please select a country</p>} */}
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
                      <option selected>--select country--</option>
                      {countries.map((country, i) => (
                        <option key={i}>{country}</option>
                      ))}
                    </Form.Select>
                  </Form.Group>
                </Col>
              )}

              <Col>
                <h3>Date</h3>
                <InputGroup size="sm" className="input-group-sm">
                  <FormControl
                    aria-label="Small"
                    aria-describedby="inputGroup-sizing-sm"
                    value={date}
                  />
                  <Button
                    variant="warning"
                    id="button-addon2"
                    className="input-btn"
                  >
                    <span class="material-icons calendar-icon">
                      calendar_today
                    </span>
                  </Button>
                </InputGroup>
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
                    disabled={validSelections()}
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
            }}
          >
            Close
          </Button>
        </Modal.Footer>
      </Modal>
    </Layout>
  );
};

export default Dashboard;
