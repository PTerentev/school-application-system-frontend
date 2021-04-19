<template>
  <v-card class="mt-3 mb-5 mx-5">
    <v-tabs background-color="red lighten-2" dark centered>
      <v-tabs-slider />
      <v-tab :href="'#tab-1'">Новые заявки</v-tab>
      <v-tab :href="'#tab-2'">Заявки на проверку</v-tab>
      <v-tab-item :value="tab-1" v-for="application in applications" :key="application.id">
        <v-card>
          <Application class="my-3" v-bind:application="application" />
          <v-card-actions>
            <v-container class="pa-0">
              <v-row no-gutters>
                <v-col cols="6" class="d-flex align-center">
                  <v-select
                    :items="authorities"
                    label="Исполнительный орган"
                    dense
                  ></v-select>
                </v-col>
                <v-col cols="6">
                  <v-btn depressed color="primary">
                    Отправить на рассмотрение
                  </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-tab-item>
      <v-tab-item :value="tab-2" v-for="application in applications" :key="application.id">
        <v-card>
          <Application
            class="ml-4 my-3 ml-2"
            v-bind:application="application"
          />
          <v-card-actions>
            <v-container class="pa-0">
              <v-row no-gutters>
                <v-col cols="6" class="d-flex align-center">
                  <v-btn depressed color="primary"> Опубликовать </v-btn>
                </v-col>
                <v-col cols="6">
                  <v-btn depressed color="primary"> Дать комментарий </v-btn>
                </v-col>
              </v-row>
            </v-container>
          </v-card-actions>
        </v-card>
      </v-tab-item>
    </v-tabs>
  </v-card>
</template>

<script>
import Application from "@/components/Application.vue";

export default {
  components: {
    Application,
  },
  data: () => ({
    tab: null,
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
