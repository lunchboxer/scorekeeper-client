import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button } from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'

const styles = theme => ({
  flex: {
    flex: 1
  },
  menuButton: {
    marginLeft: -12,
    marginRight: 20
  }
})

class Header extends Component {
  logout = () => {
    localStorage.removeItem(GC_USER_ID)
    localStorage.removeItem(GC_AUTH_TOKEN)
    this.props.history.push('/')
  }

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    const { classes } = this.props
    const { pathname } = this.props.location

    return (
      <div className="Header">
        <AppBar>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="contrast"
              aria-label="Menu"
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.flex} type="title" color="inherit">
              {this.props.title}
            </Typography>
            {userId ? (
              <Button onClick={this.logout} color="contrast">
                Logout
              </Button>
            ) : (
              pathname !== '/login' && (
                <Button component={Link} to="/login" color="contrast">
                  Login
                </Button>
              )
            )}
          </Toolbar>
        </AppBar>
      </div>
    )
  }
}
Header = withStyles(styles)(Header)
export default withRouter(Header)
