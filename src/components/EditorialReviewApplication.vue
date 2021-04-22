<template>
  <v-card>
    <Application class="ml-4 my-10 ml-2" v-bind:application="application" />
    <v-card-actions>
      <v-container>
        <v-row no-gutters>
          <v-col class="d-flex justify-end pr-3">
            <v-btn depressed color="success" :class="$style.desisionButton"
              >Опубликовать</v-btn
            >
          </v-col>
          <v-col class="d-flex justify-start pl-3">
            <v-dialog v-model="dialog" width="100%" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" v-bind="attrs" v-on="on">
                  Дать комментарий
                </v-btn>
              </template>

              <v-card>
                <v-card-text class="pa-10">
                  <v-textarea v-model="comments" label="Комментарий" required />
                  <p v-if="isNotValid" class="mt-10 red--text">
                    Комментарий необходим!
                  </p>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                  <v-btn color="red lighten-2"> Отправить </v-btn>
                  <v-btn color="primary" @click="dialog = false">
                    Закрыть
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-col>
        </v-row>
      </v-container>
    </v-card-actions>
  </v-card>
</template>

<script>
import { http } from "@/api";
import Application from "./Application";

export default {
  components: {
    Application,
  },
  props: ["application"],
  data: () => ({
    comments: null,
    isNotValid: false,
  }),
  methods: {
    publish: function () {
      http
        .post(`/api/editorial/applications/${this.application.id}/publish`)
        .then((resp) => {
          this.$router.go();
        })
        .catch((err) => {});
    },
    resendToAuthority: function () {
      http
        .post(`/api/editorial/applications/${this.application.id}/resend`, {
          editComments: this.comments,
        })
        .then((resp) => {
          this.$router.go();
        })
        .catch((err) => {});
    },
  },
  computed: {
    showReply: function () {
      switch (this.application.status) {
        case APPLICATION_STATUS.REVIEW:
        case APPLICATION_STATUS.PUBLISHED:
          return true;
        default:
          return false;
      }
    },
    showRejectComments: function () {
      return this.application.status === APPLICATION_STATUS.REJECTED;
    },
  },
};
</script>