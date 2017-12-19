import React, { Component } from 'react'
import { SOON_SESSIONS_QUERY } from '../queries'
import { graphql, compose } from 'react-apollo'
import { withStyles } from 'material-ui/styles'
import { Typography } from 'material-ui'
import ClassSessionSelection from './ClassSessionSelection'
import MenuList from 'material-ui/Menu/MenuList'

const styles = theme => ({
  inputField: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing.unit * 2
    },
    width: '100%',
    maxWidth: '400px'
  },
  container: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit * 2
  }
})

class ClassSessionSelector extends Component {
  state = {
    session: ''
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
    console.log('changed', prop, 'to', this.state[prop])
  }

  render() {
    if (this.props.soonSessionsQuery && this.props.soonSessionsQuery.loading) {
      return <div>Loading</div>
    }
    const sessions = this.props.soonSessionsQuery.allClassSessions
    console.log(sessions)
    const { classes } = this.props

    return (
      <div className={classes.container}>
        <Typography type="subheading">
          Select a class session to start:
        </Typography>
        {sessions.length === 0 ? (
          <Typography>No class sessions currently running.</Typography>
        ) : (
          <MenuList>
            {sessions.map(session => (
              <ClassSessionSelection key={session.id} session={session} />
            ))}
          </MenuList>
        )}
      </div>
    )
  }
}

const now = new Date()
const soon = new Date(now.valueOf() + 15 * 60000)
const recently = new Date(now.valueOf() - 15 * 60000)
const variables = {
  endsAfter: recently.toISOString(),
  startsBefore: soon.toISOString()
}

export default compose(
  graphql(SOON_SESSIONS_QUERY, {
    name: 'soonSessionsQuery',
    options: { variables }
  }),
  withStyles(styles)
)(ClassSessionSelector)
