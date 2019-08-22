<template>
    <figure class="image">
        <img class="user-image is-rounded" src="../../server/files/user-image/default-image.jpg">
    </figure>
</template>

<script>

export default {
    name: 'userImage',
    props: {
        imagePath: { type: String, required: true, default: 'default-image.jpg' }
    },
    mounted() {
        this.getNewImage();
    },
    methods: {
        getNewImage() {
            const image = require(`server/files/user-image/${this.imagePath}`);
            console.log('image', image);
            document.querySelector('.user-image').src = image;
        }
    }
};
</script>
