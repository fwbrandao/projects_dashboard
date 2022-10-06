import React from "react";
import {
  Box,
  makeStyles,
} from '@material-ui/core';
import City from "../../../images/city.jpg";

const useStyles = makeStyles(() => ({
  root: {
    height: "100vh",
    paddingTop: "100px",
    boxSizing: "border-box",
    // background: "#ffc600",
    fontFamily: "helvetica neue",
    fontSize: "20px",
    fontWeight: "200",
    backgroundImage: `url(${City})`,
    backgroundSize: "cover"
  },
  search: {
    width: "100%",
    padding: "20px",
    margin: 0,
    textAlign: "center",
    outline: 0,
    border: "10px solid #F7F7F7",
    width: "120%",
    left: "-10%",
    position: "relative",
    top: "10px",
    zIndex: 2,
    borderRadius: "5px",
    fontSize: "40px",
    boxShadow: "0 0 5px rgba(0, 0, 0, 0.12), inset 0 0 2px rgba(0, 0, 0, 0.19)",
  },
  searchForm: {
    maxWidth: "400px",
    margin: "50px auto",
  },
  suggestions: {
    margin: 0,
    padding: 0,
    position: "relative",
  },
  // span.population {
  //   font-size: 15px;
  // }

  // .hl {
  //   background:#ffc600;
  // }
}));

const CitySearch = () => {
  const classes = useStyles();

  return (
    <Box className={classes.root}>
      <form className={classes.searchForm}>
        <input type="text" className={classes.search} placeholder="City or State" />
        <ul className={classes.suggestions}>
          <li>Filter for a city</li>
          <li>or a state</li>
        </ul>
      </form>
    </Box>
  );
};

export default CitySearch;

