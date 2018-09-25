<template>

    <div :class="$style.user">

        <div class="row align-items-center">

            <div class="col-auto">

                <div :class="$style.userAvatar">

                    <img :class="$style.userAvatarImg" :src="data.img" :alt="data.name">

                </div>

            </div>

            <div class="col-auto">

                <div :class="$style.userName">{{ data.username.replace('@', '') }}</div>
                <div :class="$style.userNick">{{ data.name }}</div>

            </div>

        </div>

    </div>

</template>

<script>

    export default {

        props : {

            data : {

                type: Object,
                required: true

            }

        }

    }

</script>

<style lang="scss" module>

    @import '@/scss/components.scss';

    /* */

    .user {

        float: left;

        &__avatar {

            $size: 80px;

            float: left;

            width: $size;
            height: $size;

            object-fit: cover;

            overflow: hidden;

            border-radius: $size;

            &__img {

                width: $size;

            }

        }

        &__name {

            font-family: 'Raleway', sans-serif;
            @include font-sizer(24);
            line-height: 1;
            color: black;
            font-weight: 400;

            margin-bottom: 5px;

        }

        &__nick {

            font-family: 'Raleway', sans-serif;
            @include font-sizer(14);
            line-height: 1;
            color: $md-grey-500;
            font-weight: 400;

        }

    }

</style>
