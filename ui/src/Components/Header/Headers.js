import React from "react";
import clsx from "clsx";

import { makeStyles } from "@material-ui/core/styles";

import { connect } from "react-redux";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import CssBaseline from "@material-ui/core/CssBaseline";
import Typography from "@material-ui/core/Typography";
import { Button } from "@material-ui/core";
import { LogoutTheUser } from "../../reducer/Auth/Auth.Action";

const drawerWidth = 260;

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
  },
  appBar: {
    zIndex: theme.zIndex.drawer + 1,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    background: "#1976d2",
  },
  appBarShift: {
    marginLeft: drawerWidth,
    width: `calc(100% - ${drawerWidth}px)`,
    transition: theme.transitions.create(["width", "margin"], {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  menuButton: {
    marginRight: 36,
  },
  hide: {
    display: "none",
  },
  drawer: {
    width: drawerWidth,
    flexShrink: 0,
    whiteSpace: "nowrap",
  },
  drawerOpen: {
    width: drawerWidth,
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.enteringScreen,
    }),
  },
  drawerClose: {
    transition: theme.transitions.create("width", {
      easing: theme.transitions.easing.sharp,
      duration: theme.transitions.duration.leavingScreen,
    }),
    overflowX: "hidden",
    width: theme.spacing(7) + 1,
    [theme.breakpoints.up("sm")]: {
      width: theme.spacing(9) + 1,
    },
  },
  toolbar: {
    display: "flex",
    alignItems: "center",
    justifyContent: "flex-end",
    padding: theme.spacing(0, 1),
    // necessary for content to be below app bar
    ...theme.mixins.toolbar,
  },
  content: {
    flexGrow: 1,
    padding: theme.spacing(3),
  },
  headingName: {
    color: "white",
    textDecoration: "none"
  },
  listText: {
    textDecoration: "none",
  },
  listLink: {textDecoration: "none", color: "inherit"},
}));

function Header(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <CssBaseline />
      <AppBar
        position='fixed'
        style={{backgroundColor: "#000"}}
        className={clsx(classes.appBar)}>
        <Toolbar>
          {/* <IconButton
            color='inherit'
            aria-label='open drawer'
            onClick={handleDrawerOpen}
            edge='start'
            className={clsx(classes.menuButton, {
              [classes.hide]: open,
            })}>
            <MenuIcon />
          </IconButton> */}
          <Typography variant='h6' noWrap style={{width: "-webkit-fill-available"}}>
              Socket Communiaction | {props.role} View
          </Typography>
          <Typography style={{marginRight: '10px'}}>
            {props.email}
          </Typography>
          <Button color="secondary" size="small" variant="contained" onClick={() => {props?.userLogout()}} >Logout</Button>
        </Toolbar>
      </AppBar>
      
    </div>
  );
}

const mapStateToProps = (state) => {
  return {
    isLogin: state.isLogin,
    role: state.role,
    firstName: state.firstName,
    lastName: state.lastName,
    email: state.email,
  };
};

const mapDispatchToProps = (dispatch) => {
  return {
    userLogout: () => {
      dispatch(LogoutTheUser());
    },
  };
};

export default connect( mapStateToProps,mapDispatchToProps ) (Header);