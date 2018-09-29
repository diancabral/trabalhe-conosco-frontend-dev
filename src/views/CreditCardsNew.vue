<template>

    <app-page title="Cadastrar novo cartão de crédito" back>

        <div :class="$style.card">

            <div :class="$style.cardWrapper">

                <div :class="$style.cardLogo">

                    <img :class="$style.cardLogoImg" src="@/assets/logo.png" alt="PicPay">

                </div>

                <div :class="$style.cardChip"></div>

                <div :class="[

                    $style.cardNumber,
                    !number ? $style.cardNumberEmpty : null

                ]">{{ cardNumber }}</div>

                <div :class="$style.cardInfo">

                    <div :class="[

                        $style.cardInfoShadow,
                        $style.cardInfoShadowDate

                    ]"></div>
                    <div :class="$style.cardInfoShadow"></div>

                </div>

            </div>

        </div>

        <div :class="$style.add">

            <div class="row">

                <div class="col-12">

                    <div :class="$style.addField">

                        <label :class="$style.addLabel">Número do cartão</label>
                        <the-mask mask="#### #### #### ####" :class="$style.addInput" placeholder="XXXX XXXX XXXX XXXX" v-model="number" />

                    </div>

                </div>

                <div class="col">

                    <div :class="$style.addField">

                        <label :class="$style.addLabel">Validade</label>
                        <the-mask mask="##/##" :class="$style.addInput" placeholder="XX/XX" v-model="date" />

                    </div>

                </div>

                <div class="col">

                    <div :class="$style.addField">

                        <label :class="$style.addLabel">

                            <div class="row align-items-center no-gutters">

                                <div class="col-auto">CVV</div>
                                <div class="col-auto">

                                    <app-tooltip label="Esse número normalmente está localizado na parte trazeira do cartão." limited top>

                                        <app-icon :class="$style.addLabelHelp" glyph="help" />

                                    </app-tooltip>

                                </div>

                            </div>

                        </label>
                        <the-mask mask="###" :class="$style.addInput" placeholder="XXX" v-model="cvv" />

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

            <app-button label="Salvar e continuar com o pagamento" color="green" icon="save" />

        </div>

    </app-page>

</template>

<script>

    import { TheMask } from 'vue-the-mask';

    export default {

        components: {

            TheMask

        },

        data(){

            return {

                number : '',
                date: '',
                cvv : '',
                name : ''

            }

        },

        computed : {

            cardNumber(){

                return this.number.replace(/(.{4})/g, '$1 ');

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

        &__wrapper {

            position: relative;

            float: left;

            width: 250px;
            height: 156px;

            padding: $theme-padding;

            display: flex;
            align-content: space-between;
            flex-wrap: wrap;

            background: $md-blue-grey-500;
            border-radius: 12px;

        }

        &__logo {

            float: left;

            width: 100%;
            height: $logo-height;

            &__img {

                height: $logo-height;

                filter: brightness(100);

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

            transition: .2s ease;
            transition-property: background-color;

            &--empty {

                background: rgba(black, .1);

            }

        }

        &__info {

            float: left;

            width: 60%;

            display: flex;
            flex-wrap: wrap;

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

            float: left;

            width: 100%;

            margin: 0;

            font-family: 'Raleway', sans-serif;
            @include font-sizer(11);
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
