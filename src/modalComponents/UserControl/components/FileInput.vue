<template>
    <div id="file-input-container">
        <label class="file-label">
            <input
                ref="formFiles"
                :multiple="isMulti"
                class="file-input"
                type="file"
                name="form-file-input"
                @change="onChange">

            <span class="file-cta">
                <span class="archive-file-icon">
                    <i class="fas fa-upload" />
                </span>
                <span class="label">
                    Insira uma foto
                </span>
            </span>
        </label>
    </div>
</template>

<script>
export default {
    props: {
        isMulti: { type: Boolean, required: false, default: true },
        isInline: { type: String, required: false, default: '' }
    },
    methods: {
        onChange() {
            const files = Array.prototype.map.call(
                this.$refs.stFormFiles.files,
                item => item
            );
            // reseting input type, so the same files can be added again
            this.$refs.formFiles.type = 'text';
            this.$refs.formFiles.type = 'file';

            this.$emit('change', files);
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

        .file-cta {
            display: flex;
            flex-direction: column;
            justify-content: center;
            align-items: center;
            height: 100%;
            border: none;

            .label {
                white-space: normal;
                text-align: center;
            }
        }
    }
}
</style>
