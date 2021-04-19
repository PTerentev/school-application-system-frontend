<template>
    <v-card class="pa-2">
        <v-card
            width="100%"
            class="mb-2"
        >
            <v-list-item two-line>
            <v-list-item-content>
                <v-list-item-title class="headline">
                {{ application.name }}
                </v-list-item-title>
                <v-list-item-subtitle>{{ application.date }}</v-list-item-subtitle>
            </v-list-item-content>
            </v-list-item>
            <v-card-text>
            <p>
                {{ application.description }}
            </p>
            </v-card-text>
            <v-divider></v-divider>
            <v-card-actions>
                <Attachments v-bind:attachments="application.attachments"/>
            </v-card-actions>
        </v-card>
        <div class="mr-6 mb-5 ml-1">
            <v-card v-if="showReply">
                <v-card-title>
                    <p>Ответ:</p>
                </v-card-title>
                <v-card-text>
                    <p>{{application.replyText}}</p>
                </v-card-text>
                <v-divider></v-divider>
                <v-card-actions>
                    <Attachments v-bind:attachments="application.replyAttachments"/>
                </v-card-actions>
            </v-card>
                <v-card v-if="showRejectComments">
                <v-card-title>
                    <p>Отклонено</p>
                </v-card-title>
                <v-card-text>
                    <p>{{application.rejectComments}}</p>
                </v-card-text>
            </v-card>
        </div>
    </v-card>
</template>

<script>
import Attachments from './Attachments'
import { APPLICATION_STATUS } from '@/constants';

export default {
    components: {
        Attachments
    },
    props: ['application'],
    data: () => ({
    }),
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
    }
  }
}
</script>