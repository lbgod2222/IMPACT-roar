<template>
  <q-page padding>
    <!-- content -->
    <div class="row">
      <article-list-item class="col-12" v-for="(article, idx) in articles" :key=idx :article="article" @open="toArticle(article._id)"/>
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
          meta: {
            tags: ['Rescure', 'helpAlive'],
            votes: 0,
            cultivated: 0
          },
          author: {
            name: 'Danny', // 也许只留一个名字就好了//id？
            username: 'danny123',
            _id: '5be01f20eabfb92bc86f15fb'
          },
          lastModified: '2018-08-28T01:53:42.642Z',
          _id: '5b84ab5d92895d4e94b9713e',
          title: '看待新奇事物的新奇本领'
        },
        {
          meta: {
            tags: [
              'well'
            ],
            votes: 0,
            cultivated: 0
          },
          author: {
            name: 'Danny', // 也许只留一个名字就好了//id？
            _id: '5be01f20eabfb92bc86f15fb'
          },
          lastModified: '2018-08-25T16:30:46.166Z',
          _id: '5b81843ac0357512107f3629',
          title: 'The seventh article'
        },
        {
          meta: {
            tags: [
              'hush3'
            ],
            votes: 0,
            cultivated: 0
          },
          author: {
            name: 'Danny', // 也许只留一个名字就好了//id？
            _id: '5be01f20eabfb92bc86f15fb'
          },
          lastModified: '2018-08-22T10:35:13.164Z',
          _id: '5b7d3c8a228b532db0c07836',
          title: 'The seventh article'
        }
      ]
    }
  },
  methods: {
    toArticle (id) {
      console.log('jumped')
      this.$router.push('article')
    }
  }
}
</script>

<style>

</style>
