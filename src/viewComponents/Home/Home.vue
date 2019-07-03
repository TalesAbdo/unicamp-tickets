<template>
    <div class="home-container">
        <div class="left-container">
            <!-- <Button icon="fa-ticket-alt" value="Abrir ticket" @click="modalControl('newTicket')" /> -->
            <TicketFilters :filters="filters" @change="filtersUpdate"/>
        </div>
        <div class="right-container">
            <OrdenationTitle class="right-header" :orderBy="orderBy" :isUp="isUp" @onItemClick="changeOrder"/>
            <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" @modalControl="modalControl" @onClick="setTicketDetailId"/>
        </div>
        <!-- <NewTicket :show="showNewTicket" @hide="modalControl('newTicket')"/> -->
        <TicketDetails :show="showTicketDetails" @hide="modalControl('ticketDetails')" :ticketId="ticketDetailId"/>
    </div>
</template>

<script>
import NewTicket from 'modal/NewTicket/NewTicket.vue';
import TicketDetails from 'modal/TicketDetails/TicketDetails.vue';
import Button from 'shared/Button.vue';
import TicketCard from './components/TicketCard.vue';
import OrdenationTitle from './components/OrdenationTitle.vue';
import TicketFilters from './components/Filter/TicketFilters.vue';

const axios = require('axios');

export default {
    name: 'home',
    components: {
        NewTicket, TicketDetails, TicketCard, OrdenationTitle, Button, TicketFilters
    },
    data() {
        return {
            showNewTicket: false,
            showTicketDetails: false,
            orderBy: 'creationDate',
            isUp: false,
            tickets: [],
            ticketDetailId: null,
            filters: []
        };
    },
    created() {
        const filtersPreference = localStorage.getItem('ticketsFilters');
        if (filtersPreference) {
            this.filters = JSON.parse(filtersPreference);
        } else {
            this.filters = this.baseFilters();
        }

        this.getTicketList();
    },
    methods: {
        getTicketList() {
            let dateQuery = '';

            let sevenDate = new Date();
            sevenDate.setDate(sevenDate.getDate() - 7);
            sevenDate = sevenDate.toJSON().slice(0,19).replace('T', ' ');

            let thirtyDate = new Date();
            thirtyDate.setDate(thirtyDate.getDate() - 30);
            thirtyDate = thirtyDate.toJSON().slice(0,19).replace('T', ' ');

            if (this.filters[2].selected[0] === 1) {
                dateQuery = `and t.createdAt > '${sevenDate}'`;
            } else if (this.filters[2].selected[0] === 2) {
                dateQuery = `and t.createdAt between '${sevenDate}' and '${thirtyDate}'`;
            } else if (this.filters[2].selected[0] === 3) {
                dateQuery = `and t.createdAt < '${thirtyDate}'`;
            }

            axios.post('/api/ticket/byuser',
                {
                    ownerId: null,
                    statusList: this.filters[0].selected,
                    severityList: this.filters[1].selected,
                    dateQuery })
                .then((response) => {
                    this.tickets = response.data;
                })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Não foi possível obter a lista de tickets.',
                        type: 'error'
                    });
                });
        },
        modalControl(modal) {
            if (modal === 'newTicket') {
                this.showNewTicket = !this.showNewTicket;
            } else {
                this.showTicketDetails = !this.showTicketDetails;
            }
        },
        changeOrder(element) {
            this.orderBy = element;
            this.isUp = !this.isUp;
        },
        setTicketDetailId(id) {
            this.ticketDetailId = id;
        },
        async filtersUpdate(event) {
            await localStorage.setItem('ticketsFilters', JSON.stringify(event.values));
            this.getTicketList();
        },
        baseFilters() {
            return [
                {
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
        }
    }
};
</script>


<style lang="scss">
@import '~src/css/main.scss';

.home-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .left-container {
        width: 13%;
        margin-right: 2.5rem;
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-top: .4rem;
    }

    .right-container {
        width: 50%;
        align-self: flex-start;

        .right-header {
            margin-bottom: 1.5rem;
        }
    }
}
</style>
