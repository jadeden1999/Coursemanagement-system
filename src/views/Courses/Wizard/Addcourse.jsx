import React, { Component } from "react";
import { Col } from "reactstrap";
// react plugin used to create a form with multiple steps
import ReactWizard from "./Gandalf";

import { PanelHeader } from "components";

import Step1 from "./Step1.jsx";
import Step2 from "./Step2.jsx";

import Axios from "axios";

class Addcourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      lol: true
    };
    this.handleFinal.bind(this);
    this.handlesession.bind(this);
  }
  handleFinal(xstates) {
    let details = xstates.Details;
    let sessions = xstates.Sessions;
    console.log(details);
    console.log(sessions);
    let date = new Date(Date.now());
    let final = {
      name: details.name,
      date: date,
      frequency: details.frequency,
      instructor: sessions.tdata[0].teacher,
      cost: sessions.tdata[0].price,
      maxseats: details.maxSeats,

      sessions: sessions.tdata
    };
    console.log("final", final);
    Axios.post("/api/course/new", final).then(r => alert(r));
  }
  handlesession(state) {
    console.log("state min lwalad", state);
  }
  render() {
    return (
      <div>
        <div className="content">
          <PanelHeader size="sm" />
          <Col xs={12} md={10} className="mr-auto ml-auto">
            <ReactWizard
              progressbar={false}
              color="orange"
              steps={[
                {
                  stepName: "Details",
                  component: Step1
                },
                {
                  stepName: "Sessions",
                  component: Step2
                }
              ]}
              navSteps
              validate
              title="Add a new Course Structure"
              headerTextCenter
              finishButtonClick={this.handleFinal}
            />
          </Col>
        </div>
      </div>
    );
  }
}

export default Addcourse;
