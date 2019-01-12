import React from "react";
import Avatar from "@material-ui/core/Avatar";
import { withStyles } from "@material-ui/core";

const styles = {
  bigAvatar: {
    margin: 10,
    width: 120,
    height: 120
  }
};

export const BigAvatar = withStyles(styles)(({ classes, ...props }) => (
  <Avatar className={classes.bigAvatar} {...props} />
));
