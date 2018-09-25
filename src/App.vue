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

                                <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M15.5 14h-.79l-.28-.27c1.2-1.4 1.82-3.31 1.48-5.34-.47-2.78-2.79-5-5.59-5.34-4.23-.52-7.79 3.04-7.27 7.27.34 2.8 2.56 5.12 5.34 5.59 2.03.34 3.94-.28 5.34-1.48l.27.28v.79l4.25 4.25c.41.41 1.08.41 1.49 0 .41-.41.41-1.08 0-1.49L15.5 14zm-6 0C7.01 14 5 11.99 5 9.5S7.01 5 9.5 5 14 7.01 14 9.5 11.99 14 9.5 14z"/></svg>

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

                                        <button type="button" :class="$style.usersPay" v-on:click="payment(user)">

                                            <div class="row align-items-center no-gutters">

                                                <div class="col-auto">

                                                    <div :class="$style.usersPayIcon">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><path d="M11.8 10.9c-2.27-.59-3-1.2-3-2.15 0-1.09 1.01-1.85 2.7-1.85 1.42 0 2.13.54 2.39 1.4.12.4.45.7.87.7h.3c.66 0 1.13-.65.9-1.27-.42-1.18-1.4-2.16-2.96-2.54V4.5c0-.83-.67-1.5-1.5-1.5S10 3.67 10 4.5v.66c-1.94.42-3.5 1.68-3.5 3.61 0 2.31 1.91 3.46 4.7 4.13 2.5.6 3 1.48 3 2.41 0 .69-.49 1.79-2.7 1.79-1.65 0-2.5-.59-2.83-1.43-.15-.39-.49-.67-.9-.67h-.28c-.67 0-1.14.68-.89 1.3.57 1.39 1.9 2.21 3.4 2.53v.67c0 .83.67 1.5 1.5 1.5s1.5-.67 1.5-1.5v-.65c1.95-.37 3.5-1.5 3.5-3.55 0-2.84-2.43-3.81-4.7-4.4z"/></svg>

                                                    </div>

                                                </div>

                                                <div class="col">

                                                    <div :class="$style.usersPayLabel">Pagar</div>

                                                </div>

                                                <div class="col-auto">

                                                    <div :class="$style.usersPayIcon">

                                                        <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path d="M9.29 15.88L13.17 12 9.29 8.12c-.39-.39-.39-1.02 0-1.41.39-.39 1.02-.39 1.41 0l4.59 4.59c.39.39.39 1.02 0 1.41L10.7 17.3c-.39.39-1.02.39-1.41 0-.38-.39-.39-1.03 0-1.42z"/></svg>

                                                    </div>

                                                </div>

                                            </div>

                                        </button>

                                    </div>

                                </div>

                            </li>

                        </ul>

                    </div>

                    <div v-else-if="!usersLoading && !users.length" :class="$style.usersSearchEmpty"key="empty">

                        <div :class="$style.usersSearchEmptyIcon">

                            <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="none" d="M0 0h24v24H0V0z"/><circle cx="15.5" cy="9.5" r="1.5"/><circle cx="8.5" cy="9.5" r="1.5"/><path d="M11.99 2C6.47 2 2 6.48 2 12s4.47 10 9.99 10C17.52 22 22 17.52 22 12S17.52 2 11.99 2zM12 20c-4.42 0-8-3.58-8-8s3.58-8 8-8 8 3.58 8 8-3.58 8-8 8zm0-6c-1.9 0-3.63.97-4.65 2.58-.22.35-.11.81.24 1.03.35.22.81.11 1.03-.24.74-1.18 2-1.88 3.38-1.88s2.64.7 3.38 1.88c.14.23.39.35.64.35.14 0 .27-.04.4-.11.35-.22.46-.68.24-1.03C15.63 14.96 13.9 14 12 14z"/></svg>

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

        <app-modal :active="this.$route.fullPath !== '/'">

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

    import AppHeader from '@/components/AppHeader.vue';
    import AppModal from '@/components/AppModal.vue';

    /* */

    export default {

        components : {

            AppHeader,
            AppModal

        },

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

            payment(user){

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

            transition: .6s cubic-bezier(0.86, 0, 0.07, 1) !important;
            transition-property: opacity, transform !important;

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
