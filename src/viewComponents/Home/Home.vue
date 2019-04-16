<template>
    <div class="home-container">
        <div class="left-container">
            <Button icon="fa-ticket-alt" value="Abrir ticket" @click="modalControl('newTicket')" />
            <TicketFilters :filters="filters" @change="filtersUpdate"/>
        </div>
        <div class="right-container">
            <OrdenationTitle class="right-header" :orderBy="orderBy" :isUp="isUp" @onItemClick="changeOrder"/>
            <TicketCard :ticket="ticket" @modalControl="modalControl"/>
            <TicketCard :ticket="ticket"/>
            <TicketCard :ticket="ticket"/>
            <TicketCard :ticket="ticket"/>
            <TicketCard :ticket="ticket"/>
            <TicketCard :ticket="ticket"/>
        </div>
        <NewTicket :show="showNewTicket" @hide="modalControl('newTicket')"/>
        <TicketDetails :show="showTicketDetails" @hide="modalControl('ticketDetails')" />
    </div>
</template>

<script>
import NewTicket from 'modal/NewTicket/NewTicket.vue';
import TicketDetails from 'modal/TicketDetails.vue';
import Button from 'shared/Button.vue';
import TicketCard from './components/TicketCard.vue';
import OrdenationTitle from './components/OrdenationTitle.vue';
import TicketFilters from './components/Filter/TicketFilters.vue';

export default {
    name: 'login',
    components: {
        NewTicket, TicketDetails, TicketCard, OrdenationTitle, Button, TicketFilters
    },
    data() {
        return {
            showNewTicket: false,
            showTicketDetails: false,
            orderBy: 'creationDate',
            isUp: false,
            ticket: {
                id: 1203,
                title: 'hey',
                status: 1,
                severity: 3,
                assignedId: 4,
                creationDate: '01-01-2000',
                hasAttachment: false,
                assignedPhoto: '@/assets/Logo.svg'
            },
            filters: []
        };
    },
    created() {
        const filtersPreference = localStorage.getItem('ticketsFilters');
        if (filtersPreference) {
            this.filters = JSON.parse(filtersPreference);
        } else {
            this.filters = [
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
    },
    methods: {
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
        filtersUpdate(event) {
            localStorage.setItem('ticketsFilters', JSON.stringify(event.values));
        },
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
    margin-top: 1rem;

    .left-container {
        width: 13%;
        margin-right: 2.5rem;
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-top: .475rem;
    }

    .right-container {
        width: 50%;

        .right-header {
            margin-bottom: 1.5rem;
        }
    }
}
</style>
