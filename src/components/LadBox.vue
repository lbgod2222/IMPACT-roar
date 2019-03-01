<template>
  <q-card class="lad-card q-mt-md" :color="boxColor[meta.themeColor].background">
    <div class="q-card-primary q-card-container row no-wrap justify-end">
      <!-- <div class="col column">
        <div class="q-card-title">
          MAIN TITLE
        </div>
        <div class="q-card-subtitle">
          Subtitle
        </div>
      </div> -->
      <div class="col-auto q-card-title-extra hover-appear drag-area">
        <q-icon :name="meta.pined ? 'mdi-pin' : 'mdi-pin-off'" class="q-ml-xs" :color="boxColor[meta.themeColor].content" @click.native="changPin"></q-icon>
        <!-- right top option button -->
        <!-- <q-icon name="more_vert" :color="boxColor[meta.themeColor].content" class="q-ml-xs">
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
        </q-icon> -->
      </div>
    </div>
    <div class="q-card-primary q-card-container row no-wrap">
      <q-input v-if="!editing" type="textarea" class="col-12 shadow-0" readonly inverted v-model="meta.title" float-label="Type what you want" @click="editContent" :color="boxColor[meta.themeColor].background" hide-underline></q-input>
      <q-input v-else type="textarea" class="col-12 shadow-1" inverted float-label="Type what you want" v-model="content" @blur="sendContent" :color="boxColor[meta.themeColor].background" hide-underline></q-input>
    </div>
    <q-card-actions class="hover-appear">
      <q-btn-dropdown label="Operation" outline :color="boxColor[meta.themeColor].content">
        <div class="row">
          <q-list highlight dense class="lad-card col-6">
            <q-list-header>COLOR CHANGE</q-list-header>
            <q-item @click.native="changeTheme(option.value)" v-for="(option, idx) in colorList" :key="idx" class="cursor-pointer" v-close-overlay>
              <span :class="option.style" class="col-12"></span>
            </q-item>
          </q-list>
          <q-list highlight class="col-6">
            <q-list-header>CARD OPS</q-list-header>
            <q-item @click.native="deleteLad" class="cursor-pointer">
              <q-item-main label="DELETE" />
              <q-item-side right icon="delete" />
            </q-item>
            <q-item class="cursor-pointer">
              <q-item-main label="CULTIVATED" />
              <q-item-side right icon="spa" />
            </q-item>
          </q-list>
        </div>
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
  props: ['meta', 'colorList', 'boxColor', 'line', 'idx'],
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
      content: '',
      editing: false
      // status
      // meta.pined: true,
      // meta.themeColor: 'BLACK'
      // below two are gonna to transfer to father component & active as a props
    }
  },
  methods: {
    changPin () {
      let pack = {
        line: this.line,
        idx: this.idx
      }
      this.$emit('changPin', pack)
    },
    changeTheme (color) {
      // this.meta.themeColor = color
      let pack = {
        color: color,
        line: this.line,
        idx: this.idx
      }
      this.$emit('changeTheme', pack)
    },
    sendContent () {
      this.editing = false
      let pack = {
        content: this.content,
        line: this.line,
        idx: this.idx
      }
      this.$emit('sendContent', pack)
    },
    editContent () {
      this.content = this.meta.title
      this.editing = true
    },
    deleteLad () {
      this.$emit('deleteLad', {
        line: this.line,
        idx: this.idx
      })
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
  // transition: all ease .5s
  visibility hidden !important
.color-select
  display inline-block
  height 30px
  width 100%

.lad-card
  &:hover, &:focus
    .hover-appear
      visibility visible !important
</style>
