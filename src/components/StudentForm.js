import React, { Component } from 'react'
import { withStyles } from 'material-ui/styles'
import { Button, TextField, Divider } from 'material-ui'
import Card, { CardActions, CardContent } from 'material-ui/Card'
import Radio, { RadioGroup } from 'material-ui/Radio'
import { FormControlLabel } from 'material-ui/Form'

const styles = theme => ({
  paper: {
    padding: theme.spacing.unit * 2,
    color: theme.palette.text.secondary
  },
  title: {
    marginTop: theme.spacing.unit
  },
  actionButton: {
    margin: theme.spacing.unit
  }
})

class StudentNotFound extends Component {
  state = {}
  handleChange = prop => event => {
    this.setState({ [prop]: event.target.value })
  }

  render() {
    const student = this.props.student ? this.props.student : {}
    const { classes } = this.props
    return (
      <div className="StudentForm">
        <Card>
          <CardContent>
            <TextField
              margin="dense"
              id="chineseName"
              label="Chinese name"
              value={
                this.state.newChineseName
                  ? this.state.newChineseName
                  : student.chineseName ? student.chineseName : ''
              }
              type="text"
              onChange={this.handleChange('newChineseName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="PinyinName"
              label="Pinyin name"
              type="text"
              value={
                this.state.newPinyinName
                  ? this.state.newPinyinName
                  : student.pinyinName ? student.pinyinName : ''
              }
              onChange={this.handleChange('newPinyinName')}
              fullWidth
            />
            <TextField
              margin="dense"
              id="englishName"
              label="English Name"
              type="text"
              value={
                // this can be refactored into a function
                this.state.newEnglishName
                  ? this.state.newEnglishName
                  : student.englishName ? student.englishName : ''
              }
              onChange={this.handleChange('newEnglishName')}
              fullWidth
            />

            <RadioGroup
              aria-label="gender"
              name="gender"
              className={classes.group}
              value={
                this.state.newGender
                  ? this.state.newGender
                  : student.gender ? student.gender : ''
              }
              onChange={this.handleChange('newGender')}
            >
              <FormControlLabel value="M" control={<Radio />} label="Male" />
              <FormControlLabel value="F" control={<Radio />} label="Female" />
            </RadioGroup>
            <TextField
              id="date"
              label="Date of Birth"
              type="date"
              value={(this.state.newDateOfBirth
                ? this.state.newDateOfBirth
                : student.dateOfBirth ? student.dateOfBirth : '2011-12-20'
              ).slice(0, 10)}
              onChange={this.handleChange('newDateOfBirth')}
              className={classes.textField}
              InputLabelProps={{
                shrink: true
              }}
            />
          </CardContent>
          <Divider />
          <CardActions>
            <Button>Cancel</Button>
            <Button>Save</Button>
            <Button>Delete student</Button>
          </CardActions>
        </Card>
      </div>
    )
  }
}

export default withStyles(styles)(StudentNotFound)
