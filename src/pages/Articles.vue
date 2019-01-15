<template>
  <q-page padding class="max-1200">
    <div class="row">
      <div v-show="type!=='all'" class="col-md-3 col-xs-12 filter-side">
        <span class="filter-title spec-font text-weight-bold">{{filterTitle}}:</span>
        <span class="filter-params spec-font text-weight-bold">Danny</span>
      </div>
      <div class="max-1200 self-center" :class="{'col-12': type === 'all'}">
        <article-list-item v-for="(article, idx) in articles" :key='idx' :article="article" @open="toArticle(article._id)"/>
          <q-pagination color="secondary" size="20px" direction-links />
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  QPage,
  QPagination
} from 'quasar'
import ArticleListItem from '../components/ArticleListItem'

export default {
  name: 'Articles',
  components: {
    QPage,
    ArticleListItem,
    QPagination
  },
  data () {
    return {
      type: 'user',
      articles: [
        {
          meta: {
            tags: ['Rescure', 'helpAlive', 'Rescure', 'helpAlive', 'Rescure', 'helpAlive', 'Rescure', 'helpAlive', 'Rescure', 'helpAlive'],
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
  beforeMount () {
    if (this.$route.meta && this.$route.meta.type) {
      this.type = this.$route.meta.type
      this.routeContent = this.$route.meta.id || this.$route.meta.tag
    }
  },
  methods: {
    toArticle (id) {
      console.log('jumped')
      this.$router.push('article')
    }
    // get articles funcs
  },
  computed: {
    filterTitle () {
      switch (this.type) {
        case 'all':
          return ''
        case 'user':
          return '撰写人'
        case 'tag':
          return '标签'
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
@import '../css/app.styl'

.filter-side
  margin-bottom 20px
  .filter-title
    font-size: times($base-font, 2.5)
  .filter-params
    display block
    padding 15px 0
    font-size: times($base-font, 2.0)
</style>
