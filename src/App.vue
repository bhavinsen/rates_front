<template>
  <div class="vue-tempalte" :class="{ inner: isAuthenticated }">
    <div class="App">
      <div class="vertical-center">
        <div class="inner-block">
          <router-view />
        </div>
      </div>
    </div>
  </div>
</template>
<script>
import authService from "./services/auth-service";

export default {
  data() {
    return {
      isAuthenticated: authService.getCurrentUser() ? true : false,
    };
  },
};
</script>

<style scoped>
.vue-tempalte.inner .inner-block {
  width: 100%;
  padding: 0;
  height: 100%;
}
</style>