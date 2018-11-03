<template>
  <q-page padding>
    <!-- content -->
    This is the palce for articles
    <div class="row gutter-lg">
      <article-list-item v-for='(article, idx) in articles' :key='idx' :article="article" />
    </div>
  </q-page>
</template>

<script>
import {
  QPage
} from 'quasar'
import ArticleListItem from '../components/ArticleListItem'

export default {
  name: 'Articles',
  components: {
    QPage,
    ArticleListItem
  },
  data () {
    return {
      articles: [
        {
          'meta': {
            'tags': [],
            'votes': 0,
            'cultivated': 0
          },
          'lastModified': '2018-08-28T01:53:42.642Z',
          '_id': '5b84ab5d92895d4e94b9713e',
          'title': 'Test of populate'
        },
        {
          'meta': {
            'tags': [
              'well'
            ],
            'votes': 0,
            'cultivated': 0
          },
          'lastModified': '2018-08-25T16:30:46.166Z',
          '_id': '5b81843ac0357512107f3629',
          'title': 'The seventh article'
        },
        {
          'meta': {
            'tags': [
              'hush3'
            ],
            'votes': 0,
            'cultivated': 0
          },
          'lastModified': '2018-08-22T10:35:13.164Z',
          '_id': '5b7d3c8a228b532db0c07836',
          'title': 'The seventh article'
        }
      ]
    }
  }
}
</script>

<style>
</style>
