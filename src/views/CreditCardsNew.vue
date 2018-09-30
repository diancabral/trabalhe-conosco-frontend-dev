<template>

    <app-page title="Cadastrar novo cartão de crédito" back>

        <div :class="[

            $style.card,
            cvvHelp ? $style.cardActive : null,
            sending ? $style.cardSending : null

        ]">

            <div :class="$style.cardWrapper">

                <div :class="$style.cardFront">

                    <div :class="$style.cardLogo">

                        <img :class="$style.cardLogoImg" src="@/assets/logo.svg" alt="PicPay">

                    </div>

                    <div :class="$style.cardChip"></div>

                    <div :class="[

                        $style.cardNumber,
                        !number ? $style.cardNumberEmpty : null

                    ]">{{ number }}</div>

                    <div :class="$style.cardInfo">

                        <div class="row align-items-end">

                            <div class="col">

                                <div :class="[

                                    $style.cardInfoShadow,
                                    $style.cardInfoShadowDate

                                ]"></div>
                                <div :class="$style.cardInfoShadow"></div>

                            </div>

                            <div class="col-auto">

                                <div :class="[

                                    $style.cardInfoLogo,
                                    !cardInfo ? $style.cardInfoLogoShadow : null

                                ]">

                                    <transition name="fade">

                                        <img src="@/assets/mastercard.svg" v-if="cardInfo.type === 'mastercard'">
                                        <img src="@/assets/visa.svg" v-else-if="cardInfo.type === 'visa'">
                                        <img src="@/assets/american-express.svg" v-else-if="cardInfo.type === 'american-express'">
                                        <img src="@/assets/diners-club.svg" v-else-if="cardInfo.type === 'diners-club'">
                                        <img src="@/assets/elo.svg" v-else-if="cardInfo.type === 'elo'">

                                    </transition>

                                </div>

                            </div>

                        </div>

                    </div>

                </div>

                <div :class="$style.cardBack">

                    <div :class="$style.cardMagnetic"></div>
                    <div :class="$style.cardSignature"></div>

                </div>

            </div>

        </div>

        <div :class="$style.add">

            <div class="row">

                <div class="col-12">

                    <div :class="$style.addField">

                        <label :class="$style.addLabel">Número do cartão</label>
                        <the-mask :mask="cardMask" :masked="true" :class="$style.addInput" placeholder="XXXX XXXX XXXX XXXX" v-model="number" />

                    </div>

                </div>

                <div class="col">

                    <div :class="$style.addField">

                        <label :class="$style.addLabel">Validade</label>
                        <the-mask mask="##/##" :masked="true" :class="$style.addInput" placeholder="XX/XX" v-model="date" />

                    </div>

                </div>

                <div class="col">

                    <div :class="$style.addField">

                        <label :class="$style.addLabel">

                            <div class="row align-items-center no-gutters">

                                <div class="col-auto">{{ cardCode.label }}</div>
                                <div class="col-auto">

                                    <app-tooltip label="Esse número normalmente está localizado na parte trazeira do cartão. Veja uma dica na imagem do cartão PicPay acima." limited top>

                                        <app-icon :class="$style.addLabelHelp" glyph="help"  v-on:mouseover.native="cvvHelpActive()" v-on:mouseleave.native="cvvHelpInactive()" />

                                    </app-tooltip>

                                </div>

                            </div>

                        </label>
                        <the-mask :mask="cardCode.mask" :class="$style.addInput" :placeholder="cardCode.placeholder" v-model="cvv" />

                    </div>

                </div>

                <div class="col-12">

                    <div :class="$style.addField">

                        <label :class="$style.addLabel">Nome impresso no cartão</label>
                        <input type="text" :class="$style.addInput" placeholder="João da Silva José" v-model="name">

                    </div>

                </div>

            </div>

        </div>

        <div :class="$style.addActions">

            <app-button label="Salvar e continuar com o pagamento" color="green" icon="save" v-on:click.native="saveCard()" :loading="sending" />

        </div>

    </app-page>

</template>

