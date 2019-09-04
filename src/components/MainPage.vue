<template>
  <v-container>
    <v-layout text-center wrap>
      <v-dialog v-model="dialog" max-width="600px">
        <template #activator="{ on: modal }">
          <v-tooltip left>
            <template #activator="{ on: tooltip }">
              <v-btn
                fab
                dark
                large
                color="primary"
                fixed
                right
                bottom
                v-on="{...modal, ...tooltip}"
              >
                <v-icon dark>add</v-icon>
              </v-btn>
            </template>
            <span>New Rule</span>
          </v-tooltip>
        </template>

        <v-card>
          <v-card-title>
            <span class="headline">New Rule</span>
          </v-card-title>
          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm10 md10>
                  <v-text-field label="Rule Name (unique)" required v-model="ruleName"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" text @click="dialog = false">Close</v-btn>
            <v-btn color="blue darken-1" text @click="onNewRule">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-layout>
    <v-layout wrap>
      <div v-if="rules.length < 1">
        <h1>No rules registered</h1>
      </div>
      <div v-else v-for="element in rules" v-bind:key="element.name">
        <RuleCard :name="element.fence.name" :onDelete="performDelete" :onEdit="performEdit" />
      </div>
    </v-layout>
  </v-container>
</template>

<script>
import RuleCard from "./cards/RuleCard";
import Store from '../store'
export default {
  components: {
    RuleCard
  },
  mounted(){
    console.log(Store.getters);
  },
  data: () => {
    return {
      dialog: false,
      rules: Store.getters.fencesG,
      ruleName: ""
    };
  },
  methods: {
    onNewRule() {
      var exists = this.$data.rules.find(value => {
        return value.name === this.$data.ruleName;
      });
      if (exists !== undefined) {
        alert("error");
      } else {
        //store data
        Store.commit('createFence', this.$data.ruleName);
        //reset ruleName model
        this.$data.ruleName = "";
        //dismiss dialog
        this.$data.dialog = false;
        
      }
    },

    performDelete(name) {
      Store.commit('deleteFence', name)
    },
    performEdit(name) {
      alert(`Routing to /${name}`)
    }
  }
};
</script>
