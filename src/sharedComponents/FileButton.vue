<template>
    <button class="button">
        <input class="file-input" type="file" name="resume">
        <i class="fas fa-upload has-text-primary" />
    </button>
</template>

<script>
export default {
    name: 'inputText',
    methods: {
        onClick() {
            this.$emit('click');
        },
    }
};
</script>
