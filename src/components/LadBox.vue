<template>
  <q-card class="lad-card" :color="boxColor[meta.themeColor].background">
    <div class="q-card-primary q-card-container row no-wrap justify-end">
      <!-- <div class="col column">
        <div class="q-card-title">
          MAIN TITLE
        </div>
        <div class="q-card-subtitle">
          Subtitle
        </div>
      </div> -->
      <div class="col-auto self-center q-card-title-extra hover-appear drag-area">
        <q-icon :name="meta.pined ? 'mdi-pin' : 'mdi-pin-off'" class="q-ml-xs" :color="boxColor[meta.themeColor].content" @click.native="changPin"></q-icon>
        <q-icon name="more_vert" :color="boxColor[meta.themeColor].content" class="q-ml-xs">
          <q-popover>
            <q-list link class="no-border">
              <q-item v-close-overlay>
                <q-item-main label="Remove Card" />
              </q-item>
              <q-item v-close-overlay>
                <q-item-main label="Send Feedback" />
              </q-item>
              <q-item v-close-overlay>
                <q-item-main label="Share" />
              </q-item>
            </q-list>
          </q-popover>
        </q-icon>
      </div>
    </div>
    <div class="q-card-primary q-card-container row no-wrap">
      <q-input type="textarea" class="col-12 shadow-0" inverted="" float-label="Type what you want" :color="boxColor[meta.themeColor].background" hide-underline></q-input>
    </div>
    <q-card-actions class="hover-appear">
      <q-btn-dropdown label="Operation" outline :color="boxColor[meta.themeColor].content">
        <q-list dense class="lad-card">
          <q-list-header>COLOR CHANGE</q-list-header>
          <q-item v-for="(option, idx) in colorList" :key="idx" v-close-overlay>
            <q-item-side>
              <span :class="option.style"></span>
            </q-item-side>
            <span @click="changeTheme(option.value)">
              {{option.title}}
            </span>
          </q-item>
          <q-item-separator />
          <q-list-header>COLOR CHANGE</q-list-header>
        </q-list>
      </q-btn-dropdown>
    </q-card-actions>
  </q-card>
</template>

<script>
import {
  QCard,
  QCardTitle,
  QIcon,
  QPopover,
  QItem,
  QItemSide,
  QItemMain,
  QItemSeparator,
  QList,
  QListHeader,
  QInput,
  QCollapsible,
  QCardSeparator,
  QCardActions,
  QBtn,
  QBtnDropdown
} from 'quasar'

export default {
  name: 'LadBox',
  props: ['meta', 'colorList', 'boxColor'],
  components: {
    QCard,
    QCardTitle,
    QIcon,
    QPopover,
    QItem,
    QItemSide,
    QItemMain,
    QItemSeparator,
    QList,
    QListHeader,
    QInput,
    QCollapsible,
    QCardSeparator,
    QCardActions,
    QBtn,
    QBtnDropdown
  },
  data () {
    return {
      // status
      // meta.pined: true,
      // meta.themeColor: 'BLACK'
      // below two are gonna to transfer to father component & active as a props
    }
  },
  methods: {
    changPin () {
      // this.meta.pined = !this.meta.pined
      this.$emit('changPin')
    },
    changeTheme (color) {
      // this.meta.themeColor = color
      console.log(color)
      this.$emit('changeTheme', color)
    }
  },
  computed: {
    // colorList () {
    //   return {
    //   }
    // }
  }
}
</script>

<style lang="stylus" scoped>
// $appear = hidden
// check(statue)
//   if statue = hidden
//     $appear = visible
//   else
//     $appear = hidden

.hover-appear
  transition: all ease .5s
  visibility hidden !important
.color-select
  display inline-block
  height 30px
  width 50px

.lad-card
  &:hover, &:focus
    .hover-appear
      visibility visible !important
</style>
