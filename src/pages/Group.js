import React, { Component } from 'react'
import { graphql, compose } from 'react-apollo'
import { withStyles } from 'material-ui/styles'
import { Typography, Button } from 'material-ui'
import { Link } from 'react-router-dom'

import Header from '../components/Header'
import GroupForm from '../components/GroupForm'
import { GROUP_QUERY } from '../queries'

const styles = theme => ({
  container: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  title: {
    margin: theme.spacing.unit
  },
  actionButton: {
    margin: theme.spacing.unit
  }
})

class Group extends Component {
  render() {
    const { classes } = this.props
    if (this.props.groupQuery) {
      if (this.props.groupQuery.loading) {
        return <div>Loading</div>
      }
      const group = this.props.groupQuery.Group
      if (group === null) {
        return (
          <div className="Group">
            <Header title="Edit Group" />
            <div className={classes.container}>
              <Typography type="subheading" className={classes.title}>
                The group you are looking for wasn't found.
              </Typography>
              <Button
                component={Link}
                to="/students"
                className={classes.actionButton}
              >
                Find a group
              </Button>
            </div>
          </div>
        )
      } else {
        return (
          <div className="Group">
            <Header title="Edit Group" />
            <div className={classes.container}>
              <GroupForm group={group} />
            </div>
          </div>
        )
      }
    }
  }
}

Group = withStyles(styles)(Group)
export default compose(
  graphql(GROUP_QUERY, {
    name: 'groupQuery',
    options: ({ match }) => ({ variables: { id: match.params.id } })
  })
)(Group)
