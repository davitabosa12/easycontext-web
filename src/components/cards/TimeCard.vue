<template>
  <v-card min-width="500px" min-height="500px">
    <div>
      <v-card-title>
        <span>Location</span>
        <v-icon right v-on:click="toggleMini">remove</v-icon>
      </v-card-title>
      <div v-if="!isMini">
        <v-container>
          <v-layout wrap>
            <v-flex sm12>
              <v-select :items="methods" v-model="selected" label="Method"></v-select>
              <div v-if="selected === 'TIME_INTERVAL.AROUND_TIME_INSTANT'">
                <!-- AROUND TIME INSTANT -->
                <v-radio-group v-model="timeInstant">
                  <v-radio label="Sunrise" value="TIME_INSTANT_SUNRISE"></v-radio>
                  <v-radio label="Sunset" value="TIME_INSTANT_SUNSET"></v-radio>
                </v-radio-group>
                <v-flex class="sm12">
                  <v-subheader>Time interval</v-subheader>
                  <v-range-slider
                    v-model="offsetMillis"
                    :max="86400000"
                    :min="-86400000"
                    class="align-center"
                  ></v-range-slider>
                </v-flex>
                <v-flex>{{ describeTimeInstant()}}</v-flex>
              </div>
              <div v-else-if="selected === 'TIME_INTERVAL.IN_DAILY_INTERVAL'">
                <!-- IN DAILY INTERVAL -->
                <v-autocomplete :items="tzs" v-model="timeZone" label="Timezone"></v-autocomplete>
                <v-flex class="sm12">
                  <v-subheader>Time interval</v-subheader>
                  <v-range-slider
                    v-model="timeOfDayMillis"
                    :max="86400000"
                    :min="0"
                    class="align-center"
                  ></v-range-slider>
                </v-flex>
                <v-flex>{{ describeInDailyInterval()}}</v-flex>
              </div>
              <div v-else-if="selected === 'TIME_INTERVAL.IN_INTERVAL'">
                <!-- IN INTERVAL -->
                <v-flex xs12 sm6 md4>
                  <v-menu
                    ref="menu"
                    v-model="menu"
                    :close-on-content-click="false"
                    :return-value.sync="dateStart"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateStart"
                        label="Start"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateStart" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu.save(dateStart)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                  <v-menu
                    ref="menu2"
                    v-model="menu2"
                    :close-on-content-click="false"
                    :return-value.sync="dateStop"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="dateStop"
                        label="End"
                        prepend-icon="event"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-date-picker v-model="dateStop" no-title scrollable>
                      <v-spacer></v-spacer>
                      <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                      <v-btn text color="primary" @click="$refs.menu2.save(dateStop)">OK</v-btn>
                    </v-date-picker>
                  </v-menu>
                </v-flex>
              </div>
            </v-flex>
          </v-layout>
        </v-container>
      </div>
    </div>
  </v-card>
</template>

<script>
import TimeMethod from "../../model/enums/TimeIntervalMethod";
import timezones from "../../model/timezones";
export default {
  watch: {
    timeZone: function(newValue) {
      console.log(newValue);
      if (newValue === undefined) this.timeZone = null; // se to default device timezone
    }
  },
  components: {},
  data: () => {
    return {
      selected: TimeMethod.AROUND_TIME_INSTANT,
      methods: [
        { text: "Around time instant", value: TimeMethod.AROUND_TIME_INSTANT },
        { text: "In daily interval", value: TimeMethod.IN_DAILY_INTERVAL },
        { text: "In interval", value: TimeMethod.IN_INTERVAL },
        { text: "In interval of day", value: TimeMethod.IN_INTERVAL_OF_DAY },
        { text: "In time interval", value: TimeMethod.IN_TIME_INTERVAL }
      ],
      tzs: timezones,
      timeZone: null,
      isMini: false,
      offsetMillis: [-4.32e7, 5.04e7],
      timeOfDayMillis: [4.32e7, 5.04e7],
      timeInstant: "TIME_INSTANT_SUNRISE",
      dateStart: null,
      dateStop: null,
      menu: null,
      menu2: null,
    };
  },
  methods: {
    toggleMini() {
      this.$data.isMini = !this.$data.isMini;
    },
    describeTimeInstant() {
      let message = "Time period starts ";
      let strTimeInstant =
        this.timeInstant === "TIME_INSTANT_SUNRISE" ? "sunrise" : "sunset";
      if (this.offsetMillis[0] === 0) message += "at ";
      else {
        message += this.millisToString(this.offsetMillis[0]);
        if (this.offsetMillis[0] < 0) message += " before ";
        else message += " after ";
      }
      message += ` ${strTimeInstant} and stops `;

      if (this.offsetMillis[1] === 0) message += "at ";
      else {
        message += this.millisToString(this.offsetMillis[1]);
        if (this.offsetMillis[1] < 0) message += " before ";
        else message += " after ";
      }
      message += ` ${strTimeInstant}.`;

      return message;
    },
    describeInDailyInterval() {
      let message = "Daily interval starts at ";
      message += this.millisToString(this.timeOfDayMillis[0]);

      message += ` and ends at `;

      message += this.millisToString(this.timeOfDayMillis[1]);

      return message;
    },
    millisToString(ms) {
      let formattedNumber = ms < 0 ? "-" : "";
      const millis = Math.abs(ms);
      let hours = Math.floor(millis / 1000 / 3600);
      let minutes = Math.floor(((millis - hours * 1000 * 3600) / 60000) % 60);
      let seconds = Math.floor(((millis - minutes * 60000) / 1000) % 60);
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      console.log(formattedNumber + hours + ":" + minutes + ":" + seconds);
      return hours + ":" + minutes + ":" + seconds;
    }
  }
};
</script>

<style>
</style>
