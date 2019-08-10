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
              <v-list-item v-for="item in actions" :key="item.title" link>
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
        <v-container align-start justify-start>
          <v-layout wrap>
            <div v-for="item in workarea_rules" :key="item.id">
              <div v-if="item.title === 'Headphone'">
                <HeadphoneCard />
              </div>
              <div v-else-if="item.title === 'Location'">
                <LocationCard />
              </div>
              <div v-else-if="item.title === 'Time'">
                <HeadphoneCard />
              </div>
              <div v-else-if="item.title === 'Activity'">
                <ActivityCard />
              </div>
              <div v-else-if="item.title === 'Aggregate'">
                <HeadphoneCard />
              </div>
            </div>
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
import UUID from "uuid/v1";

export default {
  components: {
    HeadphoneCard, ActivityCard, LocationCard
  },
  data() {
    return {
      workarea_rules: [],
      items: [
        { title: "Headphone", icon: "headset" },
        { title: "Location", icon: "my_location" },
        { title: "Time", icon: "access_time" },
        { title: "Activity", icon: "directions_run" },
        { title: "Aggregate", icon: "add" }
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
      info.id = UUID();
      this.$data.workarea_rules.push(info);
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
