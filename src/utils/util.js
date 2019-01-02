import moment from 'moment'

const purseTimestamp = function (t) {
  return moment(t).format('YYYY/MM/DD')
}

export {
  purseTimestamp
}
