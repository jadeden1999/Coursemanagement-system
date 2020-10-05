import React from "react";
import X from "../../variables/X.jsx";

import ReactTable from "react-table";
import {
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Row,
  Col,
  CardText,
  Modal,
  ModalHeader,
  ModalBody,
  ModalFooter,
  Nav,
  NavItem,
  NavLink,
  Badge
} from "reactstrap";
import Switch from "react-bootstrap-switch";
import { PanelHeader, FormInputs, Button } from "components";
import Axios from "axios";
var moment = require("moment");

class ViewCourses extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      data: [],
      studentdata: [],
      dataT: [],
      dataY: [],
      name: "",
      balance: "",
      smodal: false,
      sxmodal: false
    };

    this.togglemodal.bind(this);
    this.togglemodalx.bind(this);
    this.togglemodals.bind(this);
  }
  togglemodal() {
    this.setState({
      smodal: !this.state.smodal
    });
  }
  togglemodalx() {
    this.setState({
      sxmodal: !this.state.sxmodal
    });
  }
  togglemodals() {
    window.alert("fired");
    this.setState({
      smodal: !this.state.smodal
    });
  }

  render() {
    const list = this.state.data.map((e, i) => {
      let date = moment(this.state.data[i].date);
      let date2 = date.format("MM/DD/YYYY");

      return (
        <Col md={6}>
          <Card style={{ width: "55rem" }} className="text-center">
            <CardHeader>
              <h2>{this.state.data[i].name}</h2>
            </CardHeader>
            <CardBody>
              <CardTitle>Instructor: {this.state.data[i].instructor}</CardTitle>
              <CardText>
                {this.state.data[i].sessions} Sessions<pre></pre>
                {date2}
                <pre></pre>
                Price : {this.state.data[i].cost}
              </CardText>

              <Button
                onClick={() => {
                  this.setState({
                    name: e.name,
                    balance: e.cost,
                    smodal: !this.state.smodal
                  });
                }}
                color="info"
              >
                Take attendance
              </Button>
              <Button
                onClick={() => {
                  this.setState({
                    name: e.name,
                    balance: e.cost,
                    sxmodal: !this.state.sxmodal
                  });
                }}
                color="success"
              >
                Register Student/s
              </Button>

              <Button
                onClick={() => {
                  if (
                    window.confirm(
                      "Are you sure you want to delete this course?"
                    )
                  ) {
                    Axios.delete(
                      `/api/course/delete/${this.state.data[i]._id}`
                    ).then(window.location.reload());
                  } else {
                    this.setState({
                      XID: ""
                    });
                  }
                }}
                color="primary"
              >
                Delete
              </Button>
            </CardBody>
          </Card>
        </Col>
      );
    });
    return (
      <div>
        <Modal
          isOpen={this.state.sxmodal}
          toggle={this.togglemodalx.bind(this)}
          modalClassName="modal-primary"
          // contentClassName="modal-login"
        >
          <Card className="card-plain card-login">
            <ModalHeader
              className="justify-content-center"
              toggle={this.togglemodalx.bind(this)}
              tag="div"
            >
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
              <Button color="secondary" onClick={this.togglemodalx.bind(this)}>
                Close
              </Button>
            </ModalFooter>
          </Card>
        </Modal>

        <PanelHeader></PanelHeader>
        <Row>{list}</Row>

        <Modal
          isOpen={this.state.smodal}
          toggle={this.togglemodals.bind(this)}
          modalClassName="modal-primary"
          // contentClassName="modal-login"
        >
          <Card className="card-plain card-login">
            <ModalHeader
              className="justify-content-center"
              toggle={this.togglemodals.bind(this)}
              tag="div"
            >
              <div className="header header-primary text-center"></div>
            </ModalHeader>
            <ModalBody>
              <div className="card-content">
                <ReactTable
                  data={this.state.dataY}
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
    );
  }
}

export default ViewCourses;
