<template>
    <div :class="{'is-active': show}" class="modal ticket-details">
        <div class="modal-background" @click="hide"/>
        <div class="modal-content">
            <div class="header">
                <span class="has-text-weight-bold is-size-5">{{ticket.title}}</span>
                <div class="sub-header">
                    <TicketNumber class="ticket-number" :id="ticket.id"/>
                    <PersonInformation :firstLine="ticket.ownerName" :secondLine="ticket.ownerEmail" imageSrc="https://s.ebiografia.com/assets/img/authors/ta/le/tales-de-mileto-l.jpg"/>
                </div>
            </div>
            <div class="ticket-content">
                <div class="left-content">
                    <ServiceDropdown :triggerValue="ticket.serviceName" :services="services" :isClosed="isClosed" @click="updateServiceId"/>
                    <StatusDropdown :triggerValue="ticket.statusId" :statuses="statuses" :isClosed="isClosed" @click="updateStatusId"/>
                    <SeverityDropdown :triggerValue="ticket.severityId" :severities="severities" :isClosed="isClosed" @click="updateSeverityId"/>
                    <AssignedDropdown :triggerValue="ticket.assignedName" :members="members" :isClosed="isClosed" @click="updateAssignedId"/>
                    <AttachmentList />
                </div>
                <div class="line"/>
                <div class="right-content">
                    <span class="has-text-weight-bold">Descrição</span>
                    <span class="description">{{ticket.description}}</span>
                </div>
            </div>

            <div class="line-divider"> </div>

            <div v-if="!isClosed" class="comment-area-content">
                <Textarea textareaTitle="Comentário" textareaPlaceHolder="seu comentário" @input="setComment" :preValue="comment" :maxLength="300"/>
                <div class="option-buttons">
                    <button class="button is-black is-normal" @click="createComment">Comentar</button>
                </div>
            </div>

            <History :comments="comments"/>
        </div>
    </div>
</template>

<script>
import axios from 'src/axios/axios.js';
import { mapState } from 'vuex';
import TicketNumber from 'shared/TicketNumber.vue';
import PersonInformation from 'shared/PersonInformation.vue';
import Textarea from 'shared/Textarea.vue';
import History from './components/History.vue';
import ServiceDropdown from './components/ServiceDropdown.vue';
import StatusDropdown from './components/StatusDropdown.vue';
import SeverityDropdown from './components/SeverityDropdown.vue';
import AssignedDropdown from './components/AssignedDropdown.vue';
import AttachmentList from './components/AttachmentList.vue';

