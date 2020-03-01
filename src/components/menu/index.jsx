import React from 'react';
import {
    withStyles,
    Menu,
    MenuItem,
    ListItemIcon,
    ListItemText,
    IconButton,
    makeStyles
} from '@material-ui/core';
import InboxIcon from '@material-ui/icons/MoveToInbox';
import MenuIcon from '@material-ui/icons/Menu';
import FindInPageIcon from '@material-ui/icons/FindInPage';
import DescriptionIcon from '@material-ui/icons/Description';

const useStyles = makeStyles(theme => ({
    menuButton: {
        marginRight: theme.spacing(2),
    },
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
                <StyledMenuItem>
                    <ListItemIcon>
                        <FindInPageIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Fake News Detector" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <DescriptionIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Document Analysis NLP" />
                </StyledMenuItem>
                <StyledMenuItem>
                    <ListItemIcon>
                        <InboxIcon fontSize="small" />
                    </ListItemIcon>
                    <ListItemText primary="Inbox" />
                </StyledMenuItem>
            </StyledMenu>
        </div>
    );
}
