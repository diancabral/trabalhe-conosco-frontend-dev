<template>

    <app-page title="Meus cartões de crédito" back>

        <div :class="$style.cards">



        </div>

    </app-page>

</template>

<script>

    export default {

        beforeMount(){

            if(!this.$store.getters.transaction.active){

                this.$router.push('/');

            }

        }

    }

</script>

<style lang="scss" module>

    @import '@/scss/components.scss';

    /* */

    .cards {

        float: left;

        width: 100%;

        padding: 0 $theme-padding $theme-padding;

    }

</style>
