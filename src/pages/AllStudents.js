import React, { Component } from 'react'
import { Typography } from 'material-ui'
import List from 'material-ui/List'
import { withStyles } from 'material-ui/styles'

import { graphql, compose } from 'react-apollo'

import Header from '../components/Header'
import GroupList from '../components/GroupList'
import AddGroupButton from '../components/AddGroupButton'
import { alphabetizeByName } from '../utilityFunctions'
import { ALL_GROUPS_QUERY } from '../queries'

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
  studentlist: {
    maxWidth: 400
  }
})

class AllStudents extends Component {
  state = {
    open: true
  }
  render() {
    if (this.props.allGroupsQuery && this.props.allGroupsQuery.loading) {
      return <div>Loading</div>
    }

    const groups = this.props.allGroupsQuery.allGroups
    const sortedGroups = alphabetizeByName([...groups])
    const { classes } = this.props

    return (
      <div className="Students">
        <Header title="Students" />
        <div className={classes.container} />
        {groups.length > 0 ? (
          <div className={classes.groupedList}>
            <div className={classes.container}>
              <Typography type="subheading" className={classes.title}>
                Students grouped by class (click to edit)
              </Typography>
            </div>
            <List className={classes.studentlist}>
              {sortedGroups.map(group => (
                <GroupList key={group.id} group={group} />
              ))}
            </List>
          </div>
        ) : (
          <div className={classes.container}>
            <Typography type="subheading" className={classes.title}>
              There are currently no groups
            </Typography>
          </div>
        )}

        <AddGroupButton />
      </div>
    )
  }

  _createGroup = async () => {
    const { newClassName } = this.state
    await this.props.createGroupMutation({
      variables: { name: newClassName },
      update: (store, { data: { createGroup } }) => {
        const data = store.readQuery({ query: ALL_GROUPS_QUERY })
        data.allGroups.push(createGroup)
        store.writeQuery({ query: ALL_GROUPS_QUERY, data })
      }
    })
    this.setState({ newClassName: '' })
    this.handleNewClassClose()
  }

  _updateCacheAfterDeleteGroup = (store, deleteGroup) => {
    let data = store.readQuery({ query: ALL_GROUPS_QUERY })
    data.allGroups = data.allGroups.filter(group => group.id !== deleteGroup.id)
    store.writeQuery({ query: ALL_GROUPS_QUERY, data })
  }
}

export default compose(
  graphql(ALL_GROUPS_QUERY, { name: 'allGroupsQuery' }),
  withStyles(styles)
)(AllStudents)
