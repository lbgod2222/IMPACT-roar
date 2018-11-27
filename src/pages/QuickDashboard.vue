<template>
  <q-page padding>
    <div class="tab-container row justify-around">
      <div class="column col-3">
        <draggable :list="colList_1" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix" class="leastSpaec">
          <!-- <div class="tempBox" v-for="(lad, idx) in colList_1" :key="idx">{{lad.title}}</div> -->
          <lad-box v-for="(meta, idx) in colList_1" :meta="meta" :colorList="colorList" :boxColor="boxColor" @changPin="changPin" line="1" :idx="idx" @changeTheme="changeTheme" @sendContent="editContent" :key="colList_1 + idx"></lad-box>
        </draggable>
        <div class="add_btn round q-mt-md q-py-sm cursor-pointer text-center round-borders" @click="addColomn(1)">
          <q-icon name="add_box" size="38px" color="tertiary"></q-icon>
        </div>
      </div>
      <div class="column col-3">
        <draggable :list="colList_2" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix" class="leastSpaec">
          <lad-box v-for="(meta, idx) in colList_2" :meta="meta" :colorList="colorList" :boxColor="boxColor" @changPin="changPin" line="2" :idx="idx" @changeTheme="changeTheme" @sendContent="editContent" :key="colList_2 + idx"></lad-box>
          <!-- <div class="tempBox" v-for="(lad, idx) in colList_2" :key="idx">{{lad.title}}</div> -->
        </draggable>
        <div class="add_btn round q-mt-md q-py-sm cursor-pointer text-center round-borders" @click="addColomn(2)">
          <q-icon name="add_box" size="38px" color="tertiary"></q-icon>
        </div>
      </div>
      <div class="column col-3">
        <draggable :list="colList_3" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix" class="leastSpaec">
          <lad-box v-for="(meta, idx) in colList_3" :meta="meta" :colorList="colorList" :boxColor="boxColor" @changPin="changPin" line="3" :idx="idx" @changeTheme="changeTheme" @sendContent="editContent" :key="colList_3 + idx"></lad-box>
          <!-- <div class="tempBox" v-for="(lad, idx) in colList_3" :key="idx">{{lad.title}}</div> -->
        </draggable>
        <div class="add_btn round q-mt-md q-py-sm cursor-pointer text-center round-borders" @click="addColomn(3)">
          <q-icon name="add_box" size="38px" color="tertiary"></q-icon>
        </div>
      </div>
    </div>
    <q-page-sticky position="bottom-right" :offset="[18, 18]">
      <q-fab
        color="primary"
        icon="menu"
        direction="left">
        <q-fab-action
          color="secondary"
          icon="save"
        >
          <q-tooltip>
            Save all the quicklads
          </q-tooltip>
        </q-fab-action>
      </q-fab>
    </q-page-sticky>
    <q-page-sticky position="bottom-right" :offset="[18, 80]">
      <q-btn v-back-to-top.animate="{offset: 500, duration: 200}" round size="lg" color="primary" icon="keyboard_arrow_up">
        <q-tooltip>
          Scroll to top
        </q-tooltip>
      </q-btn>
    </q-page-sticky>
  </q-page>
</template>

<script>
import {
  QPage,
  QIcon,
  QPageSticky,
  QBtn,
  QFab,
  QFabAction,
  QTooltip
} from 'quasar'
import draggable from 'vuedraggable'
import LadBox from '../components/LadBox'

export default {
  name: 'QuickDashboard',
  components: {
    QPage,
    draggable,
    LadBox,
    QIcon,
    QPageSticky,
    QBtn,
    QFab,
    QFabAction,
    QTooltip
  },
  data () {
    return {
      drag: false,
      groupOptions: {
        group: 'quicklad',
        animation: 250
      },
      // CONSTANT DATA
      colorList: [
        {
          title: 'BLACK',
          style: 'color-select bg-black',
          value: 'BLACK'
        },
        {
          title: 'PURPLE',
          style: 'color-select bg-purple',
          value: 'PURPLE'
        },
        {
          title: 'GREEN',
          style: 'color-select bg-green',
          value: 'GREEN'
        },
        {
          title: 'RED',
          style: 'color-select bg-red',
          value: 'RED'
        },
        {
          title: 'YELLOW',
          style: 'color-select bg-yellow',
          value: 'YELLOW'
        },
        {
          title: 'BLUE',
          style: 'color-select bg-blue',
          value: 'BLUE'
        }
      ],
      boxColor: {
        'BLACK': {
          background: 'grey-10',
          content: 'red-13'
        },
        'PURPLE': {
          background: 'purple',
          content: 'white'
        },
        'GREEN': {
          background: 'light-green-9',
          content: 'white'
        },
        'RED': {
          background: 'red-12',
          content: 'white'
        },
        'YELLOW': {
          background: 'amber-9',
          content: 'blue-grey-10'
        },
        'BLUE': {
          background: 'indigo-8',
          content: 'grey-3'
        }
      },
      // DATA
      colList_1: [],
      colList_2: [],
      colList_3: []
    }
  },
  methods: {
    checkFix (event) {
      return (event.draggedContext.element.pined)
    },
    changPin (obj) {
      let { line, idx } = obj
      switch (line) {
        case '1':
          this.colList_1[idx].pined = !this.colList_1[idx].pined
          break
        case '2':
          this.colList_2[idx].pined = !this.colList_2[idx].pined
          break
        case '3':
          this.colList_3[idx].pined = !this.colList_3[idx].pined
          break
      }
    },
    changeTheme (obj) {
      let { line, idx, color } = obj
      console.log(arguments)
      switch (line) {
        case '1':
          this.colList_1[idx].themeColor = color
          break
        case '2':
          this.colList_2[idx].themeColor = color
          break
        case '3':
          this.colList_3[idx].themeColor = color
          break
      }
    },
    editContent (obj) {
      let { line, idx, content } = obj
      switch (line) {
        case '1':
          this.colList_1[idx].title = content
          break
        case '2':
          this.colList_2[idx].title = content
          break
        case '3':
          this.colList_3[idx].title = content
          break
      }
    },
    addColomn (num) {
      let newContent = {
        title: '',
        pined: false,
        themeColor: 'BLACK'
      }
      switch (num) {
        case 1:
          this.colList_1.push(newContent)
          break
        case 2:
          this.colList_2.push(newContent)
          break
        case 3:
          this.colList_3.push(newContent)
          break
      }
    },
    removeColomn (obj) {
      let { line, idx } = obj
      switch (line) {
        case '1':
          this.colList_1.splice(idx, 1)
          break
        case '2':
          this.colList_2.splice(idx, 1)
          break
        case '3':
          this.colList_3.splice(idx, 1)
          break
      }
    }
  }
}
</script>

<style lang="stylus" scoped>
.tempBox
  min-height 200px
  background-color #fff
  font-size 26px
.add_btn
  background-color rgba(163,159,147,.6)
  transition all ease .3s
  &:hover
    background-color rgba(163,159,147,1)
.leastSpaec
  min-height 30px
</style>
