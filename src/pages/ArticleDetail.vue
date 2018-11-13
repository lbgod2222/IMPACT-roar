<template>
  <q-page padding>
    <!-- head -->
    <header class="row">
      <div class="article-title text-secondary uppercase offset-md-3">
        {{article.title}}
      </div>
      <div class="article-subtitle text-neutral offset-md-3">
        LastModified: {{article.lastModified}}
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
    </div>
  </q-page>
</template>

<script>
import {
  QPage,
  QIcon
} from 'quasar'

export default {
  name: 'ArticleDetail',
  components: {
    QPage,
    QIcon
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
      }
    }
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
</style>
