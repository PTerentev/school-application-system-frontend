<template>
    <v-dialog
        v-model="dialog"
        width="100%"
        max-width="600px"
    >
        <template v-slot:activator="{ on, attrs }">
            <v-btn
                color="primary"
                dark
                v-bind="attrs"
                v-on="on"
            >
                Просмотреть файлы
            </v-btn>
        </template>

        <v-card v-for="attachment in attachments" :key="attachment.fileKey">
            <v-card-text>
                <v-img
                :aspect-ratio="16/9"
                :width="width"
                src="https://cdn.vuetifyjs.com/images/parallax/material.jpg"
                ></v-img>
            </v-card-text>

            <v-divider></v-divider>
        </v-card>
        <v-btn
            color="primary"
            text
            @click="dialog = false"
        >
            Закрыть
        </v-btn>
    </v-dialog>
</template>

<script>
export default {
    props: ['attachments'],
    data: () => ({
        dialog: false
    }),
}
</script>