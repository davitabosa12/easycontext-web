<template>
  <div>
    <div v-if="isMini">
      <v-card max-width="70px" max-height="70px">
        <v-icon size="70" @click="toggleMini">access_time</v-icon>
      </v-card>
    </div>
    <div v-else>
      <v-card max-width="500px" min-height="500px">
        <v-card-title>
          <v-layout wrap>
            <v-flex sm6>
              <span>Time</span>
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
                  <v-btn small icon text @click="toggleMini">
                    <v-icon small>minimize</v-icon>
                  </v-btn>
                </v-flex>
              </v-layout>
            </v-flex>
          </v-layout>
        </v-card-title>
        <v-container>
          <v-layout wrap>
            <v-flex sm12>
              <v-select :items="methods" v-model="selected" label="Method" @change="sendData"></v-select>
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
                    @end="sendData"
                  ></v-range-slider>
                </v-flex>
                <v-flex>{{ describeTimeInstant()}}</v-flex>
              </div>
              <div v-else-if="selected === 'TIME_INTERVAL.IN_DAILY_INTERVAL'">
                <!-- IN DAILY INTERVAL -->
                <v-autocomplete :items="tzs" v-model="timeZone" label="Timezone"></v-autocomplete>
                <v-flex class="sm12">
                  <v-subheader>Time interval</v-subheader>
                  <v-menu
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="startTimeOfDayMillis"
                        label="Start time"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="startTimeOfDayMillis"
                      format="24hr"
                      :max="stopTimeOfDayMillis"
                    ></v-time-picker>
                  </v-menu>
                  <v-menu
                    :close-on-content-click="false"
                    transition="scale-transition"
                    offset-y
                    full-width
                    min-width="290px"
                  >
                    <template v-slot:activator="{ on }">
                      <v-text-field
                        v-model="stopTimeOfDayMillis"
                        label="End time"
                        prepend-icon="access_time"
                        readonly
                        v-on="on"
                      ></v-text-field>
                    </template>
                    <v-time-picker
                      v-model="stopTimeOfDayMillis"
                      format="24hr"
                      :min="startTimeOfDayMillis"
                    ></v-time-picker>
                  </v-menu>
                </v-flex>
              </div>
              <div v-else-if="selected === 'TIME_INTERVAL.IN_INTERVAL'">
                <!-- IN INTERVAL -->
                <v-layout wrap>
                  <v-flex xs12 sm6 md6>
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
                      <v-date-picker
                        v-model="dateStart"
                        no-title
                        scrollable
                        :min="new Date().toISOString().split('T')[0]"
                        :max="dateStop"
                        @change="inInstantChange"
                      >
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu.save(dateStart)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-menu
                      v-model="menuTimePickerStart"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="epochTimeStart"
                          label="Time Start"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-model="epochTimeStart"
                        format="24hr"
                        @change="inInstantChange"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>
                  <v-flex xs12 sm6 md6>
                    <v-menu
                      ref="menu2"
                      v-model="menu2"
                      :close-on-content-click="false"
                      :min="dateStart"
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
                      <v-date-picker v-model="dateStop" no-title scrollable :min="dateStart" @change="inInstantChange">
                        <v-spacer></v-spacer>
                        <v-btn text color="primary" @click="menu2 = false">Cancel</v-btn>
                        <v-btn text color="primary" @click="$refs.menu2.save(dateStop)">OK</v-btn>
                      </v-date-picker>
                    </v-menu>
                    <v-menu
                      v-model="menuTimePickerEnd"
                      :close-on-content-click="false"
                      transition="scale-transition"
                      offset-y
                      full-width
                      min-width="290px"
                    >
                      <template v-slot:activator="{ on }">
                        <v-text-field
                          v-model="epochTimeEnd"
                          label="Time End"
                          prepend-icon="access_time"
                          readonly
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-time-picker
                        v-model="epochTimeEnd"
                        format="24hr"
                        ref="pickerEnd"
                        @change="inInstantChange"
                      ></v-time-picker>
                    </v-menu>
                  </v-flex>
                </v-layout>
                Start: {{epochTimeStart}} End: {{epochTimeEnd}}
              </div>
              <!-- IN INTERVAL END -->
              <div v-else-if="selected === 'TIME_INTERVAL.IN_INTERVAL_OF_DAY'">
                <!-- IN INTERVAL OF DAY -->
                <v-autocomplete :items="tzs" v-model="timeZone" label="Timezone"></v-autocomplete>
                <v-select :items="daysOfWeekModel" v-model="dayOfWeek" label="Day of week"></v-select>
                <v-menu
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="startTimeOfDayMillis"
                      label="Start time"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="startTimeOfDayMillis"
                    format="24hr"
                    :max="stopTimeOfDayMillis"
                  ></v-time-picker>
                </v-menu>
                <v-menu
                  :close-on-content-click="false"
                  transition="scale-transition"
                  offset-y
                  full-width
                  min-width="290px"
                >
                  <template v-slot:activator="{ on }">
                    <v-text-field
                      v-model="stopTimeOfDayMillis"
                      label="End time"
                      prepend-icon="access_time"
                      readonly
                      v-on="on"
                    ></v-text-field>
                  </template>
                  <v-time-picker
                    v-model="stopTimeOfDayMillis"
                    format="24hr"
                    :min="startTimeOfDayMillis"
                  ></v-time-picker>
                </v-menu>
              </div>
              <!-- IN INTERVAL OF DAY END-->
              <div v-else-if="selected === 'TIME_INTERVAL.IN_TIME_INTERVAL'">
                <!-- IN TIME INTERVAL -->
                <v-select :items="timeIntervalsModel" v-model="timeInterval" label="Time interval"></v-select>
              </div>
              <!-- IN TIME INTERVAL END -->
            </v-flex>
          </v-layout>
        </v-container>
      </v-card>
    </div>
  </div>
