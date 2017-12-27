import React from 'react'
import Typography from 'material-ui/Typography/Typography'

const AttendanceForm = ({ group }) => {
  return (
    <div>
      <Typography type="subheading">{group.name}</Typography>
    </div>
  )
}

export default AttendanceForm
