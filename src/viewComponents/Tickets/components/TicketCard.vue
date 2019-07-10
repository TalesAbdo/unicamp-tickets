<template>
    <div class="card" @click="onClick">
    <header class="card-header">
        <TicketNumber :id="ticket.id" />
        <p class="card-header-title">
            {{ticket.title}}
        </p>
    </header>

    <footer class="card-footer">
        <div v-if="ticket.hasAttachment" class="attachment-icon">
            <i class="fas fa-paperclip"></i>
        </div>
        <div class="card-footer-item">
            <icon class="icon" :name="statusIcon"/>
            <span>{{statusName}}</span>
        </div>
        <div class="card-footer-item">
            <icon class="icon" :class="severityIcon" name="exclamation-triangle"/>
            <span>{{severityName}}</span>
        </div>

        <div class="card-footer-item">
            <figure v-if="ticket.assignedName" class="icon image is-24x24">
                <img class="is-rounded" src="https://s.ebiografia.com/assets/img/authors/ta/le/tales-de-mileto-l.jpg">
            </figure>
            <span>{{ticket.assignedName || 'Sem responsável'}}</span>
        </div>
        <span class="card-footer-item">{{creationDate}}</span>
    </footer>
    </div>
</template>

<script>
import moment from 'moment';
import TicketNumber from 'shared/TicketNumber.vue';
import Icon from 'vue-awesome/components/Icon.vue';

export default {
    name: 'ticketCard',
    components: {
        TicketNumber, Icon
    },
    props: {
        ticket: { type: Object, required: true },
    },
    data() {
        return {
            creationDate: moment(this.ticket.createdAt.slice(0, 10), 'YYYY-MM-DD').fromNow(),
        };
    },
    computed: {
        statusIcon() {
            switch (this.ticket.statusId) {
            case 1: return 'circle-notch';
            case 2: return 'thumbs-up';
            case 3: return 'check-circle';
            case 4: return 'anchor';
            default: return null;
            }
        },
        statusName() {
            switch (this.ticket.statusId) {
            case 1: return 'Aberto';
            case 2: return 'Em progresso';
            case 3: return 'Resolvido';
            case 4: return 'Em espera';
            default: return null;
            }
        },
        severityIcon() {
            switch (this.ticket.severityId) {
            case 1: return 'has-text-success';
            case 2: return 'has-text-warning';
            case 3: return 'has-text-danger';
            default: return null;
            }
        },
        severityName() {
            switch (this.ticket.severityId) {
            case 1: return 'Baixa';
            case 2: return 'Média';
            case 3: return 'Alta';
            default: return null;
            }
        },
    },
    methods: {
        onClick() {
            this.$emit('onClick', this.ticket.id);
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
