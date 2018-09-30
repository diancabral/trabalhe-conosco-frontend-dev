<template>

    <app-page :title="`Novo pagamento para ${user.name}`">

        <div :class="$style.payment">

            <div :class="$style.paymentUser">

                <app-user :data="user" />

            </div>

            <div :class="$style.paymentValue">

                <money :class="[

                    $style.paymentValueInput,
                    transaction.value ? $style.paymentValueInputActive : null

                ]" v-model="transaction.value" v-bind="transaction.mask" required></money>
                <div :class="$style.paymentValueFocus"></div>

            </div>

            <div :class="$style.paymentCard">

                <app-credit-card :data="card ? card : {}" v-on:click.native="changeCreditCard()" :mode="card ? 'payment' : 'empty'" />

            </div>

            <div :class="$style.paymentActions">

                <app-button label="Enviar Pagamento" color="green" icon="send" :disabled="!transaction.value" :loading="transaction.sending" v-on:click.native="sendPayment()" />

            </div>

        </div>

    </app-page>

</template>

<script>

    import { Money } from 'v-money';
    import _array from 'lodash/array';

    /* */

    export default {

        components : {

            Money

        },

        data(){

            return {

                transaction: {

                    value: 0,
                    mask: {

                        decimal: ',',
                        thousands: '.',
                        prefix: 'R$ ',
                        precision: 2,
                        masked: false

                    },
                    sending: false

                }

            }

        },

        beforeMount(){

            if(this.$store.getters.transaction.value){

                this.transaction.value = this.$store.getters.transaction.value;

            }

            if(!this.$store.getters.transaction.active){

                this.$router.push('/');

            }

        },

        watch : {

            'transaction.value' : function(value){

                this.$store.dispatch('newTransactionValue', value);

            }

        },

        computed : {

            card(){

                const activeCard = _array.findIndex(this.$store.getters.cards, 'active');

                return activeCard > -1 ? this.$store.getters.cards[activeCard] : false;

            },

            user(){

                return this.$store.getters.transaction.user;

            }

        },

        methods : {

            changeCreditCard(){

                this.$router.push({

                    name: this.card ? 'cards_list' : 'cards_new'

                })

            },

            sendPayment(){

                let data = {

                    ...this.card,
                    ...this.$store.getters.transaction.user

                };

                /* */

                this.$set(data, 'card_number', '1111111111111111');
                this.$set(data, 'value', this.transaction.value);
                this.$set(data, 'destination_user_id', data.id);

                /* */

                this.$delete(data, 'id');
                this.$delete(data, 'active');
                this.$delete(data, 'img');
                this.$delete(data, 'name');
                this.$delete(data, 'username');

                /* */

                this.transaction.sending = true;

                this.$http.post('http://careers.picpay.com/tests/mobdev/transaction', data).then(response => {

                    console.log(response);
                    this.transaction.sending = false;

                }).catch(error => {

                    console.log(error);
                    this.transaction.sending = false;

                })

            }

        }

    }

</script>

<style lang="scss" module>

    @import '@/scss/components.scss';

    /* */

    .payment {

        float: left;

        width: 100%;

        &__user {

            float: left;

            width: 100%;

            padding: $theme-padding * 1.5 0;

            display: flex;
            justify-content: center;

            border-bottom: 1px solid $md-grey-100;

        }

        &__value {

            position: relative;

            float: left;

            width: 100%;

            margin-bottom: $theme-padding * 1.5;

            display: flex;
            justify-content: center;
            flex-wrap: wrap;

            &__input {

                $size: 50;

                float: left;

                width: 100%;
                height: #{$size + ($theme-padding * 3)};

                padding: $theme-padding * 1.5;

                font-family: 'Roboto', sans-serif;
                @include font-sizer($size);
                font-weight: 500;
                color: $md-grey-400;
                text-align: center;

                background: rgba(white, 0);

                outline: none;
                border: none;

                transition: color .2s ease;

                &--active,
                &:focus {

                    color: $md-blue-500;

                }

            }

            &__input:hover ~ &__focus {

                background: $md-grey-300;

            }

            &__input:focus ~ &__focus {

                background: $md-blue-500;

            }

            &__focus {

                float: left;

                width: 25%;
                height: 2px;

                background: $md-grey-200;

                border-radius: 2px;

                transition: background-color .2s ease;

            }

        }

        &__card {

            float: left;

            width: 100%;

            padding: 0 $theme-padding $theme-padding;

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
