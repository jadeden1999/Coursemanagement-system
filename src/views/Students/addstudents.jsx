import React from "react";
import X from "../../variables/X.jsx";
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

class Addstudents extends React.Component {
  constructor(props) {
    super(props);
  }
  onSubmitForm = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => (body[property] = value));

    Axios.post(`${X.ip}/api/students/new`, body)
      .then(r => {
        let u = JSON.stringify(r.data);

        window.alert(u);
      })
      .catch(err => {
        let p = JSON.stringify(err);
        window.alert(p);
      });
  };
  render() {
    return (
      <div>
        <PanelHeader size="sm" />
        <div className="content">
          <Row>
            <Col md={12} xs={12}>
              <Card>
                <CardHeader>
                  <CardTitle>New Student</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={e => this.onSubmitForm(e)}
                    className="form-horizontal"
                  >
                    <Row>
                      <Label sm={2}>Student Name</Label>
                      <Col xs={12} sm={10}>
                        <FormGroup>
                          <Input name="name" type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={2}>Student Age</Label>
                      <Col xs={12} sm={10}>
                        <FormGroup>
                          <Input name="age" type="text" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={2}>Date of Registration</Label>
                      <Col xs={12} sm={10}>
                        <FormGroup>
                          <Input name="dateofreg" type="date" />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={2}>Type</Label>
                      <Col xs={12} sm={10}>
                        <FormGroup>
                          <Input
                            name="type"
                            type="text"
                            placeholder="placeholder"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label sm={2}>Notes</Label>
                      <Col xs={12} sm={10}>
                        <FormGroup>
                          <Input
                            name="note"
                            type="text"
                            placeholder="placeholder"
                          />
                        </FormGroup>
                      </Col>
                    </Row>
                    <Row>
                      <Label md={3} />
                      <Col xs={12} md={9}>
                        <Button color="primary">Create</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default Addstudents;
