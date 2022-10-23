import React, { useContext } from "react";
import { Box } from '@material-ui/core';
import { DrumKit, JSClock, CitySearch, FlexPanel } from "../../components/projects/JSThirtyProjects";
import { JsProjectContext } from '../../context/use-current-project';

const JSThirty = () => {
  const { currentProject } = useContext(JsProjectContext);

  console.log("currentProject", currentProject)

  const renderComponent = () => {
    switch (currentProject) {
      case "Drum kit":
        return <DrumKit />;
      case "Flex panel":
        return <FlexPanel />;
      case "CSS + JS Clock":
        return <JSClock />;
      case "City search":
        return <CitySearch />;
      default:
        return <></>
    }
  }

  return (
    <Box>
      {renderComponent()}
    </Box>
  )
};

export default JSThirty;