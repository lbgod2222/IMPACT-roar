<template>
  <div>
    <!-- q-card-replacement -->
    <div class="shodow-1 container">
      <div class="card-header row no-wrap">
        <div class="col">
          <div class="font-title cursor-pointer uppercase" @click="open">
            {{article.title}}
          </div>
          <div class="font-subtitle spec-font">
            <div class="row">
              <span class="list-author col-4">
                By: {{article.author.name}}
              </span>
              <span class="list-tag col-8 text-right">
                <span class="card-tag" v-for="(tag, idx) in article.meta.tags" :key="idx">
                  {{tag}}
                </span>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="list-time spec-font">
        {{purseTimestamp(article.lastModified)}}
      </div>
    </div>
  </div>
</template>

<script>
import {
  QCard,
  QCardTitle,
  QCardMain,
  QChip
} from 'quasar'
import { purseTimestamp } from '../utils/util'

export default {
  name: 'ArticleListItem',
  props: ['article'],
  components: {
    QCard,
    QCardTitle,
    QCardMain,
    QChip
  },
  data () {
    return {}
  },
  methods: {
    purseTimestamp,
    open () {
      this.$emit('open', this.article._id)
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
.container
  // border 1px solid red
  border-radius 3px
  margin-bottom 18px
  .card-header, .card-main
    padding 0 16px 0 16px

  .font-title
    display inline-block
    color $secondary
  .font-subtitle
    .card-tag
      padding 1px 3px
      color black
      font-size 14px
      border 1px solid $secondary
      background-color transparent
      &:nth-child(n+2)
        margin-left 5px
      &:hover
        color $negative
        border 1px solid $negative
        cursor pointer
        transition: all 0.4s ease
    .list-author
      margin 5px 0
      font-weight 700
  .list-time
    padding-left 16px
</style>
