import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { Button, TextField, Divider } from 'material-ui'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'
import { MenuItem } from 'material-ui/Menu'
import { withRouter } from 'react-router-dom'
import Delete from 'material-ui-icons/Delete'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  title: {
    marginTop: theme.spacing.unit
  },
  actionButton: {
    margin: theme.spacing.unit
  },
  deleteArea: {
    marginTop: theme.spacing.unit * 2
  }
})

class StudentForm extends Component {
  state = {
    deleteDialogOpen: false,
    studentToDelete: {}
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  handleCancel = () => {
    this.props.history.push('/students')
  }
  handleDeleteDialog = student => {
    this.setState({ deleteDialogOpen: true })
    this.setState({ studentToDelete: student })
  }
  handleDeleteStudent = async id => {
    this.handleDeleteDialogClose()
    await this.props.deleteStudentMutation({
      variables: {
        id
      }
      // gotta update the cache
    })
    this.props.history.push('/students')
  }
  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false })
    this.setState({ groupToDelete: {} })
  }
  revertForm = () => {
    const student = this.props.student ? this.props.student : {}
    if (student.group) {
      this.setState({ group: student.group.id })
    } else {
      this.setState({ group: '' })
    }
    const formKeys = [
      'chineseName',
      'englishName',
      'pinyinName',
      'gender',
      'dateOfBirth'
    ]
    formKeys.forEach(key => {
      let reset = student[key] ? student[key] : ''
      this.setState({ [key]: reset })
    })
  }

  render() {
    const student = this.props.student ? this.props.student : {}
    const { classes, groups } = this.props
    return (
      <div className="StudentForm">
        <Card>
          <CardContent>
            <TextField
              margin="dense"
              id="chineseName"
              label="Chinese name"
              value={
                this.state.chineseName
                  ? this.state.chineseName
                  : student.chineseName ? student.chineseName : ''
              }
              type="text"
              onChange={this.handleChange('chineseName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="PinyinName"
              label="Pinyin name"
              type="text"
              value={
                this.state.pinyinName
                  ? this.state.pinyinName
                  : student.pinyinName ? student.pinyinName : ''
              }
              onChange={this.handleChange('pinyinName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="englishName"
              label="English Name"
              type="text"
              value={
                // this can be refactored into a function
                this.state.englishName
                  ? this.state.englishName
                  : student.englishName ? student.englishName : ''
              }
              onChange={this.handleChange('englishName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="select-group"
              select
              label="Assigned class"
              className={classes.textField}
              value={
                // this can be refactored into a function
                this.state.group === ''
                  ? ''
                  : this.state.group
                    ? this.state.group
                    : student.group ? student.group.id : ''
              }
              onChange={this.handleChange('group')}
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
              value={
                this.state.gender
                  ? this.state.gender
                  : student.gender ? student.gender : null
              }
              onChange={this.handleChange('gender')}
            >
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
            </RadioGroup>
            <TextField
              id="date"
              label="Date of Birth"
              type="date"
              value={(this.state.dateOfBirth
                ? this.state.dateOfBirth
                : student.dateOfBirth ? student.dateOfBirth : '2011-12-20'
              ).slice(0, 10)}
              onChange={this.handleChange('dateOfBirth')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />

            {this.props.match.params.id !== 'new' && (
              <div className={classes.deleteArea}>
                <Button
                  dense
                  raised
                  color="primary"
                  onClick={() => this.handleDeleteDialog(student)}
                >
                  Delete student
                  <Delete className={classes.rightIcon} />
                </Button>
              </div>
            )}
          </CardContent>
          <Divider />
          <CardActions>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button onClick={this.revertForm}>Reset</Button>
            <Button>Save</Button>
          </CardActions>
        </Card>
        <Dialog
          open={this.state.deleteDialogOpen}
          onRequestClose={this.handleDeleteDialogClose}
        >
          <DialogTitle>
            Delete student: {this.state.studentToDelete.chineseName}?
          </DialogTitle>
          <DialogContent>
            <DialogContentText>This cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              dense
              onClick={() =>
                this.handleDeleteStudent(this.state.studentToDelete.id)
              }
              color="primary"
            >
              Yes, Delete it
            </Button>
            <Button
              onClick={this.handleDeleteDialogClose}
              color="contrast"
              autoFocus
            >
              Nevermind
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}
const DELETE_STUDENT_MUTATION = gql`
  mutation DeleteStudentMutation($id: ID!) {
    deleteStudent(id: $id) {
      id
    }
  }
`
StudentForm = withRouter(StudentForm)
export default compose(
  graphql(DELETE_STUDENT_MUTATION, { name: 'deleteStudentMutation' }),
  withStyles(styles)
)(StudentForm)
