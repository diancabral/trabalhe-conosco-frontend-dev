<template lang="html">

    <div :class="[

        $style.card,
        data.active ? $style.cardActive : null

    ]">

        <div class="row align-items-center">

            <div class="col-auto">

                <div :class="[

                    $style.cardIcon,
                    mode === 'empty' ? $style.cardIconError : null,
                    data.active ? $style.cardIconActive : null

                ]">

                    <app-icon :glyph="icon" />

                </div>

            </div>

            <div class="col">

                <div :class="$style.cardMain" v-if="data.active">Seu cartão principal</div>
                <div :class="$style.cardMain" v-else-if="mode === 'payment'">Forma de pagamento</div>
                <div :class="[

                    $style.cardType,
                    mode === 'empty' ? $style.cardTypeError : null

                ]">{{ cardInfo.niceType }}</div>
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

    const creditCardType = require('credit-card-type');

    export default {

        props : {

            data : {

                type : Object,
                default(){

                    return {

                        card_number : '',
                        active : false

                    }

                }

            },

            mode : {

                type : String,
                default: 'list',
                validator: value => {

                    return ['payment', 'list', 'empty'].indexOf(value) !== -1;

                }

            }

        },

        computed : {

            cardFlag(){

                return creditCardType(this.data.card_number);

            },

            cardMask(){

                let mask = creditCardType.types.MASTERCARD;

                const valid = new RegExp('american-express|diners-club');

                if(valid.test(this.cardInfo.type)){

                    mask = creditCardType.types.AMERICAN_EXPRESS;

                }

                return mask;

            },

            cardInfo(){

                // return this.mode === 'empty' ? 'Nenhum cartão de crédito cadastrado' : 'Mastercard';

                const valid = new RegExp('mastercard|visa|american-express|diners-club|elo');

                let info = this.cardFlag.length === 1 ? (valid.test(this.cardFlag[0].type) ? this.cardFlag[0] : 'Cartão genérico') : 'Cartão genérico';

                if(this.data.card_number === '1111111111111111'){

                    info = creditCardType.getTypeInfo(creditCardType.types.MASTERCARD);

                }

                return info;

            },

            number(){

                return this.mode === 'empty' ? 'Clique aqui para cadastrar' : this.cardNumberFormated(this.data.card_number.replace(/\d(?=\d{4})/g, "*"), this.cardMask);

            },

            icon(){

                let icon = 'credit_card';

                if(this.mode === 'empty'){

                    icon = 'error';

                } else if(this.data.active){

                    icon = 'done';

                }

                return icon;

            }

        },

        methods : {

            cardNumberFormated(number, type){

                const card = creditCardType.getTypeInfo(type);

                if(card){

                    let offsets = [].concat(0, card.gaps, number.length);
                    let components = [];

                    for(let i = 0; offsets[i] < number.length; i++){

                        let start = offsets[i];
                        let end = Math.min(offsets[i + 1], number.length);
                        components.push(number.substring(start, end));

                    }

                    return components.join(' ');

                }

                return number;

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

        &--active {

            background: rgba($md-blue-500, .05);

        }

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

            &--active {

                svg {

                    fill: $md-green-500;

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
