import React from 'react'
import PointsRow from './PointsRow'
import Table, {
  TableBody,
  TableCell,
  TableHead,
  TableRow
} from 'material-ui/Table'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  pointsHeader: {
    textAlign: 'center'
  },
  title: {
    fontSize: '1.4rem'
  }
})

const PointsForm = ({ group, classes, session }) => {
  const studentPresence = student => {
    const studentAttendance = session.attendances.find(attendance => {
      return attendance.student.id === student.id
    })
    if (studentAttendance) {
      return studentAttendance.status
    } else {
      return undefined
    }
  }
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell className={classes.title}>{group.name}</TableCell>
          <TableCell className={classes.pointsHeader}>
            <span>Points</span>
          </TableCell>
        </TableRow>
      </TableHead>
      <TableBody>
        {group.students.map(
          student =>
            (studentPresence(student) === 'Present' ||
              studentPresence(student) === 'Late') && (
              <PointsRow key={student.id} student={student} session={session} />
            )
        )}
      </TableBody>
    </Table>
  )
}

export default withStyles(styles)(PointsForm)
