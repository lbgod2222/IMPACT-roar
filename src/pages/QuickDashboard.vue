<template>
  <q-page padding>
    <div class="tab-container row justify-around">
      <div class="column col-3">
        <draggable :list="colList_1" :options="groupOptions" @start="drag=true" @end="drag=false" :move="checkFix">
          <div class="tempBox" v-for="(lad, idx) in colList_1" :key="idx">{{lad.title}}</div>
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

export default {
  name: 'QuickDashboard',
  components: {
    QPage,
    draggable
  },
  data () {
    return {
      drag: false,
      groupOptions: {
        group: 'quicklad',
        animation: 250
      },
      // DATA
      colList_1: [
        {
          id: 0,
          title: '1'
        },
        {
          id: 1,
          title: '2',
          fixed: true
        },
        {
          id: 2,
          title: '3'
        }
      ],
      colList_2: [
        {
          id: 0,
          title: 'x'
        },
        {
          id: 1,
          title: 'y'
        },
        {
          id: 2,
          title: 'z'
        }
      ],
      colList_3: [
        {
          id: 0,
          title: '#'
        },
        {
          id: 1,
          title: '%'
        },
        {
          id: 2,
          title: '*'
        }
      ]
    }
  },
  methods: {
    checkFix (event) {
      return (!event.draggedContext.element.fixed)
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
