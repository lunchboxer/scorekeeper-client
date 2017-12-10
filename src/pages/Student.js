import React, { Component } from 'react'

import { graphql, compose } from 'react-apollo'
import gql from 'graphql-tag'

import Header from '../components/Header'
import StudentNotFound from '../components/StudentNotFound'
import StudentForm from '../components/StudentForm'

class Student extends Component {
  render() {
    if (this.props.studentQuery && this.props.studentQuery.loading) {
      return <div>Loading</div>
    }
    if (this.props.match.params.id === 'new') {
      return (
        <div className="Student">
          <Header title="View Student" />
          <StudentForm />
        </div>
      )
    }
    if (this.props.studentQuery) {
      const student = this.props.studentQuery.Student
      if (student === null) {
        return <StudentNotFound />
      } else {
        return (
          <div className="Student">
            <Header title="View Student" />
            <StudentForm student={student} />
          </div>
        )
      }
    }
  }
}

const STUDENT_QUERY = gql`
  query StudentQuery($id: ID!) {
    Student(id: $id) {
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
// const STUDENT_QUERY_VARIABLES = { id: this.props.match.params.id }
export default compose(
  graphql(STUDENT_QUERY, {
    name: 'studentQuery',
    skip: ({ match }) => {
      return match.params.id === 'new'
    },
    options: ({ match }) => ({ variables: { id: match.params.id } })
  })
)(Student)
