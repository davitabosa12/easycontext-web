<template>
  <div>
    <div v-if="isMini">
      <v-card max-width="70" max-height="70" v-on:dblclick="toggleMini">
        <v-icon size="70" @click="toggleMini">add</v-icon>
      </v-card>
    </div>
    <div v-else>
      <v-card v-on:dblclick="toggleMini">
        <div>
          <v-card-title>
            <v-layout wrap>
              <v-flex sm6>
                <span>Aggregate</span>
              </v-flex>
              <v-flex sm6>
                <v-container>
                  <v-layout wrap align-center>
                    <v-flex sm8></v-flex>
                    <v-flex sm2>
                      <v-btn icon small color="red" @click="performDelete">
                        <v-icon small>delete</v-icon>
                      </v-btn>
                    </v-flex>
                    <v-flex sm2>
                      <v-btn small icon text @click="toggleMini">
                        <v-icon small>minimize</v-icon>
                      </v-btn>
                    </v-flex>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-card-title>
          <v-container>
            <v-layout wrap align-center>
              <v-flex sm5>
                <v-container>
                  <v-layout justify-center align-center>
                    <v-speed-dial v-if="ruleLeft === null" direction="bottom" class="to-front">
                      <template v-slot:activator>
                        <v-btn>Add Rule</v-btn>
                      </template>
                      <div v-for="item in items" v-bind:key="item.name">
                        <v-btn
                          fab
                          dark
                          small
                          :color="item.color"
                          @click="onClick(item, 'ruleLeft')"
                        >
                          <v-icon>{{item.icon}}</v-icon>
                        </v-btn>
                      </div>
                    </v-speed-dial>
                    <div v-else>
                      <div v-if="ruleLeft.title === 'Headphone'">
                        <HeadphoneCard
                          :id="ruleLeft.id"
                          :onDelete="deleteRule"
                          :onChange="updateRule"
                        />
                      </div>
                      <div v-else-if="ruleLeft.title === 'Location'">
                        <LocationCard
                          :id="ruleLeft.id"
                          :onDelete="deleteRule"
                          :onChange="updateRule"
                        />
                      </div>
                      <div v-else-if="ruleLeft.title === 'Time'">
                        <TimeCard :id="ruleLeft.id" :onDelete="deleteRule" :onChange="updateRule" />
                      </div>
                      <div v-else-if="ruleLeft.title === 'Activity'">
                        <ActivityCard
                          :id="ruleLeft.id"
                          :onDelete="deleteRule"
                          :onChange="updateRule"
                        />
                      </div>
                      <div v-else-if="ruleLeft.title === 'Aggregate'">
                        <AggregateCard :id="ruleLeft.id" />
                      </div>
                    </div>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex sm2>
                <v-container>
                  <v-layout justify-center align-center>
                    <v-card max-width="70" max-height="70">
                      <v-icon size="70" v-if="selected === 'AGGREGATE.AND'">add</v-icon>
                      <v-icon size="70" v-else>lens</v-icon>
                    </v-card>
                  </v-layout>
                </v-container>
              </v-flex>

              <v-flex sm5>
                <v-container>
                  <v-layout justify-center align-center>
                    <v-speed-dial v-if="ruleRight === null" direction="bottom" class="to-front">
                      <template v-slot:activator>
                        <v-btn>Add Rule</v-btn>
                      </template>
                      <div v-for="item in items" v-bind:key="item.name">
                        <v-btn
                          fab
                          dark
                          small
                          :color="item.color"
                          @click="onClick(item, 'ruleRight')"
                        >
                          <v-icon>{{item.icon}}</v-icon>
                        </v-btn>
                      </div>
                    </v-speed-dial>
                    <div v-else>
                      <div v-if="ruleRight.title === 'Headphone'">
                        <HeadphoneCard
                          :id="ruleRight.id"
                          :onDelete="deleteRule"
                          :onChange="updateRule"
                        />
                      </div>
                      <div v-else-if="ruleRight.title === 'Location'">
                        <LocationCard
                          :id="ruleRight.id"
                          :onDelete="deleteRule"
                          :onChange="updateRule"
                        />
                      </div>
                      <div v-else-if="ruleRight.title === 'Time'">
                        <TimeCard :id="ruleRight.id" :onDelete="deleteRule" :onChange="updateRule" />
                      </div>
                      <div v-else-if="ruleRight.title === 'Activity'">
                        <ActivityCard
                          :id="ruleRight.id"
                          :onDelete="deleteRule"
                          :onChange="updateRule"
                        />
                      </div>
                      <div v-else-if="ruleRight.title === 'Aggregate'">
                        <AggregateCard :id="ruleRight.id" />
                      </div>
                    </div>
                  </v-layout>
                </v-container>
              </v-flex>
            </v-layout>
          </v-container>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import AggregateMethod from "../../model/enums/AggregateMethod";
