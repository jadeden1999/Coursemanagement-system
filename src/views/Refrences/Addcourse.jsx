import React from "react";
import X from "../../variables/X.jsx";
import Select from "react-select";
import {
  Form,
  FormGroup,
  Label,
  Input,
  FormText,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  CardFooter,
  Row,
  Col
} from "reactstrap";

import { PanelHeader, FormInputs, Button } from "components";
import Axios from "axios";
var selectOptions = [
  { value: "M", label: "Monday" },
  { value: "T", label: "Teusday" },
  { value: "W", label: "Wednesday" },
  { value: "Th", label: "Thursday" },
  { value: "F", label: "Friday" },
  { value: "St", label: "Saturday" },
  { value: "Sn", label: "Sunday" }
];
class AddCourse extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      multipleSelect: null
    };
  }
  onSubmitForm = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {};
    const date = Date.now();
    const headers = {
      name: "jeff",
      date: date
    };
    formData.forEach((value, property) => (body[property] = value));
    body["date"] = Date.now();
    let coursay = [];
    this.state.multipleSelect.map((k, p) => {
      coursay[p] = k.value;
      console.log(p);
    });
    body["freq"] = coursay;
    delete body.multipleSelect;
    console.log("bodyzabre", body);
    // Axios.post(`${X.ip}/api/course/new`, body, {
    //   headers: {
    //     auth: "jeff",
    //     authOid: "",
    //     date: date
    //   }
    // })
    //   .then(r => {
    //     let u = JSON.stringify(r.data);

    //     window.alert(u);
    //   })
    //   .catch(err => {
    //     let p = JSON.stringify(err);
    //     window.alert(p);
    //   });
  };
  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={8} xs={12}>
              <Card>
                <CardHeader>
                  <h5 className="title">Create Course Structure</h5>
                </CardHeader>
                <CardBody>
                  <form onSubmit={e => this.onSubmitForm(e)}>
                    <FormInputs
                      ncols={["col-md-6 pr-1", "col-md-6 pl-1"]}
                      proprieties={[
                        {
                          label: "Course Name",
                          inputProps: {
                            type: "text",
                            name: "name",
                            defaultValue: ""
                          }
                        },

                        {
                          label: "Price",

                          inputProps: {
                            type: "number",
                            placeholder: "USD",
                            defaultValue: "",
                            name: "cost"
                          }
                        }
                      ]}
                    />

                    <Col md={8} pl={1}>
                      <Label>Frequency</Label>
                      <Select
                        className="warning"
                        multi={true}
                        closeOnSelect={false}
                        placeholder="Multiple Select"
                        name="multipleSelect"
                        value={this.state.multipleSelect}
                        options={selectOptions}
                        onChange={value =>
                          this.setState({ multipleSelect: value })
                        }
                      />
                    </Col>
                    <FormInputs
                      ncols={["col-md-2"]}
                      proprieties={[
                        {
                          label: "Sessions",
                          inputProps: {
                            name: "sessions",
                            type: "number",
                            placeholder: "",
                            defaultValue: ""
                          }
                        }
                      ]}
                    />
                    <Button color="info">ADD</Button>
                  </form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default AddCourse;
