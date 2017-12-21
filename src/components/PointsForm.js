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

const PointsForm = ({ group, classes, sessionid }) => {
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
        {group.students.map(student => (
          <PointsRow key={student.id} student={student} sessionid={sessionid} />
        ))}
      </TableBody>
    </Table>
  )
}

export default withStyles(styles)(PointsForm)
