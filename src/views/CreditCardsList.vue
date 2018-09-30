<template>

    <app-page title="Meus cartões de crédito" back>

        <div :class="$style.cards">

            <div :class="$style.cardsTitle">Cartões Cadastrados</div>
            <div :class="$style.cardsSubtitle">Selecione um cartão para usá-lo como principal ou cadastre um novo :)</div>

            <transition-group name="translate" :class="$style.cardsRow">

                <li :class="$style.cardsList" v-for="(data, index) in cardsList" :key="index">

                    <app-credit-card :data="data" v-on:click.native="changeMainCard(data)" />

                </li>

            </transition-group>

        </div>

        <div :class="$style.cardsActions">

            <app-button label="Cadastrar um novo cartão" color="blue" icon="add" v-on:click.native="$router.push({ name : 'cards_new' })" />

        </div>

    </app-page>

</template>

<script>

    import _collection from 'lodash/collection';

    /* */

    export default {

        computed : {

            cardsList(){

                return _collection.orderBy(this.$store.getters.cards, 'active', 'desc');

            }

        },

        methods : {

            changeMainCard(card){

                this.$store.dispatch('mainCard', card.card_number).then(response => {

                    this.$router.push({

                        name: 'payment_new'

                    });

                });

            }

        },

        beforeMount(){

            if(!this.$store.getters.transaction.active){

                this.$router.push('/');

            }

        }

    }

</script>

<style lang="scss" module>

    @import '@/scss/components.scss';

    /* */

    .cards {

        float: left;

        width: 100%;

        padding: $theme-padding;

        &__title {

            float: left;

            width: 100%;

            padding-top: $theme-padding;

            text-align: center;
            font-family: 'Raleway', sans-serif;
            @include font-sizer(24);
            font-weight: 400;
            color: $md-blue-500;

        }

        &__subtitle {

            float: left;

            width: 100%;

            padding-bottom: $theme-padding * 2;

            text-align: center;
            font-family: 'Raleway', sans-serif;
            @include font-sizer(16);
            font-weight: 400;
            color: $md-grey-500;

        }

        &__row {

            float: left;

            width: 100%;

            margin: 0;
            padding: 0;

            list-style: none;

        }

        &__list {

            float: left;

            width: 100%;

            &:not(:last-of-type){

                margin-bottom: $theme-padding / 2;

            }

        }

        &__actions {

            float: left;

            width: 100%;

            padding: 0 $theme-padding $theme-padding;

            display: flex;
            justify-content: center;

        }

    }

</style>
