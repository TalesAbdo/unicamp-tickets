<template>
<div class="service-dropdown-container">
    <span class="dropdown-title">{{title}}</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
                <span>{{triggerValue}}</span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
            <a  v-for="(item) in itens" :key="item.id" class="dropdown-item is-flex">
                {{item.value}}
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'inputText',
    props: {
        title: { type: String, required: true },
        itens: { type: Array, required: true },
        triggerValue: { type: String, required: false, default: '' },
        dropdownType: { type: String, required: false, default: '' }
    },
    data() {
        return {
            active: false
        };
    },
    methods: {
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

        .dropdown-content {
            padding: 0;
        }
    }
}
</style>
