<template>
  <q-modal v-model="show" no-backdrop-dismiss>
    <q-modal-layout class="login-padding shadow-0 bg-tertiary min-450" :header-class="['shadow-0']" :content-class="['bg-tertiary']" :footer-class="['shadow-0', 'q-mt-md']">
      <div slot="header" class="login-title shadow-0 text-secondary">
        IMPACT
        <br />
        NEVER
        <br />
        DIE
        <transition-group
          enter-active-class="animated fadeIn"
          leave-active-class="animated fadeOut"
          appear
          mode="out-in"
        >
          <!-- NORMAL -->
          <div class="q-mt-lg" v-show="flag === 0" key="form-0">
            <q-field>
              <q-input placeholder="USERNAME" class="text-center"/>
            </q-field>
            <q-field class="q-mt-sm">
              <q-input type="password" placeholder="PASSWORD"/>
            </q-field>
          </div>
          <q-btn v-show="flag === 0" :loading="loadBtn" class="full-width q-mt-lg" color="secondary" key="btn-0">
            LOGIN
          </q-btn>
          <!-- SIGN UP -->
          <div class="q-mt-lg" v-show="flag === 1" key="form-1">
            <q-field>
              <q-input placeholder="USERNAME" v-model="username" class="text-center"/>
            </q-field>
            <q-field class="q-mt-sm">
              <q-input type="password" v-model="password" placeholder="PASSWORD"/>
            </q-field>
            <q-field class="q-mt-sm">
              <q-input type="password" v-model="password2" placeholder="PASSWORD CONFIRM"/>
            </q-field>
            <div class="row justify-between">
              <q-field class="q-mt-sm col-8">
                <q-input type="email" v-model="email" placeholder="EMAIL"/>
              </q-field>
              <div class="send-btn q-btn inline relative-position q-btn-item non-selectable q-btn-rectangle q-btn-outline q-focusable q-hoverable q-mt-sm">
                SEND
              </div>
            </div>
            <q-field class="q-mt-sm">
              <q-input type="text" v-model="valid" placeholder="VALID"/>
            </q-field>
          </div>
          <q-btn v-show="flag === 1" :loading="loadBtn" class="full-width q-mt-lg" color="secondary" key="btn-1">
            REGIST
          </q-btn>
          <!-- FORGOT -->
        </transition-group>
      </div>
      <div slot="footer">
        <div class="row justify-between login-tip">
          <!-- <a @click="change(0)">Forgot?</a> -->
          <a v-if="flag === 0" @click="change(1)">Sign up</a>
          <a v-else @click="change(0)">login</a>
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
  props: ['show'],
  components: {
    QModal,
    QModalLayout,
    QField,
    QInput,
    QBtn
  },
  data () {
    return {
      // 0 for normal, 1 for sign up, 2 for fogot
      flag: 0,
      loadBtn: false,
      username: '',
      password: '',
      password2: '',
      email: '',
      valid: '',
      confirmBtn: [
        {
          icon: 'arrow_forward',
          content: true,
          handler () {
            this.loadBtn = true
          }
        }
      ]
    }
  },
  methods: {
    change (num) {
      this.flag = -1
      setTimeout(() => {
        this.flag = num
      }, 1000)
    }
  },
  computed: {
    // confirmBtn () {
    //   return [
    //     {
    //       icon: 'arrow_forward',
    //       content: true,
    //       handler () {
    //         this.loadBtn = true
    //       }
    //     }
    //   ]
    // }
  }
}
</script>

<style lang="stylus" scoped>
.min-450
  min-width 450px
.login-tip
  cursor pointer
.send-btn
  height 20px;
  line-height 28px;
</style>
