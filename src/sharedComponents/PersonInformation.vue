<template>
   <div class="person-information">
        <figure class="image is-48x48">
            <img class="is-rounded" :src="imageSrc">
        </figure>
        <div class="text-info">
            <span class="text has-text-weight-bold">{{firstLine}}</span>
            <span class="text is-italic">{{secondLine}}</span>
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
        margin-right: 0.2rem;
    }

    .text-info {
        display: flex;
        flex-direction: column;
        justify-content: center;

        .text {
            font-size: .9rem;

        }
    }
}
</style>
