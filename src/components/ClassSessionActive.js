import React, { Component } from 'react'
import Typography from 'material-ui/Typography/Typography'
import Button from 'material-ui/Button/Button'
import { graphql } from 'react-apollo'
import { START_CLASS_SESSION } from '../queries'

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
        <Button onClick={() => this.handleStartClass(session)}>
          Start Class
        </Button>
      </div>
    )
  }
}

export default graphql(START_CLASS_SESSION, {
  name: 'startClassSession',
  options: ({ session }) => ({ variables: { id: session.id } })
})(ClassSessionActive)
