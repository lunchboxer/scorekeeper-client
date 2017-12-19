import React from 'react'
import { Typography } from 'material-ui'
import { graphql, compose } from 'react-apollo'
import { UPCOMING_SESSIONS_QUERY } from '../queries'
import List, { ListItemText, ListItem } from 'material-ui/List'
import { formatDateString } from '../utilityFunctions'
import { withStyles } from 'material-ui'

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  }
})
const UpcomingSessionsList = props => {
  if (props.upcomingSessionsQuery && props.upcomingSessionsQuery.loading) {
    return <div>Loading</div>
  }
  const sessions = props.upcomingSessionsQuery.allClassSessions

  return (
    <div className={props.classes.container}>
      <Typography type="subheading">Upcoming class sessions:</Typography>
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
            </ListItem>
          ))}
        </List>
      )}
    </div>
  )
}

const now = new Date()
const variables = {
  startsAfter: now.toISOString()
}
export default compose(
  graphql(UPCOMING_SESSIONS_QUERY, {
    name: 'upcomingSessionsQuery',
    options: { variables }
  }),
  withStyles(styles)
)(UpcomingSessionsList)
