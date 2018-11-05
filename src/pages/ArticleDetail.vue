<template>
  <q-page padding>
    <!-- 头部内容 -->
    <header>
      {{article.title}}
    </header>
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
          'tags': [],
          'votes': 0,
          'cultivated': 0
        },
        'lastModified': '2018-08-18T16:00:00.000Z',
        'comments': [],
        '_id': '5b787ff631e1a940d4732357',
        'title': 'The seventh article',
        'content': 'This should be a very long content that i have never seen, trust me there!',
        '__v': 0
      }
    }
  }
}
</script>

<style>
</style>
