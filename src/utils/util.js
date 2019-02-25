import moment from 'moment'
import { Dialog } from 'quasar'

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
      console.log(this.$q)
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
