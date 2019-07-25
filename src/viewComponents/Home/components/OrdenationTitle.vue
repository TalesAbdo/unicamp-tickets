<template>
    <div class="ordenation-title-container">
        <Title titleValue="Meus tickets"/>
        <div class="ordenation-container">
            <span class="has-text-weight-bold">Ordenar por:</span>
            <span class="has-text-weight-bold has-text-info" id="option-1" @click="onClick()">
                <div class="arrows-container">
                    <div class="arrow-up" :class="{ hidden: isUp}" />
                    <div class="arrow-down" :class="{ hidden: !isUp }" />
                </div>
                <span>
                    Data de criação
                </span>
            </span>
        </div>
    </div>
</template>

<script>
import Title from 'shared/Title.vue';

export default {
    name: 'OrdenationTitle',
    components: {
        Title
    },
    props: {
        isUp: { type: Boolean, required: true }
    },
    data() {
        return {
        };
    },
    methods: {
        onClick() {
            this.$emit('onItemClick');
        },
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.ordenation-title-container {
    width: 100%;
    display: flex;
    flex-direction: column;

    .ordenation-container {
        display: flex;
        margin-top: -.4rem !important;

        .has-text-info {
            align-items: center;
            display: flex;
            -webkit-user-select: none; // Safari
            -moz-user-select: none; // Firefox
            -ms-user-select: none; // IE10+/Edge
            user-select: none; // General

            &:hover {
                color: $link !important;
                cursor: pointer;
            }

            .arrows-container {
                min-width: fit-content;
                margin-right: .15rem;

                .arrow-up {
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-bottom: 5px solid $info;
                    margin-bottom: 2px;
                }

                .arrow-down {
                    width: 0;
                    height: 0;
                    border-left: 5px solid transparent;
                    border-right: 5px solid transparent;
                    border-top: 5px solid $info;
                }
            }

            .hidden {
                visibility: hidden;
            }
        }

        #option-1 {
            margin: 0 1rem 0 1.75rem;
        }
    }
}
</style>
