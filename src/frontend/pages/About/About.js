import React from "react";
import "./About.css";
import Layout from "../../components/Layout/Layout";
import Header from "../../components/Header/Header";

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
        <h3>The Purpose</h3>
        <p className="about-text">
          This application form the practical element of 
          The purpose of this application is to develop a web application for the
          analysis and visualisation of COVID-19 data to provide easy access to
          data interpretation, which can then be used to make more informed
          decisions on policy, helping to control the virus and protect all our
          interests. The CODAVIS web application provides real-time and historic
          COVID-19 data.
        </p>
      </div>
    </Layout>
  );
};

export default About;
