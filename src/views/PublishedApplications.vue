<template>
  <div width="100%">
    <v-card class="mt-3 mb-5 d-flex justify-center mx-5">
      <v-card-title>
        <h4>Опубликованные запросы и ответы</h4>
      </v-card-title>
    </v-card>
    <v-container v-for="application in applications" :key="application.id">
      <Application v-bind:application="application" />
    </v-container>
  </div>
</template>

<script>
import Application from "@/components/Application.vue";

export default {
  components: {
    Application,
  },
  data: () => ({
    testApplication: {
      id: 1,
      name: "test",
      description: "test",
      status: 3,
    },
  }),
  computed: {
    applications: function () {
      return Array.from({ length: 5 }, () => this.testApplication);
    },
  },
};
</script>