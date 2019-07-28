<template>
    <div :class="{'is-active': show}" class="modal user-control">

        <div class="modal-background" @click="hide"></div>
        <form class="modal-content" autocomplete="off">
                    {{user}}
            <h1 class="header-text">Insira suas informações para {{modalType}} sua conta!</h1>
            <Input  v-if="modalType !== 'modificar'" class="margin-1rem" inputTitle="Email (obrigatório)" inputPlaceHolder="seu email" @input="setEmail" :preValue="user.email" :maxLength="50"/>
            <Input class="margin-1rem" inputTitle="Nome (obrigatório)" inputPlaceHolder="seu nome" @input="setName" :preValue="user.name" :maxLength="80"/>
            <Input v-if="modalType === 'modificar'" class="margin-1rem" inputTitle="Nova Senha (opcional)"
                    inputPlaceHolder="sua senha caso queira alterá-la" type="password"
                    @input="setNewPassword"  :maxLength="20"/>
            <Input class="margin-1rem" inputTitle="Senha (obrigatório)" inputPlaceHolder="sua senha" type="password" @input="setPassword" :maxLength="20"/>

            <div class="user-image margin-1rem">
                <span class="title">Imagem</span>
                <img class="image" src="@/assets/Logo.svg">
            </div>

            <button type="button" class="button is-black is-normal" @click="userAction">{{buttonText}}</button>
        </form>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Input from 'shared/Input.vue';

const axios = require('axios');

export default {
    name: 'userControl',
    components: {
        Input
    },
    props: {
        show: { type: Boolean, default: false },
        buttonText: { type: String, required: true, default: '' },
    },
    data() {
        return {
            modalType: this.buttonText === 'Criar conta' ? 'criar' : 'modificar',
            user: {
                id: null,
                email: null,
                name: null,
                password: null,
                newPassword: null,
                isSupport: false,
                image: null
            }
        };
    },
    computed: {
        ...mapState({
            id: state => state.user.id,
            name: state => state.user.name,
            email: state => state.user.email,
            password: state => state.user.password,
        }),
    },
    watch: {
        show() {
            if (this.buttonText === 'Modificar Conta') {
                this.user.id = this.id;
                this.user.name = this.name;
                this.user.email = this.email;
                this.user.password = this.password;
                this.newPassword = null;
            }
        }
    },
    methods: {
        ...mapActions({
            setUserData: 'user/setData'
        }),
        hide() {
            this.$emit('hide');
        },
        setEmail(value) {
            this.user.email = value;
        },
        setName(value) {
            this.user.name = value;
        },
        setPassword(value) {
            this.user.password = value;
        },
        setNewPassword(value) {
            this.user.newPassword = value;
        },
        userAction() {
            if (this.modalType === 'criar') {
                this.createUser();
            } else {
                this.updateUser();
            }
        },
        createUser() {
            let text = 'Não foi possível criar sua conta. Provavelmente este email já está em uso';
            if (this.user.email && this.user.name && this.user.password) {
                axios.post('api/user/new', { ...this.user })
                    .then((response) => {
                        if (response.data[1]) {
                            this.$notify({
                                group: 'foo',
                                title: 'Sucesso!',
                                text: 'Conta criada.',
                                type: 'success'
                            });
                            this.user.email = null;
                            this.user.name = null;
                            this.user.password = null;
                            this.hide();
                        } else {
                            text = 'Email já em uso';
                        }
                    }).catch(() => {
                        this.$notify({
                            group: 'foo',
                            title: 'Erro!',
                            text,
                            type: 'error'
                        });
                    });
            } else {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'Preencha todas as informações para criar uma conta.',
                    type: 'warn'
                });
            }
        },
        updateUser() {
            if (this.user.name && this.user.password) {
                if (this.user.password === this.password) {
                    axios.put('api/user/update', { ...this.user })
                        .then((response) => {
                            if (response) {
                                this.$notify({
                                    group: 'foo',
                                    title: 'Sucesso!',
                                    text: 'Conta atualizada.',
                                    type: 'success'
                                });
                                this.setUserData(JSON.parse(response.config.data));
                                this.user.name = null;
                                this.user.password = null;
                                this.user.newPassword = null;
                                this.hide();
                            } else {
                            throw error; // eslint-disable-line
                            }
                        }).catch(() => {
                            this.$notify({
                                group: 'foo',
                                title: 'Erro!',
                                text: 'Aconteceu algum erro',
                                type: 'error'
                            });
                        });
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'Atenção!',
                        text: 'Senha incorreta.',
                        type: 'warn'
                    });
                }
            } else {
                this.$notify({
                    group: 'foo',
                    title: 'Atenção!',
                    text: 'Preencha todas as informações para alterar a conta.',
                    type: 'warn'
                });
            }
        }
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.modal.user-control{
    .modal-background{
        background-color: rgba(76, 76, 76, 0.5);
    }

    .modal-content {
        width: 40%;
        padding: 1.25rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: white;
        filter: drop-shadow(0 0 5px $black);

        .header-text {
            margin-bottom: 1rem;
            cursor: default;
        }

        .margin-1rem {
            margin: .75rem 0rem;
        }

        .user-image {
            display: flex;
            flex-direction: column;
            align-self: flex-start;

            .title {
                margin: 0;
                display: block;
                font-size: 18px;
                line-height: 20px !important;
                color: $black;
                font-weight: bold;
                cursor: default;
            }

            .image {
                margin-top: 8px;
                margin-left: 8px;
                height: 120px;
                width: 120px;
                border: 1.1px $primary solid;
                border-radius: 4px;
            }
        }

        .button {
            margin-top: 0.75rem;
        }
    }
}
</style>
