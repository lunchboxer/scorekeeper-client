import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { Button, TextField, Divider } from 'material-ui'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import { withRouter } from 'react-router-dom'

import { graphql, compose } from 'react-apollo'
import {
  UPDATE_STUDENT_MUTATION,
  CREATE_STUDENT_MUTATION,
  ALL_GROUPS_QUERY,
  ALL_STUDENTS_FILTER_GROUP_QUERY
} from '../queries'
import DeleteStudent from './DeleteStudent'

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit
  }
})

class StudentForm extends Component {
  state = {}
  unCamelCase = string =>
    string
      .replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/\b([A-Z]+)([A-Z])([a-z])/, '$1 $2$3')
      .replace(/^./, function(s) {
        return s.toUpperCase()
      })

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  handleCancel = () => {
    this.props.history.push('/students')
  }

  handleSave = async (student, formKeys) => {
    console.log(student)
    console.log(this.state)
    console.log(!!this.state.groupId)
    let studentMutationVariables = {}
    formKeys.forEach(key => {
      if (this.state[key] === '') {
        studentMutationVariables[key] = null // unset in db
      } else if (this.state[key]) {
        if (!student || this.state[key] !== student[key]) {
          // update the value only if it's different, unless new
          studentMutationVariables[key] = this.state[key]
        }
      }
    })
    // group isn't included in formKeys, but it could be later
    if (this.state.groupId === '') {
      studentMutationVariables.groupId = null // unset in db
    } else if (this.state.groupId) {
      if (this.state.groupId === '') {
        studentMutationVariables.groupId = null // unset in db
      } else if (
        !student.group ||
        (student.group && this.state.groupId !== student.group.id)
      ) {
        studentMutationVariables.groupId = this.state.groupId
      } else {
      }
    }
    // if nothing is changed, exit
    if (Object.keys(studentMutationVariables).length === 0) {
      return
    }
    if (!student) {
      await this._createStudent(studentMutationVariables)
      // then redirect if no problems
      // no error handling or feedback yet so just go back to student list
      this.props.history.push('/students/')
    } else {
      studentMutationVariables.id = student.id
      console.log('gonna update existing student')
      await this._updateStudent(studentMutationVariables)
      this.props.history.push('/students/')
    }
  }

  // group has different behavior because it's an object, not a string
  inputValueOldOrNew = (student, field) => {
    if (this.state[field] === '') {
      return ''
    } else if (this.state[field]) {
      return this.state[field]
    } else if (student[field]) {
      return student[field]
    } else {
      return ''
    }
  }

  revertForm = formKeys => {
    const student = this.props.student || {}
    if (student.group) {
      this.setState({ group: student.group.id })
    } else {
      this.setState({ group: '' })
    }
    formKeys.forEach(key => {
      let reset = student[key] || ''
      this.setState({ [key]: reset })
    })
  }

  render() {
    const formKeys = [
      'chineseName',
      'englishName',
      'pinyinName',
      'gender',
      'dateOfBirth'
    ]
    const student = this.props.student || false
    const { classes, groups } = this.props
    return (
      <div className="StudentForm">
        <Card>
          <CardContent>
            {/* make formKeys a little more sophisticated and draw from it, esp text or required */}
            {['chineseName', 'pinyinName', 'englishName'].map(
              (field, index) => (
                <TextField
                  margin="dense"
                  id={field}
                  key={index}
                  label={this.unCamelCase(field)}
                  value={this.inputValueOldOrNew(student, field)}
                  type="text"
                  onChange={this.handleChange(field)}
                  fullWidth
                />
              )
            )}
            <TextField
              margin="dense"
              id="select-group"
              select
              label="Assigned class"
              className={classes.textField}
              value={
                this.state.groupId === ''
                  ? ''
                  : this.state.groupId
                    ? this.state.groupId
                    : student.group ? student.group.id : ''
              }
              onChange={this.handleChange('groupId')}
              fullWidth
              SelectProps={{
                MenuProps: {
                  className: classes.menu
                }
              }}
            >
              <MenuItem key="" value="">
                None
              </MenuItem>
              {groups.map(option => (
                <MenuItem key={option.id} value={option.id}>
                  {option.name}
                </MenuItem>
              ))}
            </TextField>

            <RadioGroup
              aria-label="gender"
              name="gender"
              className={classes.group}
              value={this.inputValueOldOrNew(student, 'gender')}
              onChange={this.handleChange('gender')}
            >
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
            </RadioGroup>
            <TextField
              id="date"
              label="Date of Birth"
              type="date"
              value={this.inputValueOldOrNew(student, 'dateOfBirth').slice(
                0,
                10
              )}
              onChange={this.handleChange('dateOfBirth')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
            {this.props.match.params.id !== 'new' && (
              <DeleteStudent student={student} />
            )}
          </CardContent>
          <Divider />
          <CardActions>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button onClick={() => this.revertForm(formKeys)}>Reset</Button>
            <Button onClick={() => this.handleSave(student, formKeys)}>
              Save
            </Button>
          </CardActions>
        </Card>
      </div>
    )
  }
  _createStudent = async studentMutationVariables => {
    await this.props.createStudentMutation({
      variables: studentMutationVariables,
      refetchQueries: [
        { query: ALL_GROUPS_QUERY },
        { query: ALL_STUDENTS_FILTER_GROUP_QUERY, variables: { group: null } }
      ]
    }) // also gotta update the apollo cache
  }
  _updateStudent = async studentMutationVariables => {
    console.log(studentMutationVariables)
    await this.props.updateStudentMutation({
      variables: studentMutationVariables,
      // the query to update is on a different page, maybe not fetched ever
      refetchQueries: [
        { query: ALL_GROUPS_QUERY },
        { query: ALL_STUDENTS_FILTER_GROUP_QUERY, variables: { group: null } }
      ]
    }) // for groups doesn't update automatically.
  }
}

StudentForm = withRouter(StudentForm)
export default compose(
  graphql(CREATE_STUDENT_MUTATION, { name: 'createStudentMutation' }),
  graphql(UPDATE_STUDENT_MUTATION, { name: 'updateStudentMutation' }),
  withStyles(styles)
)(StudentForm)
