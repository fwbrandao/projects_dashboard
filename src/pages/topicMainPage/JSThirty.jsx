import React from "react";
import {
  Box,
  makeStyles,
} from '@material-ui/core';
import NavBar from '../../core/navBar/index';
import { DrumKit } from "../../components/projects/JSThirtyProjects";

const useStyles = makeStyles(() => ({
}))

const JSThirty = () => {
  const classes = useStyles();

  const renderComponent = () => {
    return(
      <DrumKit />
    )
  }

  return (
    <Box>
      <NavBar />
      {renderComponent()}
    </Box>
  )
};

export default JSThirty;