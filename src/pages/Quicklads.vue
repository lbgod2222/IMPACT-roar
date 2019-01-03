<template>
  <q-page class='row max-height' padding>
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
          <q-search :hide-underline='!searchShowWrap' @focus='searchShowWrap=true' @blur='searchShowWrap=false'/>
        </div>
      </div>
      <div class='col-12 q-px-xs q-py-xs q-mt-xl1 mt-20' :class="!largeGrid ? 'shrink-search' : null">
        <div class='btn-group-wrap align-center'>
          <q-btn icon='mdi-grid-large' :class="largeGrid ? ['bg-faded', 'text-white'] : null" @click='largeGrid = true' no-ripple flat></q-btn>
          <q-btn icon='mdi-grid' :class="!largeGrid ? ['bg-faded', 'text-white'] : null" @click='largeGrid = false' no-ripple flat></q-btn>
        </div>
      </div>
    </aside>
    <div class='right-panel col-8 offset-4'>
      <!-- for dense use -->
      <div v-if="!largeGrid">
        <div class='col-12 row dense-box' v-for='(item, idx) in lads' :key='idx'>
          <div class='col-10 dense-content row items-center'>
            <span class="">
              {{item.content}}
            </span>
          </div>
          <div class='col-2 dense-detail column'>
            <div class="spec-font text-weight-bold">
              {{item.creator ? item.creator.name : item.tempNick}}
            </div>
            <div class="spec-font">{{purseTimestamp(item.lastModified)}}</div>
            <span class="dense-color col-12" :class="colorBox[item.color.toUpperCase()].style"></span>
          </div>
        </div>
      </div>
      <!-- for detail use -->
      <div class="detail-box" v-else>
        <span class="spec-font detail-title text-weight-bold text-secondary">
          {{singleLad.tempNick || singleLad.creator.name}}
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
import { colorBox } from '../utils/constant'
import { purseTimestamp } from '../utils/util'

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
      colorBox,
      scrolled: false,
      searchShowWrap: false,
      largeGrid: false,
      // temp data
      lads: [
        {
          content: 'With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to sayWith those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say',
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
          tempNick: 'Stunisakindofdisasterasisaid'
        }
      ],
      singleLad: {
        content: 'With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to sayWith those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say, With those heart still beating \'s man, we have nothing to say',
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
      }
    }
  },
  methods: {
    purseTimestamp,
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
