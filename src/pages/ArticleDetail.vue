<template>
  <q-page padding>
    <!-- head -->
    <header class="row">
      <div class="article-title text-secondary uppercase offset-md-3">
        {{article.title}}
      </div>
      <div class="article-subtitle text-neutral offset-md-3">
        LastModified: {{purseTimestamp(article.lastModified)}}
      </div>
    </header>
    <!-- aside -->
    <div class="row content mt-2">
      <aside class="col-md-3 col-sm-12 row q-pt-lg">
        <div class="aside-wrapper">
          <div class="tags justify-start">
            <span class="tag uppercase cursor-pointer" v-for="(item, idx) in article.meta.tags" :key="idx">
              {{item}}
            </span>
          </div>
          <div class="action-box row justify-start">
            <div class="collect row text-center col-lg-4 col-md-12 cursor-pointer">
              <span class="btn col-12"><q-icon name="library_add" size="2rem"></q-icon>（ {{article.meta.cultivated}} ）</span>
              <span class="btn-tip col-12">COLLECT</span>
            </div>
            <div class="vote row text-center col-lg-4 col-md-12 cursor-pointer">
              <span class="btn col-12"><q-icon name="thumb_up" size="2rem"></q-icon>（ {{article.meta.votes}} ）</span>
              <span class="btn-tip col-12">VOTE</span>
            </div>
          </div>
          <div class="seed">
            <span>SEED INFO:</span>
            <br />
            <span>{{article.seed.content}}</span>
          </div>
        </div>
      </aside>
      <!-- article -->
      <article class="col-md-8 col-sm-12 article-content">
        {{article.content}}
      </article>
      <!-- comments area -->
      <div class="comment col-md-8 col-sm-12 offset-md-3">
        <div class="separator"></div>
        <div class="comment-title spec-font text-weight-bold font-20">
          全部评论
        </div>
        <div class="comment-body spec-font" v-for="(item, idx) in comments" :key="idx">
          <span class="comment-title font-18 text-weight-bold">{{item.tempNick || item.creator.name}}</span>
          <span class="comment-content spec-font">{{item.content}}</span>
          <span v-if="item.replies.length" class="comment-reply font-12 text-weight-bold">展开回复</span>
          <span class="float-right">{{purseTimestamp(item.createdTime)}}</span>
        </div>
        <div class="comment-action">
          <q-pagination color="secondary" size="20px" direction-links :min="1" :max="10"/>
        </div>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  QPage,
  QIcon,
  QBtn,
  QPagination
} from 'quasar'
import { purseTimestamp } from '../utils/util'

export default {
  name: 'ArticleDetail',
  components: {
    QPage,
    QBtn,
    QIcon,
    QPagination
  },
  data () {
    return {
      article: {
        'meta': {
          'tags': ['一条长长长长长长长长的TAG', 'false', 'do', 'you', 'want', 'me'],
          'votes': 38,
          'cultivated': 5
        },
        'seed': {
          'content': 'Balalalalalalala',
          'color': 'yellow',
          'createdTime': '2018-08-18T16:00:00.000Z',
          'tempNick': '',
          'creator': {
            'name': 'Jungle',
            'email': 'jungle@gmail.com',
            'age': '35'
          }
        },
        'lastModified': '2018-08-18T16:00:00.000Z',
        'comments': [],
        '_id': '5b787ff631e1a940d4732357',
        'title': '即使没有更多情况我也要进行一次中文测试',
        'content': '千里之行，始于足下 This should be a very long content that i have never seen, trust me there! This should be a very long content that i have never seen, trust me there! This should be a very long content that i have never seen, trust me there! This should be a very long content that i have never seen, trust me there! This should be a very long content that i have never seen, trust me there! ',
        '__v': 0
      },
      comments: [
        {
          replies: [
            {
              replies: [],
              createdTime: '2018-11-07T09:18:51.319Z',
              _id: '5be2ae0e789085140cde0c80',
              creator: {
                name: 'Danny',
                email: 'DannyLuvJenny@google.com',
                username: 'danny123',
                age: 18,
                hashed_password: 'f73dad875833944cdfe83378949bf32557de2cae',
                salt: '762959350905',
                authToken: '',
                articls: [],
                cultivated: [],
                comments: [],
                lads: [],
                messages: [],
                _id: '5be01f20eabfb92bc86f15fb',
                __v: 0
              },
              content: 'Here  came the reply2',
              __v: 0
            }
          ],
          createdTime: '2018-11-07T09:07:01.186Z',
          _id: '5be2ab98df2f5c47d4816015',
          content: '久闻李老先生使得一手好剑，端的是两袖青蛇，剑势一往无前',
          creator: {
            name: 'Danny',
            email: 'DannyLuvJenny@google.com',
            username: 'danny123',
            age: 18,
            hashed_password: 'f73dad875833944cdfe83378949bf32557de2cae',
            salt: '762959350905',
            authToken: '',
            articls: [],
            cultivated: [],
            comments: [],
            lads: [],
            messages: [],
            _id: '5be01f20eabfb92bc86f15fb',
            __v: 0
          },
          aid: '5be1472eb833af406c240212',
          __v: 0
        },
        {
          replies: [],
          createdTime: '2018-12-27T06:40:57.367Z',
          _id: '5c2477ce40055645bc81c8d3',
          content: '这条消息我想要回复',
          creator: {
            name: 'Danny',
            email: 'DannyLuvJenny@google.com',
            username: 'danny123',
            age: 18,
            hashed_password: 'f73dad875833944cdfe83378949bf32557de2cae',
            salt: '762959350905',
            authToken: '',
            articls: [],
            cultivated: [],
            comments: [],
            lads: [],
            messages: [],
            _id: '5be01f20eabfb92bc86f15fb',
            __v: 0
          },
          aid: '5be1472eb833af406c240212',
          __v: 0
        }
      ]
    }
  },
  methods: {
    purseTimestamp
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.tag
  font-weight 600
  display inline-block
  border 2px solid $info
  color $info
  padding 5px 8px
  margin-right 5px
  margin-bottom 5px
  &:hover
    border 2px solid $negative
    color $negative
.action-box
  div
    // border 2px solid $negative
.collect, .vote
  .btn
    line-height 35px
    display block
  .btn-tip
    line-height 35px
    display none
    font-size 1.5rem
    font-weight 600
  &:hover
    .btn
      display none
    .btn-tip
      display block
.aside-wrapper
  > div
    margin-bottom 30px
.seed
  // border 2px solid $info
  :first-child
    font-weight 600
.comment
  .comment-body
    margin-top 20px
  .comment-content
    display block
    margin-top 10px
  .comment-reply
    display inline-block
    margin-top 15px
    cursor pointer
  .comment-action
    margin-top 40px
</style>
