import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { Button, TextField, Paper } from 'material-ui'
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
  },
  container: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    color: theme.palette.text.secondary,
    height: '100%'
  },
  inputField: {
    marginTop: theme.spacing.unit,
    marginBottom: theme.spacing.unit,
    [theme.breakpoints.up('sm')]: {
      margin: theme.spacing.unit * 2
    },
    width: '100%',
    maxWidth: '400px'
  },
  actionsPaper: {
    paddingTop: theme.spacing.unit,
    paddingBottom: theme.spacing.unit,
    textAlign: 'right',
    marginTop: theme.spacing.unit,
    width: '100%'
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
  componentWillMount() {
    let groupId = this.props.groupId
    this.setState({ groupId: groupId })
  }
  handleSave = async (student, formKeys) => {
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
        <div className={classes.container}>
          {/* make formKeys a little more sophisticated and draw from it, esp text or required */}
          {['chineseName', 'pinyinName', 'englishName'].map((field, index) => (
            <TextField
              margin="dense"
              className={classes.inputField}
              id={field}
              key={index}
              label={this.unCamelCase(field)}
              value={this.inputValueOldOrNew(student, field)}
              type="text"
              onChange={this.handleChange(field)}
              fullWidth
            />
          ))}
          <TextField
            margin="dense"
            id="select-group"
            select
            label="Assigned class"
            className={classes.inputField}
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
            {groups.map(option => (
              <MenuItem key={option.id} value={option.id}>
                {option.name}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            id="date"
            label="Date of Birth"
            type="date"
            fullwidth="true"
            value={this.inputValueOldOrNew(student, 'dateOfBirth').slice(0, 10)}
            onChange={this.handleChange('dateOfBirth')}
            className={classes.inputField}
            InputLabelProps={{
              shrink: true
            }}
          />
          <RadioGroup
            aria-label="gender"
            name="gender"
            className={classes.inputField}
            value={this.inputValueOldOrNew(student, 'gender')}
            onChange={this.handleChange('gender')}
          >
            <FormControlLabel value="M" control={<Radio />} label="Male" />
            <FormControlLabel value="F" control={<Radio />} label="Female" />
          </RadioGroup>

          {this.props.match.params.id !== 'new' && (
            <DeleteStudent student={student} />
          )}
        </div>
        <footer className={classes.actions}>
          <Paper className={classes.actionsPaper}>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button onClick={() => this.revertForm(formKeys)}>Reset</Button>
            <Button onClick={() => this.handleSave(student, formKeys)}>
              Save
            </Button>
          </Paper>
        </footer>
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
