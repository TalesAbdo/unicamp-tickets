<template>
    <div :class="{'is-active': show}" class="modal user-control">

        <div class="modal-background" @click="hide"></div>
        <form class="modal-content" autocomplete="off">
            <h1 class="header-text">Insira suas informações para {{modalType}} sua conta!</h1>
            <Input  v-if="modalType !== 'modificar'" class="margin-1rem" inputTitle="Email (obrigatório)" inputPlaceHolder="seu email" @input="setEmail" :preValue="user.email" :maxLength="50"/>
            <Input class="margin-1rem" inputTitle="Nome (obrigatório)" inputPlaceHolder="seu nome" @input="setName" :preValue="user.name" :maxLength="80"/>
            <Input v-if="modalType === 'modificar'" class="margin-1rem" inputTitle="Nova Senha (opcional)"
                    inputPlaceHolder="sua senha caso queira alterá-la" type="password" :preValue="user.newPassword"
                    @input="setNewPassword" :maxLength="20"/>
            <Input class="margin-1rem" inputTitle="Senha (obrigatório)" inputPlaceHolder="sua senha" type="password" @input="setPassword" :preValue="user.password" :maxLength="20"/>

            <div v-if="modalType === 'modificar'" class="user-image margin-1rem">
                <span class="title">Imagem</span>
                <FileInput @change="addImage"/>
                <span class="image-warning">Insira um email para habilitar a inserção de imagem</span>
            </div>

            <button type="button" class="button is-black is-normal" @click="userAction">{{buttonText}}</button>
        </form>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import { mapActions, mapState } from 'vuex';
import Input from 'shared/Input.vue';
import axios from 'src/axios/axios.js';
import FileInput from './components/FileInput.vue';

export default {
    name: 'userControl',
    components: {
        Input, FileInput
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
            },
            imageFile: null
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
        setImage(value) {
            this.user.image = value;
        },
        userAction() {
            if (this.modalType === 'criar') {
                this.createUser();
            } else {
                this.updateUser();
            }
        },
        createUser() {
            axios.post('user/new', { ...this.user })
                .then((response) => {
                    if (response.data.errors) {
                        this.$notify({
                            group: 'foo',
                            title: 'Cuidado!',
                            text: response.data.errors[0].message,
                            type: 'warn'
                        });
                    } else if (response.data[1]) {
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
                        throw 'Email já em uso'; // eslint-disable-line
                    }
                }).catch((err) => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: err,
                        type: 'error'
                    });
                });
        },
        async updateUser() {
            if (this.user.password === this.password) {
                await axios.put('user/update', { ...this.user })
                    .then((response) => {
                        if (response.data.errors) {
                            this.$notify({
                                group: 'foo',
                                title: 'Cuidado!',
                                text: response.data.errors[0].message,
                                type: 'warn'
                            });
                        } else if (response) {
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
                            this.user.image = null;
                            this.hide();
                        }
                    });
                await axios.put('user/image', { email: this.email, image: this.imageFile })
                    .then((response) => {
                        if (response.data.errors) {
                            this.$notify({
                                group: 'foo',
                                title: 'Cuidado!',
                                text: response.data.errors[0].message,
                                type: 'warn'
                            });
                        }
                    });
            } else {
                this.$notify({
                    group: 'foo',
                    title: 'Atenção!',
                    text: 'Senha incorreta.',
                    type: 'warn'
                });
            }
        },
        addImage(image) {
            if (image && image.size >= '10485760') {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'O arquivo ultrapassa 10mb.',
                    type: 'warn'
                });
            } else if (image && image.type.split('/')[0] === 'image') {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'Insira uma imagem.',
                    type: 'warn'
                });
            } else {
                // this.imageFile =
                axios.put('user/image', { email: this.user.email, image })
                    .then((response) => {
                        if (response) {
                            this.user.image = true;
                        } else if (response) {
                            this.$notify({
                                group: 'foo',
                                title: 'Erro!',
                                text: 'Erro ao inserir imagem.',
                                type: 'error'
                            });
                            this.user.image = false;
                        }
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

            .image-warning {
                color: red;
                font-size: 12px;
            }
        }

        .button {
            margin-top: 0.75rem;
        }
    }
}
</style>
