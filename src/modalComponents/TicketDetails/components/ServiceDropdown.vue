<template>
<div class="service-dropdown-container">
    <span class="dropdown-title">Serviço</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button v-if="isSupport && !isClosed" type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
                <span>{{triggerValue || 'Escolha um serviço'}}</span>
            </button>
            <div v-else class="pure-text">
                <span>{{triggerValue || 'Sem serviço'}}</span>
            </div>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <a  v-for="(service) in services" :key="service.id" class="dropdown-item is-flex" @click="serviceClicked(service.id)">
                    {{service.name}}
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    name: 'serviceDropdownTicketDetails',
    props: {
        services: { type: Array, required: true },
        triggerValue: { type: String, required: false, default: '' },
        isClosed: { type: Boolean, required: false, default: false }
    },
    computed: {
        ...mapState({
            isSupport: state => state.user.isSupport
        }),
    },
    data() {
        return {
            active: false
        };
    },
    methods: {
        serviceClicked(serviceId) {
            this.$emit('click', serviceId);
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

.service-dropdown-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: .5rem;

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
        .button {
            margin-top: 0;
            padding: 0;
            border: none;
            color: $info;
            height: 30px !important;

            &:hover {
                color: $link;
                cursor: pointer;
            }

            &:focus {
                box-shadow: 0 0 0px !important;
                outline-offset: 0px !important;
                outline: none !important;
            }
        }

        .pure-text {
            display: flex;
            align-items: center;
            height: 30px !important;
        }

        .dropdown-content {
            padding: 0;
        }
    }
}
</style>
