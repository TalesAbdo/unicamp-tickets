<template>
    <div id="ticket-filters">
        <ticket-filter
            v-for="(filter, index) in filters"
            :key="index"
            :name="filter.name"
            :options="filter.options"
            :selected="filter.selected"
            :multiple="filter.multiple"
            @change="onChange"/>
    </div>
</template>
<script>
import TicketFilter from './TicketFilter.vue';

export default {
    components: { TicketFilter },
    props: {
        filters: {
            type: Array,
            required: true
        },
    },
    methods: {
        onChange() {
            const data = { values: this.filters };
            this.$emit('change', data);
        }
    }
};
</script>

<style lang="scss">
#ticket-filters {
    margin-top: 1rem;
}
</style>
