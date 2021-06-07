<template>
  <v-card>
    <Application class="my-10" v-bind:application="application" />
    <v-card-actions>
      <v-container>
        <v-row no-gutters>
          <v-col cols="12" class="d-flex justify-end">
            <v-select
              style="width: 100%"
              v-model="selectedAuthorityId"
              :items="authorities"
              item-value="id"
              item-text="name"
              label="Исполнительный орган"
              dense
              menu-props="auto"
              required
            ></v-select>
          </v-col>
          <v-col cols="12" class="d-flex justify-end mt-3">
            <v-btn @click="sendToAuthority" class="mr-3" color="success">
              Отправить на рассмотрение
            </v-btn>
            <v-dialog v-model="dialog" width="100%" max-width="600px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn color="red lighten-2" v-bind="attrs" v-on="on">
                  Отклонить
                </v-btn>
              </template>

              <v-card>
                <v-card-text class="pa-10">
                  <v-textarea
                    v-model="rejectComments"
                    label="Причина отключения"
                    required
                  />
                  <p v-if="isRejectCommentsNotValid" class="mt-10 red--text">
                    Комментарий необходим!
                  </p>
                </v-card-text>
                <v-card-actions class="d-flex justify-end">
                  <v-btn color="red lighten-2" @click="rejectApplication">
                    Отправить
                  </v-btn>
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
    <v-card-text>
      <p v-if="isValidationError" class="red--text">
        Пожалуйста, выберите исполнительный орган!
      </p>
    </v-card-text>
  </v-card>
</template>

<script>
import { http } from "@/api";
import Application from "./Application";

export default {
  components: {
    Application,
  },
  props: ["application", "authorities"],
  data: () => ({
    dialog: null,
    rejectComments: null,
    isRejectCommentsNotValid: false,
    isValidationError: false,
    selectedAuthorityId: null,
  }),
  methods: {
    sendToAuthority: function () {
      if (!this.selectedAuthorityId) {
        this.isValidationError = true;
        return;
      }

      http
        .post(`/api/editorial/applications/${this.application.id}/send`, {
          authorityId: this.selectedAuthorityId,
        })
        .then((resp) => {
          this.$router.go();
        })
        .catch((err) => {});
    },
    rejectApplication: function () {
      if (!this.rejectComments) {
        this.isRejectCommentsNotValid = true;
        return;
      }

      http
        .post(`/api/editorial/applications/${this.application.id}/reject`, {
          rejectComments: this.rejectComments,
        })
        .then((resp) => {
          this.$router.go();
        })
        .catch((err) => {});
    },
  },
};
</script>
