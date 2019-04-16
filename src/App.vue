<template>
    <div id="app">
        <Navbar />
        <router-view/>
    </div>
</template>

<script>
import Navbar from 'shared/Navbar.vue';

export default {
    components: {
        Navbar
    }
};
</script>

<style lang="scss">
@import 'src/css/main.scss';

#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  min-height: 100%;
}
</style>
