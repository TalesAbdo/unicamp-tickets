<template>
    <div id="file-input-container">
        <label class="file-label">
            <input
                ref="formFiles"
                class="file-input"
                type="file"
                accept="image/jpg, image/jpeg, image/png"
                name="form-file-input"
                @change="onChange">

            <figure v-if="textImage" class="image">
                <img id="user-image-creation" :src="textImage">
            </figure>
            <span v-else>
                <i class="fas fa-upload"/>
            </span>
         </label>
    </div>
</template>

<script>

export default {
    props: {
        confirmed: { type: Boolean, required: false, default: false }
    },
    data() {
        return {
            textImage: null,
        };
    },
    watch: {
        confirmed() {
            this.textImage = null;
        }
    },
    methods: {
        onChange(event) {
            const file = event.target.files[0];
            if (this.verifyImage(file)) {
                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    this.textImage = fileReader.result;
                    this.$emit('imageChoosed', fileReader.result);
                });
                fileReader.readAsDataURL(file);
            }
        },
        verifyImage(image) {
            if (image && image.size >= '10485760') {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'A imagem ultrapassa 10mb.',
                    type: 'warn'
                });
                return false;
            } if (image && ((image.type !== 'image/jpeg') && (image.type !== 'image/jpg') && (image.type !== 'image/png'))) {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'Insira uma imagem com extensão JPEG, JPG ou PNG.',
                    type: 'warn'
                });
                return false;
            }
            return true;
        }
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

#file-input-container {
    margin-top: 8px;
    height: 120px;
    width: 120px;
    border: 1.1px $primary solid;
    border-radius: 4px;

    .file-label {
        height: 100%;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .file-input {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            border: none;
            cursor: pointer;
        }

        span {
            color: $black;
        }
    }
}
</style>
