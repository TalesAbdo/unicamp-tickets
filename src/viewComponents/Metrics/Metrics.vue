<template>
    <div class="metrics-container">
        <div class="common-container graph-container">
            <Title class="report-title" titleValue="Análises gráficas"/>
            <span class="report-subtitle is-italic">Preencha os filtros para gerar o gráfico correspondente à pesquisa</span>
            <div class="options-first-line">
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
                <Button icon="fa-file-excel" value="Gerar relatório"/>
            </div>
        </div>
    </div>
</template>

<script>
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

        &.graph-container {
            margin-bottom: 1.5rem;
        }

        .report-title {
            margin-bottom: 0;
        }

        .report-subtitle {
            margin-bottom: 1.5rem !important;
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
        }
    }
}
</style>
