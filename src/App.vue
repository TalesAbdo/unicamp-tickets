<template>
    <div id="app">
        <Navbar />
        <router-view/>
        <notifications group="foo" position="top center" :max=3 class="vue-notifications"/> <!-- fkf -->
    </div>
</template>

<script>
import Navbar from 'shared/Navbar/Navbar.vue';

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

  .vue-notifications {
    margin-top:.5rem;
  }
}
</style>
