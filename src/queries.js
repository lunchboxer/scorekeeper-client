import gql from 'graphql-tag'

// Student Mutations
export const UPDATE_STUDENT_MUTATION = gql`
  mutation UpdateStudentMutation(
    $id: ID!
    $gender: Gender
    $englishName: String
    $chineseName: String
    $pinyinName: String
    $dateOfBirth: DateTime
    $groupId: ID
  ) {
    updateStudent(
      id: $id
      chineseName: $chineseName
      pinyinName: $pinyinName
      englishName: $englishName
      gender: $gender
      dateOfBirth: $dateOfBirth
      groupId: $groupId
    ) {
      id
      chineseName
      englishName
      pinyinName
      group {
        id
      }
    }
  }
`
export const CREATE_STUDENT_MUTATION = gql`
  mutation CreateStudentMutation(
    $chineseName: String!
    $englishName: String
    $gender: Gender
    $dateOfBirth: DateTime
    $groupId: ID
    $pinyinName: String
  ) {
    createStudent(
      chineseName: $chineseName
      pinyinName: $pinyinName
      englishName: $englishName
      gender: $gender
      dateOfBirth: $dateOfBirth
      groupId: $groupId
    ) {
      id
      chineseName
      group {
        id
      }
      pinyinName
      englishName
    }
  }
`
export const DELETE_STUDENT_MUTATION = gql`
  mutation DeleteStudentMutation($id: ID!) {
    deleteStudent(id: $id) {
      id
    }
  }
`
// Student Queries
export const STUDENT_QUERY = gql`
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
      points {
        id
        createdAt
        value
      }
    }
  }
`
// Groups
export const ALL_GROUPS_QUERY = gql`
  query AllGroupsQuery {
    allGroups {
      id
      name
      students {
        id
        englishName
        chineseName
        pinyinName
        gender
        dateOfBirth
      }
    }
  }
`
export const JUST_GROUPS_QUERY = gql`
  query JustGroupsQuery {
    allGroups {
      id
      name
    }
  }
`
// use with group:null to find students not assigned to a class
export const ALL_STUDENTS_FILTER_GROUP_QUERY = gql`
  query AllStudentsFilterGroupQuery($group: GroupFilter) {
    allStudents(filter: { group: $group }) {
      id
      englishName
      chineseName
      pinyinName
      gender
      dateOfBirth
    }
  }
`
export const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($name: String!) {
    createGroup(name: $name) {
      id
      name
    }
  }
`
export const DELETE_GROUP_MUTATION = gql`
  mutation DeleteGroupMutation($id: ID!) {
    deleteGroup(id: $id) {
      id
    }
  }
`