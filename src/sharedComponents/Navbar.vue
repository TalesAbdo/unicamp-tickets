<template>
<div>
    <nav v-if="name && email" class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <span class="navbar-item">
                <img src="@/assets/Logo.svg">
            </span>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">

            <div v-if="isSupport" class="navbar-start">
                <a :class="verifyRoute('Tickets')" class="navbar-item" href="/#/home">
                    Tickets
                </a>
                <a :class="verifyRoute('Services')" class="navbar-item" href="/#/services">
                    Serviços
                </a>
                <a :class="verifyRoute('Members')" class="navbar-item" href="/#/members">
                    Membros
                </a>
                <a :class="verifyRoute('Metrics')" class="navbar-item" href="/#/metrics">
                    Métricas
                </a>
            </div>

            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link is-arrowless">
                        <UserImage :imagePath="image"/>
                        {{firstName}}
                    </a>

                    <div class="navbar-dropdown is-right has-text-right">
                        <span class="navbar-item is-flex">
                            <span class="has-text-weight-bold">
                                {{name}}
                            </span>
                            <span class="is-italic">
                                {{email}}
                            </span>
                        </span>

                        <hr class="navbar-divider">

                        <a class="navbar-item has-text-link"  @click="modalControl">
                            <span class="icon"><i class="fas fa-cog"/></span>
                            <span>Minha conta</span>
                        </a>
                        <!-- <a class="navbar-item has-text-link">
                            <span class="icon"><i class="fas fa-question"/></span>
                            <span>Como abrir um ticket?</span>
                        </a> -->
                        <a class="navbar-item has-text-link" @click="logout">
                            <span class="icon"><i class="fas fa-sign-out-alt"/></span>
                            <span>Sair</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
    <UserControl :show="showUserControl" button-text="Modificar Conta" @hide="modalControl" />
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import UserControl from 'modal/UserControl/UserControl.vue';
import UserImage from './UserImage.vue';

export default {
    name: 'navbar',
    components: {
        UserControl, UserImage
    },
    data() {
        return {
            showUserControl: false,
        };
    },
    computed: {
        ...mapState({
            name: state => state.user.name,
            email: state => state.user.email,
            isSupport: state => state.user.isSupport,
            image: state => state.user.image
        }),
        firstName() {
            return this.name.split(' ')[0];
        },
    },
    mounted() {
    },
    methods: {
        ...mapActions({
            setUserData: 'user/setData'
        }),
        verifyRoute(routeName) {
            if (routeName === this.$route.name) {
                return 'is-actual-page';
            }
            return '';
        },
        logout() {
            this.setUserData({
                id: null,
                name: null,
                email: null,
                password: null,
                isSupport: false,
                image: null,
            });
            window.location.href = '/#/';
        },
        modalControl() {
            this.showUserControl = !this.showUserControl;
        },
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.navbar {
    box-shadow: 5px 0 20px $dark-gray;
    margin-bottom: 1.5rem;

    .navbar-start {
        .navbar-item {
            font-weight: 700;
            border-bottom: 3px solid transparent;
            transition: .3s;

            &.is-actual-page {
                border-bottom: 3px solid $white;
                transition: .3s;
            }
        }
    }

    .image {
        margin-right: 0.35rem;
        width: 30px;
    }

    .navbar-link {
        padding-right: 2rem;
    }

    .navbar-dropdown {
        padding-bottom: 0;

        .is-flex {
            flex-direction: column;
            padding-top: 0rem !important;
            padding-left: 1.35rem;
        }

        .navbar-divider {
            margin: 0 !important;
        }

        a {
            text-align: right !important;
            position: relative;
            padding: 0.5rem 1rem;

            .icon {
                margin-right: .1rem;
            }
        }
    }
}
</style>
