<template>

    <div :class="$style.page">

        <div :class="$style.pageWrapper">

            <div :class="$style.pageHeader">

                <div class="row align-items-center">

                    <div class="col-auto" v-if="back">

                        <div :class="$style.pageHeaderClose" v-on:click="backPage()">

                            <app-icon glyph="keyboard_arrow_left" />

                        </div>

                    </div>

                    <div class="col">{{ title }}</div>

                    <div class="col-auto" v-if="!back">

                        <div :class="$style.pageHeaderClose" v-on:click="closePage()">

                            <app-icon glyph="close" />

                        </div>

                    </div>

                </div>

            </div>

            <div :class="$style.pageContent">

                <slot></slot>

            </div>

        </div>

    </div>

</template>

<script>

    export default {

        props : {

            title : {

                type: String

            },

            back : {

                type: Boolean

            }

        },

        methods : {

            backPage(){

                this.$router.go(-1);

            },

            closePage(){

                this.$router.push('/');

            }

        }

    }

</script>

<style lang="scss" module>

    @import '@/scss/components.scss';

    /* */

    .page {

        float: left;

        width: 100%;
        max-height: 100%;

        margin-right: -100%;

        display: flex;
        flex-direction: column;

        filter: drop-shadow(0 100px 100px rgba(black, .5));

        &__wrapper {

            float: left;

            width: 100%;

            background: $md-blue-500;

            border-radius: 10px;

            overflow: hidden;

            display: flex;
            flex-flow: column;

        }

        &__header {

            float: left;

            width: 100%;

            padding: $theme-padding * 1.5;

            font-family: 'Raleway', sans-serif;
            @include font-sizer(18);
            font-weight: 500;
            color: white;

            &__close {

                $size: 28px;

                cursor: pointer;

                svg {

                    fill: white;

                    width: $size;
                    height: $size;

                }

            }

        }

        &__content {

            float: left;

            width: 100%;

            background: white;

            border-top-left-radius: 10px;
            border-top-right-radius: 10px;

            overflow-y: auto;

        }

    }

</style>
