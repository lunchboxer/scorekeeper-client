import React, { Component } from 'react'
import List, { ListItem, ListItemText } from 'material-ui/List'
import { withStyles } from 'material-ui/styles'
import { Link } from 'react-router-dom'

const styles = theme => ({})

class StudentsList extends Component {
  render() {
    const students = this.props.students
    const classes = this.props.classes
    return (
      <div className="StudentsList">
        <List>
          {students.map(student => (
            <ListItem
              button
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
                primary={student.englishName || 'no English name'}
              />
            </ListItem>
          ))}
        </List>
      </div>
    )
  }
}

export default withStyles(styles)(StudentsList)
