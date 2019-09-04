<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout wrap>
      <v-flex d-flex sm3>
        <v-navigation-drawer permanent>
          <v-layout d-flex align-space-around justify-center column class="items">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Rules</v-list-item-title>
                <v-list-item-subtitle>Lorem ipsum dolor sit amet</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>

            <v-list dense nav>
              <div></div>

              <v-list-item v-for="item in items" :key="item.title" link @click="onClick(item)">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>

            <v-divider></v-divider>
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Actions</v-list-item-title>
                <v-list-item-subtitle>Lorem ipsum dolor sit amet</v-list-item-subtitle>
              </v-list-item-content>
            </v-list-item>

            <v-divider></v-divider>
            <v-list dense nav>
              <v-list-item v-for="item in actions" :key="item.title" link @click="actionClick(item)">
                <v-list-item-icon>
                  <v-icon>{{ item.icon }}</v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ item.title }}</v-list-item-title>
                </v-list-item-content>
              </v-list-item>
            </v-list>
          </v-layout>
        </v-navigation-drawer>
      </v-flex>
      <v-flex sm9>
        <v-tabs v-model="tab" fixed-tabs background-color="orange">
          <v-tab>Rules</v-tab>
          <v-tab>Actions</v-tab>

          <v-tab-item>
            <v-container align-start justify-space-between>
              <v-layout wrap align-start justify-start ref="container">
                <v-flex sm6 md4 v-for="item in nonAggregateRules" :key="item.id">
                  <v-flex>
                    <HeadphoneCard
                      v-if="item.title === 'Headphone'"
                      :id="item.id"
                      :onDelete="deleteRule"
                      :onChange="updateRule"
                    />
                    <LocationCard
                      v-else-if="item.title === 'Location'"
                      :id="item.id"
                      :onDelete="deleteRule"
                      :onChange="updateRule"
                    />
                    <TimeCard
                      v-else-if="item.title === 'Time'"
                      :id="item.id"
                      :onDelete="deleteRule"
                      :onChange="updateRule"
                    />
                    <ActivityCard
                      v-else-if="item.title === 'Activity'"
                      :id="item.id"
                      :onDelete="deleteRule"
                      :onChange="updateRule"
                    />
                  </v-flex>
                </v-flex>
                <v-flex sm12 md12 v-for="item in aggregateRules" :key="item.id">
                  <v-flex>
                    <AggregateCard :id="item.id" :onDelete="deleteRule" :onChange="updateRule" />
                  </v-flex>
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
          <v-tab-item>
            <v-container align-start justify-space-between>
              <v-layout wrap align-start justify-start>
                <v-flex sm6 md4 v-for="item in workarea_actions" :key="item.id">
                  <CustomActionCard v-if="item.title === 'Custom action'" :id="item.id" :onDelete="deleteAction" :onChange="updateAction"/>
                  <NotificationActionCard v-if="item.title === 'Send notification'" :id="item.id" :onDelete="deleteAction" :onChange="updateAction" />
                  <VibrateActionCard v-if="item.title === 'Vibrate device'" :id="item.id" :onDelete="deleteAction" :onChange="updateAction" />
                </v-flex>
              </v-layout>
            </v-container>
          </v-tab-item>
        </v-tabs>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
import HeadphoneCard from "../components/cards/HeadphoneCard";
import ActivityCard from "../components/cards/ActivityCard";
import LocationCard from "../components/cards/LocationCard";
import TimeCard from "../components/cards/TimeCard";
import AggregateCard from "../components/cards/AggregateCard";
import NotificationActionCard from "../components/cards/NotificationActionCard";
import VibrateActionCard from "../components/cards/VibrateActionCard";
import CustomActionCard from "../components/cards/CustomActionCard";
import Store from "../store";
import UUID from "uuid/v1";

