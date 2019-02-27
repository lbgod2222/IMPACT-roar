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
              <q-input placeholder="USERNAME" class="text-center" v-model="loginState.username"/>
            </q-field>
            <q-field class="q-mt-sm">
              <q-input type="password" placeholder="PASSWORD" v-model="loginState.password"/>
            </q-field>
          </div>
          <q-btn v-show="flag === 0" :loading="loadBtn" class="full-width q-mt-lg" color="secondary" key="btn-0" @click="loginFuction">
            登录
          </q-btn>
          <!-- SIGN UP -->
          <div class="q-mt-lg" v-show="flag === 1" key="form-1">
            <q-field>
              <q-input placeholder="用户名" v-model="username" class="text-center"/>
            </q-field>
            <q-field class="q-mt-sm">
              <q-input type="password" v-model="password" placeholder="密码"/>
            </q-field>
            <q-field class="q-mt-sm">
              <q-input type="password" v-model="password2" placeholder="重复输入密码"/>
            </q-field>
            <q-field>
              <q-input placeholder="昵称" v-model="name" class="text-center"/>
            </q-field>
            <div class="row justify-between">
              <q-field class="q-mt-sm col-8">
                <q-input type="email" v-model="email" placeholder="电子邮件"/>
              </q-field>
              <div class="">
                <q-btn class="send-btn" size="14px" outline color="secondary" :loading="isSendBtnLoad" @click="sendValidFunc">
                  发送
                </q-btn>
              </div>
            </div>
            <q-field class="q-mt-sm">
              <q-input type="text" v-model="valid" placeholder="验证码"/>
            </q-field>
          </div>
          <q-btn v-show="flag === 1" :loading="loadBtn" class="full-width q-mt-lg" color="secondary" key="btn-1" @click="registFunction">
            注册
          </q-btn>
          <!-- FORGOT -->
        </transition-group>
      </div>
      <div slot="footer">
        <div class="row justify-between login-tip">
          <!-- <a @click="change(0)">Forgot?</a> -->
          <a v-if="flag === 0" @click="change(1)">注册</a>
          <a v-else @click="change(0)">登录</a>
        </div>
      </div>
    </q-modal-layout>
  </q-modal>
</template>

<script>
import {
  mapMutations,
  mapActions
} from 'vuex'
import { setCache, infoNotify, warnNotify } from '../utils/util'
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
      name: '',
      email: '',
      valid: '',
      // state part
      loginState: {
        username: '',
        password: ''
      },
      // btn state
      isSendBtnLoad: false,
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
    ...mapMutations(['setLoginState']),
    ...mapActions(['login', 'createUser', 'sendValidMail', 'validMail']),
    change (num) {
      this.flag = -1
      setTimeout(() => {
        this.flag = num
      }, 1000)
    },
    async loginFuction () {
      let obj = {
        username: this.loginState.username,
        password: this.loginState.password
      }
      let result = await this.login(obj)
      console.log('backend reback:', result)
      let data = result.data.data
      if (result && result.data.success) {
        setCache('token', data.message)
        setCache('uid', data._id)
        this.setLoginState(true)
        this.$emit('close')
        infoNotify('登录成功')
      }
    },
    async sendValidFunc () {
      if (this.email) {
        this.isSendBtnLoad = true
        let result = await this.sendValidMail({
          address: this.email
        })
        console.log(result)
        if (result && result.data && result.data.success) {
          this.isSendBtnLoad = false
          infoNotify('发送成功')
        }
      } else {
        warnNotify('请输入邮箱')
      }
    },
    async registFunction () {
      console.log('start here')
      if (this.username && this.password && this.password2 & this.password2 === this.password && this.name && this.email && this.valid) {
        // form complete, need to check valid
        let validResult = await this.validMail({
          authCode: this.valid,
          address: this.email
        })
        if (validResult && validResult.data && validResult.data.success) {
          let result = await this.createUser({
            username: this.username,
            password: this.password,
            email: this.email,
            name: this.name
          })
          if (result && result.data && result.data.success) {
            infoNotify('注册成功')
            this.flag = 0
          }
        } else {
          warnNotify('验证码不正确')
        }
      } else {
        warnNotify('表格不完整')
      }
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
.btn-wrapper
  padding 10px
  box-sizing content-box
</style>
