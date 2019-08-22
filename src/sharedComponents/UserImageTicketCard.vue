<template>
    <figure class="image">
        <img class="user-image12 is-rounded">
    </figure>
</template>

<script>

export default {
    name: 'userImageTicketCard',
    props: {
        imagePath: { type: String, required: true }
    },
    mounted() {
        this.getNewImage();
    },
    methods: {
        getNewImage() {
            const image = require(`server/files/user-image/${this.imagePath}`);
            console.log('image', image);
            document.querySelector('.user-image12').src = image;
        }
    }
};
</script>
