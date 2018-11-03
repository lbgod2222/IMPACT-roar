<template>
  <div>
    <q-card>
      <q-card-title>
        {{article.title}}
      </q-card-title>
    </q-card>
  </div>
</template>

<script>
import {
  QCard,
  QCardTitle
} from 'quasar'

export default {
  name: 'ArticleListItem',
  props: ['article'],
  components: {
    QCard,
    QCardTitle
  },
  data () {
    return {}
  }
}
</script>

<style>
</style>
