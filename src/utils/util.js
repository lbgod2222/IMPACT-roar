import moment from 'moment'
import { Dialog, SessionStorage, Notify } from 'quasar'

const purseTimestamp = function (t) {
  return moment(t).format('YYYY/MM/DD')
}

// Dialog composer
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

// Notify composer
const infoNotify = message => {
  const type = 'positive'
  const color = 'positive'
  Notify.create({ message, type, color, position: 'top', timeout: 1500 })
}

// Notify composer
const warnNotify = message => {
  const type = 'negative'
  const color = 'negative'
  Notify.create({ message, type, color, position: 'top', timeout: 1500 })
}

// cache actions
const setCache = (key, value) => {
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
  removeCache,
  infoNotify,
  warnNotify
}
