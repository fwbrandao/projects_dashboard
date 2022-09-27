import React from 'react';
import {
  makeStyles,
  Accordion,
  AccordionDetails,
  AccordionSummary,
  Typography
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
  root: {
    width: '100%',
    marginBottom: '15px',
  },
  expansionPanel: {
    backgroundColor: theme.palette.primary.main
  },
  heading: {
    fontSize: theme.typography.pxToRem(15),
    flexBasis: '33.33%',
    flexShrink: 0,
  },
  secondaryHeading: {
    fontSize: theme.typography.pxToRem(15),
    color: theme.palette.text.secondary,
  },
}));

const ControlledExpansionPanels = ({
  firstHeader,
  firstText,
  secondHeader,
  secondText,
  thirdHeader,
  thirdText
}) => {
  const classes = useStyles();
  const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

  return (
    <div className={classes.root} >
      <Accordion className={classes.expansionPanel} expanded={expanded === 'panel1'} onChange={handleExpansion('panel1')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel1bh-content"
          id="panel1bh-header"
        >
          <Typography className={classes.heading}>{firstHeader}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{firstText}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.expansionPanel} expanded={expanded === 'panel2'} onChange={handleExpansion('panel2')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel2bh-content"
          id="panel2bh-header"
        >
          <Typography className={classes.heading}>{secondHeader}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{secondText}</Typography>
        </AccordionDetails>
      </Accordion>
      <Accordion className={classes.expansionPanel} expanded={expanded === 'panel3'} onChange={handleExpansion('panel3')}>
        <AccordionSummary
          expandIcon={<ExpandMoreIcon />}
          aria-controls="panel3bh-content"
          id="panel3bh-header"
        >
          <Typography className={classes.heading}>{thirdHeader}</Typography>
        </AccordionSummary>
        <AccordionDetails>
          <Typography>{thirdText}</Typography>
        </AccordionDetails>
      </Accordion>
    </div>
  );
}

export default ControlledExpansionPanels;
