import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Header from '../components/Header'
import { graphql, compose } from 'react-apollo'
import { ONE_CLASS_SESSION_QUERY } from '../queries'
import ClassSessionStarted from '../components/ClassSessionStarted'
import ClassSessionInactive from '../components/ClassSessionInactive'
import ClassSessionActive from '../components/ClassSessionActive'
import ClassSessionEnded from '../components/ClassSessionEnded'

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  title: {
    paddingBottom: theme.spacing.unit * 3
  }
})

class HaveClass extends Component {
  switchStage = session => {
    switch (session.stage) {
      case 'Active':
        return <ClassSessionActive session={session} />
      case 'Started':
        return <ClassSessionStarted session={session} />
      case 'Ended':
        return <ClassSessionEnded session={session} />
      default:
        return <ClassSessionInactive session={session} />
    }
  }
  render() {
    const session = this.props.oneClassSessionQuery.ClassSession
    const { classes } = this.props
    return (
      <div className="HaveClass">
        <Header title="Have Class" />
        <div className={classes.container}>
          {this.props.oneClassSessionQuery &&
          this.props.oneClassSessionQuery.loading ? (
            <Typography type="subheading">Loading</Typography>
          ) : (
            this.switchStage(session)
          )}
        </div>
      </div>
    )
  }
}
export default compose(
  graphql(ONE_CLASS_SESSION_QUERY, {
    name: 'oneClassSessionQuery',
    options: ({ match }) => ({ variables: { id: match.params.session } })
  }),
  withStyles(styles)
)(HaveClass)
