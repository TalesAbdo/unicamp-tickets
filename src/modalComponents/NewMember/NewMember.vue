<template>
    <div :class="{'is-active': show}" class="modal new-member">
        <div class="modal-background" @click="hide"></div>
        <div class="modal-content" autocomplete="off">
            <Title titleValue="Novo membro" class="header-text"/>
            <div class="search">
                <span class="has-text-weight-bold">Procurar usuários</span>
                <label :class="{ isActive:activeSearch }" class="search-bar" for="inputnav">
                    <i class="fas fa-search"/>
                    <input placeholder="Digite aqui o nome ou email" class="search-input" type="text" v-model="typedText"
                            @input="search" @focus="activateSearch" @focusout="desactivateSearch">
                </label>
                <UserSearchDropdown :typedText="typedText" :active="activeSearch" :isSearching="isSearching" :result="searchResult" @onclick="onUserClick"/>
            </div>
            <div class="chosen-users-container">
                <span class="has-text-weight-bold">Usuários escolhidos</span>
                <div class="chosen-users">
                    <div v-for="user in chosenUsers" :key="user.id" class="user" @click="removeUser(user.id)">
                        <figure class="image is-32x32">
                            <img class="is-rounded" src="https://pm1.narvii.com/6626/77bcaf576f221820644c375a2720f21470fba161_128.jpg">
                        </figure>
                            <span class="name text has-text-weight-bold">{{firstName(user.name)}}</span>
                            <span class="remove text has-text-weight-bold has-text-primary">Remove</span>
                    </div>
                </div>
            </div>
            <button type="button" class="button is-black" @click="addMembers">Adicionar usuários como membros</button>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import Title from 'shared/Title.vue';
import UserSearchDropdown from './components/UserSearchDropdown.vue';

const axios = require('axios');

export default {
    name: 'newMember',
    components: {
        Title, UserSearchDropdown
    },
    props: {
        show: { type: Boolean, default: false }
    },
    data() {
        return {

            activeSearch: false,
            isSearching: false,
            chosenUsers: [],
            searchResult: [],
            typedText: '',
            focusOut: true
        };
    },
    methods: {
        hide() {
            this.$emit('hide');
        },
        firstName(name) {
            return name.split(' ')[0];
        },
        async search(event) {
            this.typedText = (event.target.value.toLowerCase());
            this.isSearching = true;
            await this.getUserList();
            this.isSearching = false;
        },
        activateSearch() {
            this.activeSearch = true;
        },
        desactivateSearch() {
            setTimeout(() => { this.activeSearch = false; }, 250);
        },
        onUserClick(element) {
            this.typedText = '';
            let alreadyInList = false;
            this.chosenUsers.map((item) => {
                if (item.id === element.id) {
                    this.$notify({
                        group: 'foo',
                        title: 'Cuidado!',
                        text: 'Este usuário já está na lista.',
                        type: 'warn'
                    });
                    alreadyInList = true;
                }
                return true;
            });
            if (!alreadyInList) {
                this.chosenUsers.push(element);
            }
        },
        getUserList() {
            axios.post('/api/user/bynameandemail', { typedText: this.typedText })
                .then((response) => { this.searchResult = response.data; })
                .catch(() => {
                    this.$notify({
                        group: 'foo',
                        title: 'Erro!',
                        text: 'Não foi possível obter a lista de membros.',
                        type: 'error'
                    });
                });
        },
        removeUser(id) {
            const index = this.chosenUsers.findIndex(item => item.id === id);
            if (index !== -1) {
                this.chosenUsers.splice(index, 1);
            }
        },
        addMembers() {
            try {
                this.chosenUsers.forEach((user) => {
                    axios.post('/api/usersupport/new', { userId: user.id });
                });
                this.$notify({
                    group: 'foo',
                    title: 'Sucesso!',
                    text: 'Usuário(s) adicionado(s) com êxito.',
                    type: 'success'
                });
                this.chosenUsers = [];
                this.hide();
            } catch (e) {
                this.$notify({
                    group: 'foo',
                    title: 'Erro!',
                    text: 'Não foi possível adicionar o(s) membro(s).',
                    type: 'error'
                });
            }
        },
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.modal.new-member {
    .modal-background {
        background-color: rgba(76, 76, 76, 0.5);
    }

    .modal-content {
        width: 50%;
        padding: 1.25rem;
        display: flex;
        align-items: flex-start;
        flex-direction: column;
        background-color: $white;
        filter: drop-shadow(0 0 5px $black);

        .header-text {
            align-self: center;
            margin-bottom: 1rem;
            width: fit-content;
        }

        .search {
            display: flex;
            flex-direction: column;
            width: 100%;
            margin-bottom: 2rem;

            .search-bar {
                margin: auto;
                width: 100%;
                padding: .4rem 0.7rem;
                display: flex;
                align-items: center;
                justify-content: center;
                border-bottom: 2px solid $primary;
                transition: width .2s linear;

                input {
                    margin-left: .5rem;
                }

                .search-input {
                    outline: 0;
                    width: 100%;
                    border: none;
                }
            }
        }

        .chosen-users-container {
            align-self: flex-start;
            margin-bottom: 2rem;

            .chosen-users {
                width: 100%;
                display: flex;
                flex-wrap: wrap;
                margin-top: .5rem;

                .user {
                    display: flex;
                    align-items: center;
                    margin-right: .8rem;
                    transition: .2s ease-in;

                    &:hover {
                        transform: scale(1.025);
                        transition: .2s ease-out;
                        cursor: pointer;

                        > .name, .image {
                            opacity: .3;
                            transition: .2 ease-out;
                        }
                        > .remove {
                            opacity: 1 !important;
                            transition: .2 ease-out;
                        }
                    }

                    .text {
                        margin-left: .25rem;
                        line-height: 10px;
                    }

                    .remove {
                        position: absolute;
                        opacity: 0;
                        transition: .2 ease-in;

                    }
                }
            }
        }

        .is-black {
            align-self: flex-end;
        }
    }
}
</style>
