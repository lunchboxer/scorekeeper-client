import React, { Component } from 'react'
import PointsForm from './PointsForm'
import AttendanceForm from './AttendanceForm'
import EndClassSessionButton from './EndClassSessionButton'
import Divider from 'material-ui/Divider/Divider'
import Tabs, { Tab } from 'material-ui/Tabs'
import Typography from 'material-ui/Typography'
import { withStyles } from 'material-ui/styles'
import SwipeableViews from 'react-swipeable-views'

function TabContainer({ children }) {
  return (
    <Typography component="div" style={{ padding: 8 * 3 }}>
      {children}
    </Typography>
  )
}

const styles = theme => ({
  root: {
    width: 500
  }
})

class ClassSessionStarted extends Component {
  state = { value: 0 }
  handleChange = (event, value) => {
    this.setState({ value })
  }
  handleChangeIndex = index => {
    this.setState({ value: index })
  }
  render() {
    const { session, classes } = this.props
    return (
      <div>
        <Tabs
          value={this.state.value}
          onChange={this.handleChange}
          indicatorColor="primary"
          textColor="primary"
          fullWidth
        >
          <Tab label="Points" />
          <Tab label="Roster" />
        </Tabs>
        <SwipeableViews
          axis="x"
          index={this.state.value}
          onChangeIndex={this.handleChangeIndex}
        >
          <TabContainer>
            {session.groups.map(group => (
              <PointsForm
                key={group.id}
                session={session}
                group={group}
                points={session.points}
              />
            ))}
          </TabContainer>
          <TabContainer>
            {session.groups.map(group => (
              <AttendanceForm key={group.id} group={group} session={session} />
            ))}
          </TabContainer>
        </SwipeableViews>
        <Divider />

        <EndClassSessionButton session={session} />
      </div>
    )
  }
}

export default withStyles(styles)(ClassSessionStarted)
