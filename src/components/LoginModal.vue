<template>
  <q-modal v-model="show" no-backdrop-dismiss>
    <q-modal-layout class="login-padding shadow-0 bg-tertiary min-450" :header-class="['shadow-0']" :content-class="['bg-tertiary']" :footer-class="['shadow-0', 'q-mt-md']">
      <div slot="header" class="login-title shadow-0 text-secondary">
        IMPACT
        <br />
        NEVER
        <br />
        STOP
        <div class="q-mt-lg">
          <q-field>
            <q-input placeholder="USERNAME" class="text-center"/>
          </q-field>
          <q-field class="q-mt-sm">
            <q-input type="password" placeholder="PASSWORD"/>
          </q-field>
        </div>
        <q-btn :loading="loadBtn" class="full-width q-mt-lg" color="secondary">
          LOGIN
        </q-btn>
      </div>
      <div slot="footer">
        <div class="row justify-between login-tip">
          <a>Forgot?</a>
          <a>Sign up</a>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import {
  QModal,
  QModalLayout,
  QField,
  QInput,
  QBtn
} from 'quasar'

export default {
  name: 'LoginModal',
  components: {
    QModal,
    QModalLayout,
    QField,
    QInput,
    QBtn
  },
  data () {
    return {
      show: true,
      loadBtn: false
    }
  }
}
</script>

<style lang="stylus" scoped>
.min-450
  min-width 450px
.login-tip
  cursor pointer
</style>
