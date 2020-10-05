import React from "react";
import Select from "react-select";
import { PropTypes } from "react";
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Form,
  Label
} from "reactstrap";

import { PictureUpload } from "components";
const selectOptions = [
  { value: "M", label: "Monday" },
  { value: "T", label: "Tuesday" },
  { value: "W", label: "Wednesday" },
  { value: "Th", label: "Thursday" },
  { value: "F", label: "Friday" },
  { value: "St", label: "Saturday" },
  { value: "Sn", label: "Sunday" }
];
class Step1 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      frequency: [],
      maxSeats: "",
      nameState: "",
      priceState: "",
      frequencyState: "",
      sessionsState: "",
      maxSeatsState: "",
      multipleSelect: [{ value: "M", label: "Monday" }],
      message: null
    };
    this.NameChange = this.NameChange.bind(this);
    this.sessionsChange = this.sessionsChange.bind(this);
  }

  NameChange(e) {
    this.setState({
      name: e.target.value
    });
    if (e.target.value.length > 2) {
      this.setState({
        nameState: " has-success"
      });
    } else {
      this.setState({
        nameState: " has-danger"
      });
    }
  }

  PriceChange(e) {
    this.setState({
      price: e.target.value
    });
    if (e.target.value > 0) {
      this.setState({
        priceState: " has-success"
      });
    } else {
      this.setState({
        priceState: " has-danger"
      });
    }
  }

  frequencyChange(e) {
    let ray = e.target.value;
    console.log(ray);
    ray.map((k, i) => {
      ray[k] = i[0];
    });
    console.log(ray);
    this.setState({
      frequency: e.target.value
    });
    if (e.target.value.length > 2) {
      this.setState({
        frequencyState: " has-success"
      });
    } else {
      this.setState({
        frequencyState: " has-danger"
      });
    }
  }

  sessionsChange(e) {
    this.setState({
      sessions: e.target.value
    });
    if (e.target.value > 0 && e.target.value <= 50) {
      this.setState({
        sessionsState: " has-success",
        message: null
      });
    } else {
      this.setState({
        sessionsState: " has-danger",
        message: "Sessions number must be between 1 and 50"
      });
    }
  }
  maxSeatsChange(e) {
    console.log("lol", e.target.value);
    this.setState({
      maxSeats: e.target.value
    });
    if (e.target.value > 0) {
      this.setState({
        maxSeatsState: " has-success"
      });
    } else {
      this.setState({
        maxSeatsState: " has-danger"
      });
    }
  }

  isValidated() {
    console.log(this.state);
    if (
      this.state.nameState !== " has-success" ||
      this.state.sessionsState !== " has-success"
    ) {
      this.setState({
        nameState: " has-danger",
        priceState: " has-danger",
        frequencyState: " has-danger",
        sessionsState: " has-danger"
      });
      return false;
    }
    return true;
  }

  render() {
    return (
      <div>
        <h5 className="info-text"> Create New Course </h5>
        <h3 size="50px" style={{ color: "red" }}>
          {this.state.message}
        </h3>
        <Row className="justify-content-center">
          <Col md={8}>
            <InputGroup
              size="md"
              className={
                (this.state.nameState ? this.state.nameState : "") +
                (this.state.nameFocus ? " input-group-focus" : "")
              }
            >
              <InputGroupAddon>
                <i className="now-ui-icons education_atom" />
              </InputGroupAddon>
              <Input
                defaultValue={this.state.name}
                type="text"
                placeholder="Course Name"
                name="name"
                onChange={e => this.NameChange(e)}
              />
            </InputGroup>
          </Col>

          <Col md={3} className="ml-auto mr-auto">
            <InputGroup
              className={
                this.state.sessionsState ? this.state.sessionsState : ""
              }
            >
              <InputGroupAddon>
                <i className="now-ui-icons ui-1_simple-add " />
              </InputGroupAddon>
              <Input
                defaultValue={this.state.sessions}
                type="number"
                placeholder="No. of Sessions"
                name="sessions"
                onChange={e => {
                  this.sessionsChange(e);
                }}
              />
            </InputGroup>
          </Col>

          <Col xs={7}>
            <Label>Frequency</Label>
            <InputGroup className="col-xs-6">
              <Select
                className="primary"
                multi={true}
                closeOnSelect={false}
                placeholder="Frequency"
                name="multipleSelect"
                value={this.state.multipleSelect}
                options={selectOptions}
                onChange={value => {
                  let ray = [];
                  value.map((k, i) => {
                    console.log(k);
                    ray[i] = k.value;
                  });
                  this.setState({ multipleSelect: value, frequency: ray });
                }}
              />
            </InputGroup>
          </Col>
          <Col xs={5}>
            <Label>Max Seats</Label>
            <InputGroup
              className={
                this.state.maxSeatsState ? this.state.maxSeatsState : ""
              }
            >
              <InputGroupAddon>
                <i className="now-ui-icons users_single-02 " />
              </InputGroupAddon>
              <Input
                value={this.state.maxSeats}
                type="number"
                placeholder="Max Seats"
                name="maxseats"
                onChange={e => this.maxSeatsChange(e)}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Step1;
