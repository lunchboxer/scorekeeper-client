import React, { Component } from 'react'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import Header from '../components/Header'
import PointsForm from '../components/PointsForm'
import { graphql, compose } from 'react-apollo'
import { ONE_CLASS_SESSION_QUERY } from '../queries'

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
            session.groups.map(group => (
              <PointsForm
                key={group.id}
                sessionid={session.id}
                group={group}
                points={session.points}
              />
            ))
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
