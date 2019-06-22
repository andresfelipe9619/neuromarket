import React, { useState, useEffect } from "react";
import withStyles from "@material-ui/core/styles/withStyles";
import { Link, withRouter } from "react-router-dom";
import Grid from "@material-ui/core/Grid";
import Typography from "@material-ui/core/Typography";
import Toolbar from "@material-ui/core/Toolbar";
import AppBar from "@material-ui/core/AppBar";
import Tabs from "@material-ui/core/Tabs";
import Tab from "@material-ui/core/Tab";
import MenuIcon from "@material-ui/icons/Menu";
import IconButton from "@material-ui/core/IconButton";
import List from "@material-ui/core/List";
import ListItem from "@material-ui/core/ListItem";
import ListItemText from "@material-ui/core/ListItemText";
import SwipeableDrawer from "@material-ui/core/SwipeableDrawer";
import Menu from "./Menu";
import logo from "../../logo.svg";
const styles = theme => ({
  appBar: {
    position: "relative",
    boxShadow: "none",
    borderBottom: `1px solid ${theme.palette.grey["100"]}`,
    backgroundColor: "white"
  },
  inline: {
    display: "inline"
  },
  flex: {
    display: "flex",
    [theme.breakpoints.down("sm")]: {
      display: "flex",
      justifyContent: "space-evenly",
      alignItems: "center"
    }
  },
  link: {
    textDecoration: "none",
    color: "inherit"
  },
  productLogo: {
    display: "inline-block",
    borderLeft: `1px solid ${theme.palette.grey["A100"]}`,
    marginLeft: 32,
    paddingLeft: 24,
    [theme.breakpoints.up("md")]: {
      paddingTop: "1.5em"
    }
  },
  tagline: {
    display: "inline-block",
    margin: "0 auto",
    [theme.breakpoints.up("md")]: {
      paddingTop: "0.8em"
    }
  },
  iconContainer: {
    display: "none",
    [theme.breakpoints.down("sm")]: {
      display: "block"
    }
  },
  iconButton: {
    float: "right"
  },
  tabContainer: {
    marginLeft: 32,
    [theme.breakpoints.down("sm")]: {
      display: "none"
    }
  },
  tabItem: {
    paddingTop: 20,
    paddingBottom: 20,
    minWidth: "auto"
  }
});

const Navbar = props => {
  const { classes } = props;
  const [value, setValue] = useState(0);
  const [menuDrawer, setMenuDrawer] = useState(false);

  const handleChange = (event, value) => setValue(value);

  const mobileMenuOpen = event => setMenuDrawer(true);

  const mobileMenuClose = event => setMenuDrawer(false);

  useEffect(() => window.scrollTo(0, 0), []);

  const current = () => {
    if (props.currentPath === "/home") {
      return 0;
    }
    if (props.currentPath === "/dashboard") {
      return 1;
    }
    if (props.currentPath === "/signup") {
      return 2;
    }
    if (props.currentPath === "/wizard") {
      return 3;
    }
    if (props.currentPath === "/cards") {
      return 4;
    }
  };

  return (
    <AppBar position="absolute" color="default" className={classes.appBar}>
      <Toolbar>
        <Grid container spacing={24} alignItems="baseline">
          <Grid item xs={12} className={classes.flex}>
            <div className={classes.inline}>
              <Typography variant="h6" color="inherit" noWrap>
                <Link to="/" className={classes.link}>
                  <img width={30} alt="logo" src={logo} />
                  <span className={classes.tagline}>NeuroMarker</span>
                </Link>
              </Typography>
            </div>
            {!props.noTabs && (
              <React.Fragment>
                <div className={classes.productLogo}>
                  <Typography>An A.I. Based E-Commerce</Typography>
                </div>
                <div className={classes.iconContainer}>
                  <IconButton
                    onClick={mobileMenuOpen}
                    className={classes.iconButton}
                    color="inherit"
                    aria-label="Menu"
                  >
                    <MenuIcon />
                  </IconButton>
                </div>
                <div className={classes.tabContainer}>
                  <SwipeableDrawer
                    anchor="right"
                    open={menuDrawer}
                    onClose={mobileMenuClose}
                    onOpen={mobileMenuOpen}
                  >
                    <AppBar title="Menu" />
                    <List>
                      {Menu.map((item, index) => (
                        <ListItem
                          component={Link}
                          to={{
                            pathname: item.pathname,
                            search: props.location.search
                          }}
                          button
                          key={item.label}
                        >
                          <ListItemText primary={item.label} />
                        </ListItem>
                      ))}
                    </List>
                  </SwipeableDrawer>
                  <Tabs
                    value={current() || value}
                    indicatorColor="primary"
                    textColor="primary"
                    onChange={handleChange}
                  >
                    {Menu.map((item, index) => (
                      <Tab
                        key={index}
                        component={Link}
                        to={{
                          pathname: item.pathname,
                          search: props.location.search
                        }}
                        classes={{ root: classes.tabItem }}
                        label={item.label}
                      />
                    ))}
                  </Tabs>
                </div>
              </React.Fragment>
            )}
          </Grid>
        </Grid>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(withStyles(styles)(Navbar));
