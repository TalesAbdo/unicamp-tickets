<template>
    <div :class="{'is-active': show}" class="modal new-ticket">
        <div class="modal-background" @click="hide"></div>
        <form class="modal-content" autocomplete="off">
            <Title titleValue="Novo Ticket" class="header-text"/>
            <Input class="margin-rem" inputTitle="Assunto" inputPlaceHolder="o assunto" @typed="titleTyped" v-model="ticket.title"/>
            <Textarea class="margin-rem" textareaTitle="Descrição" textareaPlaceHolder="a descrição" v-model="ticket.description"/>

            <Service class = "margin-rem" v-model="ticket.serviceId"/>

            <div class="severity-buttons-container">
                <span class="has-text-weight-bold">Severidade</span>
                <div class="buttons has-addons">
                    <span :class="{'is-success is-selected': activeSevButton === 0}" class="button" @click="severityControl(0)">Baixa</span>
                    <span :class="{'is-warning is-selected': activeSevButton === 1}" class="button" @click="severityControl(1)">Média</span>
                    <span :class="{'is-danger is-selected': activeSevButton === 2}" class="button" @click="severityControl(2)">Alta</span>
                </div>
            </div>

            <div class="footer-container">
                <div class="attachment-container">
                    <div class="attachment-content">
                        <span class="attachment-title">Anexos</span>
                        <FileButton />
                    </div>
                    <div class="attachment-list">
                        <span><i class="fas fa-trash" /> Arquivo1.ssv</span>
                        <span><i class="fas fa-trash" /> Arquivo1.ssv</span>
                    </div>
                </div>
                <button type="button" class="button is-black is-normal" @click="createTicket">Abrir Ticket</button>
            </div>
        </form>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import Title from 'shared/Title.vue';
import Input from 'shared/Input.vue';
import Textarea from 'shared/Textarea.vue';
import FileButton from 'shared/FileButton.vue';
import Service from './components/ServiceDropdown.vue';

const axios = require('axios');

export default {
    name: 'newTicket',
    components: {
        Title, Input, Textarea, FileButton, Service
    },
    props: {
        show: { type: Boolean, default: false },
    },
    data() {
        return {
            activeSevButton: null,
            ticket: {
                title: null,
                description: null,
                serviceId: null,
                severityId: null,
            }
        };
    },
    methods: {
        severityControl(value) {
            this.activeSevButton = value;
        },
        hide() {
            this.$emit('hide');
        },
        createTicket() {
            axios.post('api/ticket/new',
                {
                    assignedId: null,
                    ownerId: 1,
                    serviceId: this.ticket.serviceId,
                    title: this.ticket.title,
                    description: this.ticket.description,
                    severityId: this.ticket.severityId,
                    statusId: 3,
                }).then((response) => {
            });
        }
    }
};
</script>

<style lang="scss" scoped>
@import '~src/css/main.scss';

.modal.new-ticket {
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

        .severity-buttons-container {
            display: flex;
            align-items: center;
            justify-content: center;
            align-self: flex-start;
            margin-bottom: 1.75rem;

            .has-text-weight-bold {
                margin-top: .4rem;
                margin-right: .5rem;
                user-select: none;
            }

            .button {
                margin-top: 0;
                margin-bottom: 0;
                border: 1px solid $primary !important;
            }
        }

        .footer-container {
            display: flex;
            width: 100%;
            justify-content: space-between;

            .attachment-container {
                align-self: flex-start;
                display: flex;
                justify-content: center;
                align-items: flex-start;

                .attachment-content {
                    display: flex;
                    align-items: center;

                    .attachment-title {
                        font-weight: bold;
                        line-height: 20px !important;
                        display: block;
                        color: $black;
                        cursor: default;
                        user-select: none;
                        margin-right: 1rem;
                    }

                    .button {
                        margin-top: 0 !important;
                        border: 1px solid $primary;
                        &:hover {
                            background-color: $warmer-white !important;
                        }
                    }
                }

                .attachment-list {
                    margin-left: 1rem;
                    display: flex;
                    flex-direction: column;
                }
            }

            .button.is-black {
                margin-top: 0;
                align-self: flex-end;
            }
        }
    }
}
</style>
