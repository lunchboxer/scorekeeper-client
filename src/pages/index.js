/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import withRoot from '../components/withRoot'
import { Route, Switch } from 'react-router-dom'
import About from './About'
import Welcome from './Welcome'
import UserProfile from './UserProfile'
import Login from './Login'
import AllStudents from './AllStudents'
import Student from './Student'
import NotFound from './NotFound'
import ClassSessions from './ClassSessions'
import HaveClass from './HaveClass'

const styles = theme => ({
  root: {
    paddingTop: theme.spacing.unit * 7,
    [theme.breakpoints.up('sm')]: {
      paddingTop: theme.spacing.unit * 8
    },
    width: '100%'
  }
})
class Index extends Component {
  render() {
    const { classes } = this.props

    return (
      <div className={classes.root}>
        <Switch>
          <Route exact path="/" component={Welcome} />
          <Route path="/about" component={About} />
          <Route path="/me" component={UserProfile} />
          <Route path="/login" component={Login} />
          <Route path="/students" component={AllStudents} />
          <Route exact path="/student" component={AllStudents} />
          <Route path="/student/:id/:group" component={Student} />
          <Route path="/student/:id" component={Student} />
          <Route path="/sessions" component={ClassSessions} />
          <Route path="/haveclass/:id" component={HaveClass} />
          <Route component={NotFound} />
        </Switch>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Index))
