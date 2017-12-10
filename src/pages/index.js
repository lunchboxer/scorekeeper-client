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
import Students from './Students'
import NotFound from './NotFound'

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
          <Route path="/students" component={Students} />
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