<template>
  <q-page padding class="max-1200">
    <!-- head -->
    <header class="row">
      <div class="article-title text-secondary uppercase offset-md-3">
        {{article.title}}
      </div>
      <div class="article-subtitle text-neutral offset-md-3 spec-font">
        最后修改时间: {{purseTimestamp(article.lastModified)}}   {{article.author ? article.author.name : ''}}
      </div>
    </header>
    <!-- aside -->
    <div class="row content mt-2">
      <aside class="col-md-3 col-sm-12 row q-pt-lg">
        <div class="aside-wrapper">
          <div v-if="article.meta && article.meta.tags && article.meta.tags.length > 0" class="tags justify-start">
            <span class="tag uppercase cursor-pointer" v-for="(item, idx) in article.meta.tags" :key="idx">
              {{item}}
            </span>
          </div>
          <!-- <div class="action-box row justify-start">
            <div class="collect row text-center col-lg-4 col-md-12 cursor-pointer">
              <span class="btn col-12"><q-icon name="library_add" size="2rem"></q-icon>（ {{article.meta && article.meta.cultivated ? article.meta.cultivated : 0}} ）</span>
              <span class="btn-tip col-12">COLLECT</span>
            </div>
            <div class="vote row text-center col-lg-4 col-md-12 cursor-pointer">
              <span class="btn col-12"><q-icon name="thumb_up" size="2rem"></q-icon>（ {{article.meta && article.meta.voted ? article.meta.voted : 0}} ）</span>
              <span class="btn-tip col-12">VOTE</span>
            </div>
          </div> -->
          <div class="seed" v-if="article.seed">
            <span>种子信息:</span>
            <br />
            <span class="break-all">{{article.seed.content}}</span>
          </div>
        </div>
      </aside>
      <!-- article -->
      <pre class="col-md-8 col-sm-12 article-content">
        {{article.content}}
      </pre>
      <!-- comments area -->
      <div class="comment col-md-8 col-sm-12 offset-md-3">
        <div class="separator"></div>
        <div class="comment-title spec-font text-weight-bold font-20">
          全部评论
        </div>
        <div class="comment-body spec-font" v-for="(item, idx) in comments" :key="idx">
          <span class="comment-title font-18 text-weight-bold">{{item.creator ? item.creator.name : ''}}</span>
          <span class="comment-content spec-font">{{item.content}}</span>
          <div class="comment-reply font-12 text-weight-bold">
            <span @click="toggleBox(idx)">回复</span>
            <span v-if="item.replies.length && replyAppeared !== idx" @click="showReply(idx)" class="comment-reply font-12 text-weight-bold q-ml-sm">展开回复( {{item.replies.length || 0}} )</span>
            <span v-if="item.replies.length && replyAppeared === idx" @click="hideReply(idx)" class="comment-reply font-12 text-weight-bold q-ml-sm">收起回复</span>
          </div>
          <span class="float-right">{{purseTimestamp(item.createdTime)}}</span>
          <q-slide-transition>
            <div class="reply-content" v-show="replyAppeared === idx">
              <div class="reply-body" v-for="(item, idx) in item.replies" :key="idx">
                <span class="comment-title font-18 text-weight-bold">{{item.creator ? item.creator.name : ''}}</span>
                <span class="comment-content spec-font">{{item.content}}</span>
                <span class="float-right">{{purseTimestamp(item.createdTime)}}</span>
              </div>
            </div>
          </q-slide-transition>
          <q-slide-transition>
            <div class="reply-content" v-show="needReply === idx">
              <q-input type="text" placeholder="你想说点什么？" v-model="replyContent" :after="replytBtn"></q-input>
            </div>
          </q-slide-transition>
        </div>
        <div class="comment-action">
          <div class="comment-wrap">
            <q-input
            type="textarea" rows="4" float-label="你想说点什么？"
            v-model="commentContent"
            inverted
            :after="commentBtn"></q-input>
          </div>
          <q-pagination class="q-mt-md" color="secondary" size="16px" direction-links :min="1" v-model="pagination.page" @input="changePage" :max="maxPage"/>
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
  QPagination,
  QSlideTransition,
  QInput
} from 'quasar'
import {
  mapActions,
  mapGetters
} from 'vuex'
import { purseTimestamp, infoNotify, warnNotify, composeDialog, translateErrMsg } from '../utils/util'

export default {
  name: 'ArticleDetail',
  components: {
    QPage,
    QBtn,
    QIcon,
    QPagination,
    QSlideTransition,
    QInput
  },
  data () {
    return {
      aid: '',
      article: {},
      comments: [],
      replyAppeared: -1,
      needReply: -1,
      // action area
      commentContent: '',
      replyContent: '',
      pagination: {
        page: 1,
        rowsNumber: 0,
        rowsPerPage: 10
      }
    }
  },
  beforeRouteEnter (to, from, next) {
    next(vm => {
      vm.aid = to.params.aid
    })
  },
  computed: {
    ...mapGetters(['IS_LOGIN', 'USER_INFO']),
    commentBtn () {
      return [
        {
          icon: 'send',
          content: true,
          handler: () => this.postCommentFunc()
        }
      ]
    },
    replytBtn () {
      return [
        {
          icon: 'send',
          content: true,
          handler: () => this.replyCommentFunc(this.needReply)
        }
      ]
    },
    maxPage () {
      return Math.ceil(this.pagination.rowsNumber / this.pagination.rowsPerPage)
    }
  },
  methods: {
    composeDialog,
    ...mapActions(['getArticleDetail', 'getComments', 'postComment', 'replyComment']),
    purseTimestamp,
    showReply (idx) {
      this.needReply = -1
      this.replyAppeared = idx
    },
    hideReply () {
      this.replyAppeared = -1
    },
    toggleBox (idx) {
      this.replyAppeared = -1
      if (this.needReply > -1) {
        this.needReply = -1
      } else {
        this.needReply = idx
      }
    },
    loginCheck () {
      composeDialog({
        title: '尚未登录',
        message: '进入当前页面需要登录',
        isAlert: false
      }, () => {
        this.$root.$emit('callLoginModal')
      }, () => {
        return null
      })
    },
    async getArticleFunc () {
      let result = await this.getArticleDetail({
        aid: this.aid
      })
      if (result && result.data && result.data.success) {
        this.article = result.data.data
      }
    },
    async getArticleCommentFunc () {
      let result = await this.getComments({
        aid: this.aid,
        offset: (this.pagination.page - 1) * this.pagination.rowsPerPage,
        limit: this.pagination.rowsPerPage,
        sortBy: 'createdTime:desc'
      })
      if (result && result.data && result.data.success) {
        this.comments = result.data.data
        this.pagination.rowsNumber = result.data.count
      }
    },
    async postCommentFunc () {
      if (!this.IS_LOGIN) {
        this.loginCheck()
      } else {
        let result = await this.postComment({
          aid: this.aid,
          content: this.commentContent,
          creator: this.USER_INFO._id,
          createdTime: (() => {
            let now = new Date().getTime()
            return purseTimestamp(now)
          })()
        })
        if (result && result.data && result.data.success) {
          this.commentContent = ''
          this.getArticleCommentFunc()
          infoNotify('评论成功')
        } else {
          warnNotify('出了一些问题')
        }
      }
    },
    async replyCommentFunc (idx) {
      if (!this.IS_LOGIN) {
        this.loginCheck()
      } else {
        let cid = this.comments[idx]._id
        let result = await this.replyComment({
          cid: cid,
          uid: this.USER_INFO._id,
          content: this.replyContent,
          createdTime: (() => {
            let now = new Date().getTime()
            return purseTimestamp(now)
          })()
        })
        if (result && result.data && result.data.success) {
          this.replyContent = ''
          this.needReply = -1
          this.getArticleCommentFunc()
          infoNotify('评论成功')
        } else if (result.data.message) {
          translateErrMsg(result.data.message)
        } else {
          warnNotify('出了一些问题')
        }
      }
    },
    changePage (num) {
      this.pagination.page = num
      this.getArticleCommentFunc()
    }
  },
  watch: {
    aid (val) {
      if (val) {
        this.getArticleFunc()
        this.getArticleCommentFunc()
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
.comment
  .comment-body
    margin-top 20px
    .reply-content
      padding-left 30px
      .reply-body
        padding 20px
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
