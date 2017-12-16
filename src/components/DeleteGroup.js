import React, { Component } from 'react'
import Delete from 'material-ui-icons/Delete'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import { Button } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import { ListItemIcon } from 'material-ui/List'

import { graphql, compose } from 'react-apollo'
import { DELETE_GROUP_MUTATION, ALL_GROUPS_QUERY } from '../queries'

const styles = theme => ({})

class DeleteGroup extends Component {
  state = {
    dialogOpen: false
  }

  handleDeleteGroup = async id => {
    this.setState({ dialogOpen: false })
    await this.props.deleteGroupMutation({
      variables: {
        id
      },
      // gotta update the cache, queries on different page so just refetchQueries
      refetchQueries: [{ query: ALL_GROUPS_QUERY }] // change this to update
    })
  }

  render() {
    const { group } = this.props
    return (
      <div className="DeleteGroup">
        <ListItemIcon onClick={() => this.setState({ dialogOpen: true })}>
          <Delete />
        </ListItemIcon>
        <Dialog
          open={this.state.dialogOpen}
          onRequestClose={() => this.setState({ dialogOpen: false })}
        >
          <DialogTitle>Really delete {group.name}?</DialogTitle>
          <DialogContent>
            <DialogContentText>This cannot be undone.</DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              dense
              onClick={() => this.handleDeleteGroup(group.id)}
              color="primary"
            >
              Yes, Delete it
            </Button>
            <Button
              onClick={() => this.setState({ dialogOpen: false })}
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

export default compose(
  graphql(DELETE_GROUP_MUTATION, { name: 'deleteGroupMutation' }),
  withStyles(styles)
)(DeleteGroup)