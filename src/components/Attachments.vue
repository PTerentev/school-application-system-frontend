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

        <v-card v-for="file of imageFiles" v-bind:key="file" class="mb-2">
            <v-card-text class="pt-3 d-flex justify-center align-center">
                <v-img
                :aspect-ratio="16/9"
                contain
                v-bind:src="file"
                ></v-img>
            </v-card-text>

            <v-divider></v-divider>
        </v-card>
        <v-card v-for="file of videoFiles" v-bind:key="file" class="mb-2">
            <v-card-text>
                <video 
                class="pt-3 d-flex justify-center align-center"
                controls 
                style="max-width: 100%; height: auto">
	                <source v-bind:src="file"/>
                </video>
            </v-card-text>
            <v-divider></v-divider>
        </v-card>
        <v-btn
            color="primary"
            @click="onClose"
        >
            Закрыть
        </v-btn>
    </v-dialog>
</template>

<script>
import { http } from "@/api";

export default {
    props: ['attachments'],
    data: () => ({
        isPaused: false,
        dialog: false,
        imageFiles: [],
        videoFiles: [],
    }),
    methods: {
        onClose: function () {
            this.dialog = false;
            document.querySelectorAll('video').forEach(vid => vid.pause());
        },
        getData: function() {

            if (this.attachments == null)
            {
                return;
            }

            for (let attachment of this.attachments)
            {
                this.getAttachmentData(attachment);
            }
        },
        getAttachmentData: function(attachment) {
            http
                .get(`/api/attachment/${attachment}`)
                .then((response) => {
                    if (response.data) {
                        let base64Data = `data:${response.data.contentType};base64,${response.data.data}`;
                        if (response.data.contentType.includes('image')) {
                            this.imageFiles.push(base64Data);
                        }
                        else if (response.data.contentType.includes('video')) {
                            this.videoFiles.push(base64Data);
                        }
                    }
                })
                .catch((err) => {});
        },
    },
    mounted: function () {
        this.getData();
    }
}
</script>