import React, { Component } from 'react'
import { TableRow, TableCell } from 'material-ui/Table'
import { STUDENT_SESSION_POINTS_QUERY } from '../queries'
import { graphql, compose } from 'react-apollo'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  pointsCell: {
    textAlign: 'center'
  }
})

class PointsRow extends Component {
  render() {
    const { student, classes } = this.props
    const points = this.props.studentSessionPointsQuery.allPoints

    const sumOfPointValues = points => {
      return points.reduce((sum, point) => {
        return sum + point.value
      }, 0)
    }

    return (
      <TableRow>
        <TableCell>
          {student.englishName}
          <br />
          {student.chineseName + '(' + student.pinyinName + ')'}
        </TableCell>
        <TableCell className={classes.pointsCell}>
          {this.props.studentSessionPointsQuery &&
          this.props.studentSessionPointsQuery.loading ? (
            <p>loading...</p>
          ) : (
            sumOfPointValues(points)
          )}
        </TableCell>
      </TableRow>
    )
  }
}
export default compose(
  graphql(STUDENT_SESSION_POINTS_QUERY, {
    name: 'studentSessionPointsQuery',
    options: ({ student, sessionid }) => ({
      variables: { student: student.id, session: sessionid }
    })
  }),
  withStyles(styles)
)(PointsRow)
