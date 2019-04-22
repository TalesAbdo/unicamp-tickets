<template>
    <div class="service-card">
        <div class="information-container">
            <span class="is-size-4 has-text-weight-bold">{{service.name}}</span>
            <span class="service-description">{{service.description}}</span>
        </div>
        <div class="edition-container" @click="onClick">
            <i class="fas fa-pen"/>
            <span>Editar</span>
        </div>
    </div>
</template>

<script>

export default {
    name: 'serviceCard',
    props: {
        service: { type: Object, required: true }
    },
    data() {
        return {
        };
    },
    methods: {
        onClick() {
            console.log('here');
            this.$emit('modalControl', 'editService');
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
</style>
