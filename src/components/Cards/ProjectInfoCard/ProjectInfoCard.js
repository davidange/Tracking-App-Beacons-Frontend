import React from 'react';
import useStyles from './useStyles';
import Card from '@material-ui/core/Card';
import CardActions from '@material-ui/core/CardActions';
import CardContent from '@material-ui/core/CardContent';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';

const ProjectInfoCard=props=> {
  const classes = useStyles();
  const {projectName,projectTeam}=props

  return (
    <Card className={classes.root}>
      <CardContent>
        <Typography variant="h5" component="h2">
             Project: {projectName}
        </Typography>
        <Typography className={classes.pos} color="textSecondary">
          Team: {projectTeam}
        </Typography>
      </CardContent>
    </Card>
  );
}
export default ProjectInfoCard