import React from 'react';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
	container: {
		display: 'flex'
	}
})

const Home = () => {
  const classes = useStyles();

  return (
    <div className={classes.container}>
      <h1>Homepage (WIP)</h1>
    </div>
  );
};

export default Home;
