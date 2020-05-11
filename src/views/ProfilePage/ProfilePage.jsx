import React from "react";
import { Link } from "react-router-dom";
import PropTypes from 'prop-types';
import axios from "axios";
import dayjs from 'dayjs';
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

  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);

    this.state = {
        data: [],
        humidity: null,
        value: 'TEN_LATEST'
    }
  }

  handleChange(event) {
    const param = event.target.value;
    this.setState({value: param});
    this.entriesFilter(param);
  }

  componentWillMount = async () => {
    this.entriesFilter('TEN_LATEST');
  };

  entriesFilter = async (dateRange) => {
    switch(dateRange){
      case 'TEN_LATEST' : {
        const res = await axios.get(
          'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"&limitToLast=10'
        );
        this.updateState(res);
        break;
      }
      case 'ALL' : {
        const res = await axios.get(
          'https://raspberrypi-2019.firebaseio.com/records.json?orderBy="timestamp"'
        );
        this.updateState(res);
        break;
      }
    }
  }

  updateState = async (res) => {
    const newState = Object.values((await res.data));
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
  }

  render() {

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
                              <select value={this.state.value} onChange={this.handleChange}>                              
                                <option value="TEN_LATEST">Last 10 entries</option>
                                <option value="ALL">ALL</option>
                              </select>
                              <LineChart
                                width={600}
                                height={300}
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
  const { payload } = props;
  if (!payload) {
    return null;
  }

  const timestamp = payload.length === 0 ? {} : payload[0].payload.timestamp;
  const newDate = new Date(timestamp);
  const date = dayjs(newDate).format('dddd, MMMM D, YYYY')
  const time = dayjs(newDate).format('h:mm:ss a');
  const temperature = payload.length === 0 ? {} : payload[0].payload.temperature;

  if (props.active) {
    return (
      <div className="custom-tooltip">
        <Paper className="label">
          Date: {`${date}`}
          <br/>
          Time: {`${time}`}
          <br/>
          Temperature: {`${temperature}`}
        </Paper>
      </div>
    );
  }
  return null;
}

export default withStyles(profilePageStyle)(ProfilePage);
