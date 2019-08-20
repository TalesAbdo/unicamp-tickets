<template>
    <figure class="image">
        <img id="user-image" class="is-rounded" :src="image">
    </figure>
</template>

<script>

export default {
    name: 'userImage',
    props: {
        imagePath: { type: String, required: true, default: 'default-image.jpg'}
    },
    data() {
        return {
            image: require(`../../../server/files/user-image/${this.imagePath}`)
        };
    },
};
</script>
