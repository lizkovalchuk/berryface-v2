import React from "react";
import { Link } from "react-router-dom";
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
import GridItem from "components/Grid/GridItem.jsx";
import NavPills from "components/NavPills/NavPills.jsx";
import Parallax from "components/Parallax/Parallax.jsx";
import LiquidGauge from "components/LiquidGauge/LiquidGauge.jsx";

import profilePageStyle from "assets/jss/material-kit-react/views/profilePage.jsx";

//custom style
import "assets/scss/custom-style/profile-page.scss";

class ProfilePage extends React.Component {
  render() {
    const data = [
      {
        name: "20 April 2019",
        time: "21:30:29",
        temp: 15,
        amt: 2400
      },
      {
        name: "20 April 2019",
        time: "21:00:33",
        temp: 15,
        amt: 2210
      },
      {
        name: "20 April 2019",
        time: "20:30:36",
        temp: 16,
        amt: 2290
      },
      {
        name: "20 April 2019",
        time: "20:00:40",
        temp: 14,
        amt: 2000
      },
      {
        name: "20 April 2019",
        time: "19:30:43",
        temp: 15,
        amt: 2181
      },
      {
        name: "20 April 2019",
        time: "19:00:47",
        temp: 16,
        amt: 2500
      },
      {
        name: "20 April 2019",
        time: "18:30:50",
        temp: 18,
        amt: 2100
      }
    ];

    function getIntroOfPage(label) {
      console.log(label);
    }

    function CustomTooltip(props) {
      //{ payload, label, active }) {
      console.log(props);
      const { payload, label, active } = props;
      if (active) {
        return (
          <div className="custom-tooltip">
            {/* <p className="label">hoooola{`${label} : ${payload[0].value}`}</p> */}
            <Paper className="label">{`${payload[0].payload.time}`}</Paper>
          </div>
        );
      }
      return null;
    }

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
                                data={data}
                                margin={{
                                  top: 5,
                                  right: 30,
                                  left: 20,
                                  bottom: 5
                                }}
                              >
                                <XAxis dataKey="name" />
                                <YAxis />
                                <CartesianGrid strokeDasharray="3 3" />
                                <Tooltip content={<CustomTooltip />} />
                                {/* <Tooltip /> */}
                                <Legend />
                                <Line
                                  type="monotone"
                                  dataKey="temp"
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
                                  value="25"
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

export default withStyles(profilePageStyle)(ProfilePage);
