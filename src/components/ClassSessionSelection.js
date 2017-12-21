import React from 'react'
import moment from 'moment'
import { MenuItem } from 'material-ui'
import ListItemText from 'material-ui/List/ListItemText'
import { Link } from 'react-router-dom'

const ClassSessionSelection = ({ session, classes }) => {
  const start = moment(session.startsAt)
  const end = moment(session.endsAt)
  const isPast = time => {
    const now = new Date()
    const dateTime = new Date(time)
    const diff = now.valueOf() - dateTime.valueOf()
    return diff > 0
  }

  const times = session => {
    const startString = isPast(session.startsAt)
      ? 'Started ' + start.fromNow(session.startsAt) + ' ago'
      : 'Starts in ' + start.toNow(session.startsAt)
    const endString = isPast(session.endsAt)
      ? 'Ended ' + end.fromNow(session.endsAt) + ' ago'
      : 'Ends in ' + end.toNow(session.endsAt)
    return startString + '. ' + endString
  }
  return (
    <MenuItem component={Link} to={'/haveclass/' + session.id}>
      <ListItemText
        primary={session.groups.map(group => group.name).join(', ')}
        secondary={times(session)}
      />
    </MenuItem>
  )
}

export default ClassSessionSelection
