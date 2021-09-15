import React, { Fragment, useState, useEffect } from 'react';
import { connect } from 'react-redux';
import Table from '@material-ui/core/Table';
import { makeStyles } from '@material-ui/core/styles';
import TableBody from '@material-ui/core/TableBody';
import TableCell from '@material-ui/core/TableCell';
import TableContainer from '@material-ui/core/TableContainer';
import TableHead from '@material-ui/core/TableHead';
import TableRow from '@material-ui/core/TableRow';
import Paper from '@material-ui/core/Paper';
import { LogoutTheUser } from '../../reducer/Auth/Auth.Action';
import axios from 'axios';
import { io } from 'socket.io-client';
import jwt from 'jsonwebtoken';
import { baseApiUrl } from '../../Config/app.config';
import { Button, Grid, Typography } from '@material-ui/core';
import SimplePaper from './Dashboard/Paper';
import Headers from '../../Components/Header/Headers';
import { Bounce, toast } from 'react-toastify';
const useStyles = makeStyles(theme => ({
  container: {
    backgroundColor: '#fff',
    boxShadow: 'rgba(50, 50, 93, 0.25) 0px 6px 12px -2px, rgba(0, 0, 0, 0.3) 0px 3px 7px -3px',
    padding: '1rem',
    width: '85%',
    minWidth: '600px'
  },
  table: {
    minWidth: 650,
  },
  tableText: {
    color: 'black',
    // textShadow: '0 0 3px black, 0 0 8px slategray',
  },
  tableBox: {
    display: 'flex',
    justifyContent: 'center',
    marginTop: '100px',
  },
  root: { flexGrow: 0, width: '100%', },
  MainWrapper: {
    paddingTop: "100px",
    width: '100%',
    flexWrap: 'wrap',
  },
  skeleton: {
    margin: "10px",
  },
  paper: {
    width: '150px',
  },
  selectEmpty: {
    marginTop: theme.spacing(2),
  },
  boxContainer: {
    margin: '15px 0',

  },
}));
const socket = io(`${baseApiUrl}`);
socket.on('connect', () => {
  console.log('emmitted login user ')
  const {_id} = jwt.decode(localStorage.getItem('token'));
  socket.emit('loggedin_user', _id );
});
socket.on('notification_received_by_admin', message => {
  console.log(message);
  toast.info(message, {
    position: "top-right",
    autoClose: 4000,
    hideProgressBar: false,
    closeOnClick: true,
    pauseOnHover: true,
    draggable: true,
    progress: undefined,
    transition: Bounce,
  });
});
function HomePage(props) {
  const classes = useStyles();
  const [rows, setRows] = useState([]);
  useEffect(() => {
    axios.get(`${baseApiUrl}/api/users`, {
      headers: {
        'Authorization': `Bearer ${localStorage.getItem('token')}`
      }
    }).then(response => {
      setRows(response.data.result);
    }).catch(err => {
      // console.log(err.response);
    })
  }, []);

  //for socket connection

  const sendMessageToTheClient = (clientId) => {
    socket.emit('send_notifications', clientId);
  };

  const colours = ['blue', 'orange', 'red', 'green'];

  if (props.role === 'user') {
    return (
      <Fragment>
        <Headers />

        {
          <div className={classes.root}>
            <Grid container className={classes.MainWrapper} >
              <Grid item xs={12}>
                <Typography variant='h5' style={{ marginLeft: '.4rem', color: 'white', }} >
                  Logged in as:
                </Typography>
                <Grid className={classes.boxContainer} container>
                  {rows
                    ? rows.map((value, index) => {
                      if (value.userId === props.ownId)
                        return <SimplePaper name={value.firstName + " " + value.lastName} userId={value.userId} ClickMe={() => { }} foreColor={'white'} role={value?.role} bgColor={colours[index % 4]} key={index} />
                    })
                    : null
                  }
                </Grid>
              </Grid>
            </Grid>

          </div>
        }
      </Fragment >
    );
  }

  return (
    <Fragment>
      <Headers />
      
      <div className={classes.tableBox}>
        <TableContainer component={Paper} className={classes.container}>
          <Table className={classes.table} size="small" aria-label="a dense table">
            <TableHead>
              <TableRow style={{backgroundColor: 'blue', }}>
                <TableCell style={{ minWidth: '120', color: 'white', }} className={classes.tableHeadText} variant='head' align='center'>Id</TableCell>
                <TableCell style={{ minWidth: '120', color: 'white', }} className={classes.tableHeadText} variant='head' align='center'>Firstname</TableCell>
                <TableCell style={{ minWidth: '120', color: 'white', }} className={classes.tableHeadText} variant='head' align='center'>Lastname</TableCell>
                <TableCell style={{ minWidth: '120', color: 'white', }} className={classes.tableHeadText} variant='head' align='center'>Role</TableCell>
                <TableCell style={{ minWidth: '120', color: 'white', }} className={classes.tableHeadText} variant='head' align='center'>Mail Address</TableCell>
                <TableCell style={{ minWidth: '120', color: 'white', }} className={classes.tableHeadText} variant='head' align='center'>Send Message</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {rows.map((row, index) => (
                <TableRow key={index}>
                  <TableCell className={classes.tableText} align="center" component="th" scope="row">
                    {row.userId}
                  </TableCell>
                  <TableCell className={classes.tableText} align='center'>{row.firstName}</TableCell>
                  <TableCell className={classes.tableText} align='center'>{row.lastName}</TableCell>
                  <TableCell className={classes.tableText} align='center'>{row.role}</TableCell>
                  <TableCell className={classes.tableText} align='center'>{row.email}</TableCell>
                  <TableCell className={classes.tableText} align='center'>
                    <Button variant='contained' onClick={_ => sendMessageToTheClient(row.userId)} color='primary' >Notify</Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </TableContainer>
      </div>

    </Fragment >
  )
}
const mapStateToProps = (state) => {
  return {
    ownId: state._id,
    role: state.role,
  }
};

const mapDispatchToProps = (dispatch) => {
  return {
    Logout: () => {
      dispatch(LogoutTheUser)
    }
  }
};

export default connect(mapStateToProps, mapDispatchToProps)(HomePage);
