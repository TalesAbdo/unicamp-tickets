<template>
    <div id="file-button-container" :class="{ 'max-quantity':maxQuantity }">
        <label class="file-label">
            <input
                ref="formFiles"
                class="file-input"
                id="file-input-attachment"
                type="file"
                accept="application/msword, application/vnd.ms-excel, application/vnd.ms-powerpoint, text/plain, application/pdf, image/*, video/*, audio/*"
                name="form-file-input"
                @change="onChange">

            <span>
                <i class="fas fa-upload"/>
            </span>
         </label>
    </div>
</template>

<script>

export default {
    props: {
        filesQuantity: { type: Number, required: false, default: 0 }
    },
    data() {
        return {
            maxQuantity: false
        };
    },
    watch: {
        filesQuantity() {
            if (this.filesQuantity >= 3) {
                this.maxQuantity = true;
                document.getElementById('file-input-attachment').disabled = true;
            } else {
                this.maxQuantity = false;
                document.getElementById('file-input-attachment').disabled = false;
            }
        }
    },
    methods: {
        onChange(event) {
            if (event.target.files[0]) {
                const file = event.target.files[0];
                if (this.verifyFile(file)) {
                    const fileReader = new FileReader();
                    fileReader.addEventListener('load', () => {
                        this.$emit('fileInserted', file, fileReader.result);
                    });
                    fileReader.readAsDataURL(file);
                }

                // resets input so the same file can be inserted again
                this.$refs.formFiles.type = 'text';
                this.$refs.formFiles.type = 'file';
            }
        },
        verifyFile(file) {
            if (file && file.size >= '10485760') {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'O arquivo ultrapassa 10mb.',
                    type: 'warn'
                });
                return false;
            }
            if (file && !((file.type.split('/')[0] === 'image')
                || (file.type.split('/')[0] === 'video')
                || (file.type.split('/')[0] === 'audio')
                || (file.type === 'application/pdf')
                || (file.type === 'application/msword')
                || (file.type === 'application/vnd.ms-excel')
                || (file.type === 'application/vnd.ms-powerpoint'))) {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'Insira uma imagem, vídeo, áudio, PDF ou arquivo do Office (Word, Excel e PowerPoint).',
                    type: 'warn'
                });
                return false;
            }
            if (file && (file.name.length > 60)) {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'Nome muito grande para o arquivo.',
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

#file-button-container {
    height: 35px;
    width: 35px;
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
        }

        span {
            color: $black;
        }
    }
}

.max-quantity {
    opacity: 0.5;
}
</style>
