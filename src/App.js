import React from "react";
import { makeStyles } from '@material-ui/core/styles';

import AppBar from './components/AppBar';
import AppMenu from './components/AppMenu';
import Grid from './components/Grid';

const useStyles = makeStyles((theme) => ({
  root: {
    display: 'flex',
  },
}));

export default function App() {
  const classes = useStyles();
  return (
    <div className={classes.root}>
      <AppMenu />
      <Grid />     
    </div>
  );
}
