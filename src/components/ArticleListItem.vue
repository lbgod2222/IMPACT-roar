<template>
  <div>
    <q-card>
      <q-card-title>
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
    </q-card>
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
  }
}
</script>

<style>
</style>
