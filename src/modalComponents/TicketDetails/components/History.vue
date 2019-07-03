<template>
    <div class="history-content">
        <span class="has-text-weight-bold">Histórico</span>
        <div v-for="(comment, index) in comments" :key="index" class="comment">
            <div class="history-header">
                <figure class="image is-48x48">
                    <img class="is-rounded" src="https://s.ebiografia.com/assets/img/authors/ta/le/tales-de-mileto-l.jpg">
                </figure>
                <span><b>{{writtenUserName(comment.userName)}}</b> <i>{{writtenDate(comment.createdAt)}}</i></span>
            </div>
            <div class="comment-content">
                <span>{{comment.commentText}}</span>
            </div>
            <div v-if="index !== comment.length-1" class="divider"/>
        </div>
    </div>
</template>

<script>

export default {
    name: 'ticketHistory',
    props: {
        comments: { type: Array, required: true }
    },
    data() {
        return {
        };
    },
    computed: {

    },
    methods: {
        writtenUserName(name) {
            return ` ${name} comentou `;
        },
        writtenDate(date) {
            return `às ${date.slice(11, 16)} de ${date.slice(8, 10)}/${date.slice(5, 7)}/${date.slice(0, 4)}`;
        },
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

 .history-content {
    display: flex;
    flex-direction: column;
    width: 100%;

    .has-text-weight-bold {
        margin-bottom: -.25rem;
    }

    .comment {
        display: flex;
        flex-direction: column;

        .history-header {
            margin: .75rem 0 0 1.5rem;
            display: flex;
            align-items: center;

            .image {
                margin-right: .5rem;
            }
        }

        .comment-content {
            padding-left: 5.5rem;
            margin-top: -.25rem;
        }

        .divider {
            align-self: center;
            height: 3px;
            width: 30%;
            border-top: 1px solid $black;
            border-bottom: 1px solid $black;
            margin-top: .75rem;
        }
    }
}
</style>
