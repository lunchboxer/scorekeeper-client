import React, { Component } from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import { Button, TextField, IconButton } from 'material-ui'
import EditIcon from 'material-ui-icons/Edit'
import { UPDATE_GROUP_MUTATION } from '../queries'
import { graphql } from 'react-apollo'
import { withStyles } from 'material-ui/styles'

const styles = theme => ({
  actionButton: {
    margin: theme.spacing.unit
  },
  leftIcon: {
    marginRight: theme.spacing.unit
  }
})

class EditClassButton extends Component {
  state = {
    open: false
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  editGroupName = async group => {
    // if no change has been made do nothing
    if (this.state.groupName && this.state.groupName !== '') {
      const { groupName } = this.state
      await this.props.updateGroupMutation({
        variables: { id: group.id, name: groupName }
      })
    }
    this.setState({ open: false })
    this.setState({ groupName: undefined })
  }
  handleCancel = () => {
    this.setState({ open: false })
    this.setState({ groupName: undefined })
  }
  render() {
    const { classes, group } = this.props

    return (
      <div>
        <IconButton
          className={classes.actionButton}
          onClick={() => this.setState({ open: true })}
        >
          <EditIcon />
        </IconButton>
        <Dialog
          open={this.state.open}
          onClose={() => this.setState({ open: false })}
        >
          <DialogTitle>Change class name</DialogTitle>
          <DialogContent>
            <TextField
              autoFocus
              margin="dense"
              id="name"
              type="text"
              value={this.state.groupName || group.name}
              onChange={this.handleChange('groupName')}
              fullWidth
            />
          </DialogContent>
          <DialogActions>
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button onClick={() => this.editGroupName(group)}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
}

EditClassButton = withStyles(styles)(EditClassButton)
export default graphql(UPDATE_GROUP_MUTATION, { name: 'updateGroupMutation' })(
  EditClassButton
)
