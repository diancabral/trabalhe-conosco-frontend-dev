<template>

    <div :class="$style.page">

        <div :class="$style.pageHeader">

            <div class="row align-items-center">

                <div class="col">{{ title }}</div>

                <div class="col-auto">

                    <div :class="$style.pageHeaderClose" v-on:click="closePage()">

                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M18.3 5.71c-.39-.39-1.02-.39-1.41 0L12 10.59 7.11 5.7c-.39-.39-1.02-.39-1.41 0-.39.39-.39 1.02 0 1.41L10.59 12 5.7 16.89c-.39.39-.39 1.02 0 1.41.39.39 1.02.39 1.41 0L12 13.41l4.89 4.89c.39.39 1.02.39 1.41 0 .39-.39.39-1.02 0-1.41L13.41 12l4.89-4.89c.38-.38.38-1.02 0-1.4z"/></svg>

                    </div>

                </div>

            </div>

        </div>

        <div :class="$style.pageContent">

            <slot></slot>

        </div>

    </div>

</template>

<script>

    export default {

        props : {

            title : {

                type: String

            }

        },

        methods : {

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
        height: 100%;

        display: flex;
        flex-direction: column;

        filter: drop-shadow(0 0 100px rgba(black, .2));

        &__header {

            float: left;

            width: 100%;

            padding: $theme-padding * 1.5;

            background: $md-grey-50;

            font-family: 'Raleway', sans-serif;
            @include font-sizer(18);
            font-weight: 500;
            color: $md-deep-purple-500;

            border-top-left-radius: 10px;
            border-top-right-radius: 10px;

            border-bottom: 1px solid $md-grey-100;

            &__close {

                cursor: pointer;

                svg {

                    fill: $md-deep-purple-500;

                }

            }

        }

        &__content {

            float: left;

            width: 100%;

            background: white;

            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;

            overflow-y: auto;

        }

    }

</style>
