/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

import ProfilePage from "views/ProfilePage/ProfilePage.jsx";
import LoginPage from "views/LoginPage/LoginPage.jsx";

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
          <Button color="transparent" className={classes.navLink} style={{color:"white"}}>
            Login
          </Button>
        </ListItem>
      </Link>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
