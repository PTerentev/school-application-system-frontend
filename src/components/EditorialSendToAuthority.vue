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
              required
            ></v-select>
          </v-col>
          <v-col cols="12" class="d-flex justify-end">
            <v-btn @click="sendToAuthority" color="success">
              Отправить на рассмотрение
            </v-btn>
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
