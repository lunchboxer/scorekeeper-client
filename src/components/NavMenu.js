import React, { Component } from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { Link } from 'react-router-dom'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router'
import { Typography } from 'material-ui'
import { grey } from 'material-ui/colors'
import kidsabouttorace from '../images/kidsabouttorace.jpg'

const styles = theme => ({
  flex: {
    flex: 1
  },
  list: {
    width: 250
  },
  navTitle: {
    margin: 0,
    borderBottom: '2px solid ' + grey[500],
    padding: theme.spacing.unit * 2,
    paddingTop: theme.spacing.unit * 4,
    height: 155 - theme.spacing.unit * 6,
    background: {
      image: `url(${kidsabouttorace})`,
      position: 'top left',
      repeat: 'no-repeat',
      size: [250, 155]
    }
  }
})

class NavMenu extends Component {
  render() {
    const { classes } = this.props
    const navLinks = [
      { Home: '/' },
      { 'Student List': '/students/' },
      { 'My Profile': '/me' },
      { 'About Scorekeeper': '/about' }
    ]

    return (
      <div className={classes.list}>
        <div className={classes.navTitle}>
          <Typography type="title">Scorekeeper</Typography>
          <Typography type="subheading">An app for keeping score</Typography>
        </div>
        <List>
          {navLinks.map((link, index) => (
            <ListItem
              button
              key={index}
              component={Link}
              to={link[Object.keys(link)[0]]}
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
