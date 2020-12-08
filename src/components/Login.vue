<template>
  <div class="vue-tempalte">
    <form @submit.prevent="signIn">
      <h3>Sign In</h3>

      <div class="form-group" :class="{ 'form-group--error': $v.email.$error }">
        <label>Email address</label>
        <input
          type="text"
          class="form-control form-control-lg"
          v-model.trim="$v.email.$model"
        />
      </div>
      <div class="error" v-if="!$v.email.required">Email address is required!</div>
      <div class="error" v-if="!$v.email.email">Please enter valid email address!</div>

      <div class="form-group" :class="{ 'form-group--error': $v.password.$error }">
        <label>Password</label>
        <input
          type="password"
          class="form-control form-control-lg"
          v-model="$v.password.$model"
        />
      </div>
      <div class="error" v-if="!$v.password.required">Password is required!</div>

      <button type="submit" class="btn btn-dark btn-lg btn-block">
        Sign In
      </button>

      <p class="forgot-password text-right mt-2 mb-4">
        <router-link to="/forgot-password">Forgot password ?</router-link>
      </p>
    </form>
  </div>
</template>
<script>
import { required, email } from 'vuelidate/lib/validators'
import authService from '../services/auth-service';

export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },
  validations: {
    email: {
      required,
      email
    },
    password: {
      required
    }
  },
  methods: {
    signIn(e) {
      e.preventDefault();
      if (this.$v.$invalid) {
        this.submitStatus = 'ERROR'
      } else {
        // do your submit logic here
        authService.login(this.$v.email.$model, this.$v.password.$model);
      }
    },
  },
};
</script>