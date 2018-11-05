<template>
  <div>
    <!-- q-card-replacement -->
    <div class="shodow-1 container">
      <div class="card-header row no-wrap">
        <div class="col column">
          <div class="font-title cursor-pointer" @click="open">
            {{article.title}}
          </div>
          <div class="font-subtitle">
            <div class="row justify-between">
              <span>
                {{article.meta.votes}}
                persons voted
              </span>
              <span>
                <q-chip dense v-for="(tag, idx) in article.meta.tags" :key="idx">
                  {{tag}}
                </q-chip>
              </span>
            </div>
          </div>
        </div>
      </div>
      <div class="card-main">
        LastModi:{{article.lastModified}}
      </div>
    </div>
    <!-- <q-card class="shadow-1">
      <q-card-title class="font-title">
        {{article.title}}
        <div slot="subtitle" class="row justify-between">
          <div inline>
            {{article.meta.votes}}
            persons voted
          </div>
          <div inline>
            <q-chip dense v-for="(tag, idx) in article.meta.tags" :key="idx">
              {{tag}}
            </q-chip>
          </div>
        </div>
      </q-card-title>
      <q-card-main>
        LastModi:{{article.lastModified}}
      </q-card-main>
    </q-card> -->
  </div>
</template>

<script>
import {
  QCard,
  QCardTitle,
  QCardMain,
  QChip
} from 'quasar'

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
    open () {
      this.$emit('open', this.article._id)
    }
  }
}
</script>

<style lang="stylus" scoped>
.container
  border 1px solid red
  border-radius 3px
  .card-header, .card-main
    padding 16px
</style>
