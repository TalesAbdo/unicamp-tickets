<template>
    <div class="service-card">
        <div class="information-container">
            <span class="is-size-4 has-text-weight-bold">{{service.name}}</span>
            <span class="service-description">{{service.description}}</span>
        </div>
        <div class="right-container">
            <span v-if="!service.isActive" class="archived-tag">Arquivado</span>
            <div class="edition-container" @click="onClick">
                <i class="fas fa-pen"/>
                <span>Editar</span>
            </div>
        </div>
    </div>
</template>

<script>

export default {
    name: 'serviceCard',
    props: {
        service: { type: Object, required: true }
    },
    methods: {
        onClick() {
            this.$emit('modalControl', this.service);
        },
    }
};
</script>


<style lang="scss">
@import '~src/css/main.scss';

.service-card {
    margin-bottom: 1.75rem;
    width: 100%;
    display: flex;
    justify-content: space-between;
    border-bottom: 1px solid $black;
    transition: .3s;

    &:hover {
        transform: scale(1.05);
        transition: .3s;
    }

    .information-container {
        display: flex;
        flex-direction: column;

        .service-description {
            color: $dark-gray;
        }

        span {
            word-break: break-all;
        }
    }

    .right-container {
        display: flex;
        align-items: center;
        justify-content: flex-end;
        max-width: 25%;

        .archived-tag {
            color: $primary;
            margin: 0 1rem;
            font-size: 14px;
        }

        .edition-container {
            align-self: center;
            display: flex;
            align-items: center;
            justify-content: center;
            border-radius: 10px;
            padding: .5rem;
            transition: .3s;

            &:hover {
                background-color: $light-gray;
                transition: .3s;
                cursor: pointer;
            }

            span {
                margin-left: .3rem;
            }
        }
    }
}
</style>
