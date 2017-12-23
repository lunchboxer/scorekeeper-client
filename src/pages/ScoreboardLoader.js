import React, { Component } from 'react'
import { CURRENT_CLASS_SESSIONS_QUERY } from '../queries'
import { withStyles } from 'material-ui/styles'
import { graphql, compose } from 'react-apollo'
import Typography from 'material-ui/Typography/Typography'
import Scoreboard from '../components/Scoreboard'

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2
  }
})

class ScoreboardLoader extends Component {
  render() {
    const { classes } = this.props
    if (
      this.props.currentClassSessionsQuery &&
      this.props.currentClassSessionsQuery.loading
    ) {
      return (
        <div className={classes.container}>
          <p>loading...</p>
        </div>
      )
    }
    const sessions = this.props.currentClassSessionsQuery.allClassSessions
    if (sessions.length === 0) {
      return (
        <div className={classes.container}>
          <Typography type="subheading">No current class sessions</Typography>
          <Typography type="body1">
            Add a new session or wait until it's time for an existing scheduled
            class session.
          </Typography>
        </div>
      )
    }
    if (sessions.length === 1) {
      return (
        <div className={classes.container}>
          <Scoreboard session={sessions[0]} />
        </div>
      )
    }

    return (
      <div className={classes.container}>
        <Typography type="subheading">
          Multiple current class sessions
        </Typography>
        <Typography type="body1">
          Please choose a class session to continue.
        </Typography>
      </div>
    )
  }
}

const now = new Date()
const variables = {
  recently: new Date(now.valueOf() - 15 * 60000).toISOString(),
  soon: new Date(now.valueOf() + 15 * 60000).toISOString()
}
export default compose(
  graphql(CURRENT_CLASS_SESSIONS_QUERY, {
    name: 'currentClassSessionsQuery',
    options: { variables }
  }),
  withStyles(styles)
)(ScoreboardLoader)
