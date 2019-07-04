<template>
    <div class="input-container">
        <span class="input-title">{{inputTitle}}</span>
        <input class="input-text" :type="type" :placeHolder="placeHolder" autocomplete="off" v-model="typedValue"/>
        <div class="line"/>
    </div>
</template>

<script>
export default {
    name: 'inputText',
    props: {
        inputTitle: { type: String, required: true },
        inputPlaceHolder: { type: String, required: true },
        preValue: { type: String, required: false, default: '' },
        type: { type: String, required: false, default: 'text' },
    },
    computed: {
        placeHolder() {
            return `Digite aqui ${this.inputPlaceHolder}`;
        },
        typedValue: {
            get() { return this.preValue; },
            set(typedValue) { this.$emit('input', typedValue); }
        },
    },
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.input-container{
    width: 100%;

    .input-title {
        font-weight: bold;
        line-height: 20px !important;
        display: block;
        color: $black;
        cursor: default;
        user-select: none;
    }

    .input-text {
        padding: 5px 7px 4px;
        display: block;
        border: none;
        width: 100%;
        color: $black;
        font-style: italic;
        background-color: transparent;
        font-size: 0.95rem;

        &:hover {
            cursor: text;
        }

        &:focus {
            outline-offset: 0px !important;
            outline: none !important;
        }
    }

    .line {
        height: 2px;
        background-color: $primary;
    }
}
</style>
