<template>
    <div :class="{'is-active': show}" class="modal new-member">
        <div class="modal-background" @click="hide"></div>
        <div class="modal-content" autocomplete="off">
            <Title titleValue="Novo membro" class="header-text"/>
            <div class="search">
                <span class="has-text-weight-bold">Procurar usuários</span>
                <label :class="{ isActive:activeSearch }" class="search-bar" for="inputnav">
                    <i class="fas fa-search"/>
                    <input placeholder="Digite aqui o nome ou email" class="search-input" type="text"
                            @input="search" @focus="activateSearch" @focusout="desactivateSearch">
                </label>
                <UserSearchDropdown :typedText="typedText" :active="activeSearch" :isSearching="isSearching" :result="result" @onclick="onItemClick"/>
            </div>
            <div class="chosen-users-container">
                <span class="has-text-weight-bold">Usuários escolhidos</span>
                <div class="chosen-users">
                    <div v-for="user in chosenUsers" :key="user.id" class="user">
                        <figure class="image is-32x32">
                            <img class="is-rounded" src="https://pm1.narvii.com/6626/77bcaf576f221820644c375a2720f21470fba161_128.jpg">
                        </figure>
                            <span class="text has-text-weight-bold">{{firstName(user.name)}}</span>
                    </div>
                </div>
            </div>
            <button type="button" class="button is-black">Adicionar usuários como membros</button>
        </div>
        <button class="modal-close is-large" aria-label="close"></button>
    </div>
</template>

<script>
import Title from 'shared/Title.vue';
import UserSearchDropdown from './components/UserSearchDropdown.vue';

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
            chosenUsers: [
                { id: 1, name: 'Tales de Mileto dos Santos Prado', isAdmin: true },
                { id: 2, name: 'Ana Carolina de Souza' },
                { id: 3, name: 'José Pedro Martins' },
                { id: 4, name: 'Maria dos Santos' },
                { id: 5, name: 'Ricardo José Pinheiros' }
            ],
            activeSearch: false,
            isSearching: false,
            result: [{ id: 1, name: 'Tales de Mileto dos Santos Prado', email: 'talesabdo@outlook.com' },
                { id: 1, name: 'Tales de Mileto dos Santos Prado', email: 'talesabdo@outlook.com' },
                { id: 1, name: 'Tales de Mileto dos Santos Prado', email: 'talesabdo@outlook.com' }],
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
            // this.chosenUsers.push(event);
            this.isSearching = false;
        },
        activateSearch() {
            this.activeSearch = true;
        },
        desactivateSearch() {
            setTimeout(() => { this.activeSearch = false; }, 150);
        },
        onItemClick(element) {
            console.log(element);
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

                .user {
                    display: flex;
                    align-items: center;
                    margin: .5rem .5rem 0 0;
                }
            }
        }

        .is-black {
            align-self: flex-end;
        }
    }
}
</style>