</template>

<script>
import TimeMethod from "../../model/enums/TimeIntervalMethod";
import TimeRule from "../../model/rules/TimeIntervalRule";
import timezones from "../../model/timezones";
export default {
  props: {
    id: String,
    onDelete: Function,
    onChange: Function
  },
  mounted() {
    const prevState = this.$store.getters.componentState(this.id);
    if (prevState) {
      this.selected = prevState.selected || this.selected;
      this.isMini = prevState.isMini || this.isMini;
      this.timeZone = prevState.timeZone || this.timeZone;
      this.offsetMillis = prevState.offsetMillis || this.offsetMillis;
      this.timeOfDayMillis = prevState.timeOfDayMillis || this.timeOfDayMillis;
      this.startTimeOfDayMillis =
        prevState.startTimeOfDayMillis || this.startTimeOfDayMillis;
      this.stopTimeOfDayMillis =
        prevState.stopTimeOfDayMillis || this.stopTimeOfDayMillis;
      this.timeInstant = prevState.timeInstant || this.timeInstant;
      this.dateStart = prevState.dateStart || this.dateStart;
      this.dateStop = prevState.dateStop || this.dateStop;
      this.dayOfWeek = prevState.dayOfWeek || this.dayOfWeek;
      this.timeInterval = prevState.timeInterval || this.timeInterval;
      this.epochTimeStart = prevState.epochTimeStart || this.epochTimeStart;
      this.epochTimeEnd = prevState.epochTimeEnd || this.epochTimeEnd;
    } else {
      //nothing
    }
    this.sendData();
    this.watchersArray.forEach(element => {
      this.$watch(element, () => {
        this.sendData();
      });
    }, this);
  },
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
      daysOfWeekModel: [
        { text: "Sunday", value: 0 },
        { text: "Monday", value: 1 },
        { text: "Tuesday", value: 2 },
        { text: "Wednesday", value: 3 },
        { text: "Thursday", value: 4 },
        { text: "Friday", value: 5 },
        { text: "Saturday", value: 6 }
      ],
      timeIntervalsModel: [
        { text: "Morning", value: TimeMethod.MORNING },
        { text: "Afternoon", value: TimeMethod.AFTERNOON },
        { text: "Evening", value: TimeMethod.EVENING },
        { text: "Night", value: TimeMethod.NIGHT },
        { text: "Weekday", value: TimeMethod.WEEKDAY },
        { text: "Weekend", value: TimeMethod.WEEKEND },
        { text: "Holiday", value: TimeMethod.HOLIDAY }
      ],
      timeZone: timezones[0].value,
      isMini: false,
      offsetMillis: [-4.32e7, 5.04e7],
      timeOfDayMillis: [4.32e7, 5.04e7],
      startTimeOfDayMillis: "00:00",
      stopTimeOfDayMillis: "12:00",
      timeInstant: "TIME_INSTANT_SUNRISE",
      dateStart: new Date().toISOString().split("T")[0],
      dateStop: new Date().toISOString().split("T")[0],
      dayOfWeek: 0,
      timeInterval: TimeMethod.WEEKDAY,

      menu: null,
      menu2: null,
      menuTimePickerStart: null, //in interval time picker menu
      epochTimeStart: "00:00", // start time time picker value
      menuTimePickerEnd: null,
      epochTimeEnd: "12:00",
      watchersArray: [
        "selected",
        "timeZone",
        "isMini",
        "startTimeOfDayMillis",
        "stopTimeOfDayMillis",
        "timeInstant",
        "dateStart",
        "dateStop",
        "dayOfWeek",
        "timeInterval",

        "epochTimeStart",
        "epochTimeEnd"
      ]
    };
  },
  methods: {
    toggleMini() {
      this.$data.isMini = !this.$data.isMini;
    },
    test() {
      alert(1);
      console.log(arguments);
    },
    inInstantChange() {
      if (this.dateStart === this.dateStop) {
        //if same date
        if (this.epochTimeStart > this.epochTimeEnd) {
          const temp = this.epochTimeStart;
          this.epochTimeStart = this.epochTimeEnd;
          this.epochTimeEnd = temp;
        }
      }
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
    timeStringToMillis(timeString) {
      let hours = new Number(timeString.split(":")[0]);
      let minutes = new Number(timeString.split(":")[1]);
      return hours * 3.6e6 + minutes * 60000;
    },
    millisToString(ms) {
      const millis = Math.abs(ms);
      let hours = Math.floor(millis / 1000 / 3600);
      let minutes = Math.floor(((millis - hours * 1000 * 3600) / 60000) % 60);
      let seconds = Math.floor(((millis - minutes * 60000) / 1000) % 60);
      hours = hours < 10 ? "0" + hours : hours;
      minutes = minutes < 10 ? "0" + minutes : minutes;
      seconds = seconds < 10 ? "0" + seconds : seconds;
      return hours + ":" + minutes + ":" + seconds;
    },
    sendData() {
      let obj = {};
      obj.id = this.id;
      obj.selected = this.selected;
      obj.isMini = this.isMini;

      obj.timeZone = this.timeZone;
      obj.offsetMillis = this.offsetMillis;
      obj.timeOfDayMillis = this.timeOfDayMillis;
      obj.startTimeOfDayMillis = this.startTimeOfDayMillis;
      obj.stopTimeOfDayMillis = this.stopTimeOfDayMillis;
      obj.timeInstant = this.timeInstant;
      obj.dateStart = this.dateStart;
      obj.dateStop = this.dateStop;
      obj.dayOfWeek = this.dayOfWeek;
      obj.timeInterval = this.timeInterval;
      obj.epochTimeStart = this.epochTimeStart;
      obj.epochTimeEnd = this.epochTimeEnd;

      let rule = {};
      try {
        switch (this.$data.selected) {
          case TimeMethod.AROUND_TIME_INSTANT:
            rule = TimeRule.aroundTimeInstant(
              this.timeInstant,
              this.offsetMillis[0],
              this.offsetMillis[1]
            );
            break;
          case TimeMethod.IN_DAILY_INTERVAL: {
            const startMillis = this.timeStringToMillis(
              this.startTimeOfDayMillis
            );
            const stopMillis = this.timeStringToMillis(
              this.stopTimeOfDayMillis
            );
            rule = TimeRule.inDailyInterval(
              this.timeZone,
              startMillis,
              stopMillis
            );

            break;
          }
          case TimeMethod.IN_INTERVAL: {
            const epochMillisStart = new Date(
              this.dateStart + "T" + this.epochTimeStart
            ).getTime();
            const epochMillisEnd = new Date(
              this.dateStop + "T" + this.epochTimeEnd
            ).getTime();
            rule = TimeRule.inInterval(epochMillisStart, epochMillisEnd);

            break;
          }
          case TimeMethod.IN_INTERVAL_OF_DAY: {
            const startMillis = this.timeStringToMillis(
              this.startTimeOfDayMillis
            );
            const stopMillis = this.timeStringToMillis(
              this.stopTimeOfDayMillis
            );
            rule = TimeRule.inIntervalOfDay(
              this.dayOfWeek,
              this.timeZone,
              startMillis,
              stopMillis
            );
            break;
          }
          case TimeMethod.IN_TIME_INTERVAL:
            {
              rule = TimeRule.inTimeInterval(this.timeInterval);
            }
            break;
        }
        this.onChange(this.id, { rule: rule, componentState: obj });
      } catch (error) {
        console.error(error);
      }
    },
    performDelete() {
      try {
        this.onDelete(this.id);
      } catch (error) {
        console.error("onDelete not bound on this TimeCard. Id: " + this.id);
      }
    }
  }
};
</script>

<style>
</style>
