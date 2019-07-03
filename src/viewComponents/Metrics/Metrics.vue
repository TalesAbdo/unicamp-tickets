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
                <Service @click="setGraphService" />
                <Year @click="setYear" />
            </div>

            <div class="options-second-line">
                <Month title="Mês Inicial"  @click="setinitialMonth" />
                <Month title="Mês Final"  @click="setFinalMonth" />
                <Button icon="fa-chart-bar" value="Gerar gráfico" @click="getChartData"/>
                <Button icon="fa-image" value="Salvar imagem" @click="createImage"/>
            </div>
        </div>

        <div class="common-container">
            <Title class="report-title" titleValue="Relatórios"/>
            <span class="report-subtitle is-italic">Preencha os filtros para criar o relatório .xlsx com informações dos tickets da pesquisa</span>
            <div class="options-first-line">
                 <div class="choose-container">
                    <span class="has-text-weight-bold">Severidade</span>
                    <div class="buttons has-addons">
                        <span :class="{'is-success is-selected': reportData.severityId === 1}" class="button" @click="reportData.severityId=1">Baixa</span>
                        <span :class="{'is-warning is-selected': reportData.severityId === 2}" class="button" @click="reportData.severityId=2">Média</span>
                        <span :class="{'is-danger is-selected': reportData.severityId === 3}" class="button" @click="reportData.severityId=3">Alta</span>
                        <span :class="{'is-info is-selected': reportData.severityId === null}" class="button" @click="reportData.severityId=null">Todas</span>
                    </div>
                </div>
                <Service @click="setReportService" />
            </div>

            <div class="options-second-line">
                <div class="calendar-container">
                    <span class="has-text-weight-bold">Data inicial</span>
                    <input class="date" type="date" v-model="reportData.initialDate">
                </div>
                <div class="calendar-container">
                    <span class="has-text-weight-bold">Data final</span>
                    <input class="date" type="date" v-model="reportData.finalDate">
                </div>
                <Button icon="fa-file-excel" value="Gerar relatório" @click="createReport"/>
            </div>
        </div>
    </div>
</template>

<script>
import { saveAs } from 'file-saver';
import Chart from 'chart.js';
import Button from 'shared/Button.vue';
import Title from 'shared/Title.vue';
import Service from './components/ServiceDropdown.vue';
import Year from './components/YearDropdown.vue';
import Month from './components/MonthDropdown.vue';
import XLSX from 'xlsx';

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
                type: 'countTicket',
                serviceId: null,
                year: null,
                initialMonth: 1,
                finalMonth: 1
            },
            reportData: {
                severityId: null,
                serviceId: null,
                initialDate: null,
                finalDate: null
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
                    backgroundColor: '#000000',
                    labels: this.labels,
                    datasets: [
                        {
                            data: this.chartData,
                            label: this.periodData.year ? this.periodData.year : 'Select a period',
                            backgroundColor: 'rgba(0, 0, 0, 0)',
                            borderColor: 'rgba(255, 99, 132, 1)',
                            borderWidth: 1
                        },
                    ]
                },
                options: {
                    scales: {
                        yAxes: [{
                            ticks: {
                                beginAtZero: true,
                                precision: 0
                            }
                        }]
                    },
                },
                // For image export
                plugins: [{
                    beforeDraw(c) {
                        const { ctx } = c.chart;
                        ctx.fillStyle = '#ffffff';
                        ctx.fillRect(0, 0, c.chart.width, c.chart.height);
                    }
                }]
            });
        },
        setType(value) {
            this.periodData.type = value;
        },
        setGraphService(value) {
            this.periodData.serviceId = value;
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
        setReportService(value) {
            this.reportData.serviceId = value;
        },
        severityName(id) {
            switch(id) {
                case 1: return 'Baixa';
                case 2: return 'Média';
                case 3: return 'Alta';
                default: return null;
            }
        },
        statusName(id) {
            switch(id) {
                case 1: return 'Aberto';
                case 2: return 'Em progresso';
                case 3: return 'Resolvido';
                case 4: return 'Em espera';
                case 5: return 'Fechado';
                default: return null;
            }
        },
        async getChartData() {
            try {
                if (this.periodData.finalMonth >= this.periodData.initialMonth) {
                    let apiPath;
                    if (this.periodData.type === 'countTicket') {
                        apiPath = 'api/ticket/byamount';
                    } else {
                        apiPath = 'api/ticket/byclosingtime';
                    }

                    await axios.post(apiPath, this.periodData).then((response) => { this.fillChartData(response.data); });
                    this.createChart();
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'Atenção!',
                        text: 'Selecione o mês final maior que o inicial.',
                        type: 'warn'
                    });
                }
            } catch (e) {
                console.log(e);
                this.$notify({
                    group: 'foo',
                    title: 'Erro!',
                    text: 'Algo deu errado na geração do gráfico, contate o adminstrador.',
                    type: 'error'
                });
            }
        },
        fillChartData(data) {
            this.labels = [];
            this.chartData = [];
            data.forEach((item) => {
                this.labels.push(item.MONTH);
                this.chartData.push(item.VALUE);
            });
        },
        createImage() {
            const canvas = document.getElementById('report-chart');
            const today = new Date(); 
            console.log(today);
            canvas.toBlob((blob) => {
                saveAs(blob, `Analise-grafica-${today.getDate()}-${today.getMonth() + 1 < 10 ? '0'.concat(today.getMonth()+1) : today.getMonth()+1}-${today.getFullYear()}.jpg`);
            }, 'image/jpeg', 1);
        },
        async generateDataForReport() {
            try {
                if ((this.reportData.initialDate) && (this.reportData.finalDate) && this.reportData.initialDate <= this.reportData.finalDate) {
                    const fieldNames = ['ID', 'SEVERIDADE', 'STATUS', 'TÍTULO', 'CRIADO EM', 'ÚLTIMA ATUALIZAÇÃO', 'SERVIÇO',
                    'DONO', 'RESPONSÁVEL', 'DESCRIÇÃO'];
                    const data = [fieldNames];
                    let result = await axios.post('/api/ticket/byfilter', this.reportData).then((response) => { 
                        console.log(response);
                        response.data.forEach((item) => {
                            let line = [item.id, this.severityName(item.severityId), this.statusName(item.statusId), item.title,
                            item.created, item.updated, item.serviceName, item.ownerName, item.assignedName, item.description];
                            data.push(line);
                        });
                    });
                    return data;
                } else {
                    this.$notify({
                        group: 'foo',
                        title: 'Atenção!',
                        text: 'Selecione uma data final maior que a inicial.',
                        type: 'warn'
                    });
                }
            } catch (e) {
                console.log(e);
            }
        },
        async createReport() {
            try {
                const data = await this.generateDataForReport();
                if (!data) {
                    return;
                }

                const wb = XLSX.utils.book_new();
                wb.SheetNames.push('Pesquisa por tickets');

                const ws = XLSX.utils.aoa_to_sheet(data);
                wb.Sheets['Pesquisa por tickets'] = ws;

                let wscolumns = [{ wch: 8 }, { wch: 11 }, { wch: 12 }, { wch: 20 }, { wch: 23 }, { wch: 23 }, { wch: 25 }, { wch: 25 }, { wch: 25 }, { wch: 40 }];


                ws['!cols'] = wscolumns;

                const wbout = XLSX.write(wb, { bookType: 'xlsx', bookSST: true, type: 'binary' });

                const buf = new ArrayBuffer(wbout.length);
                const view = new Uint8Array(buf);
                for (let i = 0; i < wbout.length; i += 1) {
                    view[i] = wbout.charCodeAt(i) & 0xFF; // eslint-disable-line
                }

                const today = new Date();
                saveAs(new Blob([buf], { type: 'application/octet-stream' }),
                    `Relatorio-${today.getDate()}-${today.getMonth() + 1 < 10 ? '0'.concat(today.getMonth()) : today.getMonth()}-${today.getFullYear()}.xlsx`);

            } catch (error) {
                console.log('Could not generate report', error); // eslint-disable-line
            }
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
                    background-image: url(../../assets/calendar-regular.svg);
                    background-position: center;
                    background-size: 15px 15px;
                    background-repeat: no-repeat;
                    color: rgba(255, 255, 255, 0);
                    display: block;
                }

                ::-webkit-inner-spin-button {
                    display:none;
                }

                ::-webkit-calendar-picker-indicator {
                    background-color:white
                }
                
                 input[type=date] {
                    font-size: 18px;
                                        display: block;
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