<script>

    import { TheMask } from 'vue-the-mask';

    const creditCardType = require('credit-card-type');

    export default {

        components: {

            TheMask

        },

        data(){

            return {

                number : '',
                date: '',
                cvv : '',
                cvvHelp: false,
                name : '',
                sending: false

            }

        },

        computed : {

            cardNumber(){

                return this.number.replace(/\s/g, '');

            },

            cardFlag(){

                return creditCardType(this.cardNumber);

            },

            cardInfo(){

                const valid = new RegExp('mastercard|visa|american-express|diners-club|elo');

                let info = this.cardFlag.length === 1 ? (valid.test(this.cardFlag[0].type) ? this.cardFlag[0] : false) : false;

                if(this.cardNumber === '1111111111111111'){

                    info = creditCardType.getTypeInfo(creditCardType.types.MASTERCARD);

                }

                return info;

            },

            cardCode(){

                return this.cardInfo ? {

                    label : this.cardInfo.code.name,
                    placeholder : 'X'.repeat(this.cardInfo.code.size),
                    mask : '#'.repeat(this.cardInfo.code.size)

                } : {

                    label : 'CVV',
                    placeholder : 'XXX',
                    mask : '###'

                }

            },

            cardMask(){

                let mask = '#### #### #### ####';

                const valid = new RegExp('american-express|diners-club');

                if(valid.test(this.cardInfo.type)){

                    mask = '#### ###### ####';

                }

                return mask;

            }

        },

        methods : {

            cvvHelpActive(){

                this.cvvHelp = true;

            },

            cvvHelpInactive(){

                this.cvvHelp = false;

            },

            saveCard(){

                const self = this;

                this.sending = true;

                /* */

                this.$store.dispatch('newCard', {

                    card_number: this.cardNumber,
                    cvv: this.cvv,
                    expiry_date: this.date,
                    name: this.name

                }).then(response => {

                    setTimeout(() => {

                        self.$router.push({

                            name: 'payment_new'

                        });

                    }, 2000);

                });

            }

        }

        // beforeMount(){
        //
        //     if(!this.$store.getters.transaction.active){
        //
        //         this.$router.push('/');
        //
        //     }
        //
        // }

    }

</script>

