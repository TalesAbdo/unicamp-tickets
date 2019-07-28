<template>
    <div class="home-container">
        <div class="left-container">
            <div v-if="isSupport" class="ticket-counter">
                <span class="is-italic is-size-5">Controle</span>
                <span><i class="fas fa-circle-notch"/><b>Aberto:</b> {{getTicketsByStatusQuantity(1)}}</span>
                <span><i class="fas fa-thumbs-up"/><b>Em progresso:</b> {{getTicketsByStatusQuantity(2)}}</span>
                <span><i class="fas fa-check-circle"/><b>Em espera:</b> {{getTicketsByStatusQuantity(3)}}</span>
                <span><i class="fas fa-anchor"/><b>Resolvido:</b> {{getTicketsByStatusQuantity(4)}}</span>
            </div>
            <Button v-else icon="fa-ticket-alt" value="Abrir ticket" @click="modalControl('newTicket')"/>
            <TicketFilters :filters="filters" @change="filtersUpdate"/>
        </div>
        <div class="right-container">
            <OrdenationTitle class="right-header" :isUp="isUp" @onItemClick="changeOrder"/>
            <TicketCard v-for="ticket in tickets" :key="ticket.id" :ticket="ticket" @modalControl="modalControl" @onClick="setTicketDetailId"/>
            <Button v-if="showMoreTicketsButton" icon="fa-plus" value="Ver mais 50 tickets" @click="increaseTotalTicketRequired()"/>
        </div>
        <NewTicket :show="showNewTicket" @hide="modalControl('newTicket')"/>
        <TicketDetails :show="showTicketDetails" @hide="modalControl('ticketDetails')" :ticketId="ticketDetailId"/>
    </div>
</template>

<script>
import { mapState } from 'vuex';
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
        NewTicket, TicketDetails, TicketCard, Button, TicketFilters, OrdenationTitle
    },
    data() {
        return {
            showNewTicket: false,
            showTicketDetails: false,
            isUp: false,
            tickets: [],
            ticketDetailId: null,
            filters: [],
            ticketsByStatus: [{}, {}, {}, {}],
            totalTicketsRequired: 100
        };
    },
    computed: {
        ...mapState({
            id: state => state.user.id,
            isSupport: state => state.user.isSupport
        }),
        titleValue() {
            if (this.isSupport) {
                return 'Tickets';
            }
            return 'Meus Tickets';
        },
        showMoreTicketsButton() {
            if (this.tickets.length >= this.totalTicketsRequired) {
                return true;
            }
            return false;
        },
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
            sevenDate = sevenDate.toJSON().slice(0, 19).replace('T', ' ');

            let thirtyDate = new Date();
            thirtyDate.setDate(thirtyDate.getDate() - 30);
            thirtyDate = thirtyDate.toJSON().slice(0, 19).replace('T', ' ');

            if (this.filters[2].selected[0] === 1) {
                dateQuery = `and t.createdAt > '${sevenDate}'`;
            } else if (this.filters[2].selected[0] === 2) {
                dateQuery = `and t.createdAt between '${sevenDate}' and '${thirtyDate}'`;
            } else if (this.filters[2].selected[0] === 3) {
                dateQuery = `and t.createdAt < '${thirtyDate}'`;
            }

            let ownerId = null;
            if (!this.isSupport) {
                ownerId = this.id;
            }

            const fetchQuery = `LIMIT ${this.totalTicketsRequired}`;

            axios.post('/api/ticket/byuser',
                {
                    ownerId,
                    statusList: this.filters[0].selected,
                    severityList: this.filters[1].selected,
                    dateQuery,
                    fetchQuery
                })
                .then((response) => {
                    this.tickets = response.data;
                    this.isUp = false;
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
        getTicketsByStatusQuantity(id) {
            let total = 0;
            this.tickets.map((item) => {
                if (item.statusId === id) {
                    total += 1;
                }
                return true;
            });
            return total;
        },
        modalControl(modal) {
            if (modal === 'newTicket') {
                this.showNewTicket = !this.showNewTicket;
            } else {
                this.showTicketDetails = !this.showTicketDetails;
            }
            this.getTicketList();
        },
        setTicketDetailId(id) {
            this.ticketDetailId = id;
        },
        async filtersUpdate(event) {
            await localStorage.setItem('ticketsFilters', JSON.stringify(event.values));
            this.getTicketList();
        },
        increaseTotalTicketRequired() {
            this.totalTicketsRequired += 50;
            this.getTicketList();
        },
        changeOrder() {
            this.isUp = !this.isUp;
            if (this.isUp) {
                this.tickets.sort(this.ascOrder);
            } else {
                this.tickets.sort(this.descOrder);
            }
        },
        ascOrder(a, b) {
            const itemA = a.createdAt;
            const itemB = b.createdAt;

            let comparison = 0;
            if (itemA > itemB) {
                comparison = 1;
            } else if (itemA < itemB) {
                comparison = -1;
            }
            return comparison;
        },
        descOrder(a, b) {
            const itemA = a.createdAt;
            const itemB = b.createdAt;

            let comparison = 0;
            if (itemA < itemB) {
                comparison = 1;
            } else if (itemA > itemB) {
                comparison = -1;
            }
            return comparison;
        },
        baseFilters() {
            return [
                {
                    name: 'Status',
                    query: 'status',
                    options: [
                        { value: 1, label: 'Aberto' },
                        { value: 2, label: 'Em progresso' },
                        { value: 3, label: 'Em espera' },
                        { value: 4, label: 'Resolvido' }
                    ],
                    selected: [1, 3],
                    multiple: true
                },
                {
                    name: 'Prioridade',
                    query: 'priority',
                    options: [
                        { value: 1, label: 'Baixa' },
                        { value: 2, label: 'Média' },
                        { value: 3, label: 'Alta' },
                    ],
                    selected: [1, 2, 3],
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
        align-self: flex-start;
        justify-content: center;

        .right-header {
            margin-bottom: 1.5rem;
        }

        .increase-total-tickets {
            align-self: center;
        }
    }
}
</style>
