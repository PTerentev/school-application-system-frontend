<template>
  <v-card class="mx-auto px-6 py-4 mt-16" max-width="600px">
    <v-card-text class="d-flex justify-center">
      <h2 class="font-weight-black">Вход</h2>
    </v-card-text>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-text-field
        v-model="email"
        :rules="emailRules"
        label="Почта"
        required
      ></v-text-field>
      <v-text-field
        v-model="password"
        :append-icon="showPassord ? 'mdi-eye' : 'mdi-eye-off'"
        :type="showPassord ? 'text' : 'password'"
        label="Пароль"
        @click:append="showPassord = !showPassord"
        required
      ></v-text-field>
      <v-btn :disabled="!valid" color="success" class="mr-4" @click="login">
        Войти
      </v-btn>
      <p v-if="isLoginFailed" class="mt-10 red--text">
        Неверный адрес электронной почты или пароль!
      </p>
    </v-form>
  </v-card>
</template>

<script>
import { http } from "@/api";

export default {
  data: () => ({
    isLoginFailed: false,
    showPassord: false,
    valid: false,
    email: "",
    password: "",
    emailRules: [(v) => !!v || "Введите почту"],
  }),

  methods: {
    login() {
      console.log('login');
      this.isLoginFailed = false;
      this.$refs.form.validate();
      if (this.valid) {
        http.defaults.headers.common.Authorization = null;
        http
          .post("api/user/login", {
            email: this.email,
            password: this.password,
          })
          .then((response) => {
            if (response.data.token) {
              localStorage.setItem("user-token", response.data.token);
              http.defaults.headers.common.Authorization = `Bearer ${response.data.token}`;
              this.$router.push({ name: 'Home' }).catch(() => {});
            }
          })
          .catch((err) => {
            console.log(err);
            this.isLoginFailed = true;
          });
      }
    },
  },
};
</script>