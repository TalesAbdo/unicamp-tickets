<template>
    <div class="login-container">
        <form class="form-container" autocomplete="off">
            <img class="image" src="@/assets/Logo.svg">
            <Input class="margin-1rem" inputTitle="Email" inputPlaceHolder="seu email"/>
            <Input class="margin-1rem" inputTitle="Nome" inputPlaceHolder="seu nome"/>

                <button class="button is-black is-normal margin-1rem" @click="loginIntoApplication">Conectar</button>

            <button type="button" @click="modalControl" class="link-button">Não tem uma conta? Clique Aqui</button>
            <button type="button" class="link-button">Recuperar senha</button>
        </form>
         <UserControl :show="showUserControl" button-text="Criar conta" @hide="modalControl" />
    </div>
</template>

<script>
import Input from 'shared/Input.vue';
import UserControl from 'modal/UserControl/UserControl.vue';

export default {
    name: 'login',
    components: {
        Input, UserControl
    },
    data() {
        return {
            showUserControl: false
        };
    },
    methods: {
        modalControl() {
            this.showUserControl = !this.showUserControl;
        },
        loginIntoApplication() {
            window.location.href = '/#/home';
        }
    }
};
</script>


<style lang="scss">
@import '~src/css/main.scss';

.login-container {
    width: 100%;
    height: 100vh;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: $light-gray;

    .form-container {
        width: 25%;
        display: flex;
        flex-direction: column;
        align-items: center;

        .image {
            margin-bottom: 2rem;
        }

        .margin-1rem {
            margin: 1rem 0rem;
        }

        .button {
            width: fit-content;
            padding-left: 1rem;
            padding-right: 1rem;
            margin-bottom: 4rem;
        }

        .link-button {
            border: none;
            padding: 0.25rem;
            font-size: 0.7rem;
            align-self: flex-end;
            color: $link;
            background-color: transparent;

            &:hover {
                cursor: pointer;
            }
        }
    }
}
</style>
