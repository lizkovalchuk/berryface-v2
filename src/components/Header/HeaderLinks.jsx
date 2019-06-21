/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

import LoginPage from "views/LoginPage/LoginPage.jsx";
import RegisterPage from "views/RegisterPage/RegisterPage.jsx";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <Link to="/login-page" component={LoginPage}>
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink} style={{ color: "white" }}>
            Login
          </Button>
        </ListItem>
      </Link>
      <Link to="/register-page" component={RegisterPage}>
        <ListItem className={classes.listItem}>
          <Button color="transparent" className={classes.navLink} style={{ color: "white" }}>
            Register
          </Button>
        </ListItem>
      </Link>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
