<template>
    <div class="input-container">
        <span class="title">{{titleValue}}</span>
    </div>
</template>

<script>
export default {
    props: {
        titleValue: { type: String, required: true },
    },
};
</script>

<style lang="scss" scoped>
@import '~src/css/main.scss';

.input-container{
    width: 100%;
    border-bottom: 5px solid $black;
    padding-bottom: 0.3rem;
    margin-bottom: 1rem;
    font-weight: 1000;
    user-select: none;

    .title {
        font-size: 2rem;
        color: $black;
    }
}
</style>
