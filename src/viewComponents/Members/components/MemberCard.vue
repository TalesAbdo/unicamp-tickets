<template>
    <div class="member-card">
        <div class="member-image">
            <figure class="image is-64x64">
                <UserImage :imagePath="member.email"/>
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
import axios from 'src/axios/axios.js';
import { mapState } from 'vuex';
import UserImage from 'shared/UserImage.vue';

export default {
    name: 'memberCard',
    components: {
        UserImage
    },
    props: {
        member: { type: Object, required: true }
    },
    computed: {
        ...mapState({
            id: state => state.user.id
        }),
    },
    methods: {
        removeMember() {
            if (this.id === this.member.id) {
                this.$notify({
                    group: 'foo',
                    title: 'Cuidado!',
                    text: 'Você não pode se remover, peça para outro usuário.',
                    type: 'warn'
                });
            } else {
                axios.delete(`user/support/delete/${this.member.id}`)
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
