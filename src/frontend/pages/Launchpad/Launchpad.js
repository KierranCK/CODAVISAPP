import React from "react";
import visualise from "../../images/visualise-full-cropped-min.jpg";
import codavisLogo from "../../images/CODAVIS-logo-white.png";
import "./Launchpad.css";
import { Button, Row, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const Launchpad = () => {
  return (
    <div className="launchpad">
      <div className="launchpad-title-pane">
        <div className="codavis-logo-div">
          <img src={codavisLogo} alt="codavis-logo" className="codavis-logo" />
        </div>
        <h1>
          COVID DATA <br /> VISUALISATION
        </h1>
        <p>A powerful tool for the analysis and visualisation of COVID-19</p>

        <Row>
          <Col>
            <Link to="/dashboard">
              <Button variant="warning" size="sm">
                Launch
              </Button>
            </Link>
          </Col>
        </Row>
      </div>

      <div className="visualise-image">
        <img src={visualise} alt="visualise-image" />
      </div>
    </div>
  );
};

export default Launchpad;
