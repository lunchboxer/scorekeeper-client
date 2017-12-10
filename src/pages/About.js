import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Paper from 'material-ui/Paper'
import Header from '../components/Header'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  title: {
    paddingBottom: theme.spacing.unit * 3
  }
})

class About extends Component {
  render() {
    const { classes } = this.props
    return (
      <div className="About">
        <Header title="About" />

        <Paper className={classes.paper}>
          <Typography type="title" className={classes.title}>
            About Scorekeeper
          </Typography>
          <Typography>This is a description of the app.</Typography>
        </Paper>
      </div>
    )
  }
}
export default withStyles(styles)(About)
