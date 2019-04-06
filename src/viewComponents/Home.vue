<template>
   <div>
   <Navbar />
   </div>
</template>

<script>
import Navbar from 'shared/Navbar.vue';

export default {
    name: 'login',
    components: {
        Navbar
    },
    data() {
        return {
            showModal: false
        };
    },
    methods: {
        modalControl() {
            this.showModal = true;
        },
        hide() {
            this.showModal = false;
        },
    }
};
</script>


<style lang="scss">
@import '~src/css/main.scss';

</style>
