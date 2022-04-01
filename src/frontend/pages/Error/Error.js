import React from 'react'
import './Error.css'
import { Row, Col, Button } from 'react-bootstrap'
import { Link } from 'react-router-dom'

const Error = () => {
  return (
    <>
        <div className='launchpad-title-pane'>
        <h1>404</h1>
        <p>Oops! Page not Found</p>

        <Row>
          <Col>
          <Link to="/dashboard">
          <Button variant="warning" size="sm">Dashboard</Button>
          </Link>

          </Col>
        </Row>

        </div>
    </>
  )
}

export default Error