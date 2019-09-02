<template>
    <div class="attachment-content">
        <div class="attachment-list">
            <span class="has-text-weight-bold">Anexos</span>
            <a v-for="(item, index) in attachmentList" :key="index" >
                <span>{{item.name}}</span>
            </a>
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
