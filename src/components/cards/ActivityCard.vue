<template>
  <div>
    <div v-if="isMini">
      <v-card max-width="70" v-on:dblclick="toggleMini">
        <v-icon size="70" @click="toggleMini">directions_run</v-icon>
      </v-card>
    </div>
    <div v-else>
      <v-card min-width="300px" max-width="300px" max-height="430px" min-height="430px">
        <v-card-title>
          <v-layout wrap>
            <v-flex sm6>
              <span>Activity</span>
            </v-flex>
            <v-flex sm6>
              <v-layout wrap>
                <v-flex sm8></v-flex>
                <v-flex sm2>
                  <v-btn icon small color="red" @click="performDelete">
                    <v-icon small>delete</v-icon>
                  </v-btn>
                </v-flex>
                <v-flex sm2>
                  <v-btn small icon text>
                    <v-icon small @click="toggleMini">minimize</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-container >
          <v-layout wrap align-start justify-space-between>
            <v-flex>
              <v-select :items="methods" v-model="selected" label="Method"></v-select>
            </v-flex>
            <v-flex xs12 sm6 md6 v-for=" type in activityTypes" v-bind:key="type.label">
              <v-checkbox v-model="activitiesSelected" :label="type.label" :value="type.value"></v-checkbox>
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import DAMethod from "../../model/enums/DAMethod";
import DARule from "../../model/rules/DetectedActivityRule";

export default {
  props: {
    id: String,
    onDelete: Function,
    onChange: Function
  },
  mounted() {
    //restore state if necessary
    const prevState = this.$store.getters.componentState(this.id);
    if (prevState) {
      this.selected = prevState.selected || this.selected;
      this.isMini = prevState.isMini || this.isMini;
      this.activitiesSelected =
        prevState.activitiesSelected || this.activitiesSelected;
    }
    this.sendData();
    if (this.setup) {
      this.selected = this.setup.selected;
      this.isMini = this.setup.isMini;
      this.activitiesSelected = this.setup.activitiesSelected;
    }
  },
  updated() {
    this.sendData();
  },
  data: () => {
    return {
      selected: DAMethod.STARTING,
      methods: [
        { text: "Starting", value: DAMethod.STARTING },
        { text: "Stopping", value: DAMethod.STOPPING },
        { text: "During", value: DAMethod.DURING }
      ],
      isMini: false,
      activitiesSelected: [],
      activityTypes: [
        { label: "In vehicle", value: DAMethod.IN_VEHICLE },
        { label: "On bicycle", value: DAMethod.ON_BICYCLE },
        { label: "On foot", value: DAMethod.ON_FOOT },
        { label: "Running", value: DAMethod.RUNNING },
        { label: "Still", value: DAMethod.STILL },
        { label: "Tilting", value: DAMethod.TILTING },
        { label: "Walking", value: DAMethod.WALKING },
        { label: "Unknown", value: DAMethod.UNKNOWN }
      ]
    };
  },
  methods: {
    toggleMini() {
      this.$data.isMini = !this.$data.isMini;
    },
    performDelete() {
      try {
        //remove itself from Store
        this.$store.commit('removeComponent', this.id);
        this.onDelete(this.id);
      } catch (error) {
        console.log("onDelete not bound on this ActivityCard. Id: " + this.id);
        console.error(error);
      }
    },
    sendData() {
      let obj = {};
      obj.id = this.id;
      obj.selected = this.selected;
      obj.activitiesSelected = this.activitiesSelected;
      obj.isMini = this.isMini;
      try {
        switch (this.selected) {
          case DAMethod.STARTING: {
            this.onChange(this.id, {
              rule: DARule.starting(this.activitiesSelected),
              componentState: obj
            });
            break;
          }
          case DAMethod.STOPPING: {
            this.onChange(this.id, {
              rule: DARule.stopping(this.activitiesSelected),
              componentState: obj
            });
            break;
          }
          case DAMethod.DURING: {
            this.onChange(this.id, {
              rule: DARule.during(this.activitiesSelected),
              componentState: obj
            });
            break;
          }
        }
      } catch (error) {
        console.error(error);
      }
    }
  }
};
</script>

<style>
</style>
