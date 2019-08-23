<template>
<div class="assigned-dropdown-container">
    <span class="dropdown-title">Responsável</span>
    <div :class="{'is-active': active}" class="dropdown">
        <div class="dropdown-trigger">
            <button v-if="isSupport && !isClosed" type="button" class="button" aria-haspopup="true" aria-controls="dropdown-menu" @click="controlDropdown">
                <figure v-if="triggerValue" class="image is-24x24">
                    <UserImage :imagePath="assignedImage"/>
                </figure>
                <span>{{triggerValue || 'Escolha um responsável'}}</span>
            </button>
            <div v-else class="pure-text">
                <figure v-if="triggerValue" class="image is-24x24">
                    <UserImage :imagePath="assignedImage"/>
                </figure>
                <span>{{triggerValue || 'Sem responsável'}}</span>
            </div>
        </div>
        <div class="dropdown-menu" id="dropdown-menu" role="menu">
            <div class="dropdown-content">
            <a  v-for="(member) in members" :key="member.id" class="dropdown-item is-flex" @click="memberClicked(member.id)">
                <figure class="image is-24x24">
                    <UserImage :imagePath="member.image"/>
                </figure>
                {{member.name}}
            </a>
            </div>
        </div>
    </div>
</div>
</template>

<script>
import { mapState } from 'vuex';
import UserImage from 'shared/UserImage.vue';


export default {
    name: 'assignedDropdown',
    components: {
        UserImage
    },
    props: {
        members: { type: Array, required: true },
        triggerValue: { type: String, required: false, default: '' },
        assignedImage: { type: String, required: false },
        isClosed: { type: Boolean, required: false, default: false },
    },
    computed: {
        ...mapState({
            isSupport: state => state.user.isSupport
        }),
    },
    data() {
        return {
            active: false
        };
    },
    methods: {
        memberClicked(assignedId) {
            this.$emit('click', assignedId);
            this.controlDropdown();
        },
        controlDropdown() {
            this.active = !this.active;
        }
    }
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.assigned-dropdown-container {
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    margin-bottom: .5rem;

    .dropdown-title {
        font-weight: bold;
        line-height: 20px !important;
        display: block;
        color: $black;
        cursor: default;
        user-select: none;
        margin-right: .5rem;
    }

    .dropdown {
        .button {
            margin-top: 0;
            padding: 0;
            border: none;
            color: $info;
            height: 30px !important;

            &:hover {
                color: $link;
                cursor: pointer;
            }

            &:focus {
                box-shadow: 0 0 0px !important;
                outline-offset: 0px !important;
                outline: none !important;
            }
        }

        .pure-text {
            display: flex;
            align-items: center;
            height: 30px !important;
        }

        .dropdown-content {
            padding: 0;
        }

        figure {
            margin-right: .5rem;
            display: flex;
            align-items: center;
        }
    }
}
</style>
