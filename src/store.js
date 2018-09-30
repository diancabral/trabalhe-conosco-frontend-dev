import Vue from 'vue';
import Vuex from 'vuex';

/* */

Vue.use(Vuex);

/* */

export default new Vuex.Store({

    state: {

        storageToken : 'gNbiRnB0udnUI44pA4N3zrU9t1fK7eRe',

        transaction : {

            active : false,
            user : {}

        },

        cards : []

    },

    mutations : {

        NEW_TRANSACTION(state, user){

            state.transaction.active = true;
            state.transaction.user = user;

        },

        NEW_CARD(state, card){

            state.cards.forEach(value => {

                value.active = false;

            });

            card.active = true;

            state.cards.push(card);

        },

        POPULATE_CARDS(state, cards){

            state.cards = cards;

        }

    },

    actions: {

        populateCards(context, cards){

            context.commit('POPULATE_CARDS', cards);

        },

        newCard(context, card){

            return new Promise(resolve => {

                context.commit('NEW_CARD', card);

                /* */

                resolve(card);

            });

        },

        newTransaction(context, user){

            context.commit('NEW_TRANSACTION', user);

        }

    },

    getters: {

        storageToken : state => state.storageToken,
        transaction : state => state.transaction

    }

});
