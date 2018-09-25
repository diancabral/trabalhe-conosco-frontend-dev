<template>

    <div :class="$style.header">

        <div class="container"  :class="$style.headerContainer">

            <a :class="$style.headerLogo" href="/">

                <img :class="$style.headerLogoImg" src="@/assets/logo.png" alt="PicPay">

            </a>

            <div :class="$style.headerTitle">Front-end Test</div>

        </div>

    </div>

</template>

<style lang="scss">

    @import '@/scss/components.scss';

    /* */

    body {

        padding-top: $header-height + $theme-padding;

    }

</style>

<style lang="scss" module>

    @import '@/scss/components.scss';

    /* */

    .header {

        position: fixed;

        top: 0;
        left: 0;

        width: 100%;
        height: $header-height;

        background: $theme-color-1;

        display: flex;
        align-items: center;

        z-index: 1000;

        &__container {

            display: flex;
            align-items: center;

        }

        &__logo {

            float: left;

            padding-right: $theme-padding;
            margin-right: $theme-padding;

            border-right: 1px solid rgba(white, .25);

            &__img {

                height: 40px;

                filter: brightness(100);

            }

        }

        &__title {

            float: left;

            font-family: 'Raleway', sans-serif;
            @include font-sizer(18);
            color: white;
            font-weight: 300;

        }

    }

</style>
