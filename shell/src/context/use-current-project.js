import React, { createContext, useMemo, useState } from 'react';

export const JsProjectContext = createContext();

const JsProjectProvider = (props) => {
  // State to hold the selected project name
  const [currentProject, setCurrentProject] = useState("");

  const setProject = (projectName) => {
    setCurrentProject(projectName)
  }

  const values = useMemo(() => ({
    currentProject,
    setProject
  }), [currentProject]);

  return (
    <JsProjectContext.Provider value={values}>
      {props.children}
    </JsProjectContext.Provider>
  )
}

export default JsProjectProvider;