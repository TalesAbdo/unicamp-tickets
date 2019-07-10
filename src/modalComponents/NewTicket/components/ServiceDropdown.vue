<template>
<div class="service-dropdown">
    <span class="dropdown-title">Serviço</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
            <span>{{triggerValue || 'Escolha um serviço'}}</span>
            <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <a  v-for="(service) in services" :key="service.id" class="dropdown-item is-flex" @click="serviceClicked(service)">
                    {{service.name}}
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'serviceDropdownNewTicket',
    props: {
        services: { type: Array, required: true },
        triggerValue: { type: String, required: false, default: '' }
    },
    data() {
        return {
            active: false
        };
    },
    methods: {
        serviceClicked(service) {
            this.$emit('click', service);
            this.controlDropdown();
        },
        controlDropdown() {
            this.active = !this.active;
        }
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.service-dropdown {
    align-self: flex-start;
    display: flex;
    align-items: center;

    .dropdown-title {
        font-weight: bold;
        line-height: 20px !important;
        display: block;
        color: $black;
        cursor: default;
        user-select: none;
        margin-right: .5rem;
    }

    .dropdown {
        .dropdown-content {
            max-height: 8rem;
            overflow: auto;

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
}
</style>
