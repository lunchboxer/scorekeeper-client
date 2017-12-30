import React from 'react'
import Typography from 'material-ui/Typography/Typography'
import List from 'material-ui/List'
import AttendanceRow from './AttendanceRow'

const AttendanceForm = ({ group, session }) => {
  return (
    <div>
      <Typography type="subheading">{group.name}</Typography>
      <List>
        {group.students.map(student => (
          <AttendanceRow student={student} key={student.id} session={session} />
        ))}
      </List>
    </div>
  )
}

export default AttendanceForm
