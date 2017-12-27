import React, { Component } from 'react'
import { Delete } from 'material-ui-icons'
import IconButton from 'material-ui/IconButton/IconButton'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle
} from 'material-ui/Dialog'
import { Button } from 'material-ui'
import { graphql } from 'react-apollo'
import { DELETE_CLASS_SESSION_MUTATION } from '../queries'
import { formatDateString } from '../utilityFunctions'

class DeleteClassSessionButton extends Component {
  state = {
    dialogOpen: false
  }
  handleDeleteClassSession = async id => {
    this.setState({ dialogOpen: false })
    await this.props.deleteClassSessionMutation({
      variables: {
        id
      },
      update: (store, { data: { deleteClassSession } }) => {
        this.props.updateCacheOnDelete(store, deleteClassSession)
      }
    })
  }
  render() {
    const session = this.props.session

    return (
      <div>
        <IconButton onClick={() => this.setState({ dialogOpen: true })}>
          <Delete />
        </IconButton>
        <Dialog
          open={this.state.dialogOpen}
          onClose={() => this.setState({ dialogOpen: false })}
        >
          <DialogTitle>Really delete class session?</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {session.groups.map(group => group.name).join(', ')}
              <br />
              {formatDateString(session.startsAt, session.endsAt)}
              <br />
              <br />
              This cannot be undone.
            </DialogContentText>
          </DialogContent>
          <DialogActions>
            <Button
              dense
              onClick={() => this.handleDeleteClassSession(session.id)}
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
export default graphql(DELETE_CLASS_SESSION_MUTATION, {
  name: 'deleteClassSessionMutation'
})(DeleteClassSessionButton)
