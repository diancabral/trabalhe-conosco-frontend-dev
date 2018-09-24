
import Vue from 'vue';
import VueResource from 'vue-resource';

/* */

Vue.use(VueResource);

/* */

import router from './router';
import store from './store';

/* */

import App from './App.vue';

/* */

Vue.config.productionTip = false;

new Vue({

    router,
    store,
    render: h => h(App)

}).$mount('#app');
