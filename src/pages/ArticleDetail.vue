<template>
  <q-page padding>
    <!-- 头部内容 -->
    <header class="row">
      <div class="article-title text-secondary uppercase offset-3">
        {{article.title}}
      </div>
      <div class="article-subtitle text-neutral offset-3">
        LastModified: {{article.lastModified}}
      </div>
    </header>
    <div class="row content mt-2">
      <aside class="col-3 row">
        <div class="aside-wrapper">
          <div class="tags justify-start cursor-pointer">
            <span class="tag uppercase" v-for="(item, idx) in article.meta.tags" :key="idx">
              {{item}}
            </span>
          </div>
        </div>
      </aside>
      <article class="col-8 article-content">
        {{article.content}}
      </article>
    </div>
  </q-page>
</template>

<script>
import {
  QPage
} from 'quasar'

export default {
  name: 'ArticleDetail',
  components: {
    QPage
  },
  data () {
    return {
      article: {
        'meta': {
          'tags': ['true', 'false', 'do', 'you', 'want', 'me'],
          'votes': 38,
          'cultivated': 5
        },
        'lastModified': '2018-08-18T16:00:00.000Z',
        'comments': [],
        '_id': '5b787ff631e1a940d4732357',
        'title': '即使没有更多情况我也要进行一次中文测试',
        'content': 'This should be a very long content that i have never seen, trust me there! This should be a very long content that i have never seen, trust me there! This should be a very long content that i have never seen, trust me there! This should be a very long content that i have never seen, trust me there! This should be a very long content that i have never seen, trust me there! This should be a very long content that i have never seen, trust me there! ',
        '__v': 0
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.tag
  display inline-block
  border 1px solid $info
  color $info
  padding 5px 8px
  margin-right 5px
  margin-bottom 5px
  &:hover
    border 1px solid $negative
    color $negative
</style>
