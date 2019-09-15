<template>
    <div class="services-container">
        <div class="left-container">
            <Button icon="fa-box" value="Novo serviço" @click="modalControl('newService')"/>
        </div>

        <div class="right-container">
             <Title titleValue="Serviços"/>
             <ServiceCard v-for="(item, index) in services" :key="index" :service="item" @modalControl="modalControl"/>
        </div>
        <ServiceControl :show="showServiceControl" @hide="modalControl('close')" :oldService="oldService" :isEdition="isEdition"/>
    </div>
</template>

<script>
import axios from 'src/axios/axios.js';
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
            services: [],
            oldService: {
                id: null,
                name: '',
                description: '',
                isActive: true
            },
            isEdition: false
        };
    },
    mounted() {
        this.getServiceList();
    },
    methods: {
        getServiceList() {
            axios.get('service/all')
                .then((response) => {
                    this.services = response.data;
                })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Não foi possível obter a lista de serviços.',
                        type: 'error'
                    });
                });
        },
        modalControl(value) {
            if (value === 'newService' || value === 'close') {
                this.isEdition = false;
                this.oldService = {
                    id: null,
                    name: '',
                    description: '',
                    isActive: true
                };
            } else {
                this.oldService = value;
                this.isEdition = true;
            }
            this.showServiceControl = !this.showServiceControl;
            this.getServiceList();
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
