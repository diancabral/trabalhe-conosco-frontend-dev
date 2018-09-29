import Vue from 'vue';
import Router from 'vue-router';

/* */

Vue.use(Router);

/* */

export default new Router({

    routes: [

        {

            path: '/payment/new/',
            name: 'payment_new',
            component: () => import('./views/PaymentNew.vue')

        },

        {

            path: '/cards/',
            name: 'cards_list',
            component: () => import('./views/CreditCardsList.vue')

        },

        {

            path: '/cards/new',
            name: 'cards_new',
            component: () => import('./views/CreditCardsNew.vue')

        },

    ]

});
