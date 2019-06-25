<template>
<div class="service-dropdown-metrics">
    <span class="dropdown-title">Serviço</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
            <span>{{placeholder}}</span>
            <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
            <a v-for="service in services" :key="service.id" class="dropdown-item"  @click="onClick(service)">
                {{service.name}}
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>

const axios = require('axios');

export default {
    name: 'serviceDropdown',
    props: {
    },
    data() {
        return {
            active: false,
            services: [],
            placeholder: 'Todos',
        };
    },
    mounted() {
        axios.get('api/service/all')
            .then((response) => {
                this.services = response.data;
                this.services.unshift({ name: 'Todos', id: null, description: '' });
            });
    },
    methods: {
        controlDropdown() {
            this.active = !this.active;
        },
        onClick(service) {
            this.placeholder = service.name;
            this.$emit('click', service.id);
            this.controlDropdown();
        }
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.service-dropdown-metrics {
    align-self: flex-start;
    display: flex;
    flex-direction: column;
    align-items: flex-start;

    .dropdown-title {
        font-weight: bold;
        line-height: 20px !important;
        display: block;
        color: $black;
        cursor: default;
        user-select: none;
        margin-bottom: .3rem;
    }

    .dropdown {
         span {
            color: $dark-gray;
        }

        .button {
            margin-top: 0;
            border: 1px solid $primary;

            &:focus {
            box-shadow: 0 0 0px !important;
            outline-offset: 0px !important;
            outline: none !important;
        }
        }
    }
}
</style>
