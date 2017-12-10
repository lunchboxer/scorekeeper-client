import React, { Component } from 'react'
import { Link } from 'react-router-dom'
import Header from '../components/Header'
import { withStyles } from 'material-ui/styles'
import { Typography, Paper, Button } from 'material-ui'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  title: {
    marginTop: theme.spacing.unit
  },
  actionButton: {
    margin: theme.spacing.unit
  }
})

class StudentNotFound extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className="StudentNotFound">
        <Header title="View Student" />
        <Paper className={classes.paper}>
          <Typography type="subheading" className={classes.title}>
            The student you are looking for wasn't found.
          </Typography>
          <Button component={Link} to="/students">
            Find a student
          </Button>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(StudentNotFound)
