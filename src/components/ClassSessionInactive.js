import React, { Component } from 'react'
import Typography from 'material-ui/Typography/Typography'
import { graphql } from 'react-apollo'
import { UPDATE_CLASS_SESSION_STAGE } from '../queries'

// haveclass view for inactive ClassSession. Activate class Session
// should immediate move on to ClassSessionActive
class ClassSessionInactive extends Component {
  componentWillMount() {
    this.props.activateClassSession()
  }

  render() {
    return (
      <div>
        <Typography type="subheading">Activating class session...</Typography>
      </div>
    )
  }
}

export default graphql(UPDATE_CLASS_SESSION_STAGE, {
  name: 'activateClassSession',
  options: ({ session }) => ({ variables: { id: session.id, stage: 'Active' } })
})(ClassSessionInactive)
