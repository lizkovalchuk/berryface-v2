/*eslint-disable*/
import React from "react";
// react components for routing our app without refresh
import { Link } from "react-router-dom";

// @material-ui/core components
import withStyles from "@material-ui/core/styles/withStyles";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import Tooltip from "@material-ui/core/Tooltip";

// @material-ui/icons
import { Apps, CloudDownload } from "@material-ui/icons";


import Button from "components/CustomButtons/Button.jsx";

import headerLinksStyle from "assets/jss/material-kit-react/components/headerLinksStyle.jsx";

function HeaderLinks({ ...props }) {
  const { classes } = props;
  return (
    <List className={classes.list}>
      <ListItem className={classes.listItem}>

      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://www.creative-tim.com/product/material-kit-react"
          color="transparent"
          target="_blank"
          className={classes.navLink}
        >
          <CloudDownload className={classes.icons} /> Download
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          href="https://twitter.com/CreativeTim"
          target="_blank"
          color="transparent"
          className={classes.navLink}
        >
          <i className={classes.socialIcons + " fab fa-twitter"} />
        </Button>

      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          href="https://www.facebook.com/CreativeTim"
          target="_blank"
          className={classes.navLink}
        >
          <i className={classes.socialIcons + " fab fa-facebook"} />
        </Button>
      </ListItem>
      <ListItem className={classes.listItem}>
        <Button
          color="transparent"
          href="https://www.instagram.com/CreativeTimOfficial"
          target="_blank"
          className={classes.navLink}
        >
          <i className={classes.socialIcons + " fab fa-instagram"} />
        </Button>
      </ListItem>
    </List>
  );
}

export default withStyles(headerLinksStyle)(HeaderLinks);
