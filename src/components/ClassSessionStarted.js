import React from 'react'
import PointsForm from './PointsForm'

const ClassSessionStarted = ({ session }) => {
  return session.groups.map(group => (
    <PointsForm
      key={group.id}
      sessionid={session.id}
      group={group}
      points={session.points}
    />
  ))
}

export default ClassSessionStarted
