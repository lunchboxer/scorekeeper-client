import React, { Component } from 'react'
import { Typography, Paper } from 'material-ui'
import { withStyles } from 'material-ui/styles'
import Header from '../components/Header'
import List, { ListItem, ListItemText } from 'material-ui/List'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

const styles = theme => ({
  title: {
    paddingBottom: theme.spacing.unit * 3
  },
  textField: {
    width: 200
  },
  formControl: {
    margin: theme.spacing.unit
  },
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  }
})

class Students extends Component {
  state = {}

  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  handleMouseDownPassword = event => {
    event.preventDefault()
  }

  handleClickShowPasssword = () => {
    this.setState({ showPassword: !this.state.showPassword })
  }

  render() {
    if (this.props.allStudentsQuery && this.props.allStudentsQuery.loading) {
      return <div>Loading</div>
    }
    const students = this.props.allStudentsQuery.allStudents
    const { classes } = this.props
    return (
      <div className="Students">
        {console.log(students)}
        <Header title="Students" />
        <Paper className={classes.paper}>
          <Typography component="p">
            List of Students grouped by class
          </Typography>
          <List>
            {students.map(student => (
              <ListItem key={student.id}>
                <ListItemText primary={student.chineseName} />
              </ListItem>
            ))}
          </List>
        </Paper>
      </div>
    )
  }
}

const ALL_STUDENTS_QUERY = gql`
  query AllStudentsQuery {
    allStudents {
      id
      englishName
      chineseName
      pinyinName
      gender
      dateOfBirth
      group {
        name
        id
      }
    }
  }
`

export default compose(
  graphql(ALL_STUDENTS_QUERY, { name: 'allStudentsQuery' }),
  withStyles(styles)
)(Students)
