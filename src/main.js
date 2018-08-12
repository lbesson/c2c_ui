import Vue from 'vue'
import App from './App.vue'
import DocumentLink from './components/utils/DocumentLink'
import DocumentTitle from './components/utils/DocumentTitle'
import LoadingNotification from './components/utils/LoadingNotification'
import PrettyRouteLink from './components/utils/PrettyRouteLink'
import PrettyOutingLink from './components/utils/PrettyOutingLink'

/* icons */
import BaseIcon from './components/icons/BaseIcon'

import IconForum from './components/icons/IconForum'
import IconActivity from './components/icons/IconActivity'
import IconCondition from './components/icons/IconCondition'
import IconQuality from './components/icons/IconQuality'

import IconDocument from './components/icons/IconDocument'
import IconRoute from './components/icons/IconRoute'
import IconOuting from './components/icons/IconOuting'
import IconArticle from './components/icons/IconArticle'
import IconXreport from './components/icons/IconXreport'
import IconArea from './components/icons/IconArea'



import Router from './router'
import * as VueGoogleMaps from 'vue2-google-maps'

// Require the main Sass manifest file
require('./assets/sass/main.scss');

Vue.config.productionTip = false

Vue.use(VueGoogleMaps, {
    load: {
    key: 'AIzaSyAYiZ3lDd0WNJIOEWLO_y2tJHTmWmZG6oY',
        libraries: 'places', // This is required if you use the Autocomplete plugin
        // OR: libraries: 'places,drawing'
        // OR: libraries: 'places,drawing,visualization'
        // (as you require)

        //// If you want to set the version, you can do so:
        // v: '3.26',
    },

    //// If you intend to programmatically custom event listener code
    //// (e.g. `this.$refs.gmap.$on('zoom_changed', someFunc)`)
    //// instead of going through Vue templates (e.g. `<GmapMap @zoom_changed="someFunc">`)
    //// you might need to turn this on.
    // autobindAllEvents: false,

    //// If you want to manually install components, e.g.
    //// import {GmapMarker} from 'vue2-google-maps/src/components/marker'
    //// Vue.component('GmapMarker', GmapMarker)
    //// then disable the following:
    // installComponents: true,
})

Vue.component("document-title", DocumentTitle)
Vue.component("document-link", DocumentLink)
Vue.component("loading-notification", LoadingNotification)
Vue.component("pretty-route-link", PrettyRouteLink)
Vue.component("pretty-outing-link", PrettyOutingLink)

Vue.component("base-icon", BaseIcon)
Vue.component("icon-forum", IconForum)
Vue.component("icon-activity", IconActivity)
Vue.component("icon-condition", IconCondition)
Vue.component("icon-quality", IconQuality)
Vue.component("icon-document", IconDocument)
Vue.component("icon-area", IconArea)
Vue.component("icon-route", IconRoute)
Vue.component("icon-xreport", IconXreport)
Vue.component("icon-article", IconArticle)
Vue.component("icon-outing", IconOuting)


new Vue({
  router:Router,
  render: h => h(App)
}).$mount('#app')