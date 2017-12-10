import React, { Component } from 'react'
import { Typography, Paper, Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import Header from '../components/Header'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  link: {}
})

class NotFound extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className="NotFound">
        <Header title="Not Found" />
        <Paper className={classes.paper}>
          <Typography type="display4">404</Typography>
          <Typography type="display1">The page was not found.</Typography>
          <br />
          <Button component={Link} to="/" color="contrast">
            Return to homepage
          </Button>
        </Paper>
      </div>
    )
  }
}

export default withStyles(styles)(NotFound)
