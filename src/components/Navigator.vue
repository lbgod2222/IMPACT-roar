<template>
  <!-- <q-page-sticky position="top-right"> -->
  <div class="navWrap">
    <q-icon :name="emit ? 'close' : 'menu'" size="large" class="ico cursor-pointer" @click.native="emit = !emit">
      <q-tooltip :offset='[0,5]'>
        开启/关闭
      </q-tooltip>
    </q-icon>
    <q-icon v-show="emit" name="mdi-book-open" size="large" class="ico cursor-pointer" @click.native="linkTo('articles')">
      <q-tooltip :offset='[0,5]'>
        文章
      </q-tooltip>
    </q-icon>
    <q-icon v-show="emit" name="mdi-account-box" size="large" class="ico cursor-pointer" @click.native="linkTo('personal')">
      <q-tooltip :offset='[0,5]'>
        用户
      </q-tooltip>
    </q-icon>
    <q-icon v-show="emit" name="mdi-view-dashboard" size="large" class="ico cursor-pointer" @click.native="linkTo('dashboard')">
      <q-tooltip :offset='[0,5]'>
        Dashboard
      </q-tooltip>
    </q-icon>
    <q-icon v-show="emit" name="mdi-earth" size="large" class="ico cursor-pointer" @click.native="emit = !emit">
      <q-tooltip :offset='[0,5]'>
        全球化
      </q-tooltip>
    </q-icon>
  </div>
  <!-- </q-page-sticky> -->
</template>

<script>
import {
  QPageSticky,
  QIcon,
  QTooltip
} from 'quasar'
import { mapGetters } from 'vuex'
import {
  forbiddenPath
} from '../utils/constant'
import {
  composeDialog
} from '../utils/util'

export default {
  name: 'Navigator',
  components: {
    QPageSticky,
    QIcon,
    QTooltip
  },
  data () {
    return {
      forbiddenPath,
      emit: false,
      appearence: true
    }
  },
  mounted () {
    // appear switcher
    let pointer = this.$route && this.$route.name ? this.$route.name : ''
    let findIndex = forbiddenPath.find((e) => (
      e === pointer
    ))
    if (findIndex >= 0) {
      this.appearence = false
    }
  },
  methods: {
    composeDialog,
    linkTo (path) {
      console.log(this)
      if (path !== 'articles' && !this.IS_LOGIN) {
        composeDialog({
          title: '尚未登录',
          message: '进入当前页面需要登录',
          isAlert: false
        }, () => {
          this.$root.$emit('callLoginModal')
        }, () => {
          return null
        })
      } else {
        this.$router.push(path)
      }
    }
  },
  computed: {
    ...mapGetters(['IS_LOGIN'])
  }
}
</script>

<style lang="stylus" scoped>
@import '~variables'
@import '../css/app.styl'

.navWrap
  background-color $tertiary
  transition all ease .6s
  position fixed
  min-width times($base-font, 3)
  min-height times($base-font, 3)
  right 0
  border 2px solid $secondary
  // min-width 200px
  z-index 999
  // &:hover
  //   width 200px
  .ico
    transition all ease .6s
    width times($base-font, 3)
    height times($base-font, 3)
    transition all ease .6s
    &:hover
      background-color $faded
</style>
