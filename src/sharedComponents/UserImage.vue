<template>
    <figure class="image">
        <img :id="`user-image-${imageId}`" class="is-rounded" src="../../server/files/user-image/default-image.jpg" @error='setBaseSource()'>
    </figure>
</template>

<script>
const uuidv4 = require('uuid/v4');

export default {
    name: 'userImage',
    props: {
        imagePath: { type: String, required: true }
    },
    data() {
        return {
            imageId: uuidv4()
        };
    },
    watch: {
        imageUpdated() {
            this.setImageSource();
        }
    },
    mounted() {
        this.setImageSource();
    },
    methods: {
        setImageSource() {
            let image;
            if (this.imagePath) {
                image = `img/${this.imagePath}.jpg`;
            } else {
                image = require('server/files/user-image/default-image.jpg');
            }
            document.querySelector(`#user-image-${this.imageId}`).src = image;
            this.$emit('imagesourceUpdated');
        },
        setBaseSource() {
            const image = require('server/files/user-image/default-image.jpg');
            document.querySelector(`#user-image-${this.imageId}`).src = image;
        },
    }
};
</script>
