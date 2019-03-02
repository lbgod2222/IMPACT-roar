<template>
  <q-layout class="bg-tertiary">
    <!-- <div class="outer" ref="outer">
      <q-scroll-observable @scroll="scrollHandler" />
      <div id="home-cursion" ref="cursion" class="animate-fade shadow-2 bg-positive" v-show="visible">
        <video class="bg-video" :src="bgVideo" playsinline autoplay muted loop></video>
        <h1 class="text-grey">Idea is not Snakes</h1>
      </div>
      <div id="footer-bar">
        <div class="flex height-fit row text-secondary bg-black">
          <router-link class="col-4 inline-block" to="/articles">
            Quicklad
          </router-link>
          <a class="col-4 inline-block">Article</a>
          <a class="col-4 inline-block">User</a>
        </div>
      </div>
    </div> -->
    <!-- Commen widget -->
    <navigator />
    <q-page-container>
      <router-view />
    </q-page-container>
    <!-- Place for modal or living stuff -->
    <login-modal :show="isLoginShow" @close="closeLoginModalFunc"/>
  </q-layout>
</template>

<script>
import {
  QLayout,
  QLayoutHeader,
  QLayoutFooter,
  QToolbar,
  QBtn,
  QToolbarTitle,
  QTabs,
  QRouteTab,
  QLayoutDrawer,
  QScrollArea,
  QPageContainer,
  QPage,
  QSlideTransition,
  QScrollObservable
} from 'quasar'
import bgVideo from '../assets/bg.mp4'
import LoginModal from '../components/LoginModal'
import Navigator from '../components/Navigator'
import {
  mapMutations,
  mapActions,
  mapGetters
} from 'vuex'
import { getCache } from '../utils/util'

export default {
  name: 'Home',
  data () {
    return {
      leftDrawer: true,
      visible: true,
      bgVideo,
      isLoginShow: false,
      intervalNum: -1
    }
  },
  components: {
    QLayout,
    QLayoutHeader,
    QLayoutFooter,
    QToolbar,
    QBtn,
    QToolbarTitle,
    QTabs,
    QRouteTab,
    QLayoutDrawer,
    QScrollArea,
    QPageContainer,
    QPage,
    QSlideTransition,
    QScrollObservable,
    LoginModal,
    Navigator
  },
  created () {
    // refly the  login bus
    this.$root.$on('callLoginModal', this.callLoginModalFunc)
    this.$root.$on('callGetUserInfo', this.getUserInfoFunc)
  },
  beforeDestroy () {
    // memory release
    clearInterval(this.intervalNum)
    this.$root.$off('callLoginModal')
    this.$root.$off('callGetUserInfo')
  },
  mounted () {
    this.$router.push('/home')
    this.intervalNum = setInterval(() => {
      this.getUserInfoFunc()
    }, 60000)
  },
  computed: {
    ...mapGetters(['IS_LOGIN'])
  },
  methods: {
    ...mapActions(['getUserInfo']),
    ...mapMutations(['setLoginState', 'envalUserInfo']),
    scrollHandler (scroll) {
      if (scroll.direction === 'down' && scroll.height !== 0) {
        window.scrollTop = 9999
        this.$refs.outer.scrollTop = this.$refs.outer.scrollHeight
      }
    },
    callLoginModalFunc () {
      this.isLoginShow = true
    },
    closeLoginModalFunc () {
      this.isLoginShow = false
    },
    async getUserInfoFunc () {
      let uid = getCache('uid')
      if (uid && uid.length) {
        let result = await this.getUserInfo(uid)
        if (result && result.data.success) {
          let data = result.data.data
          this.envalUserInfo(data)
        }
      } else {
        return null
      }
    }
  },
  watch: {
    // IS_LOGIN (val) {
    //   if (val) {
    //     console.log('val is:', val)
    //     this.getUserInfo()
    //   }
    // }
  }
}
</script>

<style lang="stylus" scoped>
#home-cursion
  z-index: 999999
  position: relative
  min-height: 100vh
  width: 100%
  overflow hidden
  border 10px solid white;
#footer-bar
  position sticky
  bottom 0
  height 380px
  background-color #ffffff
  a
    font-size 60px
    text-align center
  .box
    position relative
    svg
      position absolute;
      top 0
      left 0
      width 100%;
      height 100%;
    svg line
      stroke-width: 8;
      stroke: #ecf0f1;
      fill: none;
      -webkit-transition: all .8s ease-in-out;
      transition: all .8s ease-in-out;
      &:hover
        -webkit-transition-delay: 0.1s;
        transition-delay: 0.1s;
      &.top, &.bottom
        stroke-dasharray: 330 240;
      &.left, &.right
        stroke-dasharray: 490 400;
.bg-video
  position: absolute;
  top: 50%;
  left: 50%;
  min-width: 100%;
  min-height: 100%;
  width: auto;
  height: auto;
  z-index: -100;
  -webkit-transform: translateX(-50%) translateY(-50%);
  transform: translateX(-50%) translateY(-50%);
  // background: url(//demosthenes.info/assets/images/polina.jpg) no-repeat;
  background-size: cover;
  -webkit-transition: 1s opacity;
  transition: 1s opacity;
</style>
