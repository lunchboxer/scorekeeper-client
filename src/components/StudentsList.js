import React, { Component } from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

const styles = theme => ({})

class StudentsList extends Component {
  state = {
    EditStudentDialogOpen: false
  }
  handleEditStudentDialogOpen = id => {
    this.setState({ EditStudentDialogOpen: true })
  }
  render() {
    const students = this.props.students
    const classes = this.props.classes
    return (
      <div className="StudentsList">
        <List dense>
          {students.map(student => (
            <ListItem
              component={Link}
              to={'/student/' + student.id}
              key={student.id}
              className={classes.flex}
            >
              <ListItemText
                className={classes.flex}
                secondary={
                  student.chineseName + ' (' + student.pinyinName + ')'
                }
                primary={
                  student.englishName ? student.englishName : 'no English name'
                }
              />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(StudentsList)
