<template>
  <v-dialog v-model="dialog" width="100%" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" class="px-8" v-bind="attrs" v-on="on"> Дать ответ </v-btn>
    </template>

    <v-card>
      <v-card-text class="pa-10">
        <v-textarea
          v-model="about"
          :rules="aboutRules"
          label="Комментарий"
          required
        />
        <v-file-input
          accept="image/png, image/jpeg, image/bmp"
          label="Добавить файлы"
          filled
          prepend-icon="mdi-camera"
          class="mt-4"
        ></v-file-input>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="success"> Отправить </v-btn>
        <v-btn color="primary" @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
export default {
  data: () => ({
    dialog: false,
    aboutRules: [(v) => !!v || "Комментарий необходим"]
  }),
};
</script>