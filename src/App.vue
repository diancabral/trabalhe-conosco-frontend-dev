<template>

    <div id="app">

        <app-header />

        <div class="container">

            <div :class="$style.users">

                <transition name="fade">

                    <ul :class="$style.usersRow" key="loading" v-if="usersLoading">

                        <li :class="[

                            $style.usersList,
                            $style.usersListLoading

                        ]" v-for="(user, index) in loading" :key="index">

                            <div class="row align-items-center">

                                <div class="col-auto">

                                    <div :class="[

                                        $style.usersAvatar,
                                        $style.loading

                                    ]"></div>

                                </div>

                                <div class="col">

                                    <div class="row">

                                        <div class="col-12">

                                            <div :class="[

                                                $style.usersId,
                                                $style.usersIdLoading,
                                                $style.loading

                                            ]">#123456</div>

                                        </div>

                                        <div class="col-12">

                                            <div :class="[

                                                $style.usersName,
                                                $style.usersNameLoading,
                                                $style.loading

                                            ]">Lorem ipsum dolor sit ammet</div>

                                        </div>

                                        <div class="col-12">

                                            <div :class="[

                                                $style.usersNick,
                                                $style.usersNickLoading,
                                                $style.loading

                                            ]">@loremipsumdolorsit</div>

                                        </div>

                                    </div>

                                </div>

                            </div>

                        </li>

                    </ul>

                    <ul :class="$style.usersRow" key="users"  v-else>

                        <li :class="$style.usersList" v-for="user in users" :key="user.id">

                            <div class="row align-items-center">

                                <div class="col-auto">

                                    <div :class="$style.usersAvatar">

                                        <img :class="$style.usersAvatarImg" :src="user.img" :alt="user.name">

                                    </div>

                                </div>

                                <div class="col">

                                    <div class="row">

                                        <div class="col-12">

                                            <div :class="$style.usersId">#{{ user.id }}</div>

                                        </div>

                                        <div class="col-12">

                                            <div :class="$style.usersName">{{ user.name }}</div>

                                        </div>

                                        <div class="col-12">

                                            <div :class="$style.usersNick">{{ user.username }}</div>

                                        </div>

                                    </div>

                                </div>

                                <div class="col-auto">

                                    aaaa

                                </div>

                            </div>

                        </li>

                    </ul>

                </transition>

            </div>

        </div>

    </div>

</template>

<script>

    import AppHeader from '@/components/AppHeader.vue';

    /* */

    export default {

        components : {

            AppHeader

        },

        data(){

            return {

                users : [],
                usersLoading: true,
                loading : [{},{},{}]

            }

        },

        mounted(){

            const self = this;

            setTimeout(() => {

                self.$http.get('http://careers.picpay.com/tests/mobdev/users').then(response => {

                    self.users = response.body;

                    self.usersLoading = false;

                })

            }, 2000);

        }

    }

</script>

<style lang="scss">

    @import '@/scss/style.scss';

    /* */

    .translate {

        &-enter-active,
        &-leave-active {

            transition: .3s ease-in-out !important;
            transition-property: opacity, transform !important;

        }

        &-enter-active {

            transition-delay: .3s !important;

        }

        &-enter,
        &-leave-active {

            opacity: 0;
            transform: translate3d(0, 5px, 0) !important;

        }

    }

    .fade {

        &-enter-active,
        &-leave-active {

            transition: .3s ease;
            transition-property: opacity;

        }

        &-enter-active {

            transition-delay: .3s;

        }

        &-enter,
        &-leave-active {

            opacity: 0;

        }

    }

</style>

<style lang="scss" module>

    @import '@/scss/components.scss';

    /* */

    .loading {

        $size: 500px;

        position: relative;

        color: rgba(white, 0) !important;

        &::before {

            content: '';

            position: absolute;

            top: 0;
            left: 0;

            width: 100%;
            height: 100%;

            background: $md-grey-200;
            background-image: linear-gradient(to right, $md-grey-200 0%, $md-grey-100 20%, $md-grey-200 40%, $md-grey-200 100%);
            background-repeat:  no-repeat;

            background-size: $size;

            animation: loading 1s linear infinite;

            border-radius: $size;

            @keyframes loading {

                from {

                    background-position: -$size 0;

                }

                to {

                    background-position: $size 0;

                }

            }

        }

    }

    .users {

        float: left;

        width: 100%;

        user-select: none;

        &__row {

            float: left;

            width: 100%;

            padding: 0;
            margin: 0;

            list-style: none;

        }

        &__list {

            float: left;

            width: 100%;

            padding: $theme-padding;
            margin-bottom: $theme-padding;

            background: white;

            border-radius: 10px;

            box-shadow: 0 0 100px rgba(black, 0);

            transition-property: transform, box-shadow;
            transition-duration: .2s;
            transition-timing-function: ease;

            &--loading {

                pointer-events: none;

            }

            &:hover {

                @include hardware;

                transform: scale(1.02);

                box-shadow: 0 0 100px rgba(black, .1);

            }

        }

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

        &__id {

            float: left;

            font-family: 'Montserrat', sans-serif;
            @include font-sizer(13);
            line-height: 1;
            color: $md-grey-500;
            font-weight: 400;

            &--loading {

                margin-bottom: 5px;

            }

        }

        &__name {

            float: left;

            font-family: 'Montserrat', sans-serif;
            @include font-sizer(24);
            line-height: 1;
            color: $theme-color-1;
            font-weight: 400;

            &--loading {

                margin-bottom: 5px;

            }

        }

        &__nick {

            float: left;

            font-family: 'Montserrat', sans-serif;
            @include font-sizer(14);
            line-height: 1;
            color: $md-grey-600;
            font-weight: 400;

        }

    }

</style>
