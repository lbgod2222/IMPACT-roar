<template>
  <div class="outer">
    <!-- <q-scroll-observable @scroll="scrollHandler" /> -->
    <!-- <q-slide-transition :duration="1000"> -->
    <div id="home-cursion" class="animate-fade shadow-2" v-show="visible">
      <h1 class="text-info">Idea is not Snakes</h1>
    </div>
    <!-- </q-slide-transition> -->
    <div id="footer-bar">
      <div class="flex height-fit row">
        <a class="col-4 inline-block footer-block">Quicklad</a>
        <a class="col-4 inline-block">Article</a>
        <a class="col-4 inline-block">User</a>
      </div>
    </div>
  </div>
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

export default {
  name: 'Home',
  data () {
    return {
      leftDrawer: true,
      visible: true
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
      if (this.visible) {
        console.log(scroll)
        if (scroll.direction === 'down' && scroll.position > 0) {
          this.visible = false
        }
      }
    }
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
  background-color: bisque
#footer-bar
  position sticky
  bottom 0
  height 300px
  border  1px solid blue
  background-color #ffffff
  a
    font-size 60px
    text-align center
</style>
