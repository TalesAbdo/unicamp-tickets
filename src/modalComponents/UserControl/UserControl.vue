<template>
    <div :class="{'is-active': show}" class="modal user-control">
        <div class="modal-background" @click="hide"></div>
        <form class="modal-content" autocomplete="off">
            <h1 class="header-text">Insira suas informações para criar sua conta!</h1>

            <Input class="margin-1rem" inputTitle="Email" inputPlaceHolder="seu email"/>
            <Input class="margin-1rem" inputTitle="Nome" inputPlaceHolder="seu nome"/>
            <Input v-if="modalType === 'modifyUser'" class="margin-1rem" inputTitle="Nova Senha" inputPlaceHolder="sua senha caso queira alterá-la"/>
            <Input class="margin-1rem" inputTitle="Senha" inputPlaceHolder="sua senha"/>

            <div class="user-image margin-1rem">
                <span class="title">Imagem</span>
                <img class="image" src="@/assets/Logo.svg">
            </div>

            <button class="button is-black is-normal">{{buttonText}}</button>
        </form>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import Input from 'shared/Input.vue';

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
            modalType: this.buttonText === 'Criar conta' ? 'newUser' : 'modifyUser'
        };
    },
    methods: {
        hide() {
            this.$emit('hide');
        },
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
        width: 30%;
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
