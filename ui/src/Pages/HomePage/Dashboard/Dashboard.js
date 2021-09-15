import React, {useState, useEffect} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Grid from "@material-ui/core/Grid";
import SimplePaper from "./Paper";


const useStyles = makeStyles((theme) => ({
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

const Dashboard = ({ data, sendMessage, ...props }) => {
  console.log(data)
  const classes = useStyles();
  const colours = ['blue', 'orange', 'red', 'green'];
  const [detailsData, setDetailsData] = useState([]);
  
  useEffect(() => {
    if (typeof data === 'object' && data.length > 0) {
      data.forEach((detail, index) => {
        let newDetails = detailsData;
        newDetails.push({ background: colours[index%4],front: 'white', userId: detail.userId, name: (detail.firstName+detail.lastName), role: detail.role })
        setDetailsData(newDetails);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data]);

  return (
    <>
      <div className={classes.root}>
        <Grid container className={classes.MainWrapper} >
          <Grid item xs={12}>
            <Grid className={classes.boxContainer} container>
              {detailsData
                ? detailsData.map((value, index) => {
                  return <SimplePaper name={value.name} userId={value.userId} ClickMe={ sendMessage } foreColor={value?.front} role={value?.role} bgColor={value.background} key={index} />
                })
                : null
              } 
            </Grid>
          </Grid>
        </Grid>

      </div>
    </>
  );
};

export default Dashboard;
