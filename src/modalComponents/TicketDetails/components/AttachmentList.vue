<template>
    <div class="attachment-content">
        <div class="attachment-list">
            <span class="has-text-weight-bold">Anexos</span>
            <a v-for="(item, index) in attachmentList" :key="index" >
                <span>{{item.name}}</span>
            </a>
        </div>
        <FileButton/>
    </div>
</template>

<script>
import FileButton from 'shared/FileButton.vue';

export default {
    name: 'attachmentList',
    components: {
        FileButton
    },
    props: {
    },
    data() {
        return {
            attachmentList: [{ id: 1, name: 'Comprovante.jpg' }, { id: 2, name: 'Foto_Doc.jpg' }, { id: 3, name: 'Fatura.pdf' }]
        };
    },
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.attachment-content {
    display: flex;
    justify-content: space-between;

    .attachment-list {
        display: flex;
        flex-direction: column;
        width: 100%;

        a {
            color: $info;
            margin-bottom: -.1rem;

            &:hover {
                color: $link;
            }
        }
    }
}
</style>
