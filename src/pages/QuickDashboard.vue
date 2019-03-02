<template>
  <q-page class="min-1100" padding>
    <div class="tab-container row justify-around">
      <div class="column col-3">
        <draggable :list="colList_1" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix" class="leastSpaec">
          <!-- <div class="tempBox" v-for="(lad, idx) in colList_1" :key="idx">{{lad.title}}</div> -->
          <lad-box v-for="(meta, idx) in colList_1" :meta="meta" :colorList="colorList" :boxColor="colorBox" @changPin="changPin" @deleteLad="deleteLad" line="1" :idx="idx" @changeTheme="changeTheme" @sendContent="editContent" :key="colList_1 + idx"></lad-box>
        </draggable>
        <div class="add_btn round q-mt-md q-py-sm cursor-pointer text-center round-borders" @click="addColomn(1)">
          <q-icon name="add_box" size="38px" color="tertiary"></q-icon>
        </div>
      </div>
      <div class="column col-3">
        <draggable :list="colList_2" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix" class="leastSpaec">
          <lad-box v-for="(meta, idx) in colList_2" :meta="meta" :colorList="colorList" :boxColor="colorBox" @changPin="changPin" @deleteLad="deleteLad" line="2" :idx="idx" @changeTheme="changeTheme" @sendContent="editContent" :key="colList_2 + idx"></lad-box>
          <!-- <div class="tempBox" v-for="(lad, idx) in colList_2" :key="idx">{{lad.title}}</div> -->
        </draggable>
        <div class="add_btn round q-mt-md q-py-sm cursor-pointer text-center round-borders" @click="addColomn(2)">
          <q-icon name="add_box" size="38px" color="tertiary"></q-icon>
        </div>
      </div>
      <div class="column col-3">
        <draggable :list="colList_3" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix" class="leastSpaec">
          <lad-box v-for="(meta, idx) in colList_3" :meta="meta" :colorList="colorList" :boxColor="colorBox" @changPin="changPin" @deleteLad="deleteLad" line="3" :idx="idx" @changeTheme="changeTheme" @sendContent="editContent" :key="colList_3 + idx"></lad-box>
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
          @click="postAllQuicklad"
        >
          <q-tooltip>
            一键发布
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
import {
  mapActions,
  mapGetters
} from 'vuex'
import draggable from 'vuedraggable'
import LadBox from '../components/LadBox'
import { colorBox } from '../utils/constant'
import {
  purseTimestamp,
  infoNotify,
  warnNotify,
  composeDialog
} from '../utils/util'

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
      colorBox,
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
      // DATA
      colList_1: [],
      colList_2: [],
      colList_3: []
    }
  },
  methods: {
    composeDialog,
    ...mapActions(['postQuicklad']),
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
    deleteLad (obj) {
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
    },
    // Post quicklad, just for one
    async postQuickladFunc (obj) {
      let { title, themeColor } = obj
      let result = await this.postQuicklad({
        content: title,
        color: themeColor,
        creator: this.USER_INFO._id,
        createdTime: (() => {
          let now = new Date().getTime()
          return purseTimestamp(now)
        })()
      })
      if (result && result.data && result.data.success) {
        // this.title = ''
        // this.content = ''
        infoNotify('发布成功')
      } else {
        warnNotify('出了一些问题')
      }
    },
    postAllQuicklad () {
      if (this.colList_1.length) {
        this.colList_1.forEach(e => {
          this.postQuickladFunc(e)
        })
      }
      if (this.colList_2.length) {
        this.colList_2.forEach(e => {
          this.postQuickladFunc(e)
        })
      }
      if (this.colList_3.length) {
        this.colList_3.forEach(e => {
          this.postQuickladFunc(e)
        })
      }
    }
  },
  computed: {
    ...mapGetters(['USER_INFO'])
  },
  beforeRouteLeave (to, from, next) {
    if (this.colList_1.length || this.colList_2.length || this.colList_3.length) {
      composeDialog({
        title: '是否放弃',
        message: '是否放弃这些QUICKLAD?',
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
