import React, { Component } from 'react'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Header from '../components/Header'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    width: '200'
  },
  title: {
    paddingBottom: theme.spacing.unit * 3
  }
})

class UserProfile extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className="UserProfile">
        <Header title="User Profile" />

        <Paper className={classes.paper}>
          <Typography type="title" className={classes.title}>
            User Profile
          </Typography>
          <Typography>This is a page all about you!</Typography>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(UserProfile)
