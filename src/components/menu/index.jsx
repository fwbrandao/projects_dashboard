import React from 'react';
import { Link } from "react-router-dom";
import {
    withStyles,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    makeStyles
} from '@material-ui/core';
import MenuIcon from '@material-ui/icons/Menu';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DescriptionIcon from '@material-ui/icons/Description';
import InsertEmoticonIcon from '@material-ui/icons/InsertEmoticon';
import HomeIcon from '@material-ui/icons/Home';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
    link: {
        textDecoration: 'none'
    }
}));

const StyledMenu = withStyles({
    paper: {
        border: '1px solid #d3d4d5',
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

export default function CustomizedMenus() {
    const classes = useStyles();
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClick = event => {
        setAnchorEl(event.currentTarget);
    };

    const handleClose = () => {
        setAnchorEl(null);
    };

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
