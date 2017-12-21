import React, { Component } from 'react'
import Header from '../components/Header'
import { withStyles } from 'material-ui/styles'
import ClassSessionScheduler from '../components/ClassSessionScheduler'
import ClassSessionSelector from '../components/ClassSessionSelector'
import ClassSessionsUpcoming from '../components/ClassSessionsUpcoming'
import ClassSessionsPast from '../components/ClassSessionsPast'
import { Divider } from 'material-ui'
import { graphql, compose } from 'react-apollo'
import { FUTURE_CLASS_SESSIONS_QUERY } from '../queries'

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
})
class ClassSessions extends Component {
  render() {
    if (
      this.props.futureClassSessionsQuery &&
      this.props.futureClassSessionsQuery.loading
    ) {
      return <div>Loading</div>
    }
    const futureSessions = this.props.futureClassSessionsQuery.allClassSessions

    const updateCacheOnCreate = (store, createClassSession) => {
      const { variables } = this.props.futureClassSessionsQuery
      const data = store.readQuery({
        query: FUTURE_CLASS_SESSIONS_QUERY,
        variables
      })
      data.allClassSessions.push(createClassSession)
      store.writeQuery({ query: FUTURE_CLASS_SESSIONS_QUERY, variables, data })
    }
    const updateCacheOnDelete = (store, deleteClassSession) => {
      const { variables } = this.props.futureClassSessionsQuery
      const data = store.readQuery({
        query: FUTURE_CLASS_SESSIONS_QUERY,
        variables
      })
      data.allClassSessions = data.allClassSessions.filter(session => {
        return session.id !== deleteClassSession.id
      })
      store.writeQuery({ query: FUTURE_CLASS_SESSIONS_QUERY, variables, data })
    }
    const { classes } = this.props
    return (
      <div className="ClassSessions">
        <Header title="Class Sessions" />
        <div className={classes.container}>
          <ClassSessionSelector futureSessions={futureSessions} />
          <Divider />
          <ClassSessionScheduler updateCacheOnCreate={updateCacheOnCreate} />
          <Divider />
          <ClassSessionsUpcoming
            futureSessions={futureSessions}
            updateCacheOnDelete={updateCacheOnDelete}
          />
          <Divider />
          <ClassSessionsPast />
        </div>
      </div>
    )
  }
}

const now = new Date()
const variables = {
  recently: new Date(now.valueOf() - 15 * 60000).toISOString()
}

export default compose(
  graphql(FUTURE_CLASS_SESSIONS_QUERY, {
    name: 'futureClassSessionsQuery',
    options: { variables }
  }),
  withStyles(styles)
)(ClassSessions)
