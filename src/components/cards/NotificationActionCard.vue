<template>
  <v-card max-width="500px" min-height="500px">
    <v-card-title>
      <v-layout wrap>
        <v-flex sm6>
          <span>Show Notification</span>
        </v-flex>
        <v-flex sm6>
          <v-layout wrap>
            <v-flex sm10></v-flex>
            <v-flex sm2>
              <v-btn icon small color="red" @click="performDelete">
                <v-icon small>delete</v-icon>
              </v-btn>
            </v-flex>
          </v-layout>
        </v-flex>
      </v-layout>
    </v-card-title>
    <v-card-text>
      <v-text-field label="Notification Title" v-model="title"></v-text-field>
      <v-text-field label="Notification Text" v-model="channel"></v-text-field>
      <v-text-field label="Notification Channel" v-model="text"></v-text-field>
      <v-select :items="importanceModel" v-model="importance"></v-select>
    </v-card-text>
  </v-card>
</template>

<script>
import NotificationAction from "../../model/actions/NotificationAction"
export default {
  props: {
    id: String,
    onDelete: Function,
    onChange: Function
  },
  mounted() {
    const prevState = this.$store.getters.componentState(this.id);
    if (prevState) {
      this.title = prevState.title || this.title;
      this.channel = prevState.channel || this.channel;
      this.text = prevState.text || this.text;
      this.importance = prevState.importance || this.importance;
    }
    this.sendData();
  },
  updated() {
    this.sendData();
  },
  data() {
    return {
      importanceModel: [
        { text: "Default", value: "Notification.DEFAULT" },
        { text: "High", value: "Notification.HIGH" },
        { text: "Low", value: "Notification.LOW" },
        { text: "None", value: "Notification.NONE" }
      ],
      title: "",
      channel: "",
      text: "",
      importance: "Notification.DEFAULT"
    };
  },
  methods: {
    performDelete() {
      this.onDelete(this.id);
    },
    sendData() {
      let action = new NotificationAction(this.title, this.channel, this.text, this.importance);
      let componentState = {};
      componentState.title = this.title;
      componentState.channel = this.channel;
      componentState.text = this.text;
      componentState.importanceModel = this.importanceModel;
      componentState.id = this.id;
      this.onChange(this.id, {
        action: action,
        componentState: componentState
      });
    }
  }
};
</script>

<style>
</style>