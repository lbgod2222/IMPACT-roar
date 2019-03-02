<template>
  <q-page class='row max-height page-commen' padding>
    <q-scroll-observable @scroll='scrollHandler' />
    <aside class='left-panel col-3 fixed text-left'>
      <div class='article-title text-secondary uppercase col-12 spec-font' :class="!largeGrid ? 'shrink' : null">
        What are
        <br />
        you
        <br />
        looking
        <br />
        for?
        <br />
      </div>
      <div class='searchBar col-12 q-px-xs q-py-xs q-mt-xl1 mt-20' :class="!largeGrid ? 'shrink-search' : null">
        <div>
          <!-- <q-search :hide-underline='!searchShowWrap' v-model="researchContent" @focus='searchShowWrap=true' @blur='searchShowWrap=false' @keyup.enter="actResearch" :after="searchBtn"/> -->
        </div>
      </div>
      <div class='col-12 q-px-xs q-py-xs q-mt-xl1 mt-20' :class="!largeGrid ? 'shrink-search' : null">
        <div class='btn-group-wrap align-center'>
          <q-btn icon='mdi-grid-large' :class="largeGrid ? ['bg-faded', 'text-white'] : null" @click='callLargeGrid' no-ripple flat></q-btn>
          <q-btn icon='mdi-grid' :class="!largeGrid ? ['bg-faded', 'text-white'] : null" @click='largeGrid = false' no-ripple flat></q-btn>
        </div>
      </div>
    </aside>
    <div class='right-panel col-8 offset-4'>
      <!-- for dense use -->
      <div v-if="!largeGrid">
        <div class='col-12 row dense-box' v-for='(item, idx) in lads' :key='idx' @click="checkDetail(idx)">
          <div class='col-10 dense-content row items-center'>
            <span class="">
              {{item.content}}
            </span>
          </div>
          <div class='col-2 dense-detail column'>
            <div class="spec-font text-weight-bold">
              {{item.creator.name}}
            </div>
            <div class="spec-font">{{purseTimestamp(item.lastModified)}}</div>
            <span class="dense-color col-12" :class="colorBox[item.color.toUpperCase()].style"></span>
          </div>
        </div>
        <div class="dense-pagi">
          <q-pagination color="secondary" size="16px" :max="maxPage" v-model="pagination.page" @input="changePage" direction-links />
          <!-- <q-pagination color="secondary" size="20px" direction-links /> -->
        </div>
      </div>
      <!-- for detail use -->
      <div class="detail-box" v-else>
        <span class="spec-font detail-title text-weight-bold text-secondary">
          {{singleLad.creator.name}}
        </span>
        <div class="spec-font detail-date mt-10">
          创建时间：{{purseTimestamp(singleLad.createdTime)}} -- 最后修改时间：{{purseTimestamp(singleLad.lastModified)}}
        </div>
        <div class="separator"></div>
        <span class="singleqout">“</span>
        <div class="detail-content">
          {{singleLad.content}}
          <!-- 庆历四年春，滕子京谪守巴陵郡。越明年，政通人和，百废具兴。乃重修岳阳楼，增其旧制，刻唐贤今人诗赋于其上。属予作文以记之。
          予观夫巴陵胜状，在洞庭一湖。衔远山，吞长江，浩浩汤汤，横无际涯；朝晖夕阴，气象万千。此则岳阳楼之大观也，前人之述备矣。然则北通巫峡，南极潇湘，迁客骚人，多会于此，览物之情，得无异乎？
          若夫霪雨霏霏，连月不开，阴风怒号，浊浪排空；日星隐曜，山岳潜形；商旅不行，樯倾楫摧；薄暮冥冥，虎啸猿啼。登斯楼也，则有去国怀乡，忧谗畏讥，满目萧然，感极而悲者矣。
          至若春和景明，波澜不惊，上下天光，一碧万顷；沙鸥翔集，锦鳞游泳；岸芷汀兰，郁郁青青。而或长烟一空，皓月千里，浮光跃金，静影沉璧，渔歌互答，此乐何极！登斯楼也，则有心旷神怡，宠辱偕忘，把酒临风，其喜洋洋者矣。
          嗟夫！予尝求古仁人之心，或异二者之为，何哉？不以物喜，不以己悲；居庙堂之高则忧其民；处江湖之远则忧其君。是进亦忧，退亦忧。然则何时而乐耶？其必曰“先天下之忧而忧，后天下之乐而乐”乎。噫！微斯人，吾谁与归？
          时六年九月十五日。 -->
        </div>
        <span class="singleqout-end">”</span>
        <div class="separator"></div>
        <div class="detail-action">
          <q-btn class="spec-font text-weight-bold" no-ripple flat>采集</q-btn>
          <q-btn class="spec-font text-weight-bold" @click="callDetail(-1)" no-ripple flat>上一个</q-btn>
          <q-btn class="spec-font text-weight-bold" @click="callDetail(1)" no-ripple flat>下一个</q-btn>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  QPage,
  QBtn,
  QScrollObservable,
  QSearch,
  QPagination
} from 'quasar'
import {
  mapActions
} from 'vuex'
import { colorBox } from '../utils/constant'
import { purseTimestamp, warnNotify } from '../utils/util'

export default {
  name: 'QuickLad',
  components: {
    QPage,
    QBtn,
    QScrollObservable,
    QSearch,
    QPagination
  },
  data () {
    return {
      colorBox,
      scrolled: false,
      searchShowWrap: false,
      largeGrid: false,
      intervalNum: -1,
      activeIndex: -1,
      researchContent: '',
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      },
      // temp data
      lads: [],
      singleLad: {}
    }
  },
  mounted () {
    this.getQuicklads()
    this.intervalNum = setInterval(() => {
      this.getQuicklads()
    }, 10000)
  },
  beforeDestroy () {
    clearInterval(this.intervalNum)
  },
  beforeRouteEnter (to, from, next) {
    console.log('to', to)
    if (to.params && to.params.lad) {
      next((vm) => {
        vm.singleLad = to.params.lad
        vm.largeGrid = true
        vm.activeIndex = 1
      })
    } else {
      next()
    }
  },
  methods: {
    ...mapActions(['getAllQuicklads', 'getQuickladsByText']),
    purseTimestamp,
    scrollHandler (scroll) {
      if (scroll.position > 300) {
        this.scrolled = true
      } else {
        this.scrolled = false
      }
    },
    checkDetail (idx) {
      this.singleLad = this.lads[idx]
      this.activeIndex = idx
      this.largeGrid = true
    },
    changePage (num) {
      this.pagination.page = num
      this.getQuicklads()
    },
    callLargeGrid () {
      if (this.lads.length > 0) {
        this.activeIndex = 0
        this.singleLad = this.lads[0]
        this.largeGrid = true
      } else {
        warnNotify('尚未有lad记录')
      }
    },
    callDetail (num) {
      if (num > 0 && this.activeIndex < this.lads.length - 1) {
        this.activeIndex += 1
        this.singleLad = this.lads[this.activeIndex]
      } else if (num < 0 && this.activeIndex > 0) {
        this.activeIndex -= 1
        this.singleLad = this.lads[this.activeIndex]
      }
    },
    initPagi () {
      this.pagination = {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      }
    },
    async getQuicklads () {
      let result = await this.getAllQuicklads({
        offset: (this.pagination.page - 1) * this.pagination.rowsPerPage,
        limit: this.pagination.rowsPerPage,
        sortBy: 'createdTime:desc'
      })
      if (result && result.data && result.data.success) {
        this.lads = result.data.data
        this.pagination.rowsNumber = result.data.count
      }
    },
    async callResearch () {
      let result = await this.getQuickladsByText({
        meta: this.researchContent,
        offset: (this.pagination.page - 1) * this.pagination.rowsPerPage,
        limit: this.pagination.rowsPerPage,
        sortBy: 'createdTime:desc'
      })
      if (result && result.data && result.data.success) {
        this.lads = result.data.data
        this.pagination.rowsNumber = result.data.count
      }
    },
    actResearch () {
      console.log('activated!')
      this.initPagi()
      this.callResearch()
    }
  },
  computed: {
    searchWrap () {
      return this.searchShowWrap ? 'searchWrapStyle' : null
    },
    maxPage () {
      return Math.ceil(this.pagination.rowsNumber / this.pagination.rowsPerPage)
    },
    searchBtn () {
      return [
        {
          icon: 'send',
          content: true,
          handler: () => this.actResearch()
        }
      ]
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
  // min-height 2000px !important
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
.dense-box
  word-break break-all
  margin-bottom 5px
  border-bottom 1px solid rgb(163,159,147)
  &:hover
    background-color #A9B084
    cursor pointer
  .dense-content
    padding 5px
  .dense-detail
    text-align left
    padding 5px
  .dense-color
    display inline-block
    // margin auto
    width 60px
    height 10px
.detail-box
  .detail-title
    font-size 26px
    font-font-weight 700
  .detail-content
    padding 0 1.5em
    &::first-letter
      font-size: 3em
.singleqout, .singleqout-end
  font-weight 700
  font-size 46px
  display block
.singleqout-end
  text-align right
</style>
