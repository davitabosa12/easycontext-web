<template>
  <div>
    <div v-if="isMini">
      <v-card max-width="70" max-height="70" v-on:dblclick="toggleMini">
        <v-icon size="70" @click="toggleMini">headset</v-icon>
      </v-card>
    </div>
    <div v-else>
      <v-card max-width="500px" min-height="500px" v-on:dblclick="toggleMini">
        <div>
          <v-card-title>
            <v-layout wrap>
              <v-flex sm6>
                <span>Headphone</span>
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
              <v-select :items="methods" v-model="selected" label="Method"></v-select>
            </v-layout>
          </v-container>
        </div>
      </v-card>
    </div>
  </div>
</template>

<script>
import HeadphoneMethod from "../../model/enums/HeadphoneMethod";
import HeadphoneRule from "../../model/rules/HeadphoneRule";
export default {
  props: {
    id: String,
    onDelete: Function,
    onChange: Function
  },
  mounted: function(){
    const prevState = this.$store.getters.componentState(this.id);
    if(prevState){
      this.selected = prevState.selected || this.selected;
      this.isMini = prevState.isMini || this.isMini;
    }
    this.sendData();
  },
  watch: {
    selected(value) {
      this.sendData(value)
    }
  },
  data: () => {
    return {
      selected: HeadphoneMethod.PLUGGING_IN,
      methods: [
        { text: "Plugging In", value: HeadphoneMethod.PLUGGING_IN },
        { text: "Unplugging", value: HeadphoneMethod.UNPLUGGING }
      ],
      isMini: false
    };
  },
  methods: {
    toggleMini() {
      this.$data.isMini = !this.$data.isMini;
    },
    performDelete() {
      try {
        this.$store.commit('removeComponent', this.id);
        this.$props.onDelete(this.id);
      } catch (error) {
        console.log(
          "onDelete is not bound on this HeadphoneCard. Id: " + this.$props.id
        );
        console.error(error);
      }
    },
    sendData(){
      let obj = {};
      obj.id = this.id;
      obj.selected = this.selected;
      obj.isMini = this.isMini;
      try {
        if (this.selected === HeadphoneMethod.PLUGGING_IN) {
          this.onChange(this.id, {rule: HeadphoneRule.pluggingIn(), componentState: obj});
        } else if (this.selected === HeadphoneMethod.UNPLUGGING) {
          this.onChange(this.id, {rule: HeadphoneRule.unplugging(), componentState: obj});
        }
      } catch (error) {
        console.log(error);
      }
    }
  }
};
</script>

<style>
</style>
