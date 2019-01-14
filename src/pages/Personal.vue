<template>
  <q-page>
    <div class="row personal-container layout-padding">
      <aside class="col-3">
        <div class="aside-header spec-font">
          <span>Hello,</span>
          <br />
          <span>Ben</span>
        </div>
        <div class="aside-menu">
          <ul>
            <li v-for="(item, idx) in menuList" :key="idx" @click="select(idx)" :class="{'list-curtain': selected === idx}" class="menu-list">{{item.title}}</li>
          </ul>
        </div>
      </aside>
    </div>
  </q-page>
</template>

<script>
export default {
  name: 'Personal',
  data () {
    return {
      selected: 0
    }
  },
  methods: {
    select (idx) {
      this.selected = idx
    }
  },
  computed: {
    menuList () {
      return [
        {
          title: '个人信息',
          tag: 'info'
        },
        {
          title: '发布的文章',
          tag: 'artilce'
        },
        {
          title: '我的QuickLad',
          tag: 'quicklad'
        },
        {
          title: '消息收发',
          tag: 'message'
        }
      ]
    }
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
@import '../css/app.styl'

.personal-container
  .aside-header
    span
      color $secondary
      font-size times($base-font, 4.5)
  .aside-menu
    margin 30px 0 0 0
    font-size times($base-font, 1.5)
    line-height times($base-font, 3)
    .menu-list
      margin 10px 0
      cursor pointer
  .list-curtain
    background-color $secondary
    color $tertiary !important
</style>
