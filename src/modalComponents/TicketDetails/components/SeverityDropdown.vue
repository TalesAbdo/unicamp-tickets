<template>
<div class="product-container">
    <span class="dropdown-title">{{title}}</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
                <i :class="icon(triggerValue)" class="fas fa-exclamation-triangle"/>
                <span>{{name(triggerValue)}}</span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
            <a  v-for="(item) in itens" :key="item.id" class="dropdown-item is-flex">
                <i :class="icon(item.id)" class="fas fa-exclamation-triangle"/>
                <span>{{name(item.id)}}</span>
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'statusDropdown',
    props: {
        title: { type: String, required: true },
        itens: { type: Array, required: true },
        triggerValue: { type: Number, required: true },
        dropdownType: { type: String, required: false, default: '' }
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
        onClick() {
            this.$emit('click');
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
