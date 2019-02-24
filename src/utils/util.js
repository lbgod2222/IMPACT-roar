import moment from 'moment'
import { Dialog } from 'quasar'

const purseTimestamp = function (t) {
  return moment(t).format('YYYY/MM/DD')
}

const composeDialog = async function (cfg, cb = () => {}, cbCancel = () => {}) {
  await Dialog.create({
    title: cfg.title,
    message: cfg.message,
    color: 'positive',
    ok: true,
    cancel: !cfg.isAlert
  })
    .then(() => {
      cb()
    })
    .catch(() => {
      cbCancel()
    })
}

export {
  purseTimestamp,
  composeDialog
}
