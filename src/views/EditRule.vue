<template>
  <v-container fluid grid-list-md fill-height>
    <v-layout wrap>
      <v-flex d-flex sm3>
        <v-navigation-drawer permanent absolute>
          <v-layout d-flex align-space-around justify-center column class="items">
            <v-list-item>
              <v-list-item-content>
                <v-list-item-title class="title">Conditions</v-list-item-title>
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
              <v-list-item
                v-for="item in actions"
                :key="item.title"
                link
                @click="actionClick(item)"
              >
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
        <v-divider></v-divider>

        <v-container align-start justify-space-between fluid>
          Conditions
          <v-layout wrap align-start justify-start ref="container" class="workarea">
            <v-row class>
              <v-container align-center>
                <v-layout align-start justify-start>
                  <div v-for="(item, index) in nonAggregateRules" :key="item.id" class="item">
                    <v-layout align-center justify-space-between ref="rulesContainer">
                      <v-col>
                        <HeadphoneCard
                          v-if="item.title === 'Headphone'"
                          :id="item.id"
                          :onDelete="deleteRule"
                          :onChange="updateRule"
                        ></HeadphoneCard>

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
                      </v-col>
                      <v-col v-if="multipleRules && index < nonAggregateRules.length - 1">
                        <OperatorButton :onChange="operatorChange" :id="index"/>
                      </v-col>
                    </v-layout>
                  </div>
                </v-layout>
              </v-container>
            </v-row>
          </v-layout>
        </v-container>
        <v-divider></v-divider>
        <v-container align-start justify-space-between class="workarea">
          Actions
          <v-layout wrap align-start justify-start>
            <v-flex sm6 md4 v-for="item in workarea_actions" :key="item.id">
              <CustomActionCard
                v-if="item.title === 'Custom action'"
                :id="item.id"
                :onDelete="deleteAction"
                :onChange="updateAction"
              />
              <NotificationActionCard
                v-if="item.title === 'Send notification'"
                :id="item.id"
                :onDelete="deleteAction"
                :onChange="updateAction"
              />
              <VibrateActionCard
                v-if="item.title === 'Vibrate device'"
                :id="item.id"
                :onDelete="deleteAction"
                :onChange="updateAction"
              />
            </v-flex>
          </v-layout>
        </v-container>
      </v-flex>
    </v-layout>
  </v-container>
</template>
<script>
import HeadphoneCard from "../components/cards/HeadphoneCard";
import ActivityCard from "../components/cards/ActivityCard";
import LocationCard from "../components/cards/LocationCard";
import TimeCard from "../components/cards/TimeCard";
import NotificationActionCard from "../components/cards/NotificationActionCard";
import VibrateActionCard from "../components/cards/VibrateActionCard";
import CustomActionCard from "../components/cards/CustomActionCard";
import OperatorButton from "../components/OperatorButton";
import Store from "../store";
import UUID from "uuid/v1";

export default {
  components: {
    HeadphoneCard,
    ActivityCard,
    LocationCard,
    TimeCard,
    NotificationActionCard,
    VibrateActionCard,
    OperatorButton,
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
    this.workarea_actions =
      this.$store.getters.actionInfo(this.$router.currentRoute.params.name) ||
      [];
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
    },
    multipleRules() {
      var non = this.workarea_rules.filter(element => {
        return element.title !== "Aggregate";
      });
      return non.length > 1;
    }
  },
  data() {
    return {
      workarea_rules: [],
      workarea_data: [],
      workarea_actions: [],
      operators: [],
      tab: 0,
      items: [
        { title: "Headphone", icon: "headset", size: "sm6 md4" },
        { title: "Location", icon: "my_location", size: "sm6 md4" },
        { title: "Time", icon: "access_time", size: "sm6 md4" },
        { title: "Activity", icon: "directions_run", size: "sm6 md4" }
        //  { title: "Aggregate", icon: "add", size: "sm12 md8" }
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
        //also remove from operators.
        try{

          this.operators.splice(index,1);
        } catch {
          // it was an invalid index, ignore it.
        }
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
          operators: this.operators,
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
          operators: this.operators,
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
    },
    operatorChange(op){
      try{
        this.operators[op.id] = op;
      } catch{
        this.operators.push(op);
      }
      console.table(this.operators);
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
.scrolling-wrapper-flexbox {
  display: flex;
  flex-wrap: nowrap;
  overflow-x: none;
}

.item {
  flex: 0 0 auto;
}
.workarea {
  width: 100%;
  height: 70vh;
  overflow-x: auto;
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
