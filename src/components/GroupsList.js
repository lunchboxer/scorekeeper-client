import React, { Component } from 'react'
import { Typography, Button } from 'material-ui'
import ExpandMoreIcon from 'material-ui-icons/ExpandMore'
import ExpansionPanel, {
  ExpansionPanelSummary,
  ExpansionPanelDetails,
  ExpansionPanelActions
} from 'material-ui/ExpansionPanel'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import { withStyles } from 'material-ui/styles'

import StudentsList from './StudentsList'

const styles = theme => ({
  GroupsList: {
    marginBottom: theme.spacing.unit * 3,
    marginTop: theme.spacing.unit * 2
  },
  flex: {
    flex: 1
  },
  listArea: {
    margin: 0,
    padding: 0,
    paddingLeft: theme.spacing.unit
  }
})

class GroupsList extends Component {
  state = {
    deleteDialogOpen: false,
    groupToDelete: {}
  }
  handleDeleteDialog = group => {
    this.setState({ deleteDialogOpen: true })
    this.setState({ groupToDelete: group })
  }
  handleDeleteGroup = async id => {
    this.handleDeleteDialogClose()
    await this.props.deleteGroupMutation({
      variables: {
        id
      },
      update: (store, { data: { deleteGroup } }) => {
        this.props.updateStoreAfterDeleteGroup(store, deleteGroup)
      }
    })
  }
  handleDeleteDialogClose = () => {
    this.setState({ deleteDialogOpen: false })
    this.setState({ groupToDelete: {} })
  }
  render() {
    const { classes, groups } = this.props

    return (
      <div className={classes.GroupsList}>
        {groups.map(group => (
          <ExpansionPanel key={group.id}>
            <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
              <Typography type="title" className={classes.flex}>
                {group.name}
              </Typography>
              <Typography type="subheading">
                {group.students.length} students
              </Typography>
            </ExpansionPanelSummary>
            {group.students.length > 0 && (
              <ExpansionPanelDetails className={classes.listArea}>
                <StudentsList students={group.students} groups={groups} />
              </ExpansionPanelDetails>
            )}
            <ExpansionPanelActions>
              {group.students.length === 0 && (
                <Button
                  dense
                  color="primary"
                  onClick={() => this.handleDeleteDialog(group)}
                >
                  Delete
                </Button>
              )}
              <Button dense color="primary">
                Edit
              </Button>
            </ExpansionPanelActions>
          </ExpansionPanel>
        ))}
        <Dialog
          open={this.state.deleteDialogOpen}
          onRequestClose={this.handleDeleteDialogClose}
        >
          <DialogTitle>
            Are you sure you want to delete the group "{
              this.state.groupToDelete.name
            }"?
          </DialogTitle>
          <DialogContent>
            <DialogContentText />
          </DialogContent>
          <DialogActions>
            <Button
              onClick={() =>
                this.handleDeleteGroup(this.state.groupToDelete.id)
              }
              color="primary"
            >
              I'm sure, Delete it
            </Button>
            <Button
              onClick={this.handleDeleteDialogClose}
              color="primary"
              autoFocus
            >
              No
            </Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: ID!) {
    deleteGroup(id: $id) {
      id
    }
  }
`

export default compose(
  graphql(DELETE_GROUP_MUTATION, { name: 'deleteGroupMutation' }),
  withStyles(styles)
)(GroupsList)
