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
import Thermometer from 'react-thermometer-component'

// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
// @material-ui/icons
import Sun from "@material-ui/icons/Brightness6";
import Bubble from "@material-ui/icons/BubbleChart";
import History from "@material-ui/icons/History"
import Timeline from "@material-ui/icons/Timeline"
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

// custom style
import "assets/scss/custom-style/profile-page.scss";

// api
import { getData } from "../../api/api";
import transformer from "../../helpers/transformer";
// custom components
import CustomTooltip  from '../../components/CustomTooltip/tooltip'

class ProfilePage extends React.Component {

  constructor(props) {
    super(props);
    this.historyChange = this.historyChange.bind(this);

    this.state = {
        data: [],
        historicalData: [],
        highsAndLowsData: [],
        numEntries: 10,
        tempLimitNumEntries: 7,
        current: {
          humidity: 0,
          temp: 0
        },
        loading: false,
    }
  }

  historyChange = async (event) => {
    const param = event.target.value;
    this.setState({
      numEntries: param,
      historicalData: transformer.getHistorical(this.state.data, param)
    });
  }

  tempLimitChange = async (event) => {
    const param = event.target.value;
    this.setState({
      tempLimitNumEntries: param,
      highsAndLowsData: transformer.getHighsAndLows(this.state.data, param)
    });
  }

  componentWillMount = async () => {
    this.setState({
      loading: true
    });
    getData()
      .then((data) => {
        this.setState({
          loading: false,
          data: data,
          current: transformer.getCurrent(data),
          historicalData: transformer.getHistorical(data, this.state.numEntries),
          highsAndLowsData: transformer.getHighsAndLows(data, this.state.tempLimitNumEntries)
        });

      });
  };

  render() {
    const { classes, ...rest } = this.props;
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
                {this.state.loading &&
                  <h2>
                    Loading
                  </h2>
                } 
                {
                  !this.state.loading  &&
                  <NavPills 
                  alignCenter
                  color="primary"
                  tabs={[
                    {
                      tabButton: "Current",
                      tabIcon: Sun,
                      tabContent: (
                        <GridContainer
                          justify="center"
                          id="profile__GridContainer_current"
                        >
                          <GridItem xs={12} sm={6}>
                            <Thermometer
                              theme="light"
                              value={this.state.current.temp}
                              max="40"
                              steps="3"
                              format="°C"
                              size="large"
                              height="300"
                            />
                          </GridItem>
                          <GridItem xs={12} sm={6}>
                            <LiquidGauge
                              value={this.state.current.humidity}
                              percent="%"
                              textSize="1"
                            />
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Historical",
                      tabIcon: History,
                      tabContent: (
                        <GridContainer
                          id="profile__GridContainer_temperature"
                          justify="center"
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            <div id="profile__GridContainer_filter">
                              <select value={this.state.value} onChange={this.historyChange}>                              
                                <option value="10">Last 10 entries</option>
                                <option value="25">Last 25 entries</option>
                                <option value="50">Last 50 entries</option>
                              </select>
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <LineChart
                              width={600}
                              height={300}
                              data={this.state.historicalData}
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
                                stroke="#DC143C"
                                activeDot={{ r: 8 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="humidity"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                              />
                            </LineChart>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Highs vs Lows",
                      tabIcon: Timeline,
                      tabContent: (
                        <GridContainer
                          id="profile__GridContainer_temperature"
                          justify="center"
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            <div id="profile__GridContainer_filter">
                              <select value={this.state.value} onChange={this.tempLimitChange}>                              
                                <option value="7">Last Week</option>
                                <option value="30">Last Month</option>
                              </select>
                            </div>
                          </GridItem>
                          <GridItem xs={12} sm={12} md={12}>
                            <LineChart
                              width={600}
                              height={300}
                              data={this.state.highsAndLowsData}
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
                                dataKey="low"
                                stroke="#DC143C"
                                activeDot={{ r: 8 }}
                              />
                              <Line
                                type="monotone"
                                dataKey="high"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                              />
                            </LineChart>
                          </GridItem>
                        </GridContainer>
                      )
                    },
                    {
                      tabButton: "Averages",
                      tabIcon: Timeline,
                      tabContent: (
                        <GridContainer
                          id="profile__GridContainer_temperature"
                          justify="center"
                        >
                          <GridItem xs={12} sm={12} md={12}>
                            
                            <LineChart
                              width={600}
                              height={300}
                              data={this.state.highsAndLowsData}
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
                              <Legend/>                         
                              <Line
                                type="monotone"
                                dataKey="low"
                                stroke="#DC143C"
                                activeDot={{ r: 8 }}
                                
                              />
                              <Line
                                type="monotone"
                                dataKey="high"
                                stroke="#8884d8"
                                activeDot={{ r: 8 }}
                                
                              />
                            </LineChart>
                          </GridItem>
                        </GridContainer>
                      )
                    }
                  ]}
                />
                }
               
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
