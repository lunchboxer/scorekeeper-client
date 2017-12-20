import React, { Component } from 'react'
import Typography from 'material-ui/Typography/Typography'
import TextField from 'material-ui/TextField/TextField'
import { withStyles } from 'material-ui/styles'
import { graphql, compose } from 'react-apollo'
import { JUST_GROUPS_QUERY, CREATE_CLASS_SESSION_MUTATION } from '../queries'
import { MenuItem } from 'material-ui/Menu'
import { alphabetizeByName } from '../utilityFunctions'
import Button from 'material-ui/Button/Button'

const styles = theme => ({
  container: {
    paddingTop: theme.spacing.unit * 2,
    paddingBottom: theme.spacing.unit
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
  buttons: {
    marginTop: theme.spacing.unit
  }
})

const nowUTC = new Date()
// this techincally isn't giving us the local time, since the date object
// will have a timezone (UTC), but when we slice it will be correct
const now = new Date(nowUTC.valueOf() - nowUTC.getTimezoneOffset() * 60000)
const start = new Date(now.valueOf() + 30 * 60000)
const end = new Date(now.valueOf() + 120 * 60000)
const endTime = end.toISOString().slice(0, 16)
const startTime = start.toISOString().slice(0, 16)

class ClassSessionScheduler extends Component {
  constructor(props) {
    super(props)

    this.state = {
      groupId: '',
      startsAt: startTime,
      endsAt: endTime
    }
  }

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }
  handleCancel = () => {
    this.setState({
      groupId: '',
      startsAt: startTime,
      endsAt: endTime
    })
  }
  handleSubmit = async () => {
    const startUTC = new Date(this.state.startsAt).toISOString()
    const endUTC = new Date(this.state.endsAt).toISOString()
    const variables = {
      groupsIds: [this.state.groupId],
      startsAt: startUTC,
      endsAt: endUTC
    }
    await this.props.createClassSessionMutation({
      variables,
      update: (store, { data: { createClassSession } }) => {
        this.props.updateCacheOnCreate(store, createClassSession)
      }
    })
    this.handleCancel()
  }

  render() {
    if (this.props.justGroupsQuery && this.props.justGroupsQuery.loading) {
      return <div>Loading</div>
    }
    const groups = alphabetizeByName([...this.props.justGroupsQuery.allGroups])
    const { classes } = this.props
    return (
      <div className={classes.container}>
        <Typography type="subheading">Schedule a class session</Typography>
        <TextField
          margin="dense"
          id="select-group"
          select
          label="Class"
          className={classes.inputField}
          value={this.state.groupId}
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
          margin="dense"
          className={classes.inputField}
          id="startsAt"
          label="Starting Time"
          value={this.state.startsAt}
          type="datetime-local"
          onChange={this.handleChange('startsAt')}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
        />
        <TextField
          margin="dense"
          className={classes.inputField}
          id="endsAt"
          label="Ending Time"
          value={this.state.endsAt}
          type="datetime-local"
          onChange={this.handleChange('endsAt')}
          InputLabelProps={{
            shrink: true
          }}
          fullWidth
        />

        <div className={classes.buttons}>
          <Button onClick={this.handleCancel}>Cancel</Button>
          <Button onClick={this.handleSubmit}>Submit</Button>
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(CREATE_CLASS_SESSION_MUTATION, {
    name: 'createClassSessionMutation'
  }),
  graphql(JUST_GROUPS_QUERY, {
    name: 'justGroupsQuery'
  }),
  withStyles(styles)
)(ClassSessionScheduler)
