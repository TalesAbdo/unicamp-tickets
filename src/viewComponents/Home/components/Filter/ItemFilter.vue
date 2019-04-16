<template>
    <span :class="{'checked': checked}" class="filter-item" @click="onClick">
        <span class="name">{{ label }}</span>
        <icon :class="{hidden: !checked}" name="check"></icon>
    </span>
</template>

<script>
import Icon from 'vue-awesome/components/Icon.vue';

export default {
    components: { Icon },
    props: {
        value: {
            type: Number,
            required: false,
            default: 0
        },
        label: {
            type: String,
            required: false,
            default: ''
        },
        checked: {
            type: Boolean,
            required: true
        }
    },
    methods: {
        onClick() {
            this.$emit('click', { value: this.value, checked: this.checked });
        }
    }
};
</script>
<style lang="scss">
@import '~src/css/main.scss';

.filter-item {
    background-color: $light-gray;
    color: $black;
    cursor: pointer;
    display: flex;
    font-size: .8rem;
    font-weight: bold;
    line-height: 1.42857143;
    margin-bottom: 1px;
    padding: .5rem 1rem;
    transition: background-color 250ms;
    width: 100%;

    .name {
        flex-grow: 1;
        overflow: hidden;
        text-overflow: ellipsis;
        white-space: nowrap;
    }

    &:hover {
        background-color: $white;
    }

    &.checked {
        color: $link;
        cursor: default;
        font-weight: bold;
    }

    .hidden {
        display: none;
    }
}

</style>
