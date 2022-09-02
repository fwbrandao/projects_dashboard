import React, { useContext } from "react";
import { JSThirtyContext } from '../../context/use-js-thirty-project';
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
  const project = useContext(JSThirtyContext);

  const renderComponent = () => {
    switch (project) {
      case "Drum kit":
        return <DrumKit />
      default:
        return <></>
    };
  }

  return (
    <Box>
      <NavBar />
      {renderComponent()}
    </Box>
  )
};

export default JSThirty;