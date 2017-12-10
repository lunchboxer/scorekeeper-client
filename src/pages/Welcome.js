import React, { Component } from 'react'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Header from '../components/Header'

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 3
  },
  textField: {
    width: 200
  },
  formControl: {
    margin: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
})

class Welcome extends Component {
  state = {}

  render() {
    const { classes } = this.props

    return (
      <div className="Welcome">
        <Header title="Scorekeeper" />
        <Paper className={classes.paper}>
          <Typography component="p">Welcome to Scorekeeper</Typography>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(Welcome)
