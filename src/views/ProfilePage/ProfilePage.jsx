import React from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend
} from "recharts";

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import Paper from "@material-ui/core/Paper";
// @material-ui/icons
import Sun from "@material-ui/icons/Brightness6";
import Bubble from "@material-ui/icons/BubbleChart";
// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import Button from "components/CustomButtons/Button.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem";
import NavPills from "components/NavPills/NavPills";
import Parallax from "components/Parallax/Parallax";
import LiquidGauge from "components/LiquidGauge/LiquidGauge";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage";

//custom style
import "assets/scss/custom-style/profile-page.scss";

class ProfilePage extends React.Component {
  state = {
    data: [],
    humidity: null
  };

  componentDidMount = async () => {
    const newState = Object.values((await this.getData()).data);
    const formattedState = newState.map(record => {
      const formattedDate = record.timestamp.substring(6, 10);
      return {
        formattedDate,
        ...record
      };
    });
    this.setState({
      data: formattedState,
      humidity: formattedState[0].humidity
    });
  };

  getData = async () => {
    const res = await axios.get(
      'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"&limitToLast=10'
    );
    return res;
  };

  render() {
    // getData();
    console.log(this.state);

    // function getIntroOfPage(label) {
    //   console.log(label);
    // }

    const { classes, ...rest } = this.props;
    const imageClasses = classNames(
      classes.imgRaised,
      classes.imgRoundedCircle,
      classes.imgFluid
    );
    const navImageClasses = classNames(classes.imgRounded, classes.imgGallery);
    return (
      <div>
        <Header
          color="transparent"
          brand={
            <Link to="landing-page" style={{ color: "white" }}>
              BerryFace
            </Link>
          }
          rightLinks={
            <Link to="landing-page" style={{ color: "white" }}>
              {" "}
              <Button
                color="transparent"
                className={classes.navLink}
                style={{ color: "white" }}
              >
                Sign out
              </Button>
            </Link>
          }
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "white"
          }}
          {...rest}
        />
        {/* <Parallax small filter image={require("assets/img/profile-bg.jpg")} /> */}
        <Parallax small filter style={{ height: "260px" }} />
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div>
            <div className={classes.container}>
              <GridContainer justify="center">
                <GridItem xs={12} sm={12} md={6}>
                  <div className={classes.profile}>
                    <div className={classes.name}>
                      <h3 className={classes.title} style={{ color: "white" }}>
                        Liz Kovalchuk's BerryFace
                      </h3>
                    </div>
                  </div>
                </GridItem>
              </GridContainer>
              <GridContainer
                justify="center"
                id="profile__GridContainer_chartWrappers"
              >
                <GridItem xs={12} sm={12} md={8} className={classes.navWrapper}>
                  <NavPills
                    alignCenter
                    color="primary"
                    tabs={[
                      {
                        tabButton: "Temperature",
                        tabIcon: Sun,
                        tabContent: (
                          <GridContainer
                            id="profile__GridContainer_temperature"
                            justify="center"
                          >
                            <GridItem xs={12} sm={12} md={12}>
                              <LineChart
                                width={600}
                                height={300}
                                // data={data}
                                data={this.state.data}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5
                                }}
                              >
                                <XAxis dataKey="formattedDate" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip content={<CustomTooltip />} />
                                {/* <Tooltip /> */}
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="temperature"
                                  stroke="#8884d8"
                                  activeDot={{ r: 8 }}
                                />
                              </LineChart>
                            </GridItem>
                          </GridContainer>
                        )
                      },
                      {
                        tabButton: "Humidity",
                        tabIcon: Bubble,
                        tabContent: (
                          <GridContainer
                            justify="center"
                            id="profile__GridContainer_humidity"
                          >
                            <GridItem xs={12} sm={12} md={8}>
                              <div id="profile__div_humidityContainer">
                                <LiquidGauge
                                  // value={this.props.humid}
                                  value={this.state.humidity}
                                  percent="%"
                                  textSize="1"
                                />
                              </div>
                            </GridItem>
                          </GridContainer>
                        )
                      }
                    ]}
                  />
                </GridItem>
              </GridContainer>
            </div>
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

function CustomTooltip(props) {
  const { payload: raw, active } = props;
  const { timestamp } = raw.length ? raw[0].payload : {};
  const newDate = new Date(timestamp);
  const time = newDate.toTimeString().substring(0, 8);

  if (active) {
    return (
      <div className="custom-tooltip">
        <Paper className="label">{`${time}`}</Paper>
      </div>
    );
  }
  return null;
}

export default withStyles(profilePageStyle)(ProfilePage);
