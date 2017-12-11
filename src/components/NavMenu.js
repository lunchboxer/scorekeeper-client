import React, { Component } from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { NavLink, Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router'

const styles = theme => ({
  flex: {
    flex: 1
  },
  list: {
    width: 250
  },
  selected: {
    backgroundColor: '#F00'
  }
})

class NavMenu extends Component {
  render() {
    const { classes } = this.props
    const navLinks = [
      { Home: '/' },
      { 'Student List': '/students/' },
      { 'My Profile': '/me' },
      { 'About scorekeeper': '/about' }
    ]

    return (
      <div className={classes.list}>
        <List>
          {navLinks.map((link, index) => (
            <ListItem
              button
              key={index}
              component={NavLink}
              to={link[Object.keys(link)[0]]}
              activeClassName="selected"
            >
              <ListItemText primary={Object.keys(link)[0]} />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

NavMenu = withStyles(styles)(NavMenu)
export default withRouter(NavMenu)
