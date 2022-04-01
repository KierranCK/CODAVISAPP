import React, { useState, useEffect, useCallback, component } from "react";
import Nav from '../../components/Nav/Nav'
import './Report.css'
import Layout from '../../components/Layout/Layout'
import Table from '../../components/Table/Table'
import StatsBar from '../../components/StatsBar/StatsBar'
import Header from "../../components/Header/Header";
import config from '../../config.js'
import { Modal, Button, Dropdown, Row, Col, InputGroup, FormControl, ListGroup } from "react-bootstrap";
import axios from "axios";

const Dashboard = () => {
  const [countries, setCountries] = useState([]);
  const [query, setQuery] = useState("");
  const [modalShow, setModalShow] = useState(false);
  const [multiSelect, setMultiSelect] = useState(false);

  useEffect(() => {
  if (modalShow === true) {
    console.log("active")
    const options = {
      method: 'GET',
      url: config.URL + "/countries",
      headers: {
        'X-RapidAPI-Host': config.HOST,
        'X-RapidAPI-Key': config.API_KEY
      }
  }
        axios.request(options).then(res => {
      console.log(res.data);
      setCountries(res.data.response);
      console.log(res.data.response);
    }).catch(err => {
      console.error(err);
    });
  }
  }, [modalShow])

  const search = items => {
    if (!query) {
      return items;
    }
    return items.filter(item => {
      const country = item.toLowerCase();
      return country.includes(query);
    });
  };

  // const searchItems = searchValue => {
  //   setSearchInput(searchValue);
  //   APIData.filter(item => {
  //     return Object.values(item).join("").toLowerCase().includes(searchInput.toLowerCase)
  //   })
  // }

  // const filteredData = APIData.filter(item => {
  //   return Object.values(item).join("").toLowerCase().includes(searchInput.toLowerCase)
  // })

  useEffect(() => {
    console.log(countries)
    countries.map((country, i) => {
      // <ListGroup.Item as="li" key={i}>{country}</ListGroup.Item>
      console.log(country)
  })
  }, [countries])

  return (
      <Layout>
          <Header 
          title="Report"
          />

{countries.map((country, i) => {
              // <ListGroup.Item as="li" key={i}>{country}</ListGroup.Item>
              console.log({i});
              <p>{i}</p>
          })}

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
      <Modal.Header closeButton>
        <Modal.Title id="contained-modal-title-vcenter">
          Country Selection
        </Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Row>
          <Col>
        <h3>Country 1</h3>

        <InputGroup size="sm">
          <FormControl
      placeholder="Country"
      aria-label="Country"
      aria-describedby="basic-addon1"
      onChange={e => query(e.target.value)}
      // onKeyUp={e => {
      //   let query = e.target.value;
      //   let suggestions = [];
      //   suggestions = countries.filter(country => {
      //     console.log( country.toLocaleLowerCase().startsWith(query.toLocaleLowerCase));
      //   })
      // }}
    />
        </InputGroup>
        <div className="autocom-box">

        <ListGroup as="ul">
  <ListGroup.Item as="li">
    Cras justo odio
  </ListGroup.Item>
  <ListGroup.Item as="li">
    Cras justo odio
  </ListGroup.Item>

          {countries.map((country, i) => {
                         console.log(country);
                         <ListGroup as="ul">
              <ListGroup.Item as="li" key={i}>{country}</ListGroup.Item>
              </ListGroup>

          })}

</ListGroup>
        </div>

  </Col>
{multiSelect ?
  <Col>
        <h3>Country 2</h3>

        <Dropdown>
    <Dropdown.Toggle id="dropdown-button-dark-example1" variant="secondary">
      Select Country
    </Dropdown.Toggle>

    <Dropdown.Menu variant="dark">
      <Dropdown.Item href="#/action-1" active>
        Action
      </Dropdown.Item>
      <Dropdown.Item href="#/action-2">Another action</Dropdown.Item>
      <Dropdown.Item href="#/action-3">Something else</Dropdown.Item>
    </Dropdown.Menu>
  </Dropdown>
  </Col>
  :
  <Col>
          <h3>Country 2</h3>

  <div className="text-center">
  <Button variant="secondary" size="sm" onClick={() => setMultiSelect(true)}>
  <span class="material-icons">
add
</span>
  </Button>
  </div>

  </Col>
}
  </Row>

      </Modal.Body>
      <Modal.Footer>
        <Button variant="danger" size="sm" onClick={() => setModalShow(false)}>Close</Button>
      </Modal.Footer>
    </Modal>

      </Layout>


  )
}

export default Dashboard