<template>
  <q-page padding>
    <div class="tab-container row justify-around">
      <div class="column col-3">
        <draggable :list="colList_1" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix">
          <!-- <div class="tempBox" v-for="(lad, idx) in colList_1" :key="idx">{{lad.title}}</div> -->
          <lad-box color="BLACK" v-for="(meta, idx) in colList_1" :meta="meta" :colorList="colorList" :boxColor="boxColor" @changPin="changPin(1, idx)" @changeTheme="changeTheme(color)" :key="colList_1 + idx"></lad-box>
        </draggable>
      </div>
      <div class="column col-3">
        <draggable :list="colList_2" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix">
          <div class="tempBox" v-for="(lad, idx) in colList_2" :key="idx">{{lad.title}}</div>
        </draggable>
      </div>
      <div class="column col-3">
        <draggable :list="colList_3" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix">
          <div class="tempBox" v-for="(lad, idx) in colList_3" :key="idx">{{lad.title}}</div>
        </draggable>
      </div>
    </div>
  </q-page>
</template>

<script>
import {
  QPage
} from 'quasar'
import draggable from 'vuedraggable'
import LadBox from '../components/LadBox'

export default {
  name: 'QuickDashboard',
  components: {
    QPage,
    draggable,
    LadBox
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
      colList_1: [
        {
          id: 0,
          title: '1',
          pined: true,
          themeColor: 'BLACK'
        },
        {
          id: 1,
          title: '2',
          fixed: true,
          pined: true,
          themeColor: 'BLACK'
        },
        {
          id: 2,
          title: '3',
          pined: true,
          themeColor: 'BLACK'
        }
      ],
      colList_2: [
        {
          id: 0,
          title: 'x',
          pined: true,
          themeColor: 'BLACK'
        },
        {
          id: 1,
          title: 'y',
          pined: true,
          themeColor: 'BLACK'
        },
        {
          id: 2,
          title: 'z',
          pined: true,
          themeColor: 'BLACK'
        }
      ],
      colList_3: [
        {
          id: 0,
          title: '#',
          pined: true,
          themeColor: 'BLACK'
        },
        {
          id: 1,
          title: '%',
          pined: true,
          themeColor: 'BLACK'
        },
        {
          id: 2,
          title: '*',
          pined: true,
          themeColor: 'BLACK'
        }
      ]
    }
  },
  methods: {
    checkFix (event) {
      return (!event.draggedContext.element.fixed)
    },
    changPin (list, idx) {
      console.log(list, idx)
      list[idx].pinded = !list[idx].pinded
    },
    changeTheme (colorSet) {
      console.log(colorSet)
      // list[idx].themeColor = color
    }
  }
}
</script>

<style lang="stylus" scoped>
.tempBox
  min-height 200px
  background-color #fff
  font-size 26px
</style>
