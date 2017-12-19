import moment from 'moment'

export const addUpPoints = pointsArray => {
  return pointsArray.reduce((total, point) => {
    return total + point.value
  }, 0)
}

export const alphabetizeByName = list => {
  return list.sort((a, b) => {
    var nameA = a.name.toUpperCase()
    var nameB = b.name.toUpperCase()
    if (nameA < nameB) {
      return -1
    }
    if (nameA > nameB) {
      return 1
    }
    return 0
  })
}

export const formatDateString = (startDate, endDate) => {
  const startDateObj = new Date(startDate)
  let startDateString = startDateObj.toDateString()
  const endDateObj = new Date(endDate)
  const start = moment(startDate)
  const end = moment(endDate)
  let startTimeString = ''
  let endTimeString = ''

  startDateString = start.calendar(null, {
    sameDay: '[Today]',
    nextDay: '[Tomorrow]',
    nextWeek: 'dddd',
    lastDay: '[Yesterday]',
    lastWeek: '[Last] dddd',
    sameElse: 'ddd MMM Do'
  })
  if (startDateObj.getMinutes() === 0) {
    startTimeString = start.format('h')
  } else {
    startTimeString = start.format('h:mm')
  }
  if (endDateObj.getMinutes() === 0) {
    endTimeString = end.format('h')
  } else {
    endTimeString = end.format('h:mm')
  }
  if (start.format('a') !== end.format('a')) {
    startTimeString = startTimeString + ' ' + start.format('a')
  }
  return (
    startDateString +
    ' ' +
    startTimeString +
    '-' +
    endTimeString +
    ' ' +
    end.format('a')
  )
}
