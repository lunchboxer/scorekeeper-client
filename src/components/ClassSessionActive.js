import React, { Component } from 'react'
import Typography from 'material-ui/Typography/Typography'
import Button from 'material-ui/Button/Button'
import { graphql } from 'react-apollo'
import { UPDATE_CLASS_SESSION_STAGE } from '../queries'
import AttendanceForm from './AttendanceForm'

// HaveClass view for classSession not started by the teacher yet
// at this stage we'll take role and wait for the teacher to change the
// ClassSession's stage to 'started'
class ClassSessionActive extends Component {
  handleStartClass = session => {
    // first write the attendance state to the db
    // then start it
    this.props.startClassSession()
  }
  render() {
    const session = this.props.session
    return (
      <div>
        <Typography type="subheading">Active</Typography>
        {session.groups.map(group => (
          <AttendanceForm key={group.id} group={group} />
        ))}
        <Button>All present</Button>
        <Button onClick={() => this.handleStartClass(session)}>
          Start Class
        </Button>
      </div>
    )
  }
}

export default graphql(UPDATE_CLASS_SESSION_STAGE, {
  name: 'startClassSession',
  options: ({ session }) => ({
    variables: { id: session.id, stage: 'Started' }
  })
})(ClassSessionActive)
