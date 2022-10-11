import React, { useEffect, useState, useCallback } from "react";
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
    backgroundSize: "cover",
    overflow: "hidden"
  },
  search: {
    width: "100%",
    padding: "20px",
    margin: 0,
    textAlign: "center",
    outline: 0,
    border: "10px solid #F7F7F7",
    width: "120%",
    left: "-17%",
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
    '@media (max-width: 1024px)': {
      maxWidth: "300px",
    }
  },
  suggestions: {
    margin: 0,
    padding: 0,
    position: "relative",
    height: "100vh",
    overflow: "scroll",
    "& li": {
      background: "white",
      listStyle: "none",
      borderBottom: "1px solid #D8D8D8",
      boxShadow: "0 0 10px rgba(0, 0, 0, 0.14)",
      margin: 0,
      padding: "20px",
      transition: "background 0.2s",
      display: "flex",
      justifyContent: "space-between",
      textTransform: "capitalize",
    },
    "& li:nth-child(even)": {
      transform: "perspective(100px) rotateX(3deg) translateY(2px) scale(1.001)",
      background: "linear-gradient(to bottom,  #ffffff 0%,#EFEFEF 100%)",
    },
    "& li:nth-child(odd)": {
      transform: "perspective(100px) rotateX(-3deg) translateY(3px)",
      background: "linear-gradient(to top,  #ffffff 0%,#EFEFEF 100%)",
    }
  },
  population: {
    fontSize: "15px",
  },
  hl: {
    background: "#ffc600",
  }
}));

const CitySearch = () => {
  const classes = useStyles();
  const [cities, setCities] = useState([]);
  const [cityValue, setCityValue] = useState("");

  const endpoint = 'https://gist.githubusercontent.com/Miserlou/c5cd8364bf9b2420bb29/raw/2bf258763cdddd704f8ffd3ea9a3e81d25e2c6f6/cities.json';

  useEffect(() => {
    fetch(endpoint)
      .then(blob => blob.json())
      .then(data => setCities([...data]))
  }, [cityValue]);

  function findMatches(wordToMatch, cities) {
    return cities.filter(place => {
      const regex = new RegExp(wordToMatch, 'gi');

      return place.city.match(regex) || place.state.match(regex);
    });
  }

  function numberWithCommas(x) {
    return x.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
  }

  const displayMatches = useCallback(() => {
    if (!cityValue) return;

    const matchArray = findMatches(cityValue, cities);
    const html = matchArray.map((place, index)=> {
      const regex = new RegExp(cityValue, 'gi');
      const cityName = place.city.replace(regex, cityValue);
      const stateName = place.state.replace(regex, cityValue);
      return (
        <li key={index}>
          <span>
            <span className={classes.hl}>{cityName}</span>,
            <span className={classes.hl}>{stateName}</span>
          </span>
          <span className={classes.population}>{`${numberWithCommas(place.population)}`}</span>
        </li>
      );
    });

    return html;
  }, [cityValue, setCityValue])


  return (
    <Box className={classes.root}>
      <form className={classes.searchForm}>
        <input
          type="text"
          className={classes.search}
          placeholder="U.S. City or State"
          value={cityValue}
          onChange={(e) => setCityValue(e.target.value)}
        />
        <ul className={classes.suggestions}>
          <li>Filter for a city</li>
          <li>or a state</li>
          {displayMatches()}
        </ul>
      </form>
    </Box>
  );
};

export default CitySearch;

