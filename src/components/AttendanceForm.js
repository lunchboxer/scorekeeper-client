import React from 'react'
import Typography from 'material-ui/Typography/Typography'
import List, { ListItem, ListItemText } from 'material-ui/List'
import AttendanceRow from './AttendanceRow'
import Checkbox from 'material-ui/Checkbox/Checkbox'

const AttendanceForm = ({ group, session }) => {
  return (
    <div>
      <Typography type="subheading">{group.name}</Typography>
      <List>
        <ListItem dense button>
          <Checkbox tabIndex={-1} disableRipple />
          <ListItemText primary="MARK ALL PRESENT" />
        </ListItem>
        {group.students.map(student => (
          <AttendanceRow student={student} key={student.id} session={session} />
        ))}
      </List>
    </div>
  )
}

export default AttendanceForm
