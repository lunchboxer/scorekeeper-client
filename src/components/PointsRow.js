import React, { Component } from 'react'
import { TableRow, TableCell } from 'material-ui/Table'
import { STUDENT_SESSION_POINTS_QUERY, CREATE_POINT_MUTATION } from '../queries'
import { graphql, compose } from 'react-apollo'
import { withStyles } from 'material-ui/styles'
import Menu, { MenuItem } from 'material-ui/Menu'
import ClearIcon from 'material-ui-icons/Clear'

const styles = theme => ({
  pointsCell: {
    textAlign: 'center',
    fontSize: '1.5rem'
  },
  englishName: {
    fontSize: '1.2rem'
  }
})

class PointsRow extends Component {
  state = {
    anchorEl: null,
    open: false
  }

  handleClick = event => {
    this.setState({ open: true, anchorEl: event.currentTarget })
  }
  handleClose = () => {
    this.setState({ open: false })
  }

  sumOfPointValues = points => {
    return points.reduce((sum, point) => {
      return sum + point.value
    }, 0)
  }
  handlePointClick = async value => {
    const variables = {
      value: value,
      student: this.props.student.id,
      session: this.props.session.id
    }
    await this.props.createPointMutation({
      variables,
      update: (store, { data: { createPoint } }) => {
        const { variables } = this.props.studentSessionPointsQuery
        const data = store.readQuery({
          query: STUDENT_SESSION_POINTS_QUERY,
          variables
        })
        data.allPoints.push(createPoint)
        store.writeQuery({
          query: STUDENT_SESSION_POINTS_QUERY,
          variables,
          data
        })
      }
    })
    this.handleClose()
  }

  render() {
    const { student, classes } = this.props
    const points = this.props.studentSessionPointsQuery.allPoints

    return (
      <TableRow>
        <TableCell onClick={this.handleClick}>
          <span className={classes.englishName}>{student.englishName}</span>
          <br />
          {student.chineseName + ' (' + student.pinyinName + ')'}
        </TableCell>
        <TableCell className={classes.pointsCell}>
          {this.props.studentSessionPointsQuery &&
          this.props.studentSessionPointsQuery.loading ? (
            <p>loading...</p>
          ) : (
            this.sumOfPointValues(points)
          )}
        </TableCell>
        <Menu
          id="points-menu"
          anchorEl={this.state.anchorEl}
          open={this.state.open}
          onClose={this.handleClose}
        >
          <MenuItem onClick={this.handleClose}>
            <ClearIcon />
          </MenuItem>
          <MenuItem onClick={() => this.handlePointClick(-1)}>-1</MenuItem>
          <MenuItem onClick={() => this.handlePointClick(1)}>+1</MenuItem>
          <MenuItem onClick={() => this.handlePointClick(2)}>+2</MenuItem>
        </Menu>
      </TableRow>
    )
  }
}
export default compose(
  graphql(STUDENT_SESSION_POINTS_QUERY, {
    name: 'studentSessionPointsQuery',
    options: ({ student, session }) => ({
      variables: { student: student.id, session: session.id }
    })
  }),
  graphql(CREATE_POINT_MUTATION, {
    name: 'createPointMutation'
  }),
  withStyles(styles)
)(PointsRow)
