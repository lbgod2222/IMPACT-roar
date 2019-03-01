<template>
  <q-page padding class="max-1200 page-commen">
    <div class="row">
      <div v-show="type!=='all'" class="col-md-3 col-xs-12 filter-side">
        <span class="filter-title spec-font text-weight-bold">{{filterTitle}}:</span>
        <span class="filter-params spec-font text-weight-bold">Danny</span>
      </div>
      <div class="max-1200 self-center" :class="{'col-12': type === 'all'}">
        <article-list-item v-for="(article, idx) in articles" :key='idx' :article="article" @open="toArticle(article._id)"/>
        <q-pagination color="secondary" size="16px" :max="maxPage" v-model="pagination.page" @input="changePage" direction-links />
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-btn round size="lg" color="primary" icon="add" @click="jumpWritter">
        <q-tooltip :offset="[0, 5]">
          发布一篇文章
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import {
  QPage,
  QPagination,
  QPageSticky,
  QBtn,
  QTooltip
} from 'quasar'
import {
  mapActions
} from 'vuex'
import ArticleListItem from '../components/ArticleListItem'

export default {
  name: 'Articles',
  components: {
    QPage,
    ArticleListItem,
    QPagination,
    QPageSticky,
    QBtn,
    QTooltip
  },
  data () {
    return {
      type: 'all',
      intervalNum: -1,
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      },
      articles: []
    }
  },
  beforeMount () {
    if (this.$route.meta && this.$route.meta.type) {
      this.type = this.$route.meta.type
      this.routeContent = this.$route.meta.id || this.$route.meta.tag
    }
  },
  mounted () {
    this.intervalNum = setInterval(() => {
      this.getArticleListFunc()
    }, 60000)
  },
  created () {
    this.getArticleListFunc()
  },
  beforeDestroy () {
    clearInterval(this.intervalNum)
  },
  methods: {
    ...mapActions(['getArticleList']),
    toArticle (id) {
      this.$router.push('/article/' + id)
    },
    changePage (num) {
      this.pagination.page = num
      this.getArticleListFunc()
    },
    async getArticleListFunc () {
      let result = await this.getArticleList({
        offset: (this.pagination.page - 1) * this.pagination.rowsPerPage,
        limit: this.pagination.rowsPerPage,
        sortBy: 'lastModified:asc'
      })
      if (result && result.data && result.data.success) {
        this.articles = result.data.data
        this.pagination.rowsNumber = result.data.count
      }
    },
    jumpWritter () {
      this.$router.replace({name: 'writter'})
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
    },
    maxPage () {
      return Math.ceil(this.pagination.rowsNumber / this.pagination.rowsPerPage)
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
