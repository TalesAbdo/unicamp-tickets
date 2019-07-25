<template>
<div class="status-dropdown-container">
    <span class="dropdown-title">Status</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
                <icon :name="icon(triggerValue)"/>
                <span>{{name(triggerValue)}}</span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
            <a  v-for="(status) in statuses" :key="status.id" class="dropdown-item is-flex" @click="statusClicked(status.id)">
                <icon :name="icon(status.id)"/>
                <span>{{name(status.id)}}</span>
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue';

export default {
    name: 'statusDropdown',
    components: {
        Icon
    },
    props: {
        statuses: { type: Array, required: true },
        triggerValue: { type: Number, required: true },
    },
    data() {
        return {
            active: false
        };
    },
    methods: {
        icon(value) {
            switch (value) {
            case 1: return 'circle-notch';
            case 2: return 'thumbs-up';
            case 3: return 'check-circle';
            case 4: return 'anchor';
            default: return null;
            }
        },
        name(value) {
            switch (value) {
            case 1: return 'Aberto';
            case 2: return 'Em progresso';
            case 3: return 'Em espera';
            case 4: return 'Resolvido';
            default: return null;
            }
        },
        statusClicked(statusId) {
            this.$emit('click', statusId);
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

.status-dropdown-container {
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
