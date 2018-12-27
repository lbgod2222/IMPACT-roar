<template>
  <q-page class='row max-height' padding>
    <q-scroll-observable @scroll='scrollHandler' />
    <aside class='left-panel col-4 fixed text-left'>
      <div class='article-title text-secondary uppercase col-12' :class="scrolled ? 'shrink' : null">
        What are
        <br />
        you
        <br />
        looking
        <br />
        for?
        <br />
      </div>
      <div class='searchBar col-12 q-px-xs q-py-xs q-mt-xl1 mt-20' :class="scrolled ? 'shrink-search' : null">
        <div>
          <q-search :hide-underline='!searchShowWrap' @focus='searchShowWrap=true' @blur='searchShowWrap=false'/>
        </div>
      </div>
      <div class='col-12 q-px-xs q-py-xs q-mt-xl1 mt-20' :class="scrolled ? 'shrink-search' : null">
        <div class='btn-group-wrap align-center'>
          <q-btn icon='mdi-grid-large' :class="largeGrid ? ['bg-faded', 'text-white'] : null" @click='largeGrid = true' no-ripple flat></q-btn>
          <q-btn icon='mdi-grid' :class="!largeGrid ? ['bg-faded', 'text-white'] : null" @click='largeGrid = false' no-ripple flat></q-btn>
        </div>
      </div>
    </aside>
    <div class='right-panel col-8 offset-3 test-border'>
      <!-- for dense use -->
      <div class='col-12' v-for='(item, idx) in lads' :key='idx'>
        <div class='col-10'>{{item.content}}</div>
        <div class='col-2'></div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  QPage,
  QBtn,
  QScrollObservable,
  QSearch
} from 'quasar'

export default {
  name: 'QuickLad',
  components: {
    QPage,
    QBtn,
    QScrollObservable,
    QSearch
  },
  data () {
    return {
      scrolled: false,
      searchShowWrap: false,
      largeGrid: false,
      // temp data
      lads: [
        {
          content: 'With those heart still beating \'s man, we have nothing to say',
          color: 'black',
          createdTime: new Date() - 10000000,
          lastModified: new Date() - 9000000,
          tempNick: '',
          creator: {
            'name': 'Danny', // 也许只留一个名字就好了？
            'email': 'DannyLuvJenny@google.com',
            'username': 'danny123',
            'age': 18,
            'hashed_password': 'f73dad875833944cdfe83378949bf32557de2cae',
            'salt': '762959350905',
            'authToken': '',
            'articls': [],
            'cultivated': [],
            'comments': [],
            'lads': [],
            'messages': [],
            '_id': '5be01f20eabfb92bc86f15fb',
            '__v': 0
          }
        },
        {
          content: 'With those heart still beating \'s man, we have nothing to say',
          color: 'black',
          createdTime: new Date() - 10000000,
          lastModified: new Date() - 9000000,
          tempNick: '',
          creator: {
            'name': 'Danny', // 也许只留一个名字就好了？
            'email': 'DannyLuvJenny@google.com',
            'username': 'danny123',
            'age': 18,
            'hashed_password': 'f73dad875833944cdfe83378949bf32557de2cae',
            'salt': '762959350905',
            'authToken': '',
            'articls': [],
            'cultivated': [],
            'comments': [],
            'lads': [],
            'messages': [],
            '_id': '5be01f20eabfb92bc86f15fb',
            '__v': 0
          }
        },
        {
          content: 'With those heart still beating \'s man, we have nothing to say',
          color: 'black',
          createdTime: new Date() - 10000000,
          lastModified: new Date() - 9000000,
          tempNick: 'Stun'
        }
      ]
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

<style lang='stylus' scoped>
.left-panel
  div
    transition all ease .4s
    line-height 0.9em
.max-height
  min-height 2000px !important
.shrink
  // transform scale(0.6)
  font-size 28px !important
.shrink-search
  // transform scale(0.8)
  width 50% !important
  // left 0
  // font-size 24px !important
  // line-height 20px !important
.searchWrapStyle
  border 1px solid red
</style>