export default {
    name: 'ticketDetails',
    components: {
        TicketNumber, PersonInformation, Textarea, History, ServiceDropdown, StatusDropdown, SeverityDropdown, AssignedDropdown, AttachmentList
    },
    props: {
        show: { type: Boolean, default: false },
        ticketId: { type: Number, default: null }
    },
    data() {
        return {
            ticket: {
                id: 0,
                ownerName: '',
                ownerEmail: '',
                title: '',
                description: '',
                serviceName: 'Escolha um serviço',
                assignedName: 'Escolha um responsável',
                statusId: 0,
                severityId: 0
            },
            services: [],
            members: [],
            comments: [],
            comment: null,
            statuses: [{ id: 1, value: 'Aberto' }, { id: 2, value: 'Em progresso' }, { id: 3, value: 'Em espera' }, { id: 4, value: 'Resolvido' }],
            severities: [{ id: 1, value: 'Baixa' }, { id: 2, value: 'Média' }, { id: 3, value: 'Alta' }]
        };
    },
    watch: {
        ticketId() {
            this.getTicket();
            this.getServices();
            this.getMembers();
            this.getComments();
        },
    },
    computed: {
        ...mapState({
            id: state => state.user.id
        }),
        isClosed() {
            if (this.ticket.statusId === 4) {
                return true;
            }
            return false;
        }
    },
    methods: {
        getTicket() {
            if (this.ticketId) {
                axios.get(`ticket/id/${this.ticketId}`)
                    .then((response) => {
                        this.ticket = response.data[0]; // eslint-disable-line
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            title: 'Erro!',
                            text: 'Não foi possível obter informações do ticket.',
                            type: 'Error'
                        });
                    });
            }
        },
        getServices() {
            if (this.ticketId) {
                axios.get('service/all/active')
                    .then((response) => {
                        this.services = response.data;
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            title: 'Erro!',
                            text: 'Não foi possível obter a listagem de serviços.',
                            type: 'Error'
                        });
                    });
            }
        },
        getMembers() {
            if (this.ticketId) {
                axios.get('user/support/all')
                    .then((response) => {
                        this.members = response.data;
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            title: 'Erro!',
                            text: 'Não foi possível obter a listagem de membros.',
                            type: 'Error'
                        });
                    });
            }
        },
        getComments() {
            if (this.ticketId) {
                axios.get(`comment/all/${this.ticketId}`)
                    .then((response) => {
                        this.comments = response.data;
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            title: 'Erro!',
                            text: 'Não foi possível obter a listagem de comentários.',
                            type: 'Error'
                        });
                    });
            }
        },
        updateServiceId(serviceId) {
            axios.put('ticket/update/service', { ticketId: this.ticketId, serviceId })
                .then(() => {
                    this.getTicket();
                })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Não foi possível alterar o serviço.',
                        type: 'error'
                    });
                });
        },
        updateAssignedId(assignedId) {
            axios.put('ticket/update/assigned', { ticketId: this.ticketId, assignedId })
                .then(() => {
                    this.getTicket();
                })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Não foi possível alterar o responsável.',
                        type: 'error'
                    });
                });
        },
        updateStatusId(statusId) {
            axios.put('ticket/update/status', { ticketId: this.ticketId, statusId })
                .then(() => {
                    this.getTicket();
                })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Não foi possível alterar o status.',
                        type: 'error'
                    });
                });
        },
        updateSeverityId(severityId) {
            axios.put('ticket/update/severity', { ticketId: this.ticketId, severityId })
                .then(() => {
                    this.getTicket();
                })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Não foi possível alterar a severidade.',
                        type: 'error'
                    });
                });
        },
        setComment(value) {
            this.comment = value;
        },
        createComment() {
            axios.post('comment/new', { ticketId: this.ticketId, userId: this.id, commentText: this.comment })
                .then((response) => {
                    if (response.data.errors) {
                        this.$notify({
                            group: 'foo',
                            title: 'Cuidado!',
                            text: response.data.errors[0].message,
                            type: 'warn'
                        });
                    } else if (response) {
                        this.getTicket();
                        this.$notify({
                            group: 'foo',
                            title: 'Sucesso!',
                            text: 'Comentário adicionado.',
                            type: 'success'
                        });
                        this.comment = '';
                        this.getComments();
                    } else {
                        throw 'Aconteceu algum erro, contate o adminstrador.'; // eslint-disable-line
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
        hide() {
            this.$emit('hide');
        },
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.modal.ticket-details {
    .modal-background {
        background-color: rgba(76, 76, 76, 0.5);
    }

    .modal-content {
        width: 70%;
        padding: 1.25rem;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        background-color: white;
        filter: drop-shadow(0 0 5px $black);

        .header {
            display: flex;
            flex-direction: column;
            align-items: flex-start;
            margin-bottom: 1rem;

            .sub-header {
                display: flex;
                justify-content: center;
                align-items: center;
                margin-top: .5rem;
            }

            .ticket-number {
                margin-right: .9rem;
                min-width: 30px;
            }
        }

        .ticket-content {
            width: 100%;
            display: flex;
            justify-content: space-between;
            margin-bottom: 1rem;

            .left-content {
                display: flex;
                flex-direction: column;
                width: 30%;
            }

            .line {
                border-left: 2px solid $gray;
                height: inherit;
            }

            .right-content {
                width: 65%;
                display: flex;
                flex-direction: column;

                .description {
                    word-break: break-all;
                }
            }
        }

        .line-divider {
            border-bottom: 4px solid $black;
            width: 100%;
            margin-bottom: 1rem;
        }

        .comment-area-content {
            width: 100%;
            display: flex;
            margin-bottom: 1rem;

            .option-buttons {
                display: flex;
                flex-direction: column;
                justify-content: flex-end;
                margin-left: 1rem;
            }
        }
    }
}
</style>
