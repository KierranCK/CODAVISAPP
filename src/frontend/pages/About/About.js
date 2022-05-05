import React from "react";
import "./About.css";
import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";
import { Button } from "react-bootstrap";

const About = () => {
  return (
    <Layout>
      <Header title="About" />

      <div>
        <p className="about-text">
          The COVID-19 pandemic has greatly affected all our lives. <br />
          To effectively manage the pandemic, it is critical to understand the
          current situation and the data which represents it.
        </p>
        <h3>The Purpose of CODAVIS</h3>
        <p className="about-text">
          This application forms the practical element of my (Kierran Kelly,
          U1956244) Analysis and Visualisation of COVID-19 Data snyoptic project
          in part fulfilment of the degree of BSc (Hons) in Digital and
          Technology Solutions. <br /> <br />
          The purpose of the CODAVIS is to provide a means for the analysis and
          visualisation of real-time and historic COVID-19 data to provide easy
          access to data interpretation, which can then be used to make more
          informed decisions on policy, helping to control the virus and protect
          all our interests. <br /> <br />
          To view the HitHub repositiory for this project, click the button
          below.
        </p>
        <Button
          variant="warning"
          size="sm"
          href="https://github.com/KierranCK/CODAVISAPP/"
          target="_blank"
        >
          GitHub
        </Button>
      </div>
    </Layout>
  );
};

export default About;
