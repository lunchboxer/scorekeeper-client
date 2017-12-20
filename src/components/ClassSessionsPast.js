import React, { Component } from 'react'
import { Typography } from 'material-ui'
import List, { ListItemText, ListItem } from 'material-ui/List'
import { formatDateString } from '../utilityFunctions'
import { withStyles } from 'material-ui'
import ListItemIcon from 'material-ui/List/ListItemIcon'
import DeleteClassSessionButton from './DeleteClassSessionButton'
import { graphql, compose } from 'react-apollo'
import { PAST_CLASS_SESSIONS_QUERY } from '../queries'

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  }
})

class ClassSessionsPast extends Component {
  render() {
    const updateCacheOnDelete = (store, deleteClassSession) => {
      const { variables } = this.props.pastClassSessionsQuery
      const data = store.readQuery({
        query: PAST_CLASS_SESSIONS_QUERY,
        variables
      })
      data.allClassSessions = data.allClassSessions.filter(session => {
        return session.id !== deleteClassSession.id
      })
      store.writeQuery({ query: PAST_CLASS_SESSIONS_QUERY, variables, data })
    }
    const { classes } = this.props
    if (
      this.props.pastClassSessionsQuery &&
      this.props.pastClassSessionsQuery.loading
    ) {
      return <div>Loading</div>
    }
    const sessions = this.props.pastClassSessionsQuery.allClassSessions
    return (
      <div className={classes.container}>
        <Typography type="subheading">Past class sessions:</Typography>
        {sessions.length === 0 ? (
          <Typography type="body1">None</Typography>
        ) : (
          <List>
            {sessions.map(session => (
              <ListItem key={session.id}>
                <ListItemText
                  primary={session.groups.map(group => group.name).join(', ')}
                  secondary={formatDateString(session.startsAt, session.endsAt)}
                />
                {session.points.length === 0 && (
                  <ListItemIcon>
                    <DeleteClassSessionButton
                      session={session}
                      updateCacheOnDelete={updateCacheOnDelete}
                    />
                  </ListItemIcon>
                )}
              </ListItem>
            ))}
          </List>
        )}
      </div>
    )
  }
}

const now = new Date().toISOString()

export default compose(
  graphql(PAST_CLASS_SESSIONS_QUERY, {
    name: 'pastClassSessionsQuery',
    options: { variables: { now } }
  }),
  withStyles(styles)
)(ClassSessionsPast)
