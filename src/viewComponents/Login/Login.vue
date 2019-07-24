<template>
    <div class="login-container">
        <form class="form-container" autocomplete="off">
            <img class="image" src="@/assets/Login_Logo.svg">
            <Input class="margin-1rem" inputTitle="Email" inputPlaceHolder="seu email"  @input="setEmail" :preValue="user.email"/>
            <Input class="margin-1rem" inputTitle="Senha" inputPlaceHolder="sua senha" type="password" @input="setPassword" :preValue="user.password"/>

            <button type="button" class="button is-black is-normal margin-1rem" @click="loginIntoApplication">Conectar</button>

            <button type="button" @click="modalControl" class="link-button">Não tem uma conta? Clique Aqui</button>
            <!-- <button type="button" class="link-button">Recuperar senha</button> -->
        </form>
         <UserControl :show="showUserControl" button-text="Criar conta" @hide="modalControl" />
    </div>
</template>

<script>
import { mapActions } from 'vuex';
import Input from 'shared/Input.vue';
import UserControl from 'modal/UserControl/UserControl.vue';

const axios = require('axios');

export default {
    name: 'login',
    components: {
        Input, UserControl
    },
    data() {
        return {
            showUserControl: false,
            user: {
                email: null,
                password: null,
            }
        };
    },
    methods: {
        ...mapActions({
            setUserData: 'user/setData'
        }),
        modalControl() {
            this.showUserControl = !this.showUserControl;
        },
        setEmail(value) {
            this.user.email = value;
        },
        setPassword(value) {
            this.user.password = value;
        },
        loginIntoApplication() {
            if (this.user.email && this.user.password) {
                axios.post('/api/user/byemailandpassword', { ...this.user })
                    .then((response) => {
                        if (!response.data) {
                            this.$notify({
                                group: 'foo',
                                title: 'Atenção!',
                                text: 'Email ou senha inválidos.',
                                type: 'warn'
                            });
                        } else {
                            axios.get(`/api/usersupport/id/${response.data.id}`)
                                .then((result) => {
                                    if (result.data) {
                                        this.setUserData({ ...response.data, isSupport: true });
                                        window.location.href = '/#/tickets';
                                    } else {
                                        this.setUserData({ ...response.data });
                                        window.location.href = '/#/home';
                                    }
                                });
                        }
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            title: 'Erro!',
                            text: 'Erro ao tentar se autenticar na aplicação.',
                            type: 'error'
                        });
                    });
            } else {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'Preencha o email e a senha.',
                    type: 'warn'
                });
            }
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
