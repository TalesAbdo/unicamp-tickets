<template>
    <nav class="navbar is-primary" role="navigation" aria-label="main navigation">
        <div class="navbar-brand">
            <span class="navbar-item">
                <img src="@/assets/Logo.svg" width="20" height="28">
            </span>

            <a role="button" class="navbar-burger burger" aria-label="menu" aria-expanded="false" data-target="navbarBasicExample">
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            <span aria-hidden="true"></span>
            </a>
        </div>

        <div id="navbarBasicExample" class="navbar-menu">
            <div class="navbar-end">
                <div class="navbar-item has-dropdown is-hoverable">
                    <a class="navbar-link is-arrowless">
                        <figure class="image is-32x32">
                            <img class="is-rounded" src="https://bulma.io/images/placeholders/128x128.png">
                        </figure>
                        Tales
                    </a>

                    <div class="navbar-dropdown is-right has-text-right">
                        <span class="navbar-item is-flex">
                            <span class="has-text-weight-bold">
                                Tales Abdo dos Santos
                            </span>
                            <span class="is-italic">
                                talesabdo@hotmail.com
                            </span>
                        </span>

                        <hr class="navbar-divider">

                        <a class="navbar-item has-text-link">
                            <span class="icon"><i class="fas fa-cog"/></span>
                            <span>Alterar Informações da conta</span>
                        </a>
                        <a class="navbar-item has-text-link">
                            <span class="icon"><i class="fas fa-question"/></span>
                            <span>Como abrir um ticket?</span>
                        </a>
                        <a class="navbar-item has-text-link">
                            <span class="icon"><i class="fas fa-sign-out-alt"/></span>
                            <span>Sair</span>
                        </a>
                    </div>
                </div>
            </div>
        </div>
    </nav>
</template>

<script>
export default {
    name: 'navbar',
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.navbar {
    box-shadow: 5px 0 20px $dark-gray;

    .image {
        margin-right: 0.35rem;
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
