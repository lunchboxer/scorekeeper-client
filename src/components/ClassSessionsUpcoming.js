import React from 'react'
import { Typography } from 'material-ui'
import List, { ListItemText, ListItem } from 'material-ui/List'
import { formatDateString } from '../utilityFunctions'
import { withStyles } from 'material-ui'
import ListItemIcon from 'material-ui/List/ListItemIcon'

import DeleteClassSessionButton from './DeleteClassSessionButton'

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
  }
})
const UpcomingSessionsList = props => {
  const sessions = props.futureSessions.filter(session => {
    const startDate = new Date(session.startsAt)
    const now = new Date()
    return startDate > now
  })

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
              {session.points.length === 0 && (
                <ListItemIcon>
                  <DeleteClassSessionButton
                    session={session}
                    updateCacheOnDelete={props.updateCacheOnDelete}
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

export default withStyles(styles)(UpcomingSessionsList)
