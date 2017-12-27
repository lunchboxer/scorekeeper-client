import React from 'react'
import PointsForm from './PointsForm'
import EndClassSessionButton from './EndClassSessionButton'
import Divider from 'material-ui/Divider/Divider'

const ClassSessionStarted = ({ session }) => {
  return (
    <div>
      {session.groups.map(group => (
        <PointsForm
          key={group.id}
          sessionid={session.id}
          group={group}
          points={session.points}
        />
      ))}
      <Divider />
      <EndClassSessionButton session={session} />
    </div>
  )
}

export default ClassSessionStarted
