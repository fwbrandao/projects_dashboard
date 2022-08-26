import React, { useState, createContext } from 'react'

const JSThirtyContext = createContext();

const JSThirtyDispatchContext = createContext();

function JSThirtyProvider({ children }) {
  const [project, setProject] = useState({
    projectName: ""
  })


  return (
    <JSThirtyContext.Provider value={project}>
      <JSThirtyDispatchContext.Provider value={setProject}>
        {children}
      </JSThirtyDispatchContext.Provider>
    </JSThirtyContext.Provider>
  )
}

export { JSThirtyContext, JSThirtyProvider, JSThirtyDispatchContext }