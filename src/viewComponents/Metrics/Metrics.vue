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
                        <span :class="{'is-primary is-selected': activeAnalysisButton === 1}" class="button" @click="analysisControl(1)">Tickets por mês</span>
                        <span :class="{'is-primary is-selected': activeAnalysisButton === 2}" class="button" @click="analysisControl(2)">Tempo de fechamento</span>
                    </div>
                </div>
                <Service/>
            </div>

            <div class="options-second-line">
                <Month title="Mês final"/>
                <Month title="Mês final"/>
                <Button icon="fa-image" value="Salvar imagem" />
            </div>
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
import Month from './components/MonthDropdown.vue';

export default {
    name: 'metrics',
    components: {
        Button, Title, Service, Month
    },
    data() {
        return {
            activeAnalysisButton: 0,
            activeSevButton: 0
        };
    },
    mounted() {
        const ctx = document.getElementById('report-chart').getContext('2d');
        const myChart = new Chart(ctx, { // eslint-disable-line
            type: 'line',
            data: {
                labels: ['Jan', 'Fev', 'Mar', 'Abr', 'Mai', 'Jun'],
                datasets: [
                    {
                        label: 'Mátricula',
                        data: [12, 19, 3, 5, 2, 3],
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(255, 99, 132, 1)',
                        borderWidth: 1
                    },
                    {
                        label: 'Instalação',
                        data: [2, 10, 10, 20, 5, 8],
                        backgroundColor: 'rgba(255, 255, 255, 0.2)',
                        borderColor: 'rgba(100, 110, 132, 1)',
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
                }
            }
        });
    },
    methods: {
        analysisControl(value) {
            this.activeAnalysisButton = value;
        },
        severityControl(value) {
            this.activeSevButton = value;
        },
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
