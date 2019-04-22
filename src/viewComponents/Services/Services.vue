<template>
    <div class="services-container">
        <div class="left-container">
            <Button icon="fa-box" value="Novo serviço" @click="modalControl('newService')" />
        </div>

        <div class="right-container">
             <Title titleValue="Serviços"/>

             <ServiceCard v-for="item in services" :key="item.name" :service="item" @modalControl="modalControl"/>
        </div>
        <ServiceControl :show="showServiceControl" @hide="modalControl" :modalInformation="modalInformation"/>
    </div>
</template>

<script>
import ServiceControl from 'modal/ServiceControl/ServiceControl.vue';
import Button from 'shared/Button.vue';
import Title from 'shared/Title.vue';
import ServiceCard from './components/ServiceCard.vue';

export default {
    name: 'service',
    components: {
        ServiceControl, Button, Title, ServiceCard
    },
    data() {
        return {
            showServiceControl: false,
            services: [
                { name: 'Matrícula', description: 'Pedidos de matrícula no semestre' },
                { name: 'Alteração de Matrícula', description: 'Pedidos de alteração de matrícula no semestre' },
                { name: 'Instalação', description: 'Instalação de máquinas e periféricos' },
                { name: 'Pedidos de itens', description: 'Itens relacionados aos laboratórios' },
                { name: 'Máquinas', description: 'Pedidos de máquinas novas' }
            ],
            modalInformation: { titleText: '', buttonText: '' }
        };
    },
    created() {
    },
    methods: {
        modalControl(type) {
            console.log('here3');
            if (type === 'newService') {
                this.modalInformation = { titleText: 'Novo Serviço', buttonText: 'Criar Serviço' };
            } else {
                this.modalInformation = { titleText: 'Editar Serviço', buttonText: 'Confirmar Alterações' };
            }
            this.showServiceControl = !this.showServiceControl;
        },
    }
};
</script>


<style lang="scss">

.services-container {
    width: 100%;
    display: flex;
    align-items: center;
    justify-content: center;

    .left-container {
        width: 12.5%;
        margin-right: 2.5rem;
        display: flex;
        flex-direction: column;
        align-self: flex-start;
        margin-top: .4rem;
    }

    .right-container {
        width: 50%;

        .right-header {
            margin-bottom: 1.5rem;
        }
    }
}
</style>
