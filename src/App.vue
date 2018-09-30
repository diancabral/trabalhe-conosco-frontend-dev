<template>

    <div id="app">

        <app-header />

        <div class="container">

            <div :class="$style.users">

                <div :class="[

                    $style.usersSearch,
                    usersLoading ? $style.usersSearchLoading : null

                ]">

                    <div class="row align-items-center no-gutters">

                        <div class="col-auto">

                            <div :class="$style.usersSearchIcon">

                                <app-icon glyph="search" />

                            </div>

                        </div>

                        <div class="col">

                            <input :class="$style.usersSearchInput" type="text" placeholder="Pesquise por usuários aqui..." v-model="usersSearch">

                        </div>

                    </div>

                </div>

                <transition-group name="translate">

                    <div v-if="usersLoading" key="loading">

                        <ul :class="$style.usersRow">

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

                    </div>

                    <div v-else-if="!usersLoading && users.length" key="users">

                        <ul :class="$style.usersRow">

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

                                                <div :class="$style.usersName">{{ user.username.replace('@', '') }}</div>

                                            </div>

                                            <div class="col-12">

                                                <div :class="$style.usersNick">{{ user.name }}</div>

                                            </div>

                                        </div>

                                    </div>

                                    <div class="col-auto">

                                        <app-button label="Pagar" color="green" icon="attach_money" v-on:click.native="newTransaction(user)"/>

                                    </div>

                                </div>

                            </li>

                        </ul>

                    </div>

                    <div v-else-if="!usersLoading && !users.length" :class="$style.usersSearchEmpty"key="empty">

                        <div :class="$style.usersSearchEmptyIcon">

                            <app-icon glyph="sentiment_dissatisfied" />

                        </div>

                        <div :class="$style.usersSearchEmptyTitle">Nenhum usuário encontrado para a sua busca...</div>
                        <div :class="$style.usersSearchEmptyHelp">

                            Sua busca para "{{ usersSearch }}" não encontrou nenhum resultado.<br />
                            Por favor, verifique se o nome do usuário foi digitado de forma correta e tente novamente.

                        </div>

                    </div>

                </transition-group>

            </div>

        </div>

        <!-- <app-modal :active="$route.fullPath !== '/' && $store.getters.transaction.active"> -->
        <app-modal :active="$route.fullPath !== '/'">

            <transition name="translate-quint">

                <router-view :key="$route.fullPath" />

            </transition>

        </app-modal>

        <!-- <app-footer /> -->

    </div>

</template>

<script>

    const diacritics = require('diacritics').remove;

    /* */

    export default {

        data(){

            return {

                usersList : [],
                usersLoading: true,
                usersSearch: '',
                loading : []

            }

        },

        computed: {

            users(){

                const self = this;

                return this.usersList.filter(user => {

                    const search = diacritics(self.usersSearch.toLowerCase());

                    return diacritics(user.name.toLowerCase()).indexOf(search) !== -1 || diacritics(user.username.replace('@', '')).indexOf(search) !== -1

                });

            }

        },

        beforeMount(){

            for(var i = 0; i < 4; i++){

                this.loading.push({});

            }

        },

        mounted(){

            const self = this;

            setTimeout(() => {

                self.$http.get('http://careers.picpay.com/tests/mobdev/users').then(response => {

                    self.usersList = response.body;

                    self.usersLoading = false;

                })

            }, 2000);

        },

        methods : {

            newTransaction(user){

                this.$store.dispatch('newTransaction', user);

                /* */

                this.$router.push({

                    name: 'payment_new'

                });

            }

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

    .translate-quint {

        &-enter-active,
        &-leave-active {

            transition: .6s cubic-bezier(0.86, 0, 0.07, 1);
            transition-property: opacity, transform;

        }

        &-enter-to,
        &-leave-to {

            transition-delay: .6s;

        }

        &-enter,
        &-leave-active {

            opacity: 0;
            transform: translate3d(0, 5px, 0);

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

        &-leave-active {

            position: absolute;

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

        &__search {

            float: left;

            width: 100%;

            margin-bottom: $theme-padding;

            transition: opacity .2s ease;

            &__loading {

                pointer-events: none;

                opacity: .2;

            }

            &__icon {

                svg {

                    fill: $md-grey-500;

                }

            }

            &__input {

                float: left;

                width: 100%;

                padding: $theme-padding / 2;

                font-family: 'Raleway', sans-serif;
                @include font-sizer(16);
                color: black;

                background: rgba(white, 0);

                border: none;
                outline: none;

            }

            &__empty {

                position: relative;

                float: left;

                width: 100%;

                padding: $theme-padding * 2;

                background: white;

                border-radius: 10px;

                &__icon {

                    $size: 150px;

                    /* */

                    float: left;

                    width: 100%;

                    margin-bottom: $theme-padding;

                    display: flex;
                    justify-content: center;

                    svg {

                        fill: $md-grey-300;

                        width: $size;
                        height: $size;

                    }

                }

                &__title {

                    float: left;

                    width: 100%;

                    margin-bottom: $theme-padding / 2;

                    font-family: 'Raleway', sans-serif;
                    text-align: center;
                    @include font-sizer(24);
                    line-height: 1;
                    color: black;
                    font-weight: 400;

                }

                &__help {

                    float: left;

                    width: 100%;

                    font-family: 'Raleway', sans-serif;
                    text-align: center;
                    @include font-sizer(16);
                    line-height: 1;
                    color: $md-grey-500;
                    font-weight: 400;

                }

            }

        }

        &__row {

            float: left;

            width: 100%;

            padding: 0;
            margin: 0;

            list-style: none;

        }

        &__list {

            position: relative;

            float: left;

            width: 100%;

            padding: $theme-padding;
            margin-bottom: $theme-padding;

            background: white;

            border-radius: 10px;

            box-shadow: 0 25px 100px rgba(black, 0);

            transition-property: transform, box-shadow;
            transition-duration: .2s;
            transition-timing-function: ease;

            &--loading {

                pointer-events: none;

            }

            &:hover {

                @include hardware;

                transform: scale(1.02);

                box-shadow: 0 25px 100px rgba(black, .1);

                z-index: 100;

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

        &__name {

            float: left;

            font-family: 'Raleway', sans-serif;
            @include font-sizer(24);
            line-height: 1;
            color: black;
            font-weight: 400;

            margin-bottom: 5px;

        }

        &__nick {

            float: left;

            font-family: 'Raleway', sans-serif;
            @include font-sizer(14);
            line-height: 1;
            color: $md-grey-500;
            font-weight: 400;

        }

        &__pay {

            float: left;

            width: 100%;

            padding: $theme-padding / 2;

            background: $theme-color-1;

            border-radius: 100px;
            border: none;
            outline: none !important;

            transition: background-color .2s ease;

            cursor: pointer;

            &:hover {

                background-color: darken($theme-color-1, 5%);

            }

            &:active {

                background-color: darken($theme-color-1, 10%);

            }

            &__icon {

                svg {

                    fill: white;

                }

            }

            &__label {

                float: left;

                width: 100%;

                margin-left: 5px;

                font-family: 'Raleway', sans-serif;
                text-transform: uppercase;
                @include font-sizer(12);
                font-weight: 500;
                letter-spacing: 2px;

                color: white;

            }

        }

    }

</style>
