<template>
   <div class="card-header-title ticket-number has-text-primary">
        {{id}}
    </div>
</template>

<script>
export default {
    name: 'ticketNumber',
    props: {
        id: { type: Number, required: true },
    },
};
</script>

<style lang="scss">
@import '~src/css/main.scss';

.ticket-number {
    max-width: 90px !important;
    max-height: 37px !important;
    padding: 0.3rem !important;
    display: flex;
    justify-content: center;
    align-items: center;
    font-size: .9rem;
    border: 1px solid $primary;
    border-radius: 4px;
}
</style>
