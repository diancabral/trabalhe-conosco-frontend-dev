import Vue from 'vue';
import VueResource from 'vue-resource';

require('material-colors/dist/colors.var.css');

/* */

Vue.use(VueResource);

/* */

import router from './router';
import store from './store';

/* */

import App from './App.vue';

/* */

Vue.component('app-button', () => ({ component: import('@/components/AppButton.vue') }));
Vue.component('app-icon', () => ({ component: import('@/components/AppIcon.vue') }));
Vue.component('app-header', () => ({ component: import('@/components/AppHeader.vue') }));
Vue.component('app-modal', () => ({ component: import('@/components/AppModal.vue') }));
Vue.component('app-page', () => ({ component: import('@/components/AppPage.vue') }));
Vue.component('app-user', () => ({ component: import('@/components/AppUser.vue') }));
Vue.component('app-credit-card', () => ({ component: import('@/components/AppCreditCard.vue') }));
Vue.component('app-tooltip', () => ({ component: import('@/components/AppTooltip.vue') }));

/* */

Vue.config.productionTip = false;

/* */

if(localStorage.getItem(store.getters.storageToken)){

    store.dispatch('populateCards', JSON.parse(localStorage.getItem(store.getters.storageToken)));

} else {

    localStorage.setItem(store.getters.storageToken, JSON.stringify([]));

}

/* */

new Vue({

    router,
    store,
    render: h => h(App)

}).$mount('#app');
