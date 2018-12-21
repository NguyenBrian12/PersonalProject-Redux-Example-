import React from "react";
import { connect } from "react-redux";
import {
  DeleteInfo,
  GetZodiac,
  GetWebScrapper
} from "../services/chineseZodiacs.services";
import { Button, Col, Row } from "reactstrap";
class ChineseZodiacResults extends React.Component {
  state = {
    sign: null,
    table: []
  };
  componentDidMount() {
    GetZodiac(
      this.props.user.birthYear,
      this.props.user.birthMonth,
      this.props.user.birthDay
    ).then(response => {
      console.log(response.data.result);
      const sign = response.data.result;
      this.setState({
        sign
      });
    });
    GetWebScrapper().then(response => {
      console.log(response.data);
      this.setState({ table: response.data });
    });
  }
  editInfo = userId => {
    this.props.history.push("/" + userId);
  };
  deleteInfo = userId => {
    DeleteInfo(userId).then(this.props.history.push("/"));
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
          fontFamily: "Times New Roman"
        }}
      >
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        />
        <div
          style={{
            display: "flex",
            justifyContent: "center"
          }}
        >
          <span style={{ fontSize: 20, marginRight: "0.5em" }}>
            {this.props.user.firstName}!{" "}
          </span>
          <span style={{ fontSize: 20 }}>Your Chinese Zodiac Sign is: </span>
          <span
            style={{
              fontWeight: "bold",
              marginLeft: "0.5em",
              fontSize: 20,
              marginRight: "0.5em"
            }}
          >
            {this.state.sign}
          </span>
          Check the Compatibility Chart
        </div>
        <Row style={{ textAlign: "center" }}>
          <Col md={1}>
            <span>Rat</span>
          </Col>
          <Col md={1}>
            <span>Ox</span>
          </Col>{" "}
          <Col md={1}>
            <span>Tiger</span>
          </Col>{" "}
          <Col md={1}>
            <span>Rabbit</span>
          </Col>{" "}
          <Col md={1}>
            <span>Dragon</span>
          </Col>{" "}
          <Col md={1}>
            <span>Snake</span>
          </Col>{" "}
          <Col md={1}>
            <span>Horse</span>
          </Col>{" "}
          <Col md={1}>
            <span>Sheep</span>
          </Col>{" "}
          <Col md={1}>
            <span>Monkey</span>
          </Col>{" "}
          <Col md={1}>
            <span>Rooster</span>
          </Col>
          <Col md={1}>
            <span>Dog</span>
          </Col>{" "}
          <Col md={1}>
            <span>Pig</span>
          </Col>
        </Row>
        <Row>
          {Object.values(this.state.table).map(key2 => {
            console.log(key2.Dog);
            return (
              <Col
                md={1}
                style={{
                  fontSize: 15,
                  border: "solid",
                  borderColor: "Black",
                  borderWidth: "1"
                }}
              >
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Dog: {key2.Dog}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Dragon: {key2.Dragon}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Horse: {key2.Horse}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Monkey: {key2.Monkey}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Ox: {key2.Ox}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Pig: {key2.Pig}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Rabbit: {key2.Rabbit}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Rat: {key2.Rat}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Rooster: {key2.Rooster}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Sheep: {key2.Sheep}{" "}
                </div>
                <div
                  style={{
                    borderBottom: "solid",
                    borderBottomColor: "black",
                    borderBottomWidth: "1"
                  }}
                >
                  Snake: {key2.Snake}{" "}
                </div>
                <div>Tiger: {key2.Tiger} </div>
              </Col>
            );
          })}
        </Row>

        <div>
          <Button
            type="button"
            onClick={() => this.editInfo(this.props.user.id)}
            style={{ color: "yellow", backgroundColor: "red" }}
          >
            Wrong Birthday?
          </Button>
          <Button
            type="button"
            onClick={() => this.deleteInfo(this.props.user.id)}
            style={{ color: "yellow", backgroundColor: "red" }}
          >
            Delete
          </Button>
        </div>
      </div>
    );
  }
}
function mapStateToProps(state) {
  return {
    user: state.user
  };
}
export default connect(mapStateToProps)(ChineseZodiacResults);