<style lang="scss" module>

    @import '@/scss/components.scss';

    /* */

    .card {

        $logo-height: 20px;
        $chip-height: 25px;

        $padding: 1.5;

        /* */

        float: left;

        width: 100%;

        padding: $theme-padding * 2;

        border-bottom: 1px solid $md-grey-100;

        display: flex;
        justify-content: center;

        background: $md-grey-50;

        perspective: 500px;

        &--active &__wrapper {

            transform: translateX(-100%) rotateY(-180deg);

        }

        &--sending {

            perspective: none;

        }

        &--sending &__wrapper {

            transform: scale(.8) translateX(300%);

            animation : sending 1.6s cubic-bezier(0.68, -1, 0.265, 2);
            transform-origin: center;

            @keyframes sending {

                0% {

                    transform: scale(1) translateX(0);

                }

                50% {

                    transform: scale(.8);

                }

                100% {

                    transform: scale(.8) translateX(300%);

                }

            }

        }

        &__wrapper {

            position: relative;

            float: left;

            width: 250px;
            height: 156px;

            backface-visibility: hidden;

            transition: transform .6s cubic-bezier(0.86, 0, 0.07, 1);
            transform-style: preserve-3d;
            transform-origin: center right;

            transform: translate3d(0, 0, 0);

        }

        &__front,
        &__back {

            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            padding: $theme-padding;

            background: linear-gradient(135deg, $md-blue-grey-600 0%, $md-blue-grey-900 100%);
            border-radius: 12px;

            display: flex;
            align-content: space-between;
            flex-wrap: wrap;

            pointer-events: none;

        }

        &__back {

            padding: 0;

            transform: rotateY(180deg);

            backface-visibility: hidden;

            background: linear-gradient(45deg, $md-blue-grey-900 0%, $md-blue-grey-600 100%);

            align-content: flex-start;

        }

        &__magnetic {

            float: left;

            width: 100%;
            height: 35px;

            margin-top: $theme-padding / 2;

            background: $md-blue-grey-300;

        }

        &__signature {

            $size: 30px;

            /* */

            float: left;

            width: 65%;
            height: 30px;

            margin: $theme-padding / 2;

            background: $md-blue-grey-400;

            border-radius: 3px;

            display: flex;
            align-items: center;
            justify-content: flex-end;

            &::before {

                content: 'XXX';

                float: left;

                width: $size + ($theme-padding / 2);
                height: $size + ($theme-padding / 2);

                margin-right: -2px;

                border-radius: $size;
                box-shadow : 0 0 0 3px $md-red-500;

                font-family: monospace;
                @include font-sizer(12);
                font-weight: bold;
                text-align: center;
                color: white;
                line-height: $size + ($theme-padding / 2);
                font-style: italic;

                transform: rotateX(180deg);

            }

        }

        &__logo {

            float: left;

            width: 100%;
            height: $logo-height;

            &__img {

                height: $logo-height;

            }

        }

        &__chip {

            $size: 8px;
            $gutter : 3px;

            /* */

            position: relative;

            float: left;

            width: 15px;
            height: $chip-height;

            margin-left: $size + $gutter;

            background: $md-amber-500;

            &::before,
            &::after {

                content: '';

                position: absolute;

                top: 0;

                width: $size;
                height: $chip-height;

                background: $md-amber-500;

            }

            &::before {

                left: -($size + $gutter);

                border-top-left-radius: 5px;
                border-bottom-left-radius: 5px;

            }

            &::after {

                right: -($size + $gutter);

                border-top-right-radius: 5px;
                border-bottom-right-radius: 5px;

            }

        }

        &__number {

            $size: 16;

            /* */

            float: left;

            width: 100%;
            height: #{$size}px;

            font-family: monospace;
            @include font-sizer($size);
            white-space: nowrap;
            letter-spacing: 2px;
            font-weight: 700;
            line-height: 1;
            color: white;

            background: rgba(black, 0);

            border-radius: #{$size / 2}px;

            transition: background-color .2s ease, color .2s ease .2s;

            &--empty {

                background: rgba(black, .1);

                color: rgba(white, 0);

            }

        }

        &__info {

            float: left;

            width: 100%;

            &__shadow {

                $size: 7px;

                /* */

                float: left;

                height: $size;
                width: 100%;

                background: rgba(black, .1);

                border-radius: $size / 2;

                &--date {

                    width: 30%;

                    margin-bottom: 5px;

                }

            }

            &__logo {

                $size: 60px;

                /* */

                position: relative;

                float: left;

                width: $size;
                height: $size / 2.2;

                background: rgba(black, 0);

                border-radius: 5px;

                object-fit: contain;
                display: flex;
                justify-content: center;

                transition: background-color .2s ease;

                &--shadow {

                    background: rgba(black, .1);

                }

                img {

                    position: absolute;

                    width: 100%;
                    height: 100%;

                }

            }

        }

    }

    .add {

        float: left;

        width: 100%;

        padding: $theme-padding;

        &__field {

            float: left;

            width: 100%;

            margin-bottom: $theme-padding;

        }

        &__label {

            $size: 11;

            /* */

            float: left;

            width: 100%;
            height: #{$size}px;

            font-family: 'Raleway', sans-serif;
            @include font-sizer($size);
            letter-spacing: 2px;
            text-transform: uppercase;
            line-height: 1;
            font-weight: 600;
            color: $md-blue-500;

            &__help {

                $size: 18px;

                float: left;

                width: $size;
                height: $size;

                border-radius: $size / 2;

                fill: $md-grey-500;

                cursor: help;

            }

        }

        &__input {

            float: left;

            width: 100%;

            padding-bottom: $theme-padding / 2;

            font-family: monospace;
            @include font-sizer(20);
            font-weight: 600;
            text-transform: uppercase;

            border: none;
            border-bottom: 2px solid $md-grey-300;
            outline: none;

            transition: .2s ease;
            transition-property: border-color;

            &::-webkit-outer-spin-button,
            &::-webkit-inner-spin-button {

                -webkit-appearance: none;
                margin: 0;

            }

            &::placeholder {

                color: $md-grey-300;

            }

            &:hover {

                border-color: $md-grey-400;

            }

            &:focus {

                border-color: $md-blue-500;

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
