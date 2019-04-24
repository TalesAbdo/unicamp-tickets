<template>
<div class="service-dropdown-metrics">
    <span class="dropdown-title">Serviço</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
            <span>Selecione um produto</span>
            <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
            <a href="#" class="dropdown-item">
                Dropdown item
            </a>
            <a class="dropdown-item">
                Other dropdown item
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'serviceDropdown',
    props: {
    },
    data() {
        return {
            active: false,
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
