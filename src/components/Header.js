import React, { Component } from 'react'
import { AppBar, Toolbar, Typography, IconButton, Button } from 'material-ui'
import MenuIcon from 'material-ui-icons/Menu'
import AccountCircle from 'material-ui-icons/AccountCircle'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'
import { withRouter } from 'react-router'
import { GC_USER_ID, GC_AUTH_TOKEN } from '../constants'
import Menu, { MenuItem } from 'material-ui/Menu'
import Drawer from 'material-ui/Drawer'

import NavMenu from './NavMenu'

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
  constructor(props) {
    super(props)
    this.state = {
      anchorEl: null,
      drawerOpen: false
    }
  }

  handleCloseDrawer = () => {
    this.setState({ drawerOpen: false })
  }
  handleOpenDrawer = () => {
    this.setState({ drawerOpen: true })
  }
  handleLogout = () => {
    localStorage.removeItem(GC_USER_ID)
    localStorage.removeItem(GC_AUTH_TOKEN)
    this.handleRequestClose()
    this.props.history.push('/')
  }
  handleMenu = event => {
    this.setState({ anchorEl: event.currentTarget })
  }
  handleProfileLink = () => {
    this.handleRequestClose()
    this.props.history.push('/me')
  }
  handleRequestClose = () => {
    this.setState({ anchorEl: null })
  }

  render() {
    const userId = localStorage.getItem(GC_USER_ID)
    const { classes } = this.props
    const { pathname } = this.props.location
    const { anchorEl } = this.state
    const open = Boolean(anchorEl)

    return (
      <div className="Header">
        <Drawer open={this.state.drawerOpen} onClose={this.handleCloseDrawer}>
          <div
            tabIndex={0}
            role="button"
            onClick={this.handleCloseDrawer}
            onKeyDown={this.handleCloseDrawer}
          >
            <NavMenu />
          </div>
        </Drawer>
        <AppBar>
          <Toolbar>
            <IconButton
              className={classes.menuButton}
              color="contrast"
              aria-label="Menu"
              onClick={this.handleOpenDrawer}
            >
              <MenuIcon />
            </IconButton>
            <Typography className={classes.flex} type="title" color="inherit">
              {this.props.title}
            </Typography>
            {userId ? (
              <div>
                <IconButton
                  aria-owns={open ? 'menu-appbar' : null}
                  aria-haspopup="true"
                  onClick={this.handleMenu}
                  color="contrast"
                >
                  <AccountCircle />
                </IconButton>
                <Menu
                  id="menu-appbar"
                  anchorEl={anchorEl}
                  anchorOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right'
                  }}
                  open={open}
                  onRequestClose={this.handleRequestClose}
                >
                  <MenuItem onClick={this.handleProfileLink}>Profile</MenuItem>
                  <MenuItem onClick={this.handleLogout}>Log out</MenuItem>
                </Menu>
              </div>
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
