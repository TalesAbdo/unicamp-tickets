<template>
    <div class="input-container">
        <span class="input-title">{{inputTitle}}</span>
        <input class="input-text" type="text" :placeHolder="placeHolder" autocomplete="off" />
        <div class="line"/>
    </div>
</template>

<script>
export default {
    name: 'inputText',
    props: {
        inputTitle: { type: String, required: true, default: '' },
        inputPlaceHolder: { type: String, required: true, default: '' },
    },
    computed: {
        placeHolder() {
            return `Digite aqui ${this.inputPlaceHolder}`;
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
    }

    .input-text {
        padding: 9px 7px 4px;
        display: block;
        border: none;
        width: 100%;
        color: $black;
        font-style: italic;
        background-color: transparent;
        font-size: 0.75rem;

        &:hover {
            cursor: text;
        }
    }

    .line {
        height: 2px;
        background-color: $primary;
    }
}
</style>
