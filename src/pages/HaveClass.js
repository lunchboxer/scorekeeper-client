import React from 'react'
import Header from '../components/Header'
import { withStyles } from 'material-ui/styles'
import ClassSessionScheduler from '../components/ClassSessionScheduler'
import ClassSessionSelector from '../components/ClassSessionSelector'
import ClassSessionsUpcoming from '../components/ClassSessionsUpcoming'
import { Divider } from 'material-ui'

const styles = theme => ({
  container: {
    padding: theme.spacing.unit,
    paddingLeft: theme.spacing.unit * 2,
    paddingRight: theme.spacing.unit * 2
  }
})

const HaveClass = ({ classes }) => {
  return (
    <div className="HaveClass">
      <Header title="Have class" />
      <div className={classes.container}>
        <ClassSessionSelector />
        <Divider />
        <ClassSessionScheduler />
        <Divider />
        <ClassSessionsUpcoming />
      </div>
    </div>
  )
}

export default withStyles(styles)(HaveClass)
