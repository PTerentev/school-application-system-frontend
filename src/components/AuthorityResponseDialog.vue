<template>
  <v-dialog v-model="dialog" width="100%" max-width="600px">
    <template v-slot:activator="{ on, attrs }">
      <v-btn color="success" class="px-8" v-bind="attrs" v-on="on">
        Дать ответ
      </v-btn>
    </template>
    <v-card>
      <v-card-text class="pa-10">
        <v-textarea v-model="reply" label="Комментарий*" required />
        <v-file-input
          accept="image/*, video/*"
          label="Добавить файлы"
          filled
          prepend-icon="mdi-camera"
          class="mt-4"
          multiple
          @change="selectFile"
        ></v-file-input>
        <p v-if="isNotValid" class="mt-10 red--text">
          Комментарий необходим!
        </p>
         <p v-if="showErrorMessage" class="mt-10 red--text">
            Пожалуйста, введите правильные данные
         </p>
      </v-card-text>
      <v-card-actions class="d-flex justify-end">
        <v-btn color="success" @click="sendReply"> Отправить </v-btn>
        <v-btn color="primary" @click="dialog = false"> Закрыть </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script>
import { http } from "@/api";
export default {
  props: ["applicationId", "authorityId"],
  data: () => ({
    isReplyFailed: false,
    dialog: false,
    reply: null,
    files: null,
    isNotValid: false,
    showErrorMessage: false
  }),
  methods: {
    sendReply() {
      if (!this.reply) {
        this.isNotValid = true;
        return;
      }

      const formData = new FormData();
      formData.append("replyMessage", this.reply);

      if (this.files != null)
      {
        for (let file of this.files) {
          formData.append("formFiles", file);
        }
      }

      http
        .post(
          `api/authority/${this.authorityId}/applications/${this.applicationId}/reply`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        )
        .then((response) => {
          // Todo: show success message
          this.$router.go();
        })
        .catch((err) => {
            console.log(err.data);
            this.showErrorMessage = true;
        });
    },
    selectFile(files) {
      this.files = files;
    },
  },
};
</script>