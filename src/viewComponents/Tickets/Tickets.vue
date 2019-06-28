<template>
    <div class="tickets-container">
        <div class="left-container">
            <div class="ticket-counter">
                <span class="is-italic is-size-5">Controle</span>
                <span><i class="fas fa-circle-notch"/><b>Aberto:</b> {{getTicketsByStatusQuantity(1)}}</span>
                <span><i class="fas fa-thumbs-up"/><b>Em progresso:</b> {{getTicketsByStatusQuantity(2)}}</span>
                <span><i class="fas fa-check-circle"/><b>Resolvidos:</b> {{getTicketsByStatusQuantity(3)}}</span>
                <span><i class="fas fa-anchor"/><b>Em espera:</b> {{getTicketsByStatusQuantity(4)}}</span>
                <span><i class="fas fa-ban"/><b>Fechados:</b> {{getTicketsByStatusQuantity(5)}}</span>
            </div>
            <TicketFilters :filters="filters" @change="filtersUpdate"/>
        </div>

        <div class="right-container">
            <OrdenationTitle class="right-header" :orderBy="orderBy" :isUp="isUp" @onItemClick="changeOrder"/>
            <TicketCard v-for="(item) in tickets" :key="item" :ticket="ticket" @modalControl="modalControl"/>
        </div>
        <TicketDetails :show="showTicketDetails" @hide="modalControl" />
    </div>
</template>

<script>
import TicketDetails from 'modal/TicketDetails/TicketDetails.vue';
import TicketCard from './components/TicketCard.vue';
import OrdenationTitle from './components/OrdenationTitle.vue';
import TicketFilters from './components/Filter/TicketFilters.vue';

const axios = require('axios');

export default {
    name: 'tickets',
    components: {
        TicketDetails, TicketCard, OrdenationTitle, TicketFilters
    },
    data() {
        return {
            showTicketDetails: false,
            orderBy: 'creationDate',
            isUp: false,
            ticket: {
                id: 1203,
                title: 'hey',
                status: 1,
                severity: 3,
                assignedId: 'Tales',
                creationDate: '01-01-2000',
                hasAttachment: false,
                assignedPhoto: 'https://s.ebiografia.com/assets/img/authors/ta/le/tales-de-mileto-l.jpg'
            },
            tickets: [1, 2, 3, 4, 5, 6, 7],
            filters: [],
            ticketsByStatus: [{},{},{},{},{}]
        };
    },
    created() {
        const filtersPreference = localStorage.getItem('ticketsFilters');
        if (filtersPreference) {
            this.filters = JSON.parse(filtersPreference);
        } else {
            this.filters = this.getBaseFilters();
        }
        this.getTicketsByStatus();
    },
    methods: {
        modalControl() {
            this.showTicketDetails = !this.showTicketDetails;
        },
        changeOrder(element) {
            this.orderBy = element;
            this.isUp = !this.isUp;
        },
        filtersUpdate(event) {
            localStorage.setItem('ticketsFilters', JSON.stringify(event.values));
        },
        getBaseFilters() {
                 return [{
                    name: 'Status',
                    query: 'status',
                    options: [
                        { value: 0, label: 'Aberto' },
                        { value: 1, label: 'Em progresso' },
                        { value: 2, label: 'Resolvido' },
                        { value: 3, label: 'Em espera' },
                        { value: 4, label: 'Fechado' },
                    ],
                    selected: [0, 1, 3],
                    multiple: true
                },
                {
                    name: 'Prioridade',
                    query: 'priority',
                    options: [
                        { value: 0, label: 'Baixa' },
                        { value: 1, label: 'Média' },
                        { value: 2, label: 'Alta' },
                    ],
                    selected: [0],
                    multiple: true
                },
                {
                    name: 'Período',
                    query: 'date',
                    options: [
                        { value: 0, label: 'Geral' },
                        { value: 1, label: 'Menos de 7 dias' },
                        { value: 2, label: 'De 7 a 30 dias' },
                        { value: 3, label: 'Mais de 30 dias' }
                    ],
                    selected: [0],
                    multiple: false
                }
            ];
        },
        getTicketsByStatus() {
            axios.get('/api/ticket/bystatus')
                .then((response) => {
                    this.ticketsByStatus = response.data;
                })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Erro ao obter a listagem de tickts por status',
                        type: 'Danger'
                    });
                });
        },
        getTicketsByStatusQuantity(id) {
            const index = this.ticketsByStatus.findIndex(item => item.statusId === id);
            if(index > -1) {
                return this.ticketsByStatus[index].quantity;
            } else {
                return 0;
            }
        }
    }
};
</script>


<style lang="scss">
@import '~src/css/main.scss';

.tickets-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .left-container {
        width: 15%;
        margin-right: 2.5rem;
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-top: .5rem;

        .ticket-counter {
            display: flex;
            flex-direction: column;
            background-color: $white;
            border-left: 3px solid $primary;
            padding-left: .25rem;

            span {
                margin-bottom: .35rem;

                b {
                    margin-left: .35rem;
                }
            }
        }
    }

    .right-container {
        width: 50%;

        .right-header {
            margin-bottom: 1.5rem;
        }
    }
}
</style>
