<template>
    <div class="ticket-filter">
        <h4>{{ name }}</h4>
        <filter-item
            v-for="(option, index) in options"
            :key="index"
            :value="option.value"
            :label="option.label"
            :checked="isSelected(option)"
            @click="onClick"/>
    </div>
</template>
<script>
import FilterItem from './ItemFilter.vue';

export default {
    components: { FilterItem },
    props: {
        name: {
            type: String,
            required: true
        },
        options: {
            type: Array,
            required: true
        },
        selected: {
            type: Array,
            required: true
        },
        multiple: {
            type: Boolean,
            required: false,
            default: false
        }
    },
    methods: {
        isSelected({ value }) {
            return this.selected.includes(value);
        },
        onClick(event) {
            if (this.multiple) {
                if ((this.selected.includes(event.value))) {
                    const index = this.selected.indexOf(event.value);
                    this.selected.splice(index, 1);
                } else {
                    this.selected.push(event.value);
                }
            } else {
                this.selected.splice(0, this.selected.length);
                this.selected.push(event.value);
            }

            this.$emit('change', { selected: this.selected });
        }
    },
};
</script>
<style lang="scss">
@import '~src/css/main.scss';

.ticket-filter {
    margin-bottom: 1rem;
    max-width: 100%;

    h4 {
        background-color: $dark-gray;
        color: $white;
        font-size: .8rem;
        font-weight: 600;
        line-height: 1.1;
        margin: 0;
        padding: .4rem .6rem;
        text-transform: uppercase;
        border-top-left-radius: 5px;
        border-top-right-radius: 5px;
    }
}
</style>
