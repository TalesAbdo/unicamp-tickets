<template>
    <div :class="{'is-active': show}" class="modal service-control">
        <div class="modal-background" @click="hide"></div>
        <form class="modal-content" autocomplete="off">
            <Title :titleValue="modalInformation.titleText" class="header-text"/>
            <Input class="margin-rem" inputTitle="Nome" inputPlaceHolder="o nome"/>
            <Textarea class="margin-rem" textareaTitle="Descrição" textareaPlaceHolder="a descrição" />
            <div class="footer-buttons">
                <button type="button" class="button is-black">{{modalInformation.buttonText}}</button>
                <button type="button" class="button is-danger is-inverted">Remover Serviço</button>
            </div>
        </form>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import Title from 'shared/Title.vue';
import Input from 'shared/Input.vue';
import Textarea from 'shared/Textarea.vue';

export default {
    name: 'newTicket',
    components: {
        Title, Input, Textarea
    },
    props: {
        show: { type: Boolean, default: false },
        modalInformation: { type: Object, required: false }

    },
    data() {
        return {
        };
    },
    methods: {
        hide() {
            this.$emit('hide');
        },
    }
};
</script>

<style lang="scss" scoped>
@import '~src/css/main.scss';

.modal.service-control {
    .modal-background {
        background-color: rgba(76, 76, 76, 0.5);
    }

    .modal-content {
        width: 55%;
        padding: 1.25rem;
        display: flex;
        align-items: center;
        flex-direction: column;
        background-color: $white;
        filter: drop-shadow(0 0 5px $black);

        .header-text {
            margin-bottom: 1rem;
            cursor: default;
            width: fit-content;
        }

        .margin-rem {
            margin-bottom: 1.25rem;
        }

        .footer-buttons {
            display: flex;
            flex-direction: column;
            width: 100%;
            justify-content: flex-end;
            align-items: flex-end;

            .is-danger {
                margin-top: .5rem;
            }
        }
    }
}
</style>
