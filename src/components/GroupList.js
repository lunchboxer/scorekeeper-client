import React, { Component } from 'react'
import List, { ListItem, ListItemText, ListItemIcon } from 'material-ui/List'
import { Paper, Avatar, IconButton } from 'material-ui'
import ExpandLess from 'material-ui-icons/ExpandLess'
import ExpandMore from 'material-ui-icons/ExpandMore'
import Collapse from 'material-ui/transitions/Collapse'
import { withStyles } from 'material-ui/styles'
import { withRouter } from 'react-router-dom'
import GroupIcon from 'material-ui-icons/Group'
import PersonIcon from 'material-ui-icons/Person'
import PersonAddIcon from 'material-ui-icons/PersonAdd'
import { Link } from 'react-router-dom'
import DeleteGroup from './DeleteGroup'
import EditGroupName from './EditGroupName'

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  title: {
    marginTop: theme.spacing.unit
  },
  nested: {
    paddingLeft: theme.spacing.unit * 4
  },
  paper: {
    marginBottom: '3px'
  }
})

class GroupList extends Component {
  state = {
    open: true
  }
  handleAddStudent = groupId => {
    this.props.history.push('/student/new/' + groupId)
  }

  render() {
    const { classes, group } = this.props
    return (
      <div className="GroupList">
        <Paper className={classes.paper}>
          <ListItem>
            <ListItemIcon>
              <GroupIcon />
            </ListItemIcon>
            <ListItemText
              primary={group.name}
              secondary={(group.students.length || 0) + ' student(s)'}
            />
            <ListItemIcon>
              <EditGroupName group={group} />
            </ListItemIcon>
            <ListItemIcon>
              <IconButton onClick={() => this.handleAddStudent(group.id)}>
                <PersonAddIcon />
              </IconButton>
            </ListItemIcon>
            {group.students.length > 0 ? (
              <ListItemIcon
                onClick={() => this.setState({ open: !this.state.open })}
              >
                {this.state.open ? <ExpandLess /> : <ExpandMore />}
              </ListItemIcon>
            ) : (
              <DeleteGroup group={group} />
            )}
          </ListItem>
          {group.students.length > 0 && (
            <Collapse
              component="li"
              in={this.state.open}
              timeout="auto"
              unmountOnExit
            >
              <List disablePadding>
                {group.students.map(student => (
                  <div key={student.id}>
                    <ListItem
                      inset="true"
                      button
                      component={Link}
                      to={'/student/' + student.id}
                      key={student.id}
                      className={[classes.flex, classes.nested]}
                    >
                      <ListItemIcon>
                        <Avatar>
                          <PersonIcon />
                        </Avatar>
                      </ListItemIcon>
                      <ListItemText
                        className={classes.flex}
                        secondary={
                          student.chineseName + ' (' + student.pinyinName + ')'
                        }
                        primary={student.englishName || 'no English name'}
                      />
                    </ListItem>
                  </div>
                ))}
              </List>
            </Collapse>
          )}
        </Paper>
      </div>
    )
  }
}
GroupList = withStyles(styles)(GroupList)
export default withRouter(GroupList)
