<template>
  <q-page padding>
    <div class="row personal-container page-commen">
      <aside class="col-3">
        <div class="aside-header spec-font">
          <span>Hello,</span>
          <br />
          <span>{{userInfo.name | eclipse(5)}}</span>
        </div>
        <div class="aside-menu spec-font text-weight-bold">
          <ul>
            <li v-for="(item, idx) in menuList" :key="idx" @click="debounce(select(idx, item.tag), 1000)" class="menu-list"><span :class="{'list-curtain': selected === idx}">{{item.title}}</span></li>
          </ul>
        </div>
      </aside>
      <transition-group appear enter-active-class="animated fadeIn" class="col-8"
        leave-active-class="animated fadeOut" mode="out-in" tag="div">
        <div v-show="tag === 'info'" class="main-warp" key="info">
          <span class="spec-font main-title text-weight-bold">个人信息</span>
          <!-- <div v-if="isEditProfile" class="main-below col-6">
            <q-field>
              <q-input class="main-input" stack-label="姓名"/>
            </q-field>
            <q-field>
              <q-input class="main-input" stack-label="年龄"/>
            </q-field>
            <q-field>
              <q-input class="main-input" stack-label="邮箱"/>
            </q-field>
          </div> -->
          <div class="main-below row">
            <div v-if="isEditProfile" class="col-md-6 col-sm-12">
              <q-field class="main-field" label="姓名" label-width='2'>
                <q-input class="main-input" v-model="name"/>
              </q-field>
              <q-field class="main-field" label="年龄" label-width='2'>
                <q-input class="main-input" v-model="age"/>
              </q-field>
              <q-field class="main-field" label="验证码" label-width='2'>
                <div class="row justify-between">
                  <q-input class="col-7" v-model="valid" placeholder="点击右侧按钮，将邮箱中的信息填入"></q-input>
                  <q-btn size="14px" dense outline color="secondary" :loading="loading" @click="sendValidFunc">验证邮箱</q-btn>
                </div>
              </q-field>
              <q-field class="main-field" label="邮箱" label-width='2'>
                <q-input placeholder="输入更正后的邮箱" v-model="email" class="main-input"/>
              </q-field>
            </div>
            <table v-else class="info-table col-md-6 col-sm-12 full-width">
              <tr class="">
                <td>姓名</td>
                <td>{{userInfo.name}}</td>
              </tr>
              <tr>
                <td>年龄</td>
                <td>{{userInfo.age}}</td>
              </tr>
              <tr>
                <td>邮箱</td>
                <td>{{userInfo.email}}</td>
              </tr>
            </table>
            <div class="main-button-group col-12">
              <q-btn v-if="!isEditProfile" color="negative" @click="isEditProfile = !isEditProfile">修改信息</q-btn>
              <q-btn v-else color="info" @click="confirmUpdate">确认修改</q-btn>
            </div>
          </div>
        </div>
        <div v-show="tag === 'article'" class="col-8 main-warp" key="article">
          <span class="spec-font main-title text-weight-bold">发布的文章</span>
          <div class="main-below row">
            <div class="main-article column justify-between col-md-6 col-sm-12" v-for="(item, idx) in userInfo.articles" :key="idx">
              <span class="main-article-title" @click="toArticle(item)">{{item.title || ''}}</span>
              <span class="main-article-tail spec-font">{{purseTimestamp(item.lastModified)}}</span>
            </div>
          </div>
        </div>
        <div v-show="tag === 'quicklad'" class="col-8 main-warp" key="quicklad">
          <span class="spec-font main-title text-weight-bold">我的QuickLad</span>
          <div class="main-below row">
            <div class="main-article column justify-between col-md-6 col-sm-12" v-for="(item, idx) in userInfo.lads" :key="idx">
              <span class="main-article-title" @click="toQuicklad(item)">{{item.content | eclipse}}</span>
              <span class="main-article-tail spec-font">{{purseTimestamp(item.createdTime)}}</span>
            </div>
          </div>
        </div>
        <div v-show="tag === 'message'" class="col-8 main-warp" key="message">
          <span class="spec-font main-title text-weight-bold">消息收发</span>
        </div>
      </transition-group>
    </div>
  </q-page>
