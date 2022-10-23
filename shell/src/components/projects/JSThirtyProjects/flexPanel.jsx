import React from "react";
import {
  makeStyles,
} from '@material-ui/core';


const useStyles = makeStyles(() => ({}));

const FlexPanel = () => {
  const classes = useStyles();

  return (
    <div class="panels">
      <div class="panel panel1">
        <p>Let's</p>
        <p>Code</p>
        <p>Guys</p>
      </div>
      <div class="panel panel2">
        <p>It</p>
        <p>Is</p>
        <p>Amazing</p>
      </div>
      <div class="panel panel3">
        <p>Will Be</p>
        <p>Great</p>
        <p>Fun</p>
      </div>
      <div class="panel panel4">
        <p>Now</p>
        <p>And</p>
        <p>Ever</p>
      </div>
      <div class="panel panel5">
        <p>Have a</p>
        <p>Fun</p>
        <p>Day</p>
      </div>
    </div>
  );
};

export default FlexPanel;

