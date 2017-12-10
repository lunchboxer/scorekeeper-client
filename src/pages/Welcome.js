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

class Welcome extends Component {
  state = {
    password: '',
    username: '',
    showPassword: false
  }

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
      <div className="Welcome">
        <Header title="Scorekeeper" />
        <Paper className={classes.paper}>
          <Typography component="p">A list of Students</Typography>
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
      chineseName
      pinyinName
      gender
      dateOfBirth
      group {
        id
      }
    }
  }
`

export default compose(
  graphql(ALL_STUDENTS_QUERY, { name: 'allStudentsQuery' }),
  withStyles(styles)
)(Welcome)
