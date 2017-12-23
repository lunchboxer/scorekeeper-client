import React, { Component } from 'react'
import Typography from 'material-ui/Typography/Typography'
import { withStyles } from 'material-ui/styles'
import ScoreboardRow from './ScoreboardRow'

const styles = theme => ({
  root: {
    marginTop: theme.spacing.unit * -7,
    [theme.breakpoints.up('sm')]: {
      marginTop: theme.spacing.unit * -8
    },
    width: '100%'
  },
  stretch: {
    display: 'flex',
    flexDirection: 'column'
  }
})

class Scoreboard extends Component {
  render() {
    const { session, classes } = this.props
    return (
      <div className={classes.root}>
        <Typography type="title">Scoreboard</Typography>
        {session.groups.map(group => (
          <div key={group.id}>
            <div>
              <Typography type="title">{group.name}</Typography>
            </div>

            <div className={classes.stretch}>
              {group.students.map(student => (
                <ScoreboardRow
                  key={student.id}
                  sessionid={session.id}
                  student={student}
                />
              ))}
            </div>
          </div>
        ))}
      </div>
    )
  }
}

export default withStyles(styles)(Scoreboard)
