import React from 'react';
import { createStyles, Theme, makeStyles } from '@material-ui/core/styles';
import Avatar from '@material-ui/core/Avatar';
import Chip from '@material-ui/core/Chip';
import DoneIcon from '@material-ui/icons/Done';
import { Link } from "react-router-dom";
import { withRouter } from "react-router-dom";

const useStyles = makeStyles((theme: Theme) =>
  createStyles({
    root: {
      display: 'flex',
      justifyContent: 'center',
      flexWrap: 'wrap',
    },
    chip: {
      margin: theme.spacing(1),
    },
  }),
);

 function Chips() {
  const classes = useStyles();

  function handleDelete() {
    alert('You clicked the delete icon.');
  }


  return (
    <div className={classes.root}>
       <Link  to={`https://www.davivienda.com/wps/portal/personas/nuevo`}>
      <Chip
        avatar={<Avatar>DV</Avatar>}
        label="DAVIVIENDA BANCK"
        clickable
        className={classes.chip}
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      </Link>
      <Link  to={`https://www.davivienda.com/wps/portal/personas/nuevo`}>
      <Chip
        avatar={<Avatar>BG</Avatar>}
        label="BOGOTA BANCK"
        clickable
        className={classes.chip}
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      </Link>
      <Link  to={`https://www.davivienda.com/wps/portal/personas/nuevo`}>
      <Chip
        avatar={<Avatar>BC</Avatar>}
        label="COLOMBIANBANCK"
        clickable
        className={classes.chip}
        color="primary"
        onDelete={handleDelete}
        deleteIcon={<DoneIcon />}
      />
      </Link>
      
    </div>
  );
} 
export default withRouter(Chips) 