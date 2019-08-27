<template>
    <figure class="image">
        <img :id="`user-image-${imageId}`" class="is-rounded" :src="getImageUrl">
    </figure>
</template>

<script>
const uuidv4 = require('uuid/v4');

export default {
    name: 'userImage',
    props: {
        imagePath: { type: String, required: true, default: 'default-image' }
    },
    data() {
        return {
            imageId: uuidv4()
        };
    },
    computed: {
        getImageUrl() {
            if (this.imagePath) {
                return `img/${this.imagePath}.jpg`;
            }
            return 'img/default-image.jpg';
        }
    },
    watch: {
        imagePath() {
            // this.setImageSrc();
        }
    },
    mounted() {
        // this.setImageSrc();
    },
    methods: {
        setImageSrc() {
            if (this.imagePath) {
                const image = require(`server/files/user-image/${this.imagePath}.jpg`);
                document.querySelector(`#user-image-${this.imageId}`).src = image;
            }
        }
    }
};
</script>
