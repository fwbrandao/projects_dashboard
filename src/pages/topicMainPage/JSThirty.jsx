import React, { useContext } from "react";
import { Box } from '@material-ui/core';
import NavBar from '../../core/navBar/index';
import { DrumKit, JSClock } from "../../components/projects/JSThirtyProjects";
import { JsProjectContext } from '../../context/use-current-project';

const JSThirty = () => {
  const { currentProject } = useContext(JsProjectContext);

  const renderComponent = () => {
    switch (currentProject) {
      case "Drum kit":
        return <DrumKit />;
      case "CSS + JS Clock":
        return <JSClock />;
      default:
        return <></>
    }
  }

  return (
    <Box>
      <NavBar />
      {renderComponent()}
    </Box>
  )
};

export default JSThirty;