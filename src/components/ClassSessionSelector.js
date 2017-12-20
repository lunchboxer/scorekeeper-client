import React from 'react'
import { Typography } from 'material-ui'
import ClassSessionSelection from './ClassSessionSelection'
import MenuList from 'material-ui/Menu/MenuList'

const ClassSessionSelector = props => {
  const sessions = props.futureSessions

  const filterSessions = sessions => {
    const now = new Date()
    const soon = new Date(now.valueOf() + 15 * 60000)
    // filter the sessions that start more than 15 minutes from now
    return sessions.filter(session => {
      const startDate = new Date(session.startsAt)
      return startDate < soon
    })
  }

  const soonSessions = filterSessions(sessions)
  return (
    <div>
      <Typography type="subheading">
        Select a class session to start:
      </Typography>
      {soonSessions.length === 0 ? (
        <Typography>No class sessions currently running.</Typography>
      ) : (
        <MenuList>
          {soonSessions.map(session => (
            <ClassSessionSelection key={session.id} session={session} />
          ))}
        </MenuList>
      )}
    </div>
  )
}

export default ClassSessionSelector
