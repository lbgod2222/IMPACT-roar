<template>
  <q-page padding class="page-commen">
    <div class="container column">
      <!-- <div class="head-part">
        <q-input type="text" color="secondary" placeholder="Type your title"></q-input>
      </div> -->
      <div class="cultivate-part spec-font">
        <span>" 巴达里文化的基本生产工具是石器工具。他们的石器工业是粗糙的和贫乏的，主要表现为岩球制成的核心工业。除石器外，巴达里文化的最高成就是铜器的使用，并因此把它划入铜石并用时代。铜器主要是出土了一些铜念珠和单个的小工具，或许是扣针。武器、工具很少，仅仅发现了有翼的或叶状的箭头，使人联想到弓箭的使用。此外，还出土了某些木质的棍棒，或许可以称为投掷棒。 "</span>
      </div>
      <div class="head-part">
        <q-input type="text" color="secondary" placeholder="Type your title"></q-input>
      </div>
      <div class="tag-part">
        <q-chips-input v-model="tags" color="secondary" placeholder="Tags here, enter to confirm"/>
      </div>
      <div class="content-part">
        <q-input type="textarea" color="secondary" placeholder="请输入文章内容" row="7"></q-input>
      </div>
    </div>
    <div class="action-container">
      <q-btn color="secondary">发布</q-btn>
      <q-btn color="negative" class="q-ml-md">放弃</q-btn>
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
      tags: []
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
