<template>
  <v-row>
    <v-col v-if="hiredServices.length > 0">
      <v-data-table :headers="headers" :items="hiredServices" sort-by="name" class="elevation-1">
    <template v-slot:top>
      <ServiceReview v-bind:service="service" v-bind:dialogService="dialogService" v-on:dialog-service-false="setCustomerReview" v-on:dialog-continue="setAgencyReview"></ServiceReview>
      <AgencyReview v-bind:service="service" v-bind:dialogAgency="dialogAgency" v-on:dialog-agency-false="closeForm"></AgencyReview>
    </template>
    <template v-slot:item.actions="{ item }">
      <v-btn v-if="item.status === 'pending'" color="primary" rounded small disabled>Rate service</v-btn>
      <v-btn v-else color="primary" rounded small @click="setCustomerReview(item)">
        Rate service
      </v-btn>
    </template>
  </v-data-table>
    </v-col>

    <div v-if="hiredServices.length <= 0" class="mx-auto mb-10">
      <div class="d-flex justify-center align-center">
        <v-img
            max-height="100px"
            max-width="100px"
            src="https://i.ibb.co/82q8FhX/65842.png">
        </v-img>
      </div>
      <div class="d-flex justify-center">
        <p>You still do not have contracted services, discover Go2climb and start the trip of your life</p>
      </div>
    </div>
  </v-row>
</template>

<script>
import CustomersService from '../services/customers.service'
import ServiceReview from '../pages/ServiceReview'
import AgencyReview from '../pages/AgencyReview'
export default {
  name: "CustomerServices",
  components: {ServiceReview, AgencyReview},
  data: () => ({
    errors: [],
    hiredServices: [],
    dialogService: false,
    dialogAgency: false,
    service: [],
    headers: [
      {text: 'N° transaction', align: 'start', value: 'id'},
      { text: 'Contracted service', align: 'start', value: 'service.name'},
      { text: 'Total cost', align: 'start', value: `service.price`},
      { text: 'Service status', align: 'start', value: 'status'},
      { text: 'Service actions', align: 'start', value: 'actions'}
    ],
  }),
  methods: {
    retrieveHiredServices(){
      CustomersService.getHiredServicesByCustomerIdWithServiceInformation(this.$store.state.auth.user.id)
        .then(response => {
          this.hiredServices = response.data;
        })
        .catch(e => {
          this.errors.push(e);
        })
    },
    setCustomerReview(item) {
      this.dialogService = !this.dialogService;
      this.service = item;
    },
    setAgencyReview() {
      this.dialogService = !this.dialogService;
      this.dialogAgency = !this.dialogAgency;
    },
    closeForm() {
      this.dialogAgency = !this.dialogAgency;
    },
    sendAllData(item) {
      item.dialogService = this.dialogService;
      return item;
    }
  },
  mounted(){
    this.retrieveHiredServices();
  }
}
</script>

<style scoped>

</style>
