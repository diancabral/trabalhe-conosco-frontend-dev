import Vue from 'vue';
import Vuex from 'vuex';

/* */

import _array from 'lodash/array';
const LZString = require('lz-string');

/* */

Vue.use(Vuex);

/* */

const store = new Vuex.Store({

    strict: process.env.NODE_ENV !== 'production',

    state: {

        storageToken : 'gNbiRnB0udnUI44pA4N3zrU9t1fK7eRe',

        transaction : {

            active : false,
            value : 0,
            user : {},
            receipt: {}

        },

        cards : []

    },

    mutations : {

        NEW_TRANSACTION(state, user){

            state.transaction.active = true;
            state.transaction.user = user;

        },

        NEW_TRANSACTION_VALUE(state, value){

            state.transaction.value = value;

        },

        NEW_CARD(state, card){

            state.cards.forEach(value => {

                value.active = false;

            });

            card.active = true; //active

            state.cards.push(card);

            /* */

            localStorage.setItem(state.storageToken, LZString.compress(JSON.stringify(state.cards)));

        },

        REMOVE_CARD(state, card){

            const cardIndex = _array.findIndex(state.cards, {

                card_number : card

            });

            state.cards.splice(cardIndex, 1);

            /* */

            localStorage.setItem(state.storageToken, LZString.compress(JSON.stringify(state.cards)));

        },


        MAIN_CARD(state, card){

            const self = this;

            state.cards.forEach(value => {

                self._vm.$set(value, 'active', false);

            });

            const index = _array.findIndex(state.cards, {

                card_number : card

            });

            this._vm.$set(state.cards[index], 'active', true);

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

        removeCard(context, card){

            return new Promise(resolve => {

                context.commit('REMOVE_CARD', card);

                /* */

                resolve(card);

            });

        },

        mainCard(context, card){

            return new Promise(resolve => {

                context.commit('MAIN_CARD', card);

                /* */

                resolve(card);

            });

        },

        newTransaction(context, user){

            context.commit('NEW_TRANSACTION', user);

        },

        newTransactionValue(context, value){

            context.commit('NEW_TRANSACTION_VALUE', value);

        }

    },

    getters: {

        storageToken : state => state.storageToken,
        transaction : state => state.transaction,
        cards : state => state.cards

    }

});

export default store;
