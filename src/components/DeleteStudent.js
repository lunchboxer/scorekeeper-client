import React, { Component } from 'react'
import Delete from 'material-ui-icons/Delete'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import { Button, Typography } from 'material-ui'
import { withRouter } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'

import { graphql, compose } from 'react-apollo'
import {
  DELETE_STUDENT_MUTATION,
  ALL_GROUPS_QUERY,
  ALL_STUDENTS_FILTER_GROUP_QUERY
} from '../queries'

const styles = theme => ({
  title: {
    marginTop: theme.spacing.unit
  },
  deleteArea: {
    marginTop: theme.spacing.unit * 2
  }
})

class DeleteStudent extends Component {
  state = {
    deleteDialogOpen: false,
    studentToDelete: {}
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
      },
      // gotta update the cache, queries on different page so just refetchQueries
      refetchQueries: [
        { query: ALL_GROUPS_QUERY },
        { query: ALL_STUDENTS_FILTER_GROUP_QUERY, variables: { group: null } }
      ]
    })
    this.props.history.push('/students')
  }
  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false })
    this.setState({ groupToDelete: {} })
  }

  render() {
    const { student, classes } = this.props
    return (
      <div className="DeleteStudent">
        <div className={classes.deleteArea}>
          {student.points.length === 0 ? (
            <Button
              dense
              raised
              color="primary"
              onClick={() => this.handleDeleteDialog(student)}
            >
              Delete student
              <Delete className={classes.rightIcon} />
            </Button>
          ) : (
            <Typography type="body1">
              Student has {student.points.length} points associated. Student
              can't be deleted until they are removed.
            </Typography>
          )}
        </div>
        <Dialog
          open={this.state.deleteDialogOpen}
          onClose={this.handleDeleteDialogClose}
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
DeleteStudent = withRouter(DeleteStudent)
export default compose(
  graphql(DELETE_STUDENT_MUTATION, { name: 'deleteStudentMutation' }),
  withStyles(styles)
)(DeleteStudent)
