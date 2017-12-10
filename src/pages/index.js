/* eslint-disable flowtype/require-valid-file-annotation */

import React, { Component } from 'react'
import PropTypes from 'prop-types'
import { withStyles } from 'material-ui/styles'
import withRoot from '../components/withRoot'
import { Switch, Route } from 'react-router-dom'

import About from './About'
import Welcome from './Welcome'
import UserProfile from './UserProfile'
import Login from './Login'

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
          <Route exact path="/about" component={About} />
          <Route exact path="/me" component={UserProfile} />
          <Route exact path="/login" component={Login} />
        </Switch>
      </div>
    )
  }
}

Index.propTypes = {
  classes: PropTypes.object.isRequired
}

export default withRoot(withStyles(styles)(Index))
