import React from "react";
import {
  Row,
  Col,
  InputGroup,
  InputGroupAddon,
  Input,
  Form,
  Label,
  Card,
  CardBody,
  CardHeader,
  CardTitle,
  Tooltip,
  CardFooter,
  FormGroup,
  Popover,
  PopoverBody
} from "reactstrap";

import Select from "react-select";
import { IconCheckbox, Button } from "components";
import { PanelHeader } from "components";
import Axios from "axios";

class Step2 extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      length: null,
      sessions: 0,
      price: 0,
      regprice: 0,
      oprice: 0,
      outprice: 0,
      rayprice: [],
      ready: true,
      teachers: [],
      tdata: [],
      key: 0,
      singleselect: [],
      teacher: "",
      cut: [],
      time: [],
      sumState: " has-success",
      errorDivisible: "",
      toolTipisOpenTeacher: [],
      toolTipisOpenTime: [],
      targetTime: [],
      targetTeacher: [],
      selectedId: []
    };
    this.Pricecheck.bind(this);
    this.onRegPriceChange.bind(this);
  }
  componentDidMount() {
    Axios.get("/api/instructor/get/1").then(res => {
      let l = res.data;
      let d = [];
      l.map((p, k) => {
        d[k] = { value: p, label: p };
      });

      this.setState({ teachers: d });
      console.log("teacherstate", this.state);
    });
  }
  isValidated() {
    if (this.state.sumState != " has-success") {
      this.setState({
        sumState: " has-danger"
      });
      return false;
    }
    return true;
  }

  onChange(e) {
    const target = e.target;
    const id = target.id;
    const name = target.name;
    let data = this.state.tdata;
    data[id] = { ...data[id], [name]: e.target.value };

    this.setState({ tdata: data });
  }
  onPriceChange(e) {
    const target = e.target;

    const value = parseInt(target.value);

    this.setState({ price: value, oprice: value - this.state.regprice });
  }
  onRegPriceChange(e) {
    const target = e.target;

    const value = parseInt(target.value);

    this.setState({ regprice: value, oprice: this.state.price - value });
    // this.Pricecheck(value);
  }
  Calculate() {
    let x;
    var i;
    var y;
    var z;
    let rayz = [];
    var rayx = [];
    let v = this.state.price;
    let r = this.state.regprice;

    let u = v - r;
    if (u % this.props.wizardData.Details.sessions == 0) {
      let rays = this.state.tdata;
      x = u / this.props.wizardData.Details.sessions;
      for (i = 0; i < this.props.wizardData.Details.sessions; i++) {
        rayz[i] = x;
        rays[i] = { ...rays[i], price: x };
      }
      this.setState({
        rayprice: rayz,
        errorDivisible: "",
        tdata: rays
      });
    } else {
      x = u / this.props.wizardData.Details.sessions;
      y = Math.ceil(x);
      let rays = this.state.tdata;
      z = u - y * this.props.wizardData.Details.sessions;

      for (i = 0; i < this.props.wizardData.Details.sessions; i++) {
        if (i - this.props.wizardData.Details.sessions == -1) {
          rayz[i] = y + z;
          rays[i] = { ...rays[i], price: y + z };
        } else {
          rayz[i] = y;
          rays[i] = { ...rays[i], price: y };
        }
      }
      this.setState({
        rayprice: rayz,
        errorDivisible: "",
        tdata: rays
      });
    }
  }
  Pricecheck(x) {
    var y = this.state.price;

    var b = {
      price: y,
      regprice: x
    };

    var z = y - x;
    this.setState({ oprice: z });
    console.log("zz", z);
  }

  onChangeTime(e) {
    const target = e.target;
    const id = target.name;
    const dd = this.state.selectedId;
    var cc = this.state.targetTime;
    dd[id] = `ti${id}`;
    cc[id] = true;
    let data = this.state.tdata;
    let time = this.state.time;
    data[id] = { ...data[id], time: e.target.value };
    time[id] = target.value;
    this.setState({ tdata: data, time: time, selectedId: dd, targetTime: cc });
    console.log(this.state.tdata);
  }
  onChangeCut(e) {
    const target = e.target;
    const id = target.id;
    const name = target.name;
    let data = this.state.tdata;
    let cut = this.state.cut;
    data[id] = { ...data[id], [name]: e.target.value };
    cut[id] = target.value;
    this.setState({ tdata: data, cut: cut });
    console.log(this.state.tdata);
  }
  onChangeMaster(e) {
    const target = e.target;
    const id = target.id;
    const name = target.name;
    let ray = [];
    let data = this.state.tdata;
    data[id] = { ...data[id], [name]: e.target.value };

    this.setState({ tdata: data });
    console.log(this.state.tdata);
  }

  onChangePrice(e) {
    const target = e.target.value;
    const id = e.target.id;
    let sum = 0;
    let rays = this.state.tdata;
    let data = this.state.rayprice;
    if (isNaN(target)) {
      rays[id] = { ...rays[id], price: 0 };
      data[id] = 0;
    } else {
      data[id] = parseInt(target);
      rays[id] = { ...rays[id], price: parseInt(target) };
    }

    data.map((k, i) => {
      if (isNaN(k)) {
        sum += 0;
      } else {
        sum += parseInt(k);
      }
    });

    if (sum != this.state.oprice) {
      this.setState({ sumState: " has-danger" });
    } else {
      this.setState({ sumState: " has-success" });
    }
    this.setState({
      rayprice: data,
      tdata: rays,
      outprice: this.state.oprice - sum
    });
  }
  onDefaultTime(e) {
    let target = e.target;
    let rayz = this.state.time;
    var i;
    for (i = target.id; i < this.props.wizardData.Details.sessions; i++) {
      rayz[i] = target.value;
    }
    this.setState({ time: rayz });
  }
  onDefaultTeachers(e) {
    let target = e.target;
    let rayz = this.state.teachers;
    var i;
    for (i = target.id; i < this.props.wizardData.Details.sessions; i++) {
      rayz[i] = target.value;
    }
    this.setState({ teachers: rayz });
  }

  render() {
    let sessions;

    if (this.props.wizardData.hasOwnProperty("Details")) {
      let i = this.props.wizardData.Details.sessions;

      let sess = [];
      let x = 1;
      let y = 1;

      for (y = 0; y < i; y++) {
        sess[y] = { ses: y, time: 0 };
      }

      sessions = sess.map((k, o) => {
        let l = sess.length;

        if (o == 0) {
          return (
            <Row>
              <Col md={2}>
                <h6 placement="auto">Session: {k.ses + 1} </h6>
              </Col>
              <Col md={3}>
                <Label>Description</Label>
                <Input
                  type="text"
                  placeholder="Description"
                  name={`desc`}
                  id={o}
                  onChange={this.onChange.bind(this)}
                />
              </Col>
              <Col md={1}>
                <Popover
                  placement="right"
                  target={this.state.selectedId[o]}
                  isOpen={this.state.targetTime[o]}
                >
                  <PopoverBody>
                    <Button
                      size="sm"
                      onClick={() => {
                        let rayz = this.state.time;
                        let rayx = this.state.tdata;
                        var i;
                        for (
                          i = o;
                          i < this.props.wizardData.Details.sessions;
                          i++
                        ) {
                          rayz[i] = rayz[o];
                          rayx[i] = { ...rayx[i], time: rayz[o] };
                        }

                        this.setState({ time: rayz, tdata: rayx });
                      }}
                      color="info"
                      round
                      icon
                    >
                      <i className="now-ui-icons  ui-1_simple-add" />
                    </Button>
                    <Button
                      size="sm"
                      onClick={() => {
                        var cc = this.state.targetTime;
                        cc[o] = !cc[o];
                        this.setState({
                          targetTime: cc
                        });
                      }}
                      color="danger"
                      round
                      icon
                    >
                      <i className="fa fa-times" />
                    </Button>
                  </PopoverBody>
                </Popover>
                <Label>Time</Label>

                <Input
                  type="number"
                  placeholder="Time"
                  name={o}
                  id={`ti${o}`}
                  onChange={e => {
                    const target = e.target;
                    const cc = this.state.targetTime;
                    const ind = target.name;
                    const dd = this.state.selectedId;
                    const ray = [];
                    dd[ind] = `ti${ind}`;
                    cc[o] = true;
                    this.setState({
                      targetTime: cc,
                      selectedId: dd
                    });
                    let data = this.state.tdata;
                    data[o] = { ...data[o], time: target.value };
                    ray[o] = e.target.value;
                    this.setState({ tdata: data, time: ray });
                  }}
                />
              </Col>
              <Col md={2}>
                <Label>Teacher</Label>
                <Select
                  className="info"
                  placeholder="Select"
                  name={`teacher`}
                  value={this.state.singleselect[o]}
                  options={this.state.teachers}
                  id={o}
                  onChange={value => {
                    let data = this.state.tdata;
                    var i;
                    let sdata = [];
                    if (!value) {
                      data[o] = { ...data[o], teacher: "" };
                    } else {
                      data[o] = { ...data[o], teacher: value.value };
                    }

                    for (i = 0; i < l; i++) {
                      if (!value) {
                        sdata[i] = "";
                        data[i] = { ...data[i], teacher: "" };
                      } else {
                        sdata[i] = value.value;
                        data[i] = { ...data[i], teacher: value.value };
                      }
                    }

                    this.setState({ tdata: data, singleselect: sdata });
                    console.log("data", this.state.tdata);
                  }}
                />
              </Col>
              <Col md={2}>
                <Label>Teachers Cut(%)</Label>
                <Input
                  type="number"
                  placeholder="Teacher"
                  name="cut"
                  id={o}
                  onChange={e => {
                    const target = e.target;
                    const id = target.id;
                    const name = target.name;
                    let ray = [];
                    let data = this.state.tdata;
                    for (i = 0; i < l; i++) {
                      data[i] = { ...data[i], [name]: e.target.value };
                      ray[i] = e.target.value;
                    }

                    this.setState({ tdata: data, cut: ray });
                    console.log("aara cuts", ray[i]);
                    console.log(this.state.tdata);
                  }}
                />
              </Col>
              <Col md={2}>
                <Label>Price</Label>
                <Input
                  value={this.state.rayprice[o]}
                  type="number"
                  placeholder="Price"
                  name={`price`}
                  id={o}
                  onChange={this.onChangePrice.bind(this)}
                />
              </Col>
            </Row>
          );
        }
        return (
          <Row>
            <Col md={2}>
              <h6>Session: {k.ses + 1}</h6>
            </Col>
            <Col md={3}>
              <Label>Description</Label>
              <Input
                type="text"
                placeholder="Description"
                name={`desc`}
                id={o}
                onChange={this.onChange.bind(this)}
              />
            </Col>

            <Col md={1}>
              <Popover
                placement="right"
                target={`ti${o}`}
                isOpen={this.state.targetTime[o]}
              >
                <PopoverBody>
                  <Button
                    size="sm"
                    onClick={() => {
                      let rayz = this.state.time;
                      let rayx = this.state.tdata;
                      var i;
                      for (
                        i = o;
                        i < this.props.wizardData.Details.sessions;
                        i++
                      ) {
                        rayz[i] = rayz[o];
                        rayx[i] = { ...rayx[i], time: rayz[o] };
                        console.log("fedor", rayx[i]);
                      }

                      this.setState({ time: rayz, tdata: rayx });
                      console.log("rayx", rayx);
                    }}
                    color="info"
                    round
                    icon
                  >
                    <i className="now-ui-icons  ui-1_simple-add" />
                  </Button>
                  <Button
                    size="sm"
                    onClick={() => {
                      console.log("fires");
                      var cc = this.state.targetTime;
                      cc[o] = !cc[o];
                      this.setState({
                        targetTime: cc
                      });
                    }}
                    color="danger"
                    round
                    icon
                  >
                    <i className="fa fa-times" />
                  </Button>
                </PopoverBody>
              </Popover>

              <Label>Time</Label>
              <Input
                type="number"
                placeholder="Time"
                name={o}
                id={`ti${o}`}
                value={this.state.time[o]}
                onChange={this.onChangeTime.bind(this)}
              />
            </Col>
            <Col md={2}>
              <Label>Teacher</Label>

              <Select
                className="info"
                placeholder="Single Select"
                name={`teacher`}
                value={this.state.singleselect[o]}
                options={this.state.teachers}
                id={o}
                onChange={value => {
                  if (value) {
                    let data = this.state.tdata;
                    data[o] = { ...data[o], teacher: value.value };
                    this.setState({ tdata: data });
                    let sdata = this.state.singleselect;
                    sdata[o] = value.value;
                    this.setState({ singleselect: sdata });
                  } else {
                    let data = this.state.tdata;
                    data[o] = { ...data[o], teacher: "" };
                    this.setState({ tdata: data });
                    let sdata = this.state.singleselect;
                    sdata[o] = "";
                    this.setState({ singleselect: sdata });
                  }

                  console.log(this.state.tdata);
                }}
              />
            </Col>
            <Col md={2}>
              <Label>Teachers Cut(%)</Label>
              <Input
                value={this.state.cut[o]}
                type="number"
                placeholder="Teacher"
                name="cut"
                id={o}
                onChange={this.onChangeCut.bind(this)}
              />
            </Col>
            <Col md={2}>
              <Label>Price</Label>
              <Input
                value={this.state.rayprice[o]}
                type="number"
                placeholder="Price"
                name={`price`}
                id={o}
                onChange={this.onChangePrice.bind(this)}
              />
            </Col>
          </Row>
        );
      });
    } else {
      sessions = <h2>Not ready</h2>;
    }
    return (
      <div>
        <Card>
          <CardBody>
            <Row xs="auto">
              <Label xs={"auto"}>Total Price</Label>
              <Col xs="auto">
                <Input
                  name="price"
                  type="number"
                  onChange={this.onPriceChange.bind(this)}
                  value={this.state.price}
                />
              </Col>
            </Row>
            <Row xs="auto">
              <Label xs={"auto"}>Reg. Price</Label>
              <Col xs="auto">
                <Input
                  name="regprice"
                  type="number"
                  onChange={this.onRegPriceChange.bind(this)}
                  value={this.state.regprice}
                />
              </Col>
              <Col xs="auto">
                <Button onClick={this.Calculate.bind(this)} color="primary">
                  {" "}
                  Enter
                </Button>
              </Col>
              <Col xs="auto">
                <Label>Outstanding :</Label>
                <h6 className={this.state.sumState}>{this.state.outprice}</h6>
                <h6 style={{ color: "red" }}>{this.state.errorDivisible}</h6>
              </Col>
            </Row>
          </CardBody>
        </Card>

        <Row>{sessions}</Row>
      </div>
    );
  }
}

export default Step2;
