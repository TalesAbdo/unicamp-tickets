<template>
<div class="month-dropdown-metrics">
    <span class="dropdown-title">{{title}}</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
            <span>Selecione um mês</span>
            <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"></i>
            </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
            <a v-for="month in months" :key="month.id" href="#" class="dropdown-item">
                {{month.name}}
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
export default {
    name: 'monthDropdown',
    props: {
        title: { type: String, required: true }
    },
    data() {
        return {
            active: false,
            months: [
                { id: 1, name: 'Janeiro' },
                { id: 2, name: 'Fevereiro' },
                { id: 3, name: 'Março' },
                { id: 4, name: 'Abril' },
                { id: 5, name: 'Maio' },
                { id: 6, name: 'Junho' },
                { id: 7, name: 'Julho' },
                { id: 8, name: 'Agosto' },
                { id: 9, name: 'Setembro' },
                { id: 10, name: 'Outubro' },
                { id: 11, name: 'Novembro' },
                { id: 12, name: 'Dezembro' }
            ]
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

.month-dropdown-metrics {
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
        .button {
            margin-top: 0;
            border: 1px solid $primary;

            span {
                color: $dark-gray;
            }

            &:focus {
                box-shadow: 0 0 0px !important;
                outline-offset: 0px !important;
                outline: none !important;
            }
        }

        .dropdown-menu {
            max-width: 11rem;

            .dropdown-content {
                max-height: 15rem;
                overflow: auto;
                padding: 0;
                max-width: inherit;

                .dropdown-item {
                    padding: .5rem 1rem;
                }
            }
        }
    }
}
</style>
