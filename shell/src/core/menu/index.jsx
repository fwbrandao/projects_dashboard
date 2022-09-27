import React, { useCallback, useContext } from 'react';
import { Link } from 'react-router-dom';
import { JsProjectContext } from '../../context/use-current-project';
import {
    withStyles,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    makeStyles,
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Typography
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import HomeIcon from '@material-ui/icons/Home';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import {
    menuList_CNN,
    menuList_DEP,
    menuList_NLP,
    menuList_JSThirty,
} from './menuList';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    link: {
        textDecoration: 'none',
        color: theme.palette.textPrimary.main
    },
    expansionPanel: {
        backgroundColor: theme.palette.primary.main,
    }
}));

const StyledMenu = withStyles(theme => ({
    paper: {
        backgroundColor: theme.palette.primary.main,
    },
}))(props => (
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
    const { setProject } = useContext(JsProjectContext);
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

    const handleOpen = useCallback((id) => {
        setProject(id);
    }, [setProject]);

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



                {menuList_JSThirty.map(topic => (
                    <Accordion key={topic.topic} className={classes.expansionPanel} expanded={expanded === 'panel4'} onChange={handleExpansion('panel4')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel4bh-content"
                            id="panel4bh-header"
                        >
                            <Typography className={classes.heading}>{topic.topic}</Typography>
                        </AccordionSummary>
                        {topic.items.map(item => (
                            <Link key={item.title} to={item.link} className={classes.link} onClick={() => handleOpen(item.projectId)}>
                                <StyledMenuItem>
                                    <AccordionDetails>
                                        <Typography>{item.title}</Typography>
                                    </AccordionDetails>
                                </StyledMenuItem>
                            </Link>
                        ))}
                    </Accordion>
                ))}

                {menuList_CNN.map(topic => (
                    <Accordion key={topic.topic} className={classes.expansionPanel} expanded={expanded === 'panel1'} onChange={handleExpansion('panel1')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel1bh-content"
                            id="panel1bh-header"
                        >
                            <Typography className={classes.heading}>{topic.topic}</Typography>
                        </AccordionSummary>
                        {topic.items.map(item => (
                            <Link key={item.title} to={item.link} className={classes.link} >
                                <StyledMenuItem>
                                    <AccordionDetails>
                                        <Typography>{item.title}</Typography>
                                    </AccordionDetails>
                                </StyledMenuItem>
                            </Link>
                        ))}
                    </Accordion>
                ))}

                {menuList_DEP.map(topic => (
                    <Accordion key={topic.topic} className={classes.expansionPanel} expanded={expanded === 'panel2'} onChange={handleExpansion('panel2')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel2bh-content"
                            id="panel2bh-header"
                        >
                            <Typography className={classes.heading}>{topic.topic}</Typography>
                        </AccordionSummary>
                        {topic.items.map(item => (
                            <Link key={item.title} to={item.link} className={classes.link} >
                                <StyledMenuItem>
                                    <AccordionDetails>
                                        <Typography>{item.title}</Typography>
                                    </AccordionDetails>
                                </StyledMenuItem>
                            </Link>
                        ))}
                    </Accordion>
                ))}

                {menuList_NLP.map(topic => (
                    <Accordion key={topic.topic} className={classes.expansionPanel} expanded={expanded === 'panel3'} onChange={handleExpansion('panel3')}>
                        <AccordionSummary
                            expandIcon={<ExpandMoreIcon />}
                            aria-controls="panel3bh-content"
                            id="panel3bh-header"
                        >
                            <Typography className={classes.heading}>{topic.topic}</Typography>
                        </AccordionSummary>
                        {topic.items.map(item => (
                            <Link key={item.title} to={item.link} className={classes.link} >
                                <StyledMenuItem>
                                    <AccordionDetails>
                                        <Typography>{item.title}</Typography>
                                    </AccordionDetails>
                                </StyledMenuItem>
                            </Link>
                        ))}
                    </Accordion>
                ))}

                <Link to="/fake-news-detector" className={classes.link} >
                    <StyledMenuItem>
                        <ListItemIcon>
                            <FindInPageIcon fontSize="small" />
                        </ListItemIcon>
                        <ListItemText primary="Fake News Detector" />
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
