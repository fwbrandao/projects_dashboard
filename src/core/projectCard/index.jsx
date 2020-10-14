import React, { useState } from 'react';
import {
    Box,
    Button,
    Card,
    CardActionArea,
    CardActions,
    CardContent,
    CardMedia,
    IconButton,
    makeStyles,
    Typography,
} from '@material-ui/core';
import GitHubIcon from '@material-ui/icons/GitHub';
import FavoriteIcon from '@material-ui/icons/Favorite';

const useStyles = makeStyles(theme => ({
  root: {
    maxWidth: 545,
    maxHeight: 290,
    backgroundColor: theme.palette.secondary.main,
    color: theme.palette.primary.main
  },
  media: {
    height: 120,
  },
  iconLiked: {
      marginLeft: 'auto',
      color: theme.palette.primary.heart
  },
  iconNotLiked: {
    marginLeft: 'auto',
    color: theme.palette.primary.main
  }
}));

const ProjectCard = ({ data }) => {
  const classes = useStyles();
  const [isLiked, setIsLiked] = useState(false);

  const handleLike = () => {
    setIsLiked(!isLiked)
  }

  return (
      <Card className={classes.root} boxShadow={3}>
        <CardActionArea>
          <CardMedia
            className={classes.media}
            image="/static/images/cards/contemplative-reptile.jpg"
            title="Contemplative Reptile"
          />
          <CardContent>
            <Typography gutterBottom variant="h5" component="h2">
              {data.projectTitle}
            </Typography>
            <Typography variant="body2" color="textPrimary" component="p">
              {data.projectIntro}
            </Typography>
          </CardContent>
        </CardActionArea>
        <CardActions disableSpacing>
          <Button size="small" color="primary">
            View Project
          </Button>
          <IconButton
              className={isLiked ? classes.iconLiked : classes.iconNotLiked}
              onClick={handleLike}
              aria-label="add to favorites"
          >
            <FavoriteIcon />
          </IconButton>
          <IconButton aria-label="github">
            <GitHubIcon />
          </IconButton>
        </CardActions>
      </Card>
  );
};

export default ProjectCard;
