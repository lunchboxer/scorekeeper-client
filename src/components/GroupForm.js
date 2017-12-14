import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withStyles } from 'material-ui/styles'
import { Typography, TextField, IconButton, Divider } from 'material-ui'
import List, {
  ListItem,
  ListItemText,
  ListItemSecondaryAction
} from 'material-ui/List'
import { withRouter } from 'react-router-dom'
import {
  UPDATE_GROUP_MUTATION,
  ALL_STUDENTS_FILTER_GROUP_QUERY,
  ADD_STUDENT_TO_GROUP_MUTATION,
  REMOVE_STUDENT_FROM_GROUP_MUTATION
} from '../queries'
import ClearIcon from 'material-ui-icons/Clear'
import AddIcon from 'material-ui-icons/Add'

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit
  }
})

class GroupForm extends Component {
  state = {}
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  saveName = async group => {
    if (this.state.name !== group.name)
      await this.props.updateGroupMutation({
        variables: { id: group.id, name: this.state.name }
      }) // free cache updates!
    // we need to give some feedback
  }
  removeStudentFromGroup = async (student, group) => {
    await this.props.removeStudentFromGroupMutation({
      variables: { groupID: group.id, studentID: student.id },
      update: (store, { data: { removeFromStudentInGroup } }) => {
        const data = store.readQuery({
          query: ALL_STUDENTS_FILTER_GROUP_QUERY,
          variables: { group: null }
        })
        data.allStudents.push(student)
        store.writeQuery({
          query: ALL_STUDENTS_FILTER_GROUP_QUERY,
          variables: { group: null },
          data
        })
      }
    })
  }
  addStudentToGroup = async (student, group) => {
    await this.props.addStudentToGroupMutation({
      variables: { groupID: group.id, studentID: student.id },
      update: (store, { data: { removeFromStudentInGroup } }) => {
        const data = store.readQuery({
          query: ALL_STUDENTS_FILTER_GROUP_QUERY,
          variables: { group: null }
        })
        data.allStudents = data.allStudents.filter(
          lonelyStudent => lonelyStudent.id !== student.id
        )
        store.writeQuery({
          query: ALL_STUDENTS_FILTER_GROUP_QUERY,
          variables: { group: null },
          data
        })
      }
    }) // now update the cache
  }
  render() {
    const { group, classes } = this.props
    const lonelyStudents = this.props.allLonelyStudentsQuery.allStudents || []
    return (
      <div className="GroupForm">
        <TextField
          margin="dense"
          id="name"
          label="Class Name"
          defaultValue={group.name}
          type="text"
          onChange={this.handleChange('name')}
          onBlur={() => this.saveName(group)}
          fullWidth
        />
        <Divider className={classes.title} />
        <Typography type="subheading" className={classes.title}>
          {group.students.length || 'No'} students in this class.
        </Typography>
        {group.students.length > 0 && (
          <div>
            <Typography type="body1">
              Click a student to edit. Click the 'x' to remove them from this
              class.
            </Typography>

            <List>
              {group.students.map(student => (
                <ListItem
                  button
                  onClick={() =>
                    this.props.history.push(`/student/${student.id}`)
                  }
                  key={student.id}
                  className={classes.flex}
                >
                  <ListItemText
                    className={classes.flex}
                    secondary={
                      student.chineseName + ' (' + student.pinyinName + ')'
                    }
                    primary={student.englishName || 'no English name'}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="clear"
                      onClick={() =>
                        this.removeStudentFromGroup(student, group)
                      }
                    >
                      <ClearIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
        <Divider className={classes.title} />
        <Typography type="subheading" className={classes.title}>
          {lonelyStudents.length || 'No'} unassigned students
        </Typography>
        {lonelyStudents.length > 0 && (
          <div>
            <Typography type="body1">
              Click a student to edit. Click the '+' to add them to this class.
            </Typography>

            <List>
              {lonelyStudents.map(student => (
                <ListItem
                  button
                  onClick={() =>
                    this.props.history.push(`/student/${student.id}`)
                  }
                  key={student.id}
                  className={classes.flex}
                >
                  <ListItemText
                    className={classes.flex}
                    secondary={
                      student.chineseName + ' (' + student.pinyinName + ')'
                    }
                    primary={student.englishName || 'no English name'}
                  />
                  <ListItemSecondaryAction>
                    <IconButton
                      aria-label="clear"
                      onClick={() => this.addStudentToGroup(student, group)}
                    >
                      <AddIcon />
                    </IconButton>
                  </ListItemSecondaryAction>
                </ListItem>
              ))}
            </List>
          </div>
        )}
      </div>
    )
  }
}
GroupForm = withRouter(GroupForm)
export default compose(
  graphql(ALL_STUDENTS_FILTER_GROUP_QUERY, {
    name: 'allLonelyStudentsQuery',
    options: { variables: { group: null } }
  }),
  graphql(UPDATE_GROUP_MUTATION, { name: 'updateGroupMutation' }),
  graphql(ADD_STUDENT_TO_GROUP_MUTATION, { name: 'addStudentToGroupMutation' }),
  graphql(REMOVE_STUDENT_FROM_GROUP_MUTATION, {
    name: 'removeStudentFromGroupMutation'
  }),
  withStyles(styles)
)(GroupForm)
