import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Paper from "@material-ui/core/Paper";
import { Typography } from "@material-ui/core";

const useStyles = makeStyles((theme) => ({
  root: {
    display: "flex",
    flexWrap: "wrap",
    "& > *": {
      margin: theme.spacing(1),
      width: theme.spacing(16),
      height: theme.spacing(16),
    },
  },
  paper: {
    width: 220,
    height: 100,
    cursor: 'pointer',
  },
  TextWrapper: {
    display: "flex",
  },
  linkText: {
    textDecoration: 'none',
    color: 'inherit',
  },
  paperText: {
    padding: theme.spacing(1),
    fontSize: "20px",
    textDecoration: 'none',
    textAlign: "center",
    textShadow: '0 0 3px black',
    color: 'black',
  },
}));

export default function SimplePaper(props) {
  const classes = useStyles();

  return (
    <div className={classes.root}>
      <Paper onClick={ _ => { props.ClickMe(props.userId) } } elevation={3} variant="elevation" className={classes.paper} style={{ backgroundColor: `${props.bgColor}` }}>
        <div className='TextWrapper'>
          <Typography varient='subtitle2' className={classes.paperText} style={{ color: props.foreColor }}>
            {props?.name}
          </Typography>
          <Typography varient='subtitle2' className={classes.paperText} style={{ color: props.foreColor }}>
            Role: {props?.role}
          </Typography>
        </div>
      </Paper>
    </div>
  );

}
