import React, { Component } from 'react'
import ListItem from 'material-ui/List/ListItem'
import Checkbox from 'material-ui/Checkbox/Checkbox'
import ListItemText from 'material-ui/List/ListItemText'
import { graphql, compose } from 'react-apollo'
import {
  STUDENT_ATTENDANCE_QUERY,
  ADD_ATTENDANCE_MUTATION,
  UPDATE_ATTENDANCE_MUTATION
} from '../queries'
import Typography from 'material-ui/Typography/Typography'

class AttendanceRow extends Component {
  handleToggle = async attendance => {
    console.log('attendance:', attendance)
    if (!attendance) {
      await this.props.addAttendanceMutation({
        variables: {
          student: this.props.student.id,
          session: this.props.session.id,
          status: 'Present'
        },
        update: (store, { data: { createAttendance } }) => {
          const { variables } = this.props.studentAttendanceQuery
          const data = store.readQuery({
            query: STUDENT_ATTENDANCE_QUERY,
            variables
          })
          console.log(data)
          console.log(createAttendance)
          data.allAttendances.push(createAttendance)
          store.writeQuery({ query: STUDENT_ATTENDANCE_QUERY, variables, data })
        }
      })
    } else {
      const status = attendance.status === 'Present' ? 'Absent' : 'Present'
      await this.props.updateAttendanceMutation({
        variables: {
          id: attendance.id,
          status
        }
      })
    }
  }

  render() {
    if (
      this.props.studentAttendanceQuery &&
      this.props.studentAttendanceQuery.loading
    ) {
      return <Typography>Loading...</Typography>
    }
    const { student } = this.props
    console.log(
      'allAttendances:',
      this.props.studentAttendanceQuery.allAttendances
    )
    const attendance = this.props.studentAttendanceQuery.allAttendances[0]
    console.log(attendance)
    const status = attendance ? attendance.status : undefined
    return (
      <div>
        <ListItem dense button onClick={() => this.handleToggle(attendance)}>
          <Checkbox
            checked={status ? !!(status === 'Present') : false}
            tabIndex={-1}
            disableRipple
          />
          <ListItemText
            primary={student.englishName}
            secondary={student.chineseName + ' (' + student.pinyinName + ')'}
          />
        </ListItem>
      </div>
    )
  }
}

export default compose(
  graphql(ADD_ATTENDANCE_MUTATION, {
    name: 'addAttendanceMutation'
  }),
  graphql(UPDATE_ATTENDANCE_MUTATION, {
    name: 'updateAttendanceMutation'
  }),
  graphql(STUDENT_ATTENDANCE_QUERY, {
    name: 'studentAttendanceQuery',
    options: ({ student, session }) => ({
      variables: { session: session.id, student: student.id }
    })
  })
)(AttendanceRow)
