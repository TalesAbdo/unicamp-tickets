<template>
   <div class="person-information">
        <figure class="image is-64x64">
            <img class="is-rounded" :src="imageSrc">
        </figure>
        <div class="text-info">
            <span class="first-line has-text-weight-bold">{{firstLine}}</span>
            <span class="second-line">{{secondLine}}</span>
        </div>
   </div>
</template>

<script>
export default {
    name: 'personInformation',
    props: {
        firstLine: { type: String, required: true },
        secondLine: { type: String, required: true },
        imageSrc: { type: String, required: true },
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

.person-information {
    display: flex;

    .image {
        margin-right: 0.75rem;
    }

    .text-info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .first-line {

        }
    }
}
</style>
