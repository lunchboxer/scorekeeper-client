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

