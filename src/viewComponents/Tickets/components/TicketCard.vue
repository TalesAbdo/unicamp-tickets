<template>
    <div class="card" @click="onClick">
    <header class="card-header">
        <TicketNumber :id="123124" />
        <p class="card-header-title">
            {{ticket.title}}
        </p>
    </header>

    <footer class="card-footer">
        <div v-if="ticket.hasAttachment" class="attachment-icon">
            <i class="fas fa-paperclip"></i>
        </div>
        <div class="card-footer-item">
            <i :class="statusIcon" class="icon"/>
            <span>{{statusName}}</span>
        </div>
        <div class="card-footer-item">
            <i :class="severityIcon" class="icon fas fa-exclamation-triangle"/>
            <span>{{severityName}}</span>
        </div>

        <div class="card-footer-item">
            <figure class="icon image is-24x24">
                <img class="is-rounded" :src="ticket.assignedPhoto">
            </figure>
            <span>{{ticket.assignedId}}</span>
        </div>
        <span class="card-footer-item">{{creationDate}}</span>
    </footer>
    </div>
</template>

<script>
import moment from 'moment';
import TicketNumber from 'shared/TicketNumber.vue';

export default {
    name: 'ticketCard',
    components: {
        TicketNumber
    },
    props: {
        ticket: { type: Object, required: true },
    },
    data() {
        return {
            creationDate: moment(this.ticket.creationDate, 'DDMMYYYY').fromNow(),
        };
    },
    computed: {
        statusIcon() {
            switch (this.ticket.status) {
            case 1: return 'fas fa-circle-notch';
            case 2: return 'fas fa-thumbs-up';
            case 3: return 'fas fa-check-circle';
            case 4: return 'fas fa-anchor';
            case 5: return 'fas fa-ban';
            default: return null;
            }
        },
        statusName() {
            switch (this.ticket.status) {
            case 1: return 'Aberto';
            case 2: return 'Em progresso';
            case 3: return 'Resolvido';
            case 4: return 'Em espera';
            case 5: return 'Fechado';
            default: return null;
            }
        },
        severityIcon() {
            switch (this.ticket.severity) {
            case 1: return 'has-text-success';
            case 2: return 'has-text-warning';
            case 3: return 'has-text-danger';
            default: return null;
            }
        },
        severityName() {
            switch (this.ticket.severity) {
            case 1: return 'Baixa';
            case 2: return 'Média';
            case 3: return 'Alta';
            default: return null;
            }
        },
    },
    methods: {
        onClick() {
            this.$emit('modalControl', 'ticketDetails');
        },
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.card {
    box-shadow: 0px 0px 12px $gray !important;
    border: none !important;
    border-radius: 2px;
    margin: 1.5rem 0;
    background-color: $warm-white !important;
    transition: .3s;

    &:hover {
        cursor: pointer;
        transform: scale(1.05);
        transition: .3s;
    }

    .card-header {
        display: flex;
        align-items: center;
        padding-left: .75rem;
    }

    .card-footer {
        border: none !important;

        .attachment-icon {
            padding: .5rem 1rem;
            display: flex;
            align-items: center;
            border-right: 1px solid $light-gray;
        }

        .card-footer-item {
            padding: .5rem !important;
            border: none !important;

            .icon {
                margin-right: .35rem;
            }
        }
    }
}
</style>