import AggregateRule from "../../model/rules/AggregateRule";
import HeadphoneCard from "./HeadphoneCard";
import ActivityCard from "./ActivityCard";
import LocationCard from "./LocationCard";
import TimeCard from "./TimeCard";
import AggregateCard from "./AggregateCard";
import UUID from "uuid";

export default {
  components: {
    HeadphoneCard,
    ActivityCard,
    LocationCard,
    TimeCard,
    AggregateCard
  },
  props: {
    id: String,
    onDelete: Function,
    onChange: Function
  },
  mounted() {
    const prevState = this.$store.getters.componentState(this.id);
    if (prevState) {
      this.id = prevState.id || this.id;
      this.selected = prevState.selected || this.selected;
      this.ruleLeft = prevState.ruleLeft || this.ruleLeft;
      this.ruleRight = prevState.ruleRight || this.ruleRight;
      this.isMini = prevState.isMini || this.isMini;
    }
  },
  data() {
    return {
      selected: AggregateMethod.AND,
      isMini: false,
      items: [
        { title: "Headphone", icon: "headset", color: "green" },
        { title: "Location", icon: "my_location", color: "indigo" },
        { title: "Time", icon: "access_time", color: "red" },
        { title: "Activity", icon: "directions_run", color: "red" },
        { title: "Aggregate", icon: "add", color: "red" }
      ],
      ruleLeft: null,
      ruleRight: null
    };
  },
  methods: {
    onClick(item, ruleSide) {
      console.log(arguments);
      if (ruleSide === "ruleLeft" || ruleSide === "ruleRight") {
        let info = JSON.parse(JSON.stringify(item));
        info.id = UUID();
        this[ruleSide] = info;
        console.log(this.ruleLeft);
      }
    },
    deleteRule(id) {
      console.log(this);
      if (this.ruleLeft && this.ruleLeft.id === id) {
        this.ruleLeft = null;
      } else if (this.ruleRight && this.ruleRight.id === id) {
        this.ruleRight = null;
      }
      this.sendData();
    },
    updateRule(id, { rule, componentState }) {
      let ruleRef;
      if (this.ruleLeft && this.ruleLeft.id === id) {
        ruleRef = this.ruleLeft;
      } else if (this.ruleRight && this.ruleRight.id === id) {
        ruleRef = this.ruleRight;
      }
      this.$store.commit("dumpComponent", componentState);
      ruleRef.rule = rule;
      this.sendData();
    },
    performDelete() {
      try {
        this.onDelete(this.id);
      } catch (error) {
        console.log("onDelete not bound on this AggregateCard. Id:" + this.id);
      }
    },
    toggleMini() {
      this.isMini = !this.isMini;
    },
    sendData() {
      let rule;
      let obj = {};
      obj.id = this.id;
      obj.selected = this.selected;
      obj.ruleLeft = this.ruleLeft;
      obj.ruleRight = this.ruleRight;
      obj.isMini = this.isMini;
      switch (this.selected) {
        case AggregateMethod.AND: {
          rule = AggregateRule.and([this.ruleLeft, this.ruleRight]);
          break;
        }
        case AggregateMethod.OR: {
          rule = AggregateRule.or([this.ruleLeft, this.ruleRight]);
          break;
        }
        case AggregateMethod.NOT: {
          rule = AggregateRule.not(this.ruleLeft);
        }
      }
      this.onChange(this.id, { rule: rule, componentState: obj });
    }
  }
};
</script>

<style>
.to-front {
  position: absolute;
  z-index: 8000;
}
</style>