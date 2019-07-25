<template>
    <div class="member-card">
        <div class="member-image">
            <div v-if="member.isAdmin" class="admin-tag">
                <span>Admin</span>
            </div>
            <figure class="image is-64x64">
                <img class="is-rounded" src="https://pm1.narvii.com/6626/77bcaf576f221820644c375a2720f21470fba161_128.jpg">
            </figure>
        </div>

        <div class="member-info">
            <div class="information-container">
                <span class="is-size-5 has-text-weight-bold">{{member.name}}</span>
                <span class="service-description">{{member.email}}</span>
            </div>
            <button type="button" class="button is-danger is-inverted" @click="removeMember">Remover Membro</button>
        </div>
    </div>
</template>

<script>
const axios = require('axios');

export default {
    name: 'memberCard',
    props: {
        member: { type: Object, required: true }
    },
    methods: {
        removeMember() {
            axios.delete(`/api/user/support/delete/${this.member.id}`)
                .then(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Sucesso!',
                        text: 'Membro de suporte deletado com êxito.',
                        type: 'success'
                    });
                    this.$emit('onUpdate');
                })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Não foi possível deletar o membro de suporte, contate o administrador.',
                        type: 'error'
                    });
                });
        }
    }
};
</script>


<style lang="scss">
@import '~src/css/main.scss';

.member-card {
    width: 100%;
    display: flex;
    align-items: flex-end;
    transition: .3s;
    margin-bottom: 1.75rem;

    &:hover {
        transform: scale(1.05);
        transition: .3s;
    }

    .member-image {
        display: flex;
        flex-direction: column;
        align-items: center;
        min-width: fit-content;

        .admin-tag {
            border-radius: 3px;
            padding: .05rem .15rem;
            color: $white;
            background-color: $info;
            font-size: .6rem;
            margin-bottom: .2rem;
            width: fit-content;
        }
    }

    .member-info {
        display: flex;
        justify-content: space-between;
        align-items: center;
        width: 90%;

        .information-container {
            display: flex;
            flex-direction: column;
            margin: 0 1rem 0 .75rem;

            .email-description {
                color: $dark-gray;
            }
        }

        .button:hover {
            border: 1px solid $primary !important;
        }
    }
}
</style>
