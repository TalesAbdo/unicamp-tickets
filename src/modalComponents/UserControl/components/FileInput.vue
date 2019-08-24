<template>
    <div id="file-input-container">
        <label class="file-label">
            <input
                ref="formFiles"
                class="file-input"
                type="file"
                accept="image/*"
                name="form-file-input"
                @change="onChange">

            <figure v-if="imagePath" class="image">
                <img id="user-image-creation" src="../../../../server/files/user-image/default-image.jpg">
            </figure>
            <span v-else>
                <i class="fas fa-upload"/>
            </span>
         </label>
    </div>
</template>

<script>
import { mapState } from 'vuex';

export default {
    data() {
        return {
            imagePath: null,
        };
    },
    computed: {
        ...mapState({
            image: state => state.user.image,
        }),
    },
    methods: {
        onChange() {
            const files = Array.prototype.map.call(
                this.$refs.formFiles.files,
                item => item
            );

            // reseting input type, so the same files can be added again
            this.$refs.formFiles.type = 'text';
            this.$refs.formFiles.type = 'file';

            this.$emit('change', files[0]);
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
    }
}
</style>
