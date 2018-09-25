<template lang="html">

    <div :class="$style.card">

        <div class="row align-items-center">

            <div class="col-auto">

                <div :class="[

                    $style.cardIcon,
                    mode === 'empty' ? $style.cardIconError : null

                ]">

                    <app-icon glyph="credit_card" v-if="mode === 'payment'" />
                    <app-icon glyph="error" v-else-if="mode === 'empty'" />

                </div>

            </div>

            <div class="col">

                <div :class="$style.cardMain" v-if="mode === 'payment'">Forma de pagamento</div>
                <div :class="[

                    $style.cardType,
                    mode === 'empty' ? $style.cardTypeError : null

                ]">{{ type }}</div>
                <div :class="[

                    $style.cardNumber,
                    mode === 'empty' ? $style.cardNumberError : null

                ]">{{ number }}</div>

            </div>

            <div class="col-auto" v-if="mode === 'payment'">

                <div :class="[

                    $style.cardIcon,
                    $style.cardIconChange

                ]">

                    <app-icon glyph="keyboard_arrow_right" />

                </div>

            </div>

        </div>

    </div>

</template>

<script>

    export default {

        props : {

            mode : {

                type : String,
                default: 'list',
                validator: value => {

                    return ['payment', 'list', 'empty'].indexOf(value) !== -1;

                }

            }

        },

        computed : {

            type(){

                return this.mode === 'empty' ? 'Nenhum cartão de crédito cadastrado' : 'MasterCard';

            },

            number(){

                return this.mode === 'empty' ? 'Clique aqui para cadastrar' : '1234567890111213'.replace(/\d(?=\d{4})/g, "*").replace(/(.{4})/g, '$1 ')

            }

        }

    }

</script>

<style lang="scss" module>

    @import '@/scss/components.scss';

    /* */

    .card {

        float: left;

        width: 100%;

        padding: $theme-padding;

        background: $md-grey-50;

        border-radius: 10px;

        transition: background-color .2s ease;

        cursor: pointer;

        &:hover {

            background: $md-grey-100;

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

            &--error {

                svg {

                    fill: $md-red-500;
                }

            }

        }

        &__main {

            float: left;

            width: 100%;

            margin-bottom: 5px;

            font-family: 'Raleway', sans-serif;
            @include font-sizer(12);
            font-weight: 400;
            color: $md-grey-500;

        }

        &__type {

            float: left;

            width: 100%;

            font-family: 'Raleway', sans-serif;
            @include font-sizer(16);
            line-height: 1;
            font-weight: 600;
            color: black;

            &--error {

                color: $md-red-500;

            }

        }

        &__number {

            float: left;

            width: 100%;

            font-family: 'Raleway', sans-serif;
            line-height: 1;
            @include font-sizer(14);
            font-weight: 600;
            color: $md-grey-500;

            &--error {

                color: $md-red-500;
                font-weight: 400;

            }

        }

    }

</style>
