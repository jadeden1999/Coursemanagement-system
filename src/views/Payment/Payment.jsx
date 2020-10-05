import React from "react";
import X from "../../variables/X.jsx";
import Select from "react-select";
import ReactTable from "react-table";
import {
  Form,
  FormGroup,
  Label,
  Input,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter
} from "reactstrap";

import { PanelHeader, FormInputs, Button } from "components";
import Axios from "axios";

class Payment extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      studentdata: {},
      student: {},
      smodal: false,
      Oid: ""
    };
  }
  componentDidMount() {
    Axios.get("/api/students/get").then(res => {
      let arr = [];
      console.log(res);

      res.data.map((e, i) => {
        arr.push({
          name: e[0],
          Oid: e[6]
        });

        // arr.push(e[i].name);
      });

      console.log("array", arr);
      this.setState({
        studentdata: arr
      });
      this.setState({
        dataT: this.state.studentdata.map((prop, key) => {
          return {
            id: key,
            name: prop.name,

            Oid: prop.Oid,
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a like kind of action */}
                {/* use this button to remove the data row */}
                <Button
                  onClick={() => {
                    let headers = sessionStorage.getItem("lol");
                    let body = {
                      name: this.state.name,
                      balance: this.state.balance
                    };

                    Axios.get(
                      `/api/students/getone/${prop.Oid}`,
                      body,
                      headers
                    ).then(res => {
                      this.setState({
                        student: res.data
                      });
                      console.log("arrdwadqway", this.state.student);
                      this.setState({ smodal: false });
                    });
                  }}
                  color="success"
                  size="sm"
                  round
                  icon
                ></Button>{" "}
              </div>
            )
          };
        })
      });
      console.log("dataY", this.state.studentdata);
    });
  }
  onSubmitForm = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {};
    const date = Date.now();
    const headers = {
      authid: "jeff",
      date: date
    };
    formData.forEach((value, property) => (body[property] = value));

    console.log("SEXXXX", body);
    Axios.post(`${X.ip}/api/finance/newhistory`, body, {
      headers: {
        auth: "jeff",
        authid: "5e57e17c1c43483420ec954b",
        date: date,
        oid: this.state.student.Oid
      }
    })
      .then(r => {
        let u = JSON.stringify(r.data);

        window.alert(u);
        window.location.reload();
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
            <Col md={6} xs={6}>
              <Button
                onClick={() => {
                  this.setState({
                    smodal: true
                  });
                }}
                color="info"
              >
                Select Student
              </Button>
            </Col>
            <Col md={6} xs={6}>
              <Card>
                <CardHeader>
                  <CardTitle>Payment</CardTitle>
                </CardHeader>
                <CardBody>
                  <Form
                    onSubmit={e => this.onSubmitForm(e)}
                    className="form-horizontal"
                  >
                    <Row>
                      <Label sm={2}>Student Name</Label>

                      <h1> {this.state.student.name}</h1>
                    </Row>

                    <Row>
                      <Label sm={2}>Balance</Label>

                      <h2>{this.state.student.balance} $</h2>
                    </Row>
                    <Row>
                      <Label sm={2}>Payment</Label>
                      <Col xs={12} sm={10}>
                        <FormGroup>
                          <Input
                            name="payment"
                            type="number"
                            placeholder="placeholder"
                          />
                        </FormGroup>
                      </Col>
                    </Row>

                    <Row>
                      <Label md={3} />
                      <Col xs={12} md={9}>
                        <Button color="primary">Done</Button>
                      </Col>
                    </Row>
                  </Form>
                </CardBody>
              </Card>
            </Col>
          </Row>

          <Modal
            isOpen={this.state.smodal}
            modalClassName="modal-primary"
            // contentClassName="modal-login"
          >
            <Card className="card-plain card-login">
              <ModalHeader className="justify-content-center" tag="div">
                <div className="header header-primary text-center"></div>
              </ModalHeader>
              <ModalBody>
                <div className="card-content">
                  <ReactTable
                    data={this.state.dataT}
                    filterable
                    columns={[
                      {
                        Header: "Name",
                        accessor: "name"
                      },

                      {
                        Header: "Actions",
                        accessor: "actions",
                        sortable: false,
                        filterable: false
                      }
                    ]}
                    defaultPageSize={10}
                    showPaginationTop
                    showPaginationBottom={false}
                    className="-striped -highlight"
                  />
                </div>
              </ModalBody>
              <ModalFooter>
                <Button
                  color="secondary"
                  onClick={() => {
                    this.setState({
                      smodal: !this.state.smodal
                    });
                  }}
                >
                  Close
                </Button>
              </ModalFooter>
            </Card>
          </Modal>
        </div>
      </div>
    );
  }
}

export default Payment;
