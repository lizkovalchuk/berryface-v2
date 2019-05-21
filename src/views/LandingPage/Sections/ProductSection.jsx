import React from "react";
// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";

// core components
import GridContainer from "components/Grid/GridContainer.jsx";
import GridItem from "components/Grid/GridItem.jsx";


import productStyle from "assets/jss/material-kit-react/views/landingPageSections/productStyle.jsx";

class ProductSection extends React.Component {
  render() {
    const { classes } = this.props;
    return (
      <div className={classes.section}>
        <GridContainer justify="center">
          <GridItem xs={12} sm={12} md={8}>
            <h2 className={classes.title}>What's to come</h2>
            <h5 className={classes.description}>
              This application will soon have tutorials for people to easily learn how to set up their very own raspberry pi. Next I will enable registration so users can have their very own profiles showing data from their own raspberry pi.
            </h5>
          </GridItem>
        </GridContainer>

      </div>
    );
  }
}

export default withStyles(productStyle)(ProductSection);
