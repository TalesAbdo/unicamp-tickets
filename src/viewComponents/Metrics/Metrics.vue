<template>
    <div class="metrics-container">
        <div class="common-container graph-container">
            <Title class="report-title" titleValue="Análises gráficas"/>
            <span class="report-subtitle is-italic">Preencha os filtros para gerar o gráfico correspondente à pesquisa</span>
            <canvas id="report-chart" width="400" height="180"></canvas>
            <div class="graph-first-line options-first-line">
                <div class="choose-container">
                    <span class="has-text-weight-bold">Analisar</span>
                    <div class="buttons has-addons">
                        <span :class="{'is-primary is-selected': periodData.type === 'countTicket'}" class="button" @click="setType('countTicket')">Tickets por mês</span>
                        <span :class="{'is-primary is-selected': periodData.type === 'avgTime'}" class="button" @click="setType('avgTime')">Tempo de fechamento</span>
                    </div>
                </div>
                <Service @click="setService" />
                    <Year @click="setYear" />
            </div>

            <div class="options-second-line">
                    <Month title="Mês Inicial"  @click="setinitialMonth" />
                    <Month title="Mês Final"  @click="setFinalMonth" />

                <Button icon="fa-chart-bar" value="Gerar gráfico" @click="getChartData"/>
                <Button icon="fa-image" value="Salvar imagem" @click="createImage"/>
            </div>
            {{periodData}}

        </div>

        <div class="common-container">
            <Title class="report-title" titleValue="Relatórios"/>
            <span class="report-subtitle is-italic">Preencha os filtros para criar o relatório .xls com informações dos tickets da pesquisa</span>
            <div class="options-first-line">
                 <div class="choose-container">
                    <span class="has-text-weight-bold">Severidade</span>
                    <div class="buttons has-addons">
                        <span :class="{'is-success is-selected': activeSevButton === 1}" class="button" @click="severityControl(1)">Baixa</span>
                        <span :class="{'is-warning is-selected': activeSevButton === 2}" class="button" @click="severityControl(2)">Média</span>
                        <span :class="{'is-danger is-selected': activeSevButton === 3}" class="button" @click="severityControl(3)">Alta</span>
                        <span :class="{'is-info is-selected': activeSevButton === 4}" class="button" @click="severityControl(4)">Todas</span>
                    </div>
                </div>
                <Service/>
            </div>

            <div class="options-second-line">
                <div class="calendar-container">
                    <span class="has-text-weight-bold">Data inicial</span>
                    <input class="date" type="date">
                </div>
                <div class="calendar-container">
                    <span class="has-text-weight-bold">Data final</span>
                    <input class="date" type="date">
                </div>
                <Button icon="fa-file-excel" value="Gerar relatório"/>
            </div>
        </div>
    </div>
</template>

<script>
import Chart from 'chart.js';
import Button from 'shared/Button.vue';
import Title from 'shared/Title.vue';
import Service from './components/ServiceDropdown.vue';
import Year from './components/YearDropdown.vue';
import Month from './components/MonthDropdown.vue';

const axios = require('axios');

export default {
    name: 'metrics',
    components: {
        Button, Title, Service, Year, Month
    },
    data() {
        return {
            activeSevButton: 0,
            labels: [],
            chartData: [],
            periodData: {
                type: null,
                service: null,
                year: null,
                initialMonth: null,
                finalMonth: null
            }
        };
    },
    mounted() {
        this.createChart();
    },
    methods: {
        severityControl(value) {
            this.activeSevButton = value;
        },
        createChart() {
            const ctx = document.getElementById('report-chart').getContext('2d');
            const myChart = new Chart(ctx, { // eslint-disable-line
                type: 'line',
                data: {
                    labels: this.labels,
                    datasets: [
                        {
                            data: this.chartData,
                            label: this.periodData.year ? this.periodData.year : 'Select a period',
                            backgroundColor: 'rgba(255, 255, 255, 0)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true
                            }
                        }]
                    },
                }
            });
        },
        setType(value) {
            this.periodData.type = value;
        },
        setService(value) {
            this.periodData.service = value;
        },
        setYear(value) {
            this.periodData.year = value;
        },
        setinitialMonth(value) {
            this.periodData.initialMonth = value;
        },
        setFinalMonth(value) {
            this.periodData.finalMonth = value;
        },
        getChartData() {
            try {
                if (this.periodData.type && this.periodData.year && this.periodData.initialMonth && this.periodData.finalMonth) {
                    if (this.periodData.type === 'countTicket') {
                        axios.post('api/ticket/byamount', this.periodData)
                            .then((response) => {
                                console.log(response);
                                response.data.forEach((item) => {
                                    console.log(item.MONTH);
                                    this.labels.push(toString(item.MONTH));
                                    this.chartData.push(item.COUNT);
                                });
                            });
                    } else {
                        axios.post('api/ticket/byclosingtime')
                            .then((response) => {
                                console.log(response);
                            });
                    }

                    this.createChart();
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'Atenção!',
                        text: 'Preencha todas as informações para gerar o relatório.',
                        type: 'warn'
                    });
                }
            } catch (e) {
                console.log(e);
                this.$notify({
                    group: 'foo',
                    title: 'Erro!',
                    text: 'Algo deu errado enquanto o gráfico era gerado, contate o adminstrador.',
                    type: 'danger'
                });
            }
        },
        createImage() {

        }
    }
};
</script>


<style lang="scss">
@import '~src/css/main.scss';

.metrics-container {
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center !important;
    justify-content: center;
    margin: auto;

    .common-container {
        width: 100%;
        display: flex;
        flex-direction: column;
        margin-bottom: 3rem;

        .report-title {
            margin-bottom: 0;
        }

        .report-subtitle {
            margin-bottom: 1rem !important;
        }

        .graph-first-line {
            margin-top: 1rem;
        }

        .options-first-line {
            display: flex;
            justify-content: space-evenly;
            margin-bottom: 1.5rem;

            .choose-container {
                display: flex;
                flex-direction: column;
                align-items: flex-start;
                justify-content: center;
                align-self: flex-start;

                .has-text-weight-bold {
                    line-height: 20px;
                    user-select: none;
                    margin-bottom: .3rem;
                }

                .button {
                    margin-top: 0;
                    margin-bottom: 0;
                    border: 1px solid $primary !important;
                }
            }
        }

        .options-second-line {
            display: flex;
            justify-content: space-evenly;
            align-items: flex-end;

            .calendar-container {
                display: flex;
                flex-direction: column;

                .date {
                    height: 37.5px;
                    border: 1px solid $primary;
                    border-radius: 4px;
                    padding: .5rem;
                    margin-top: .3rem;
                }
                ::-webkit-calendar-picker-indicator {
                    background-image: url(http://icons.iconarchive.com/icons/dakirby309/simply-styled/256/Calendar-icon.png);
                    background-position:center;
                    background-size:20px 20px;
                    background-repeat:no-repeat;
                    color:rgba(204,204,204,0);
                }
                ::-webkit-inner-spin-button {
                    display:none;
                }
                ::-webkit-calendar-picker-indicator { background-color:white}
                    input[type=date]{
                    font-size: 18px;
                    }
                ::-webkit-datetime-edit-text { color:$dark-gray; }
                ::-webkit-datetime-edit-month-field { color:$dark-gray; }
                ::-webkit-datetime-edit-day-field { color:$dark-gray; }
                ::-webkit-datetime-edit-year-field { color:$dark-gray; }
            }
        }
    }
}
</style>
