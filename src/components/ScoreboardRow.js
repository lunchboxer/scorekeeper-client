import React, { Component } from 'react'
import Typography from 'material-ui/Typography/Typography'
import { compose, graphql } from 'react-apollo'
import {
  STUDENT_SESSION_POINTS_QUERY,
  NEW_POINT_STUDENT_SESSION_SUBSCRIPTION
} from '../queries'
import { withStyles } from 'material-ui/styles'
import Star from './Star'
import goodSoundFile from '../sounds/ui-confirmation-alert-a5min.wav'
import badSoundFile from '../sounds/quick-fart.wav'

const glowTimeout = 4000

const styles = theme => ({
  name: {
    padding: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 3,
    margin: 'auto 0'
  },
  container: {
    display: 'flex',
    width: '100%'
  },
  stars: {
    display: 'flex',
    alignContent: 'center',
    padding: 0,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  },
  glow: {
    display: 'flex',
    width: '100%',
    animation: `glow ${glowTimeout}ms ease-out 0s`
  },
  '@keyframes glow': {
    '0%, 100%': {
      backgroundColor: 'none'
    },
    '50%': {
      backgroundColor: '#444'
    }
  }
})

class ScoreboardRow extends Component {
  constructor(props) {
    super(props)
    this.goodsound = new Audio(goodSoundFile)
    this.badsound = new Audio(badSoundFile)
    this.state = { glow: false }
  }
  sumOfPointValues = points => {
    return points.reduce((sum, point) => {
      return sum + point.value
    }, 0)
  }

  rangeOfPointValues = points => {
    const sum = this.sumOfPointValues(points)
    return [...Array(sum).keys()]
  }
  highlightPointsChange = value => {
    if (value > 0) {
      this.goodsound.play()
    } else {
      this.badsound.play()
    }
    this.setState({ glow: true })
    setTimeout(() => {
      this.setState({ glow: false })
    }, glowTimeout)
  }

  subscribeToNewPoints = () => {
    this.props.studentSessionPointsQuery.subscribeToMore({
      document: NEW_POINT_STUDENT_SESSION_SUBSCRIPTION,
      variables: {
        student: this.props.student.id,
        session: this.props.sessionid
      },
      updateQuery: (previous, { subscriptionData }) => {
        const newAllPoints = [
          subscriptionData.data.Point.node,
          ...previous.allPoints
        ]
        this.highlightPointsChange(subscriptionData.data.Point.node.value)
        const result = {
          ...previous,
          allPoints: newAllPoints
        }
        return result
      }
    })
  }
  componentDidMount() {
    this.subscribeToNewPoints()
  }
  render() {
    const { student, classes } = this.props
    if (
      this.props.studentSessionPointsQuery &&
      this.props.studentSessionPointsQuery.loading
    ) {
      return (
        <div>
          <Typography type="subheading">Loading...</Typography>
        </div>
      )
    }
    const points = this.props.studentSessionPointsQuery.allPoints

    return (
      <div className={this.state.glow ? classes.glow : classes.container}>
        <div className={classes.name}>
          <Typography type="display3">{student.englishName}</Typography>
        </div>
        <div className={classes.stars}>
          {this.rangeOfPointValues(points).map((point, index) => (
            <Star index={index} key={index} />
          ))}
        </div>
      </div>
    )
  }
}

export default compose(
  graphql(STUDENT_SESSION_POINTS_QUERY, {
    name: 'studentSessionPointsQuery',
    options: ({ student, sessionid }) => ({
      variables: { student: student.id, session: sessionid }
    })
  }),
  withStyles(styles)
)(ScoreboardRow)
