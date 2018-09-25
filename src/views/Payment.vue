<template>

    <app-page title="Novo pagamento para Dian Carlos">

        <div :class="$style.payment">

            <div :class="$style.paymentUser">

                <app-user :data="data" />

            </div>

            <div :class="$style.paymentValue">

                <money :class="[

                    $style.paymentValueInput,
                    transaction.value ? $style.paymentValueInputActive : null

                ]" v-model="transaction.value" v-bind="transaction.mask" required></money>
                <div :class="$style.paymentValueFocus"></div>

            </div>

            <div :class="$style.paymentCard">

                <div :class="$style.paymentCardBox">

                    <div class="row align-items-center">

                        <div class="col-auto">

                            <div :class="$style.paymentCardIcon">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M20 4H4c-1.11 0-1.99.89-1.99 2L2 18c0 1.11.89 2 2 2h16c1.11 0 2-.89 2-2V6c0-1.11-.89-2-2-2zm-1 14H5c-.55 0-1-.45-1-1v-5h16v5c0 .55-.45 1-1 1zm1-10H4V6h16v2z"/></svg>

                            </div>

                        </div>

                        <div class="col">

                            <div :class="$style.paymentCardTitle">Forma de Pagamento</div>
                            <div :class="$style.paymentCardNumber">{{ '1234567890111213'.replace(/\d(?=\d{4})/g, "*") }}</div>

                        </div>

                        <div class="col-auto">

                            <div :class="[

                                $style.paymentCardIcon,
                                $style.paymentCardIconChange

                            ]">

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/></svg>

                            </div>

                        </div>

                    </div>

                </div>

            </div>

        </div>

    </app-page>

</template>

<script>

    import AppPage from '@/components/AppPage.vue';
    import AppUser from '@/components/AppUser.vue';

    /* */

    import { Money } from 'v-money';

    /* */

    export default {

        components : {

            AppPage,
            AppUser,

            Money

        },

        data(){

            return {

                data : {

                    id: 1002,
                    img: "https://randomuser.me/api/portraits/women/37.jpg",
                    name: "Marina Coelho",
                    username: "@marina.coelho"

                },

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

                outline: none;
                border: none;

                transition: color .2s ease;

                &--active,
                &:focus {

                    color: $md-deep-purple-500;

                }

            }

            &__input:hover ~ &__focus {

                background: $md-grey-300;

            }

            &__input:focus ~ &__focus {

                background: $md-deep-purple-500;

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

            &__box {

                float: left;

                width: 100%;

                padding: $theme-padding;

                background: $md-grey-50;

                border-radius: 10px;

            }

            &__icon {

                $size: 48px;

                svg {

                    fill: $md-grey-500;

                    width: $size;
                    height: $size;

                }

                &--change {

                    svg {

                        width: $size / 1.5;
                        height: $size / 1.5;

                    }

                }

            }

            &__title {

                float: left;

                width: 100%;

                font-family: 'Raleway', sans-serif;
                @include font-sizer(16);
                font-weight: 600;

            }

        }

    }

</style>
