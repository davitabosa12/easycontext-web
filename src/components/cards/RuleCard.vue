<template>
  <v-card
    class="mx-auto"
    max-width="344"
  >
    <v-card-text>
      <div>Rule</div>
      <p class="display-1 text--primary">
        {{name}}
      </p>
    </v-card-text>
    <v-card-actions>
      <v-btn
        text
        color="primary accent-4"
        :to="'/edit/' + name"
      >
        Edit
      </v-btn>
      <v-btn
        text
        color="red"
        v-on:click="deleteAction"
      >
        Delete
      </v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
export default {
    props: {
        name: String,
        onDelete: Function,
        onEdit: Function,
    },
    data : () => {
        return {}
    },
    methods: {
        deleteAction(){
            try {
                this.$props.onDelete(this.$props.name);    
            } catch (error) {
                console.log(error)
            }
            
        },
        editAction(){
            try {
                this.$props.onEdit(this.$props.name);                
            } catch (error) {
                console.log(error)
            }
        }
    },
}
</script>

<style>

</style>
