<template>
  <q-page>
    <div class="outer" ref="outer">
      <q-scroll-observable @scroll="scrollHandler" />
      <!-- <q-slide-transition :duration="1000"> -->
      <div id="home-cursion" ref="cursion" class="animate-fade shadow-2 bg-positive" v-show="visible">
        <video class="bg-video" :src="bgVideo" playsinline autoplay muted loop></video>
        <div class="title-box spec-font">
          IMPACT
          <br />
          NEVER
          <br />
          DIE
        </div>
        <div class="text-box spec-font">
          向下滑动进入
        </div>
      </div>
      <!-- </q-slide-transition> -->
      <div id="footer-bar">
        <!-- <div class="flex height-fit row text-secondary bg-black">
          <router-link class="col-4 inline-block" to="/articles">
            Quicklad
            <a class="col-4 inline-block">Quicklad</a>
          </router-link>
          <a class="col-4 inline-block">Article</a>
          <a class="col-4 inline-block">User</a>
        </div> -->
      </div>
    </div>
  </q-page>
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

export default {
  name: 'Home',
  data () {
    return {
      leftDrawer: true,
      visible: true,
      bgVideo
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
    QScrollObservable
  },
  methods: {
    scrollHandler (scroll) {
      if (scroll.direction === 'down' && scroll.height !== 0) {
        // window.scrollTop = 9999
        // this.$refs.outer.scrollTop = this.$refs.outer.scrollHeight
        if (scroll.position > 350) {
          this.$router.push('/articles')
        }
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
@import '../css/app.styl'

#home-cursion
  z-index: 999
  position: relative
  min-height: 100vh
  width: 100%
  overflow hidden
  border 10px solid white;
  .title-box
    padding 40px
    position absolute
    font-size times($base-font, 4.6)
    font-weight 600
    color $positive
  .text-box
    position absolute
    bottom 20px
    text-align center
    width 100%
    color white
    font-size 20px
#footer-bar
  position sticky
  background-color rgba(0,0,0,0)
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
