<template>
<div class="product-container">
    <span class="dropdown-title">Severidade</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button v-if="isSupport && !isClosed" type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
                <icon :class="icon(triggerValue)" name="exclamation-triangle"/>
                <span>{{name(triggerValue)}}</span>
            </button>
            <div v-else class="pure-text">
                <icon :class="icon(triggerValue)" name="exclamation-triangle"/>
                <span>{{name(triggerValue)}}</span>
            </div>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
                <a  v-for="(severity) in severities" :key="severity.id" class="dropdown-item is-flex" @click="severityClicked(severity.id)">
                    <icon :class="icon(severity.id)" name="exclamation-triangle"/>
                    <span>{{name(severity.id)}}</span>
                </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import Icon from 'vue-awesome/components/Icon.vue';

export default {
    name: 'statusDropdown',
    components: {
        Icon
    },
    props: {
        severities: { type: Array, required: true },
        triggerValue: { type: Number, required: true },
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
        icon(value) {
            switch (value) {
            case 1: return 'has-text-success';
            case 2: return 'has-text-warning';
            case 3: return 'has-text-danger';
            default: return null;
            }
        },
        name(value) {
            switch (value) {
            case 1: return 'Baixa';
            case 2: return 'Média';
            case 3: return 'Alta';
            default: return null;
            }
        },
        severityClicked(severityId) {
            this.$emit('click', severityId);
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

.product-container {
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

            .dropdown-item {
                display: inline;
                align-items: center;
            }
        }

        span {
            margin-left: .5rem;
        }
    }
}
</style>
