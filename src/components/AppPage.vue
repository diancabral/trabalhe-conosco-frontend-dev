<template>

    <div :class="$style.page">

        <div :class="$style.pageHeader">{{ title }}</div>

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

        filter: drop-shadow(0 0 10px rgba(black, .3));

        &__header {

            float: left;

            width: 100%;

            padding: $theme-padding * 1.5;

            background: white;

            font-family: 'Raleway', sans-serif;
            @include font-sizer(18);
            font-weight: 500;
            color: $theme-color-1;

            border-top-left-radius: 10px;
            border-top-right-radius: 10px;

        }

        &__content {

            float: left;

            width: 100%;

            background: $md-grey-100;

            padding: $theme-padding * 1.5;

            border-bottom-left-radius: 10px;
            border-bottom-right-radius: 10px;

            overflow-y: auto;

        }

    }

</style>
