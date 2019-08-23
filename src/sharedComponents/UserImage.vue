<template>
    <figure class="image">
        <img :id="`user-image-${imageId}`" class="is-rounded" src="../../server/files/user-image/default-image.jpg">
    </figure>
</template>

<script>
const uuidv4 = require('uuid/v4');

export default {
    name: 'userImage',
    props: {
        imagePath: { type: String, required: true, default: 'default-image.jpg' }
    },
    data() {
        return {
            imageId: uuidv4()
        };
    },
    watch: {
        imagePath() {
            this.setImageSrc();
        }
    },
    mounted() {
        this.setImageSrc();
    },
    methods: {
        setImageSrc() {
            const image = require(`server/files/user-image/${this.imagePath}`);
            document.querySelector(`#user-image-${this.imageId}`).src = image;
        }
    }
};
</script>
