import React from "react";
import Select from "react-select";
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
      price: null,
      frequency: [],
      sessions: null,
      nameState: "",
      priceState: "",
      frequencyState: "",
      sessionsState: "",
      multipleSelect: null
    };
    this.NameChange = this.NameChange.bind(this);
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
    if (e.target.value.length > 0) {
      this.setState({
        sessionsState: " has-success"
      });
    } else {
      this.setState({
        sessionsState: " has-danger"
      });
    }
  }

  isValidated() {
    if (
      this.state.nameState !== " has-success" ||
      this.state.priceState !== " has-success" ||
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
        <h5 className="info-text"> Create New Course</h5>
        <Row className="justify-content-center">
          <Col md={12}>
            <InputGroup
              size="lg"
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
            <InputGroup
              size="lg"
              className={this.state.priceState ? this.state.priceState : ""}
            >
              <InputGroupAddon>
                <i className="now-ui-icons shopping_credit-card" />
              </InputGroupAddon>
              <Input
                defaultValue={this.state.price}
                type="number"
                placeholder="Price"
                name="price"
                onChange={e => this.PriceChange(e)}
              />
            </InputGroup>
          </Col>

          <Col md={8}>
            <Select
              className="warning"
              multi={true}
              closeOnSelect={false}
              placeholder="Frequency"
              name="multipleSelect"
              value={this.state.multipleSelect}
              options={selectOptions}
              onChange={value => this.setState({ multipleSelect: value })}
            />
          </Col>
          <Col md={4}>
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
                onChange={e => this.sessionsChange(e)}
              />
            </InputGroup>
          </Col>
        </Row>
      </div>
    );
  }
}

export default Step1;