</template>

<script>
import {
  mapGetters,
  mapActions
} from 'vuex'
import {
  QPage,
  QField,
  QInput,
  QBtn,
  debounce
} from 'quasar'
import { purseTimestamp, infoNotify, warnNotify, translateErrMsg } from '../utils/util'

export default {
  name: 'Personal',
  components: {
    QPage,
    QField,
    QInput,
    QBtn
  },
  data () {
    return {
      selected: 0,
      tag: 'info',
      isEditProfile: false,
      loading: false,
      hasValidEmail: false,
      // form data
      name: '',
      age: '',
      valid: '',
      email: ''
    }
  },
  methods: {
    ...mapActions(['sendValidMail', 'validMail', 'updateUser']),
    purseTimestamp,
    debounce,
    select (idx, tag) {
      this.tag = ''
      this.selected = idx
      setTimeout(() => {
        this.tag = tag
      }, 1000)
    },
    toArticle (article) {
      this.$router.push('/article' + article._id)
    },
    toQuicklad (lad) {
      this.$router.push({name: 'quicklad', params: {lad: lad}})
    },
    async sendValidFunc () {
      if (this.userInfo && this.userInfo.email) {
        this.loading = true
        let result = await this.sendValidMail({
          address: this.userInfo.email
        })
        if (result && result.data && result.data.success) {
          this.loading = false
          infoNotify('发送成功')
        } else {
          warnNotify('服务器错误')
        }
      }
    },
    async confirmUpdate () {
      if (this.email && this.name && this.valid && this.age) {
        let validResult = await this.validMail({
          authCode: this.valid,
          address: this.userInfo.email
        })
        if (validResult && validResult.data && validResult.data.success) {
          let result = await this.updateUser({
            uid: this.userInfo._id,
            username: this.username,
            password: this.password,
            email: this.email,
            name: this.name,
            age: this.age
          })
          if (result && result.data && result.data.success) {
            this.$root.$emit('callGetUserInfo')
            infoNotify('更新成功')
          } else if (result.data.message) {
            translateErrMsg(result.data.message)
          }
        } else {
          warnNotify('验证码不正确')
        }
      } else {
        warnNotify('表格不完整')
      }
      this.isEditProfile = false
    }
  },
  computed: {
    ...mapGetters(['USER_INFO']),
    userInfo () {
      let arr = Object.getOwnPropertyNames(this.USER_INFO)
      if (this.USER_INFO && arr.length > 0) {
        return this.USER_INFO
      }
      return {}
    },
    menuList () {
      return [
        {
          title: '个人信息',
          tag: 'info'
        },
        {
          title: '发布的文章',
          tag: 'article'
        },
        {
          title: '我的QuickLad',
          tag: 'quicklad'
        },
        {
          title: '消息收发',
          tag: 'message'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
@import '../css/app.styl'

.personal-container
  .aside-header
    text-align right
    span
      color $secondary
      font-size times($base-font, 4.5)
  .aside-menu
    text-align right
    margin 30px 0 0 0
    font-size times($base-font, 1.5)
    line-height times($base-font, 3)
    .menu-list
      margin 10px 0
      cursor pointer
      span
        transition $transition
        padding-left 40px
        &:hover
          color $tertiary !important
          background-color $trans-secondary

.main-warp
  padding-left times($base-font, 4.5)
  .main-title
    color $secondary
    font-size times($base-font, 2.5)
    line-height times($base-font, 4.5)
    display block
  .main-below
    margin-top times($base-font, 2.5)
    .info-table
      font-size times($base-font, 1.5)
      margin-top times($base-font, 2)
    .main-button-group
      margin-top times($base-font, 2.5)
    .main-field
      margin-bottom 10px
      transition $transition
    .main-article
      margin-bottom 10px
      .main-article-title
        word-break break-all
        color $secondary
        font-weight bold
        font-size times($base-font, 1.2)
        cursor pointer
        &:hover
          text-decoration underline
      .main-article-tail
        font-size times($base-font, 1)
.list-curtain
  background-color $secondary
  color $tertiary !important
</style>
