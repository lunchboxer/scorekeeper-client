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
  table: {
    minWidth: 300
  }
})

const PointsForm = ({ group, classes, sessionid }) => {
  return (
    <Table className={classes.table}>
      <TableHead>
        <TableRow>
          <TableCell>{group.name}</TableCell>
          <TableCell numeric>Points</TableCell>
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
