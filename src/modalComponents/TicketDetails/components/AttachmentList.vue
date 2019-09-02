<template>
    <div class="attachment-content">
        <div class="attachment-list">
            <span class="has-text-weight-bold">Anexos</span>
            <span v-for="(item, index) in attachmentList" :key="index" @click="getAttachment(item)">
                <span class="attachment-item">{{item.name}}</span>
            </span>
        </div>
    </div>
</template>

<script>
import axios from 'src/axios/axios.js';

export default {
    name: 'attachmentList',
    props: {
        ticketId: { type: Number, required: true }
    },
    data() {
        return {
            attachmentList: []
        };
    },
    watch: {
        ticketId() {
            this.getAttachments();
        }
    },
    mounted() {
        this.getAttachments();
    },
    methods: {
        getAttachments() {
            if (this.ticketId) {
                axios.get(`attachment/ticket/${this.ticketId}`)
                    .then((response) => {
                        this.attachmentList = response.data;
                    })
                    .catch(() => {
                        this.$notify({
                            group: 'foo',
                            title: 'Erro!',
                            text: 'Não foi possível obter os anexos do ticket.',
                            type: 'error'
                        });
                    });
            }
        },
        getAttachment(item) {
            axios.get(`attachment/${item.path}`)
                .then((response) => {
                    console.log(response);
                    fetch(response.data)
                        .then(res => res.blob())
                        .then((blob) => {
                            const url = window.URL.createObjectURL(blob);
                            const helper = document.createElement('a');
                            helper.setAttribute('href', url);
                            helper.setAttribute('download', item.name);
                            helper.click();
                        });
                })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Não foi possível obter o anexo.',
                        type: 'error'
                    });
                });
        }
    }
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

        .attachment-item {
            color: $info;
            margin-bottom: -.1rem;

            &:hover {
                color: $link;
            }
        }
    }
}
</style>
