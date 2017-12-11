import React, { Component } from 'react'
import { Typography, Paper, Button, TextField } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import { Link } from 'react-router-dom'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Header from '../components/Header'
import GroupsList from '../components/GroupsList'
import StudentsList from '../components/StudentsList'

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
  }
})

class AllStudents extends Component {
  state = {
    newGroupDialogOpen: false,
    newStudentDialogOpen: false,
    newClassName: ''
  }
  handleNewClassClose = () => {
    this.setState({ newGroupDialogOpen: false })
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  render() {
    if (this.props.allGroupsQuery && this.props.allGroupsQuery.loading) {
      return <div>Loading</div>
    }
    if (
      this.props.allLonelyStudentsQuery &&
      this.props.allLonelyStudentsQuery.loading
    ) {
      return <div>Loading</div>
    }
    const groups = this.props.allGroupsQuery.allGroups
    // alphabetize the groups
    const sortedGroups = [...groups].sort((a, b) => {
      var nameA = a.name.toUpperCase()
      var nameB = b.name.toUpperCase()
      if (nameA < nameB) {
        return -1
      }
      if (nameA > nameB) {
        return 1
      }

      return 0
    })
    const lonelyStudents = this.props.allLonelyStudentsQuery.allStudents
    const { classes } = this.props
    return (
      <div className="Students">
        <Header title="Students" />
        <Paper className={classes.paper}>
          <Button
            className={classes.actionButton}
            component={Link}
            to="/student/new/"
            raised
          >
            Add a student
          </Button>

          <Button
            className={classes.actionButton}
            onClick={() => this.setState({ newGroupDialogOpen: true })}
            raised
          >
            Add a class
          </Button>

          <Dialog
            open={this.state.newGroupDialogOpen}
            onRequestClose={this.handleNewClassClose}
          >
            <DialogTitle>Add a new Class</DialogTitle>
            <DialogContent>
              <TextField
                autoFocus
                margin="dense"
                id="name"
                label="Class name"
                type="text"
                value={this.state.newClassName}
                onChange={this.handleChange('newClassName')}
                fullWidth
              />
            </DialogContent>
            <DialogActions>
              <Button onClick={this.handleNewClassClose} color="primary">
                Cancel
              </Button>
              <Button onClick={() => this._createGroup()} color="primary">
                Create
              </Button>
            </DialogActions>
          </Dialog>
          {groups.length > 0 ? (
            <div className={classes.groupedList}>
              <Typography type="subheading" className={classes.title}>
                Students grouped by class
              </Typography>
              <Typography type="body1">(click a student to edit)</Typography>
              <GroupsList
                groups={sortedGroups}
                updateStoreAfterDeleteGroup={this._updateCacheAfterDeleteGroup}
              />
            </div>
          ) : (
            <Typography type="subheading" className={classes.title}>
              There are currently no groups
            </Typography>
          )}
          {lonelyStudents.length > 0 && (
            <div>
              <Typography type="subheading" className={classes.title}>
                Students not assigned to a class
              </Typography>
              <Typography type="body1">(click to edit)</Typography>
              <StudentsList students={lonelyStudents} groups={sortedGroups} />
            </div>
          )}
        </Paper>
      </div>
    )
  }

  _createGroup = async () => {
    const { newClassName } = this.state
    await this.props.createGroupMutation({
      variables: { name: newClassName },
      refetchQueries: [
        {
          query: ALL_GROUPS_QUERY
        }
      ]
    })
    this.setState({ newClassName: '' })
    this.handleNewClassClose()
  }

  _updateCacheAfterDeleteGroup = (store, deleteGroup) => {
    const data = store.readQuery({ query: ALL_GROUPS_QUERY })
    data.allGroups = data.allGroups.filter(group => group.id !== deleteGroup.id)
    store.writeQuery({ query: ALL_GROUPS_QUERY, data })
  }
}

const ALL_GROUPS_QUERY = gql`
  query AllGroupsQuery {
    allGroups {
      id
      name
      students {
        id
        englishName
        chineseName
        pinyinName
        gender
        dateOfBirth
      }
    }
  }
`
const ALL_LONELY_STUDENTS_QUERY = gql`
  query AllLonelyStudentsQuery($group: GroupFilter) {
    allStudents(filter: { group: $group }) {
      id
      englishName
      chineseName
      pinyinName
      gender
      dateOfBirth
    }
  }
`
const LONELY_VARIABLES = { group: null }

const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($name: String!) {
    createGroup(name: $name) {
      id
      name
    }
  }
`

export default compose(
  graphql(ALL_LONELY_STUDENTS_QUERY, {
    name: 'allLonelyStudentsQuery',
    options: { variables: LONELY_VARIABLES }
  }),
  graphql(ALL_GROUPS_QUERY, { name: 'allGroupsQuery' }),
  graphql(CREATE_GROUP_MUTATION, { name: 'createGroupMutation' }),
  withStyles(styles)
)(AllStudents)
