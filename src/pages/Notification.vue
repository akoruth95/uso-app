<template>
    <v-container fluid grid-list-lg>
        <v-layout v-if="notifications.length" row wrap>
            <v-layout v-for="n in notifications" :key="n.notificationId">
                <v-flex xs12>
                    <v-list three-line class="primary pa-0" :class="notificationClass(n.notificationRead)" dark>
                        <v-list-tile>
                            <v-list-tile-content>
                                <v-list-tile-title style="font-size:14px;" class="white--text">{{n.notifiedTime}}</v-list-tile-title>
                                <v-list-tile-sub-title style="font-size:16px">{{n.notification}}</v-list-tile-sub-title>
                            </v-list-tile-content>
                            <v-divider></v-divider>
                        </v-list-tile>
                    </v-list>
                </v-flex>
            </v-layout>
        </v-layout>
        <v-layout v-if="!notifications.length" justify-center>
            <h2 class="pa-4">You have no notifications</h2>
        </v-layout>
    </v-container>
</template>

<style scoped>
    .newNotification {
        font-weight: bold;
        filter: brightness(150%);
    }
</style>

<script>
    import { mapActions, mapState } from 'vuex';
    export default {
        computed: {
            ...mapState({
                notifications: state => state.account.notifications
            })
        },
        created() {
            this.setNewHeading('My Notifications');
            this.getNotifications();
        },
        methods: {
            ...mapActions('account', ['getNotifications']),
            ...mapActions('common', ['setNewHeading']),
            notificationClass(readStatus) {
                if (!readStatus) {
                    return 'newNotification';
                }
            }
        }
    }
</script>