import React, { Component } from 'react'
import Typography from 'material-ui/Typography/Typography'
import Button from 'material-ui/Button/Button'
import { graphql, compose } from 'react-apollo'
import {
  UPDATE_CLASS_SESSION_STAGE,
  MARK_OTHERS_ABSENT_MUTATION
} from '../queries'
import AttendanceForm from './AttendanceForm'

// HaveClass view for classSession not started by the teacher yet
// at this stage we'll take role and wait for the teacher to change the
// ClassSession's stage to 'started'
class ClassSessionActive extends Component {
  handleStartClass = session => {
    this.props.markOthersAbsent()
    this.props.startClassSession()
  }
  render() {
    const session = this.props.session
    return (
      <div>
        <Typography type="title">Who's here?</Typography>
        {session.groups.map(group => (
          <AttendanceForm key={group.id} group={group} session={session} />
        ))}
        <Button onClick={() => this.handleStartClass(session)}>
          Start Class
        </Button>
      </div>
    )
  }
}

export default compose(
  graphql(UPDATE_CLASS_SESSION_STAGE, {
    name: 'startClassSession',
    options: ({ session }) => ({
      variables: { id: session.id, stage: 'Started' }
    })
  }),
  graphql(MARK_OTHERS_ABSENT_MUTATION, {
    name: 'markOthersAbsent',
    options: ({ session }) => ({
      variables: { sessionId: session.id }
    })
  })
)(ClassSessionActive)
