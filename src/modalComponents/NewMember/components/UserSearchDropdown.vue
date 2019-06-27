
<template>
    <div :class="{ searchResultsActive:!active }" class="search-results">
        <!-- No search inputed -->
        <div v-show="!typedText" class="start-typing">
            <icon class="icon" name="keyboard"/>
            <div class="text-display">
                <small>Digite para pesquisar</small>
            </div>
        </div>

        <!-- Search request fired -->
        <div v-show="isSearching && typedText" class="searching">
            <icon class="icon" name="search"/>
            <div class="text-display">
                <small>Procurando por usuários</small>
            </div>
        </div>

        <!-- Something inputed and no results found -->
        <div v-show="!result.length && !isSearching && typedText" class="not-found">
            <icon class="icon" name="frown"/>
            <div class="text-display">
                <p class="has-text-weight-bold">Nada encontrado</p>
                <small class="is-italic">Tente procurar por algo diferente!</small>
            </div>
        </div>

        <!-- User search results -->
        <div v-show="result.length && !isSearching && typedText" class="results">
            <a v-for="(item, index) in result" :key="index" class="result-item" @click="userSelected(item)">
                <PersonInformation :firstLine="item.name" :secondLine="item.email" imageSrc="https://s.ebiografia.com/assets/img/authors/ta/le/tales-de-mileto-l.jpg"/>
            </a>
        </div>
    </div>
</template>

<script>
import PersonInformation from 'shared/PersonInformation.vue';
import Icon from 'vue-awesome/components/Icon.vue';

export default {
    name: 'userSearchDropdown',
    components: { PersonInformation, Icon },
    props: {
        typedText: { type: String, required: true, default: '' },
        active: { type: Boolean, required: true, default: false },
        isSearching: { type: Boolean, required: true, default: false },
        result: { type: Array, required: true, default: () => {} }
    },
    methods: {
        userSelected(item) {
            this.$emit('onclick', item);
        },
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.search-results {
    position: absolute;
    margin-top: 3.4rem;
    width: 94%;
    overflow: auto;
    max-height: 9rem;
    z-index: 9;
    box-shadow: 0 .0 .5rem rgba(0,0,0, .2);
    color: $dark-gray;
    background-color: $white;

    .start-typing, .searching, .not-found {
        padding: 2rem 0;
        width: 100%;
        display: flex;
        align-items: center;
        justify-content: center;

        .icon {
            font-size: 2rem;
        }

        .text-display {
            margin-left: .5rem;
            display: block;
            color: $dark-gray;
        }
    }

    .result-item {
        padding: .825rem 2rem;
        border-bottom: 1px solid $light-gray;
        display: flex;
        flex-direction: row;
        justify-content: flex-start;
        color: $dark-gray;

        &:hover {
            background-color: $light-gray;
            cursor: pointer;
        }

        &:active {
            background-color: $light-gray;
        }
    }
}

.searchResultsActive {
    display: none;
}
</style>
