<template>
    <div class="textarea-container">
        <span class="textarea-title">{{textareaTitle}}</span>
        <textarea class="textarea" :placeholder="placeHolder"></textarea>
    </div>
</template>

<script>
export default {
    name: 'textareaText',
    props: {
        textareaTitle: { type: String, required: true },
        textareaPlaceHolder: { type: String, required: true },
    },
    computed: {
        placeHolder() {
            return `Digite aqui ${this.textareaPlaceHolder}`;
        },
    },
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.textarea-container {
    width: 100%;

    .textarea-title {
        font-weight: bold;
        line-height: 20px !important;
        display: block;
        color: $black;
        cursor: default;
        user-select: none;
        margin-bottom: .55rem;
    }

    .textarea {
        border: 2px solid $primary;
        color: $black;
        max-height: 350px !important;

        &:hover {
            border: 2px solid $primary;
        }

        &::placeholder {
            color: $dark-gray;
        }

        &:focus {
            border: 2px solid $primary !important;
            box-shadow: 0 0 0px !important;
            outline-offset: 0px !important;
            outline: none !important;
        }
    }
}
</style>
