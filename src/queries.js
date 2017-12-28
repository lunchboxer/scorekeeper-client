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
    $groupId: ID!
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
export const ALL_STUDENTS_QUERY = gql`
  query AllStudentQuery {
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
export const GROUP_QUERY = gql`
  query GroupQuery($id: ID!) {
    Group(id: $id) {
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
// Group Mutations
export const CREATE_GROUP_MUTATION = gql`
  mutation CreateGroupMutation($name: String!) {
    createGroup(name: $name) {
      id
      name
      students {
        id
      }
    }
  }
`
export const UPDATE_GROUP_MUTATION = gql`
  mutation UpdateGroupMutation($id: ID!, $name: String) {
    updateGroup(id: $id, name: $name) {
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
export const ADD_STUDENT_TO_GROUP_MUTATION = gql`
  mutation AddStudentToGroup($groupID: ID!, $studentID: ID!) {
    addToStudentInGroup(groupGroupId: $groupID, studentsStudentId: $studentID) {
      studentsStudent {
        id
        englishName
        chineseName
        pinyinName
        gender
        dateOfBirth
        group {
          id
        }
      }
      groupGroup {
        id
        name
        students {
          id
        }
      }
    }
  }
`
export const REMOVE_STUDENT_FROM_GROUP_MUTATION = gql`
  mutation RemoveStudentFromGroup($groupID: ID!, $studentID: ID!) {
    removeFromStudentInGroup(
      groupGroupId: $groupID
      studentsStudentId: $studentID
    ) {
      studentsStudent {
        id
        group {
          id
          name
        }
      }
      groupGroup {
        id
        name
        students {
          id
        }
      }
    }
  }
`

export const CREATE_CLASS_SESSION_MUTATION = gql`
  mutation CreateClassSessionMutation(
    $groupsIds: [ID!]
    $startsAt: DateTime!
    $endsAt: DateTime!
  ) {
    createClassSession(
      groupsIds: $groupsIds
      startsAt: $startsAt
      endsAt: $endsAt
    ) {
      id
      createdAt
      startsAt
      endsAt
      groups {
        id
        name
      }
      points {
        id
      }
    }
  }
`
// recently should be maybe 15 minutes before now
// we want all the future class session, but also give some margin of error
// for one's we may still want to join
export const FUTURE_CLASS_SESSIONS_QUERY = gql`
  query FutureClassSessionsQuery($recently: DateTime!) {
    allClassSessions(
      orderBy: startsAt_ASC
      filter: { OR: [{ startsAt_gte: $recently }, { endsAt_gte: $recently }] }
    ) {
      id
      createdAt
      startsAt
      endsAt
      groups {
        id
        name
      }
      points {
        id
      }
    }
  }
`
// starts before soon and ends after recently
export const CURRENT_CLASS_SESSIONS_QUERY = gql`
  query CurrentClassSessionsQuery($soon: DateTime!, $recently: DateTime!) {
    allClassSessions(
      orderBy: startsAt_ASC
      filter: { AND: [{ startsAt_lte: $soon }, { endsAt_gte: $recently }] }
    ) {
      id
      startsAt
      endsAt
      groups {
        id
        name
        students {
          id
          englishName
        }
      }
    }
  }
`

export const PAST_CLASS_SESSIONS_QUERY = gql`
  query PastClassSessionsQuery($now: DateTime!) {
    allClassSessions(orderBy: endsAt_DESC, filter: { endsAt_lte: $now }) {
      id
      createdAt
      startsAt
      endsAt
      groups {
        id
        name
      }
      points {
        id
      }
    }
  }
`

export const DELETE_CLASS_SESSION_MUTATION = gql`
  mutation DeleteClassSessionMutation($id: ID!) {
    deleteClassSession(id: $id) {
      id
    }
  }
`

export const ONE_CLASS_SESSION_QUERY = gql`
  query oneClassSessionQuery($id: ID!) {
    ClassSession(id: $id) {
      id
      createdAt
      startsAt
      endsAt
      stage
      attendances {
        id
        student {
          id
        }
      }
      groups {
        id
        name
        students {
          id
          englishName
          chineseName
          pinyinName
        }
      }
      points {
        id
        student {
          id
        }
      }
    }
  }
`
export const UPDATE_CLASS_SESSION_STAGE = gql`
  mutation UpdateClassSessionStage($id: ID!, $stage: Stage!) {
    updateClassSession(id: $id, stage: $stage) {
      id
      stage
    }
  }
`

export const START_CLASS_SESSION = gql`
  mutation StartClassSession($id: ID!) {
    updateClassSession(id: $id, stage: Started) {
      id
      stage
    }
  }
`

// Points
export const STUDENT_SESSION_POINTS_QUERY = gql`
  query StudentSessionPointsQuery($student: ID!, $session: ID!) {
    allPoints(
      filter: { student: { id: $student }, classSession: { id: $session } }
    ) {
      id
      value
    }
  }
`
export const CREATE_POINT_MUTATION = gql`
  mutation CreatePointMutation($student: ID!, $session: ID!, $value: Int!) {
    createPoint(value: $value, studentId: $student, classSessionId: $session) {
      id
      value
    }
  }
`

export const NEW_POINT_STUDENT_SESSION_SUBSCRIPTION = gql`
  subscription newPointSubscription($student: ID!, $session: ID!) {
    Point(
      filter: {
        AND: [
          { mutation_in: [CREATED] }
          {
            node: { student: { id: $student }, classSession: { id: $session } }
          }
        ]
      }
    ) {
      node {
        id
        value
      }
    }
  }
`
export const STUDENT_ATTENDANCE_QUERY = gql`
  query StudentAttendanceQuery($student: ID!, $session: ID!) {
    allAttendances(
      filter: {
        AND: [{ student: { id: $student } }, { classSession: { id: $session } }]
      }
    ) {
      id
      createdAt
      status
    }
  }
`

export const ADD_ATTENDANCE_MUTATION = gql`
  mutation AddAttendanceMutation(
    $student: ID!
    $session: ID!
    $status: AttendanceStatus!
  ) {
    createAttendance(
      studentId: $student
      classSessionId: $session
      status: $status
    ) {
      student {
        id
      }
      classSession {
        id
      }
      status
      id
    }
  }
`
export const UPDATE_ATTENDANCE_MUTATION = gql`
  mutation UpdateAttendanceMutation($id: ID!, $status: AttendanceStatus!) {
    updateAttendance(id: $id, status: $status) {
      student {
        id
      }
      classSession {
        id
      }
      status
      id
    }
  }
`
