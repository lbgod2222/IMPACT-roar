<template>
  <q-page padding class="page-commen">
    <div class="container column">
      <!-- <div class="head-part">
        <q-input type="text" color="secondary" placeholder="Type your title"></q-input>
      </div> -->
      <div v-if="hasSeed" class="cultivate-part spec-font">
        <span>" {{$route.params.content}} "</span>
      </div>
      <div class="head-part">
        <q-input type="text" v-model="title" color="secondary" placeholder="请输入标题"></q-input>
      </div>
      <div class="tag-part">
        <q-chips-input v-model="tags" color="secondary" placeholder="标签，回车确定一个标签"/>
      </div>
      <div class="content-part">
        <q-input type="textarea" v-model="content" color="secondary" placeholder="请输入文章内容" rows="7"></q-input>
      </div>
    </div>
    <div class="action-container">
      <q-btn color="secondary" @click="submit">发布</q-btn>
      <q-btn color="negative" class="q-ml-md" @click="cancel">放弃</q-btn>
    </div>
  </q-page>
</template>

<script>
import {
  QPage,
  QIcon,
  QPageSticky,
  QBtn,
  QTooltip,
  QInput,
  QChipsInput
} from 'quasar'
import { purseTimestamp, infoNotify, warnNotify, composeDialog } from '../utils/util'
import {
  mapActions,
  mapGetters
} from 'vuex'

export default {
  name: 'Writter',
  components: {
    QPage,
    QIcon,
    QPageSticky,
    QBtn,
    QTooltip,
    QInput,
    QChipsInput
  },
  data () {
    return {
      tags: [],
      title: '',
      content: ''
    }
  },
  mounted () {
  },
  methods: {
    composeDialog,
    ...mapActions(['postArticle']),
    async postArticleFunc () {
      if (this.title && this.content) {
        let tagStr = this.tags.join(',')
        let result = await this.postArticle({
          author: this.USER_INFO._id,
          title: this.title,
          tags: tagStr,
          content: this.content,
          lastModified: (() => {
            let now = new Date().getTime()
            return purseTimestamp(now)
          })(),
          seed: this.$route.params.seed ? this.$route.params.seed : null
        })
        if (result && result.data && result.data.success) {
          this.title = ''
          this.content = ''
          infoNotify('发布成功')
        } else {
          warnNotify('出了一些问题')
        }
      } else {
        warnNotify('表单不完整')
      }
    },
    submit () {
      this.postArticleFunc()
      this.init()
    },
    cancel () {
      this.init()
      this.$router.push('/articles')
    },
    init () {
      this.tags = []
      this.title = ''
      this.content = ''
    }
  },
  computed: {
    ...mapGetters(['USER_INFO']),
    hasSeed () {
      return this.$route && this.$route.params && this.$route.params.seed
    }
  },
  beforeRouteLeave (to, from, next) {
    if (this.tags.length || this.title || this.content) {
      composeDialog({
        title: '是否放弃',
        message: '是否放弃文章的发布？',
        isAlert: false
      }, () => {
        next()
      }, () => {
        return null
      })
    } else {
      next()
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
@import '../css/app.styl'

.container
  div
    margin-top 10px
  .cultivate-part
    padding times($base-font, 2.5) times($base-font, 1)
    // background-color $positive
    span
      display block
      border-left 5px solid $info
      font-size times($base-font, 1.5)
      // margin-left times($base-font, 2.5)
      padding-left times($base-font, 1.5)
.action-container
  margin-top 40px
</style>
