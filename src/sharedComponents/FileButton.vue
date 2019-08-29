<template>
    <div id="file-button-container">
        <label class="file-label">
            <input
                ref="formFiles"
                class="file-input"
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
    methods: {
        onChange(event) {
            const file = event.target.files[0];
            if (this.verifyFile(file)) {
                const fileReader = new FileReader();
                fileReader.addEventListener('load', () => {
                    this.$emit('fileInserted', fileReader.result);
                });
                fileReader.readAsDataURL(file);
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
            } if (file && (file.type.split('/')[0] !== 'image')) {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'Insira uma imagem, vídeo, áudio ou arquivo do Office (Word, Excel e PowerPoint).',
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
    margin-top: 8px;
    height: 30px;
    width: 30px;
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
