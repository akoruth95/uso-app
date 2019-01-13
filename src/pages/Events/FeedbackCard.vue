<template>
<v-layout row align-center justify-center fill-height>
      <v-flex d-flex xs12 sm6 md4>
       <v-card>
        <v-flex text-xs-center>
          <h3 align="justify">In terms of overall satisfaction, how would you rate the event</h3>
          <div align="center" >
            <star-rating align="center" :star-size="20" :show-rating="false" active-color="yellow" @rating-selected="setSatisfactionRating"></star-rating> 
          </div>
        </v-flex>
       </v-card>
      </v-flex>
</v-layout >
</template>

<script>
export default {
    props: ['feedback']
};
</script>

<style scoped>
p {
    margin-bottom: 0px;
}
</style>
