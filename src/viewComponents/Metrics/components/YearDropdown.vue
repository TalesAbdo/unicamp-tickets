<template>
<div class="year-dropdown-metrics">
    <span class="dropdown-title">Ano</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
            <span>{{placeholder}}</span>
            <span class="icon is-small">
                <i class="fas fa-angle-down" aria-hidden="true"/>
            </span>
            </button>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
            <a v-for="year in years" :key="year.YEAR" class="dropdown-item"  @click="onClick(year.YEAR)">
                {{year.YEAR}}
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>

const axios = require('axios');

export default {
    name: 'yearDropdown',
    data() {
        return {
            active: false,
            placeholder: 'Selecione um ano',
            years: []
        };
    },
    async mounted() {
        await axios.get('api/ticket/year/')
            .then((response) => {
                this.years = response.data;
            });
        // sets most recent year as default
        if (this.years[0]) {
            this.placeholder = this.years[0].YEAR;
            this.$emit('click', this.years[0].YEAR);
        }
    },
    methods: {
        controlDropdown() {
            this.active = !this.active;
        },
        onClick(year) {
            this.placeholder = year;
            this.$emit('click', year);
            this.controlDropdown();
        }
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.year-dropdown-metrics {
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
            min-width: 6rem;
            margin-top: 0;
            border: 1px solid $primary;
            display: flex;
            justify-content: space-between;

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
            min-width: 6rem;

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
