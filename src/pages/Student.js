import React, { Component } from 'react'

import { graphql, compose } from 'react-apollo'

import Header from '../components/Header'
import StudentNotFound from '../components/StudentNotFound'
import StudentForm from '../components/StudentForm'
import { alphabetizeByName } from '../utilityFunctions'
import { JUST_GROUPS_QUERY, STUDENT_QUERY } from '../queries'

class Student extends Component {
  render() {
    if (this.props.justGroupsQuery && this.props.justGroupsQuery.loading) {
      return <div>Loading</div>
    }
    const groups = this.props.justGroupsQuery.allGroups
    const sortedGroups = alphabetizeByName([...groups])

    if (this.props.studentQuery && this.props.studentQuery.loading) {
      return <div>Loading</div>
    }
    if (this.props.match.params.id === 'new') {
      return (
        <div className="Student">
          <Header title="Add a Student" />
          <StudentForm
            groups={sortedGroups}
            groupId={this.props.match.params.group}
          />
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
            <StudentForm student={student} groups={sortedGroups} />
          </div>
        )
      }
    }
  }
}

export default compose(
  graphql(STUDENT_QUERY, {
    name: 'studentQuery',
    skip: ({ match }) => {
      return match.params.id === 'new'
    },
    options: ({ match }) => ({ variables: { id: match.params.id } })
  }),
  graphql(JUST_GROUPS_QUERY, { name: 'justGroupsQuery' })
)(Student)
