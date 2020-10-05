import React, { Component } from "react";
import { Col } from "reactstrap";
// react plugin used to create a form with multiple steps
import ReactWizard from "./Gandalf";

import { PanelHeader } from "components";
import { SemipolarLoading } from "react-loadingg";

import Axios from "axios";

class Addcourse extends Component {
  constructor(props) {
    super(props);
    this.state = {
      data: {},
      cdata: true
    };
  }
  componentDidMount() {
    Axios.get("/api/courses/");
  }

  render() {
    return (
      <div>
        <div className="content">
          <PanelHeader size="sm" />
        </div>
      </div>
    );
  }
}

export default Addcourse;
