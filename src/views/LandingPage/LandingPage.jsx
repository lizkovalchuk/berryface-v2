import React from "react";
// nodejs library that concatenates classes
import classNames from "classnames";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import Header from "components/Header/Header.jsx";
import Footer from "components/Footer/Footer.jsx";
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";
// import Button from "components/CustomButtons/Button.jsx";
import HeaderLinks from "components/Header/HeaderLinks.jsx";
import Parallax from "components/Parallax/Parallax.jsx";

import landingPageStyle from "assets/jss/material-kit-react/views/landingPage.jsx";

// Sections for this page
import ProductSection from "./Sections/ProductSection.jsx";

// Logo components

//custom style
import "assets/scss/custom-style/logo-style.scss";

//logo
import logo from "assets/img/logo.png"

const dashboardRoutes = [];

class LandingPage extends React.Component {
  render() {
    const { classes, ...rest } = this.props;
    return (
      <div>
        <Header
          color="transparent"
          routes={dashboardRoutes}
          brand="Liz Kovalchuk - Web Developer"
          rightLinks={<HeaderLinks />}
          fixed
          changeColorOnScroll={{
            height: 200,
            color: "rose"
          }}
          {...rest}
        />
        <Parallax filter>
          <div className={classes.container}>
            <GridContainer>
              <GridItem xs={12} sm={12} md={6}>
                <h1 className={classes.title}>BerryFace</h1>
                <h4>
                  BerryFace is a web interface to visualize data from a raspberry pi. You can see the current temperature and humidity of my apartment when you sign in. Right now, anyone can sign in via the login page.
                </h4>
                <br />
              </GridItem>
              <GridItem id="banner__GridItem_stage" xs={12} sm={12} md={6}>
                <img
                  id="banner__img_logo"
                  src={logo}
                  alt="BerryFace logo"
                />
              </GridItem>
            </GridContainer>
          </div>
        </Parallax>
        <div className={classNames(classes.main, classes.mainRaised)}>
          <div className={classes.container}>
            <ProductSection />
          </div>
        </div>
        <Footer />
      </div>
    );
  }
}

export default withStyles(landingPageStyle)(LandingPage);
