import React from "react";
import { NavLink } from "react-router-dom";
import { Toolbar, AppBar, Typography } from "@material-ui/core";

const styles = {
  link: { margin: "0 20px 0 0", textDecoration: "none", color: "#312f2ff0" }
};

export function Header() {
  return (
    <AppBar position="static" color="blue">
      <Toolbar>
        <NavLink to="/" style={styles.link}>
          <img
            style={{ height: "60px" }}
            src="https://www.cluster-freelance.io/src/images/dist/logo-main.png"
            alt="logo"
          />
        </NavLink>
        <NavLink to="/" style={styles.link}>
          <Typography variant="h6" color="inherit">
            Freelances
          </Typography>
        </NavLink>
        <NavLink to="/posts" style={styles.link}>
          <Typography variant="h6" color="inherit">
            Posts
          </Typography>
        </NavLink>
      </Toolbar>
    </AppBar>
  );
}
