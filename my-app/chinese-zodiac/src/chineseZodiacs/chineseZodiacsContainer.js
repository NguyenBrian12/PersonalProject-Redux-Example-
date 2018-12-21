import React from "react";
import { Row, Col, Button, Input, Label } from "reactstrap";
import { SubmitInfo, UpdateInfo } from "../services/chineseZodiacs.services";
import { connect } from "react-redux";
import { GetInfoById } from "../services/chineseZodiacs.services";
class ChineseZodiacContainer extends React.Component {
  state = {
    user: {
      firstName: "",
      lastName: "",
      birthYear: null,
      birthMonth: null,
      birthDay: null,
      id: null
    },
    editMode: false
  };
  componentDidMount() {
    console.log(this.props.match.params);
    let userId = this.props.match.params.id;
    if (userId) {
      GetInfoById(userId).then(response => {
        console.log(response);
        const info = response.data.item[0];
        this.setState(state => ({
          user: {
            ...state.user,
            firstName: info.firstName,
            lastName: info.lastName,
            birthYear: info.birthYear,
            birthMonth: info.birthMonth,
            birthDay: info.birthDay,
            id: info.id
          }
        }));
        this.setState({ editMode: true });
      });
    }
  }
  onChange = e => {
    const value = e.target.value;
    const name = e.target.name;
    this.setState(state => ({
      user: {
        ...state.user,
        [name]: value
      }
    }));
  };
  onSubmit = () => {
    SubmitInfo({
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      birthYear: this.state.user.birthYear,
      birthMonth: this.state.user.birthMonth,
      birthDay: this.state.user.birthDay
    }).then(response => {
      console.log(response.data.Id);
      console.log(this.state.user);
      const id = response.data.Id;
      console.log(id);
      this.setState(
        state => ({
          user: {
            ...state.user,
            id: id
          }
        }),
        () => {
          this.props.setUser(this.state.user);
          this.props.history.push("/results");
        }
      );
    });
  };
  onUpdate = () => {
    UpdateInfo({
      id: this.state.user.id,
      firstName: this.state.user.firstName,
      lastName: this.state.user.lastName,
      birthYear: this.state.user.birthYear,
      birthMonth: this.state.user.birthMonth,
      birthDay: this.state.user.birthDay
    }).then(() => {
      this.props.setUser(this.state.user);
      this.props.history.push("/results");
    });
  };
  render() {
    return (
      <div
        style={{
          backgroundImage:
            "url(https://wallpaperbrowse.com/media/images/4614610-background.jpg)",

          backgroundRepeat: "no-repeat",
          backgroundSize: "100%",
          width: "100%",
          height: "100%",
          top: 0,
          left: 0,
          fontSize: 20,
          color: "yellow",
          fontFamily: "Times New Roman",
          position: "fixed"
        }}
      >
        <div style={{ textAlign: "center", fontSize: 30, margin: 20 }}>
          What Chinese Zodiac Sign Are You?
        </div>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Col md={2}>
            <Label htmlFor="name">First Name</Label>
            <Input
              type="text"
              className="form-control"
              name="firstName"
              value={this.state.user.firstName}
              onChange={this.onChange}
              placeholder={"First Name"}
            />
          </Col>
          <Col md={2}>
            <Label htmlFor="name">Last Name</Label>
            <Input
              type="text"
              className="form-control"
              name="lastName"
              value={this.state.user.lastName}
              onChange={this.onChange}
              placeholder={"Last Name"}
            />
          </Col>
        </div>

        <Row>
          <Col md={12}>
            <div style={{ textAlign: "center", margin: 10 }}>
              <Label htmlFor="birthday">Enter Your Birthday</Label>
            </div>
          </Col>
        </Row>
        <div
          style={{
            textAlign: "center",
            display: "flex",
            justifyContent: "center"
          }}
        >
          <Col md={2}>
            <Label htmlFor="month">Month</Label>
            <Input
              type="text"
              className="form-control"
              name="birthMonth"
              value={this.state.user.birthMonth}
              onChange={this.onChange}
              placeholder={"Month"}
            />
          </Col>
          <Col md={2}>
            <Label htmlFor="day">Day</Label>
            <Input
              type="text"
              className="form-control"
              name="birthDay"
              value={this.state.user.birthDay}
              onChange={this.onChange}
              placeholder={"Day"}
            />
          </Col>
          <Col md={2}>
            <Label htmlFor="year">Year</Label>
            <Input
              type="text"
              className="form-control"
              name="birthYear"
              value={this.state.user.birthYear}
              onChange={this.onChange}
              placeholder={"Year"}
            />
          </Col>
        </div>
        {this.state.editMode === true ? (
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              margin: 20
            }}
          >
            <Button
              onClick={this.onUpdate}
              style={{ color: "yellow", backgroundColor: "red" }}
            >
              Update
            </Button>
          </div>
        ) : (
          <div
            style={{
              display: "flex",
              justifyContent: "center"
            }}
          >
            <img
              src="https://i.ibb.co/HdkHzHy/48429535-2103919276333745-6549363572034502656-n.png"
              width="425px"
              height="425px"
              onClick={this.onSubmit}
              style={{ cursor: "pointer" }}
            />
          </div>
        )}
      </div>
    );
  }
}
//here is how we indicate what this component would like to send into the redux store
function mapDispatchToProps(dispatch) {
  //your job in this function is to return an object that becomes the props given to your component
  return {
    setUser: user => {
      console.log(user);
      dispatch({ type: "SET_USER", user });
    }
  };
}
export default connect(
  null,
  mapDispatchToProps
)(ChineseZodiacContainer);
