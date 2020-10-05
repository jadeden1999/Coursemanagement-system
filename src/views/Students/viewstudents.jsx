import React, { Component } from "react";
// react component for creating dynamic tables
import ReactTable from "react-table";

import {
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Card,
  Input,
  InputGroup,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  Label,
  Badge
} from "reactstrap";
import Switch from "react-bootstrap-switch";
import X from "../../variables/X.jsx";
import { PanelHeader } from "components";
import Axios from "axios";
import { Redirect } from "react-router-dom";
import Button from "components/CustomButton/CustomButton.jsx";

class ReactTables extends Component {
  constructor(props) {
    super(props);
    this.state = {
      smodal: false,
      dataOne: {}
    };
    this.togglemodal.bind(this);
  }
  togglemodal() {
    this.setState({
      smodal: !this.state.smodal,
      status: this.state.dataOne.status
    });
  }
  onSubmit = e => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const body = {};
    formData.forEach((value, property) => (body[property] = value));
    body["status"] = this.state.status;

    Axios.put(`/api/students/edit/${this.state.id}`, body)
      .then(r => console.log(r), window.location.reload())
      .catch(e => console.log(e));
  };
  componentDidMount() {
    Axios.get(`${X.ip}/api/students/get`).then(res => {
      const dataTable = res.data;
      this.setState({
        data: dataTable.map((prop, key) => {
          console.log(prop);
          return {
            id: key,
            name: prop[0],
            dateofreg: prop[1],
            type: prop[2],
            paid: prop[3],
            course: prop[4],
            status: prop[5],
            Oid: prop[6],
            actions: (
              // we've added some custom button actions
              <div className="actions-right">
                {/* use this button to add a like kind of action */}
                <Button
                  onClick={() => {
                    let obj = this.state.data.find(o => o.id === key);
                    alert(
                      "You've clicked LIKE button on \n{ \nName: " +
                        obj.name +
                        ", \ntype: " +
                        obj.type +
                        ", \noffice: " +
                        obj.dateofreg +
                        ", \nage: " +
                        obj.paid +
                        "\n}."
                    );
                  }}
                  color="info"
                  size="sm"
                  round
                  icon
                >
                  <i className="fa fa-heart" />
                </Button>{" "}
                {/* use this button to add a edit kind of action */}
                <Button
                  onClick={() => {
                    let obj = this.state.data.find(o => o.id === key);
                    this.setState({ id: obj.Oid });
                    Axios.get(`/api/students/getone/${obj.Oid}`).then(res => {
                      let y = res.data;
                      this.setState({
                        dataOne: {
                          name: y.name,
                          dateofreg: y.dateofreg,
                          paid: y.paid,
                          certified: y.certified,
                          attendance: y.attendance,
                          type: y.type,
                          note: y.note,
                          course: y.course,
                          status: y.status
                        }
                      });

                      console.log("date", this.state.dataOne.dateofreg);
                      this.togglemodal();
                    });

                    // alert(
                    //   "You've clicked EDIT button on \n{ \nName: " +
                    //     obj.name +
                    //     ", \nposition: " +
                    //     obj.position +
                    //     ", \noffice: " +
                    //     obj.office +
                    //     ", \nage: " +
                    //     obj.age +
                    //     "\n}."
                    // );
                  }}
                  color="warning"
                  size="sm"
                  round
                  icon
                >
                  <i className="fa fa-edit" />
                </Button>{" "}
                {/* use this button to remove the data row */}
                <Button
                  onClick={() => {
                    var data = this.state.data;
                    data.find((o, i) => {
                      if (o.id === key) {
                        // here you should add some custom code so you can delete the data
                        // from this component and from your server as well
                        data.splice(i, 1);
                        console.log(data);
                        return true;
                      }
                      return false;
                    });
                    this.setState({ data: data });
                  }}
                  color="danger"
                  size="sm"
                  round
                  icon
                >
                  <i className="fa fa-times" />
                </Button>{" "}
              </div>
            )
          };
        })
      });
    });
  }
  render() {
    return (
      <div>
        <Modal
          isOpen={this.state.smodal}
          toggle={this.togglemodal.bind(this)}
          modalClassName="modal-primary"
          // contentClassName="modal-login"
        >
          <Card className="card-plain card-login">
            <ModalHeader
              className="justify-content-center"
              toggle={this.togglemodal.bind(this)}
              tag="div"
            >
              <div className="header header-primary text-center"></div>
            </ModalHeader>
            <ModalBody>
              <form onSubmit={e => this.onSubmit(e)} className="form">
                <div className="card-content">
                  <Label>Name</Label>
                  <InputGroup size="lg" className="no-border">
                    <Input
                      name="name"
                      type="text"
                      defaultValue={this.state.dataOne.name}
                    />
                  </InputGroup>
                  <Label>DOR</Label>
                  <InputGroup size="lg" className="no-border">
                    <Input
                      name="dateofreg"
                      type="date"
                      defaultValue={this.state.dataOne.dateofreg}
                    />
                  </InputGroup>
                  <Label>Status </Label>
                  <InputGroup size="lg" className="no-border">
                    <Switch
                      name="status"
                      onText="Yes"
                      offText="No"
                      defaultValue={this.state.status}
                      onChange={() => {
                        this.setState({ status: !this.state.status });
                      }}
                    />
                  </InputGroup>
                  <Label>Notes </Label>
                  <InputGroup size="lg" className="no-border">
                    <Input
                      name="note"
                      type="text"
                      defaultValue={this.state.dataOne.note}
                    />
                  </InputGroup>
                </div>
                <Button color="primary">Save changes</Button>
              </form>
            </ModalBody>
            <ModalFooter>
              <Button color="secondary" onClick={this.togglemodal.bind(this)}>
                Close
              </Button>
            </ModalFooter>
          </Card>
        </Modal>

        <PanelHeader
          content={
            <div className="header text-center">
              <h2 className="title">React Table</h2>
              <p className="category">
                A powerful react plugin handcrafted by our friends from{" "}
                <a
                  href="https://react-table.js.org/#/story/readme"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  react-table
                </a>
                . It is a highly flexible tool, based upon the foundations of
                progressive enhancement on which you can add advanced
                interaction controls. Please check out their{" "}
                <a
                  href="https://react-table.js.org/#/story/readme"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  full documentation.
                </a>
              </p>
            </div>
          }
        />
        <div className="content">
          <Row>
            <Col xs={12} md={12}>
              <Card>
                <CardHeader>
                  <CardTitle>React Table</CardTitle>
                </CardHeader>
                <CardBody>
                  <ReactTable
                    data={this.state.data}
                    filterable
                    columns={[
                      {
                        Header: "Name",
                        accessor: "name"
                      },
                      {
                        Header: "Date of registration",
                        accessor: "dateofreg"
                      },
                      {
                        Header: "type",
                        accessor: "type"
                      },
                      {
                        Header: "Course",
                        accessor: "course"
                      },

                      {
                        id: "paid",
                        Header: "paid",
                        accessor: d => {
                          return d.paid ? "Y" : "N";
                        }
                      },
                      {
                        id: "status",
                        Header: "Status",
                        accessor: d => {
                          return d.status ? (
                            <Badge color="success">Active</Badge>
                          ) : (
                            <Badge color="danger">Inactive</Badge>
                          );
                        }
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
                </CardBody>
              </Card>
            </Col>
          </Row>
        </div>
      </div>
    );
  }
}

export default ReactTables;
