import React, { Component } from 'react'
import Dialog, {
  DialogActions,
  DialogContent,
  DialogTitle
} from 'material-ui/Dialog'
import { Button, TextField } from 'material-ui'
import GroupAddIcon from 'material-ui-icons/GroupAdd'
import { CREATE_GROUP_MUTATION, ALL_GROUPS_QUERY } from '../queries'
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

class AddClassButton extends Component {
  state = {
    open: false,
    newClassName: ''
  }
  handleCancel = () => {
    this.setState({ newClassName: '' })
    this.setState({ open: false })
  }
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  render() {
    const { classes } = this.props

    return (
      <div>
        <Button
          className={classes.actionButton}
          onClick={() => this.setState({ open: true })}
        >
          <GroupAddIcon className={classes.leftIcon} />
          Add a class
        </Button>
        <Dialog
          open={this.state.open}
          onRequestClose={() => this.setState({ open: false })}
        >
          <DialogTitle>Add a new class</DialogTitle>
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
            <Button onClick={this.handleCancel}>Cancel</Button>
            <Button onClick={() => this._createGroup()}>Create</Button>
          </DialogActions>
        </Dialog>
      </div>
    )
  }
  _createGroup = async () => {
    this.setState({ open: false })
    const { newClassName } = this.state
    await this.props.createGroupMutation({
      variables: { name: newClassName },
      update: (store, { data: { createGroup } }) => {
        const data = store.readQuery({ query: ALL_GROUPS_QUERY })
        data.allGroups.push(createGroup)
        store.writeQuery({ query: ALL_GROUPS_QUERY, data })
      }
    })
    this.setState({ newClassName: '' })
  }
}

AddClassButton = withStyles(styles)(AddClassButton)
export default graphql(CREATE_GROUP_MUTATION, { name: 'createGroupMutation' })(
  AddClassButton
)
