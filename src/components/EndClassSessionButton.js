import React from 'react'
import Button from 'material-ui/Button/Button'
import { UPDATE_CLASS_SESSION_STAGE } from '../queries'
import { graphql } from 'react-apollo'

const EndClassSessionButton = props => {
  const endClassSession = () => {
    props.endClassSession()
  }
  return (
    <div>
      <Button onClick={endClassSession}>End Class</Button>
    </div>
  )
}
export default graphql(UPDATE_CLASS_SESSION_STAGE, {
  name: 'endClassSession',
  options: ({ session }) => ({ variables: { id: session.id, stage: 'Ended' } })
})(EndClassSessionButton)