export default {
  components: {
    HeadphoneCard,
    ActivityCard,
    LocationCard,
    TimeCard,
    AggregateCard,
    NotificationActionCard,
    VibrateActionCard,
    CustomActionCard
  },
  created() {
    if (
      !this.$store.getters.fenceExists(this.$router.currentRoute.params.name)
    ) {
      this.$router.push("/");
    }
  },
  mounted() {
    this.workarea_rules =
      Store.getters.fenceInfo(this.$router.currentRoute.params.name) || [];
      this.workarea_actions = this.$store.getters.actionInfo(this.$router.currentRoute.params.name) || [];
  },
  computed: {
    nonAggregateRules() {
      return this.workarea_rules.filter(element => {
        return element.title !== "Aggregate";
      });
    },
    aggregateRules() {
      return this.workarea_rules.filter(element => {
        return element.title === "Aggregate";
      });
    }
  },
  data() {
    return {
      workarea_rules: [],
      workarea_data: [],
      workarea_actions: [],
      tab: 0,
      items: [
        { title: "Headphone", icon: "headset", size: "sm6 md4" },
        { title: "Location", icon: "my_location", size: "sm6 md4" },
        { title: "Time", icon: "access_time", size: "sm6 md4" },
        { title: "Activity", icon: "directions_run", size: "sm6 md4" },
        { title: "Aggregate", icon: "add", size: "sm12 md8" }
      ],
      actions: [
        { title: "Custom action", icon: "star" },
        { title: "Send notification", icon: "notifications" },

        { title: "Vibrate device", icon: "vibration" }
      ],
      right: null
    };
  },
  methods: {
    onClick(obj) {
      let info = JSON.parse(JSON.stringify(obj));
      this.tab = 0;
      info.id = UUID();
      this.$data.workarea_rules.push(info);
    },
    actionClick(obj) {
      let info = JSON.parse(JSON.stringify(obj));
      console.log(obj);
      this.tab = 1;
      info.id = UUID();
      this.workarea_actions.push(info);
      console.log(this.workarea_actions);
    },
    deleteRule(id) {
      let index = this.findRuleIndexWithId(id);
      if (index > -1) {
        this.workarea_rules.splice(index, 1);
      } else {
        //error
      }
    },
    updateRule(id, { rule, componentState }) {
      let index = this.findRuleIndexWithId(id);
      if (index > -1) {
        let data = JSON.parse(JSON.stringify(this.workarea_rules[index])); //the data to be changed..
        data.rule = rule;
        this.workarea_rules.splice(index, 1, data);
        Store.commit("updateRulesInFence", {
          fenceName: this.$router.currentRoute.params.name,
          rules: this.workarea_rules,
          componentState: componentState
        });
        Store.commit("dumpComponent", componentState);
      } else {
        //error
      }
    },
    findRuleIndexWithId(id) {
      return this.workarea_rules.findIndex(rule => {
        return rule.id === id;
      });
    },
    findActionIndexWithId(id) {
      return this.workarea_actions.findIndex(action => {
        return action.id === id;
      });
    },
    updateAction(id, { action, componentState }) {
      let index = this.findActionIndexWithId(id);
      if (index > -1) {
        let data = JSON.parse(JSON.stringify(this.workarea_actions[index])); //the data to be changed..
        data.action = action;
        this.workarea_actions.splice(index, 1, data);
        Store.commit("updateActionsInFence", {
          fenceName: this.$router.currentRoute.params.name,
          actions: this.workarea_actions,
          componentState: componentState
        });
        Store.commit("dumpComponent", componentState);
      }
    },
    deleteAction(id) {
      let index = this.findActionIndexWithId(id);
      if (index > -1) {
        this.workarea_actions.splice(index, 1);
      } else {
        //error
      }
    }
  }
};
</script>

<style>
.items {
  overflow: auto;
}
.control-size {
  width: 250px;
  height: 250px;
}
.workarea {
  width: 100vh;
  height: 100vh;
  margin: 0%;
  padding: 0;
}
.aquamarine {
  background-color: aquamarine;
}
.facada {
  background-color: #facada;
}
</style>
