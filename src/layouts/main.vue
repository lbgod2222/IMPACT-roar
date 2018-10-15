<template>
  <div class="outer">
    <q-scroll-observable @scroll="scrollHandler" />
    <q-slide-transition :duration="1000">
      <div id="homeCursion" class="animate-fade" v-show="visible">
        <h1>Idea is not Snakes</h1>
      </div>
    </q-slide-transition>
    <q-layout>
      <q-layout-header>
        <q-toolbar>
          <q-btn
            flat
            round
            dense
            icon="menu"
            @click="leftDrawer = !leftDrawer"
          />
          <q-toolbar-title>
            Header
            <span slot="subtitle">Subtile</span>
          </q-toolbar-title>
        </q-toolbar>
        <q-tabs>
          <q-route-tab
            slot="title"
            icon="map"
            to="/your/route"
            replace
            label="One Tab"
          />
          <q-route-tab
            slot="title"
            icon="assignment"
            to="/some/other/route"
            replace
            label="Other Tab"
          />
        </q-tabs>
      </q-layout-header>

      <q-layout-footer>
        <q-toolbar>
          <q-btn
            flat
            round
            dense
            icon="menu"
            @click="leftDrawer = !leftDrawer"
          />
          <q-toolbar-title>
            Footer
            <span slot="subtitle">Subtile</span>
          </q-toolbar-title>
        </q-toolbar>
        <q-tabs>
          <q-route-tab
            slot="title"
            icon="map"
            to="/your/route"
            replace
            label="One Tab"
          />
          <q-route-tab
            slot="title"
            icon="assignment"
            to="/some/other/route"
            replace
            label="Other Tab"
          />
        </q-tabs>
      </q-layout-footer>

      <!-- (Optional) A Drawer; you can add one more with side="right" or change this one's side -->
      <q-layout-drawer
        side="left"
        v-model="leftDrawer"
      >
        <!-- QScrollArea is optional -->
        <q-scroll-area class="fit q-pa-sm">
          <!-- Content here -->
        </q-scroll-area>
      </q-layout-drawer>

      <q-page-container>
        <!-- This is where pages get injected -->
        <router-view />
      </q-page-container>

    </q-layout>
  </div>
</template>

<script>
import {
  QLayout,
  QLayoutHeader,
  QLayoutFooter,
  QToolbar,
  QBtn,
  QToolbarTitle,
  QTabs,
  QRouteTab,
  QLayoutDrawer,
  QScrollArea,
  QPageContainer,
  QPage,
  QSlideTransition,
  QScrollObservable
} from 'quasar'

export default {
  // name: 'LayoutName',
  data () {
    return {
      leftDrawer: true,
      visible: true
    }
  },
  components: {
    QLayout,
    QLayoutHeader,
    QLayoutFooter,
    QToolbar,
    QBtn,
    QToolbarTitle,
    QTabs,
    QRouteTab,
    QLayoutDrawer,
    QScrollArea,
    QPageContainer,
    QPage,
    QSlideTransition,
    QScrollObservable
  },
  methods: {
    scrollHandler (scroll) {
      if (this.visible) {
        console.log(scroll)
        if (scroll.direction === 'down' && scroll.position > 0) {
          this.visible = false
        }
      }
    }
  }
}
</script>

<style>
#homeCursion {
  z-index: 999999;
  position: fixed;
  height: 100vh;
  width: 100vw;
  background-color: bisque;
  float: left;
}
</style>
