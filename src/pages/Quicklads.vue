<template>
  <q-page class="row max-height" padding>
    <q-scroll-observable @scroll="scrollHandler" />
    <aside class="left-panel col-4 fixed text-left">
      <div class="article-title text-secondary uppercase col-12" :class="scrolled ? 'shrink' : null">
        What are
        <br />
        you
        <br />
        looking for?
        <br />
      </div>
      <div class="searchBar col-12 q-px-xs q-py-xs q-mt-xl">
        <div>
          <q-search :hide-underline="!searchShowWrap" @focus="searchShowWrap=true" @blur="searchShowWrap=false"/>
        </div>
      </div>
    </aside>
  </q-page>
</template>

<script>
import {
  QPage,
  QScrollObservable,
  QSearch
} from 'quasar'

export default {
  name: 'QuickLad',
  components: {
    QPage,
    QScrollObservable,
    QSearch
  },
  data () {
    return {
      scrolled: false,
      searchShowWrap: false
    }
  },
  methods: {
    scrollHandler (scroll) {
      console.log(scroll)
      if (scroll.position > 300) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    }
  },
  computed: {
    searchWrap () {
      return this.searchShowWrap ? 'searchWrapStyle' : null
    }
  }
}
</script>

<style lang="stylus" scoped>
.left-panel
  div
    transition all ease .4s
    line-height 65px
.max-height
  min-height 2000px !important
.shrink
  transform scale(0.6)
  // left 0
  // font-size 24px !important
  // line-height 20px !important
.searchWrapStyle
  border 1px solid red
</style>
