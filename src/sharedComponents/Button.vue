<template>
   <button class="button is-success" @click="onClick">
        <i :class="icon" class="fas is-size-5" />
        <span class="has-text-weight-bold is-size-6">
            {{value}}
        </span>
    </button>
</template>

<script>
export default {
    name: 'inputText',
    props: {
        icon: { type: String, required: false, default: '' },
        value: { type: String, required: true },
    },
    methods: {
        onClick() {
            this.$emit('click');
        },
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.button {
    display: flex;
    align-items: center;
    justify-content: space-evenly !important;
    height: 42px !important;

    .is-size-5 {
        line-height: 19px;
    }
}
</style>
