import Vue from 'vue';
import Vuex from 'vuex';

/* */

Vue.use(Vuex);

/* */

export default new Vuex.Store({

    state: {

        transaction : {

            active : false,
            user : {}

        }

    },

    mutations: {

        NEW_TRANSACTION : (state, user) => {

            state.transaction.active = true;
            state.transaction.user = user;

        }

    },

    getters: {

        transaction : state => state.transaction

    }

});
