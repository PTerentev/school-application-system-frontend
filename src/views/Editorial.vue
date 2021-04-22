<template>
  <v-card class="mt-3 mb-5 mx-5">
    <v-tabs v-model="tabs" background-color="red lighten-2" dark centered>
      <v-tabs-slider />
      <v-tab>Новые заявки</v-tab>
      <v-tab>Заявки на проверку</v-tab>
    </v-tabs>
    <v-tabs-items v-model="tabs">
      <v-tab-item>
        <v-card v-for="application in applications" :key="application.id">
          <Application class="my-10" v-bind:application="application" />
          <v-card-actions>
            <v-container>
              <v-row no-gutters>
                <v-col class="d-flex justify-end align-center pr-3">
                  <v-select
                    :items="authorities"
                    label="Исполнительный орган"
                    dense
                  ></v-select>
                </v-col>
                <v-col class="d-flex justify-start align-center pr-3">
                  <v-btn color="success">
                    Отправить на рассмотрение
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-tab-item>
      <v-tab-item>
        <v-card v-for="application in applications" :key="application.id">
          <Application
            class="ml-4 my-10 ml-2"
            v-bind:application="application"
          />
          <v-card-actions>
            <v-container>
              <v-row no-gutters>
                <v-col class="d-flex justify-end pr-3">
                  <v-btn
                    depressed
                    color="success"
                    :class="$style.desisionButton"
                    >Опубликовать</v-btn
                  >
                </v-col>
                <v-col class="d-flex justify-start pl-3">
                  <EditorialCommentDialog />
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs-items>
  </v-card>
</template>

<script>
import Application from "@/components/Application.vue";
import EditorialCommentDialog from "@/components/EditorialCommentDialog.vue";

export default {
  components: {
    Application,
    EditorialCommentDialog
  },
  data: () => ({
    tabs: null,
    testApplication: {
      id: 1,
      name: "test",
      description: "test",
      status: 3,
    },
    authorities: [
      {
        text: "Authority 1",
        value: 1,
      },
      {
        text: "Authority 2",
        value: 2,
      },
      {
        text: "Authority 3",
        value: 3,
      },
    ],
  }),
  computed: {
    applications: function () {
      return Array.from({ length: 5 }, () => this.testApplication);
    },
  },
};
</script>

<style lang="scss" module>
.desisionButton {
    width: 200px
}
</style>
