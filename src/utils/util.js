import moment from 'moment'
import { Dialog, SessionStorage } from 'quasar'

const purseTimestamp = function (t) {
  return moment(t).format('YYYY/MM/DD')
}

const composeDialog = async function (cfg, cb = () => {}, cbCancel = () => {}, that) {
  await Dialog.create({
    title: cfg.title,
    message: cfg.message,
    color: 'positive',
    ok: {
      push: false,
      label: '确定',
      color: 'secondary',
      size: 'sm'
    },
    cancel: cfg.isAlert ? false : {push: false, label: '取消', color: 'negative'}
  })
    .then(() => {
      cb()
    })
    .catch(() => {
      cbCancel()
    })
}

// cache actions
const setCache = (key, value) => {
  console.log(SessionStorage)
  return SessionStorage.set(key, value)
}
const getCache = key => {
  return SessionStorage.get.item(key)
}
const removeCache = key => {
  return SessionStorage.remove(key)
}

export {
  purseTimestamp,
  composeDialog,
  setCache,
  getCache,
  removeCache
}
