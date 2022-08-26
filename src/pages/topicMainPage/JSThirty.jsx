import React, { useContext } from "react";
import { JSThirtyContext } from '../../context/use-js-thirty-project';
import {
  Box,
  makeStyles,
} from '@material-ui/core';
import NavBar from '../../core/navBar/index';

const useStyles = makeStyles(theme => ({
}))

const JSThirty = () => {
  const classes = useStyles();
  const project = useContext(JSThirtyContext);

  console.log("project", project);
  return (
    <Box>
      <NavBar />
      <div>{project}</div>
    </Box>
  )
};

export default JSThirty;