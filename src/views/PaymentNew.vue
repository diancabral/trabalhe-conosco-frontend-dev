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

                <app-credit-card v-on:click.native="changeCreditCard()" mode="empty" />

            </div>

            <div :class="$style.paymentActions">

                <app-button label="Enviar Pagamento" color="blue" icon="send" disabled />

            </div>

        </div>

    </app-page>

</template>

<script>

    import { Money } from 'v-money';

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

                    }

                }

            }

        },

        beforeMount(){

            if(!this.$store.getters.transaction.active){

                this.$router.push('/');

            }

        },

        computed : {

            user(){

                return this.$store.getters.transaction.user;

            }

        },

        methods : {

            changeCreditCard(){

                this.$router.push({

                    name: 'cards_list'

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
