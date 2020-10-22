import React from 'react';
import { Link } from 'react-router-dom'

import {
    withStyles,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    makeStyles,
    ExpansionPanel,
    ExpansionPanelDetails,
    ExpansionPanelSummary,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DescriptionIcon from '@material-ui/icons/Description';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.textPrimary.main
    }
}));

const StyledMenu = withStyles({
    paper: {
        // border: '1px solid #000',
    },
})(props => (
    <Menu
        elevation={0}
        getContentAnchorEl={null}
        anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'center',
        }}
        transformOrigin={{
            vertical: 'top',
            horizontal: 'center',
        }}
        {...props}
    />
));

const StyledMenuItem = withStyles(theme => ({
    root: {
        '&:focus': {
            backgroundColor: theme.palette.primary.main,
            '& .MuiListItemIcon-root, & .MuiListItemText-primary': {
                color: theme.palette.common.white,
            },
        },
    },
}))(MenuItem);

export default function ProjectsMenu() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);
    const [expanded, setExpanded] = React.useState(false);

  const handleExpansion = panel => (event, isExpanded) => {
    setExpanded(isExpanded ? panel : false);
  };

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

    const MenuItem = (link, text) => (
        <Link to={link} className={classes.link} >
            <StyledMenuItem>
                <ExpansionPanelDetails>
                    <Typography>{text}</Typography>
                </ExpansionPanelDetails>
            </StyledMenuItem>
        </Link>
    )
    return (
        <div>
            <IconButton
                edge="start"
                className={classes.menuButton}
                color="inherit"
                aria-label="menu"
                onClick={handleClick}
            >
                <MenuIcon />
            </IconButton>
            <StyledMenu
                id="customized-menu"
                anchorEl={anchorEl}
                keepMounted
                open={Boolean(anchorEl)}
                onClose={handleClose}
            >
                <Link to="/" className={classes.link}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <HomeIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Home" />
                    </StyledMenuItem>
                </Link>

                <ExpansionPanel expanded={expanded === 'panel1'} onChange={handleExpansion('panel1')}>
                    <ExpansionPanelSummary
                        expandIcon={<ExpandMoreIcon />}
                        aria-controls="panel1bh-content"
                        id="panel1bh-header"
                    >
                        <Typography className={classes.heading}>CNN</Typography>
                    </ExpansionPanelSummary>

                    <Link to="/fakeNewsDetector" className={classes.link} >
                        <StyledMenuItem>
                            <ExpansionPanelDetails>
                                <Typography>Autonomous Driving</Typography>
                            </ExpansionPanelDetails>
                        </StyledMenuItem>
                    </Link>

                    <Link to="/fakeNewsDetector" className={classes.link} >
                        <StyledMenuItem>
                            <ExpansionPanelDetails>
                                <Typography>Residual Networks</Typography>
                            </ExpansionPanelDetails>
                        </StyledMenuItem>
                    </Link>

                    <ExpansionPanelDetails>
                        <Typography>ConvNet & TensorFlow</Typography>
                    </ExpansionPanelDetails>


                    <ExpansionPanelDetails>
                        <Typography>Keras Introduction</Typography>
                    </ExpansionPanelDetails>
                </ExpansionPanel>

                <Link to="/fakeNewsDetector" className={classes.link} >
                    <StyledMenuItem>
                        <ListItemIcon>
                            <FindInPageIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Fake News Detector" />
                    </StyledMenuItem>
                </Link>

                <Link to="/DocumentAnalysisNLP" className={classes.link}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <DescriptionIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Document Analysis NLP" />
                    </StyledMenuItem>
                </Link>

                <Link to="/FaceRecognition" className={classes.link}>
                    <StyledMenuItem>
                        <ListItemIcon>
                            <InsertEmoticonIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Face Recognition" />
                    </StyledMenuItem>
                </Link>
            </StyledMenu>
        </div>
    );
}
