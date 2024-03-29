<template>
  <v-main app class="secondary">
    <v-container>
      <v-row class="d-flex flex-md-row flex-xl-column">
        <v-col cols="12" class="col-md-3">
          <!--Solicit Service-->
          <v-card v-if="typeUser === 'agency'" class="rounded-lg px-4 py-4">
            <div class="d-flex align-center pb-2">
              <p class="title ma-0">Preview</p>
              <v-spacer></v-spacer>
              <v-icon>mdi-eye-outline</v-icon>
            </div>
            <p>This is an agency account, only review mode is allowed.</p>
          </v-card>
          <v-card v-else class="rounded-lg px-4 py-2">
            <v-list>
              <v-subheader class="font-weight-bold title"> ${{ service.price }}</v-subheader>
              <v-list-item-group>
                <v-form ref="form" class="v-border-none" lazy-validation border-none>
                  <v-subheader class="font-weight-medium subtitle-1">Output</v-subheader>
                  <v-text-field
                      required
                      type="date"
                      v-model="dateOutput"
                      :rules="dateRules"
                      full-width
                      solo
                      dense
                      hide-details
                      single-line
                      flat
                      class="rounded-pill"
                      placeholder="Enter the date"
                      outlined
                      color="blue"></v-text-field>
                  <v-subheader class="font-weight-medium subtitle-1">Persons</v-subheader>
                  <v-text-field
                      required
                      type="number"
                      min="0"
                      max="5"
                      :rules="peopleRules"
                      v-model="nPeople"
                      oninput="if(this.value <= 0) this.value = 1; else if (this.value > 5) this.value = 5;"
                      full-width
                      solo
                      dense
                      hide-details
                      single-line
                      flat class="rounded-pill adjust"
                      placeholder="Enter the number of people"
                      outlined
                      color="blue"></v-text-field>
                </v-form>
                <v-row>
                  <v-col><v-btn v-if="typeUser!=null" @click="continueDialogSolicit" class="rounded-pill mt-7 mb-2 col-12" color="primary">Solicit</v-btn></v-col>
                </v-row>
                <solicit-service
                    v-on:dialog-solicit-false="setDialogSolicit"
                    :dialogSolicit="dialogSolicit" :service="service"
                    :date="dateOutput"
                    :nPeople="nPeople"
                    :idUser="this.idUser"
                    :typeUser="this.typeUser"
                    :agencyName="agency.name">
                </solicit-service>
              </v-list-item-group>
            </v-list>
          </v-card>
        </v-col>
        <!--Section 1: ServiceInformation -->
        <v-col cols="12" class="col-md-9">
          <v-card class="py-4 px-8 mb-4 rounded-lg">
            <v-alert v-if=" service.reports >= 3" type="error">This service has recived multiple reports</v-alert>
            <v-list>
              <v-row>
              <v-col>
              <v-subheader class="title font-weight-bold pl-0">{{service.name}} </v-subheader>
              </v-col>
              <v-col class="d-flex justify-end">
                <v-btn elevation="0" outlined text color="red" @click="reportService">Report <v-icon>mdi-alert</v-icon></v-btn>
              </v-col>
              </v-row>
              <v-row>
                <v-col class="d-flex">
                  <v-icon color ="primary"> mdi-map-marker-circle </v-icon>
                  <v-subheader>{{service.location}}</v-subheader>
                </v-col>
                <v-col>
                  <v-subheader class="title font-weight-bold justify-end"> <v-icon color ="amber"> mdi-star </v-icon>  {{service.score}}</v-subheader>
                </v-col>
              </v-row>
              <v-row class="justify-center">
                <v-col class="d-flex child-flex ">
                  <v-img
                      :src= service.photos
                      :lazy-src="`https://www.google.com/url?sa=i&url=https%3A%2F%2Fdefinicion.de%2Fperfil-de-usuario%2F&psig=AOvVaw088rXtThQz9GDWFPaNwx1G&ust=1637556985474000&source=images&cd=vfe&ved=0CAsQjRxqFwoTCNjw5aXVqPQCFQAAAAAdAAAAABAD`"
                      aspect-ratio="1"
                      max-height="400"
                      class="grey lighten-2"
                  ></v-img>
                </v-col>
              </v-row>
              <v-list-item-group>
                <v-row>
                  <v-col class="d-flex justify-center align-center">
                    <v-img v-bind:src="agency.photo"
                           max-height="75px"
                           min-height="75px"
                           max-width="75px"
                           min-width="75px"
                           class="logo ma-0"
                    ></v-img>
                    <div class="agency-div">
                      <v-subheader>Offered by<span class="font-weight-bold pl-1">{{agency.name}}</span></v-subheader>
                      <v-subheader class="align-lg-start">Registered service since {{dateTransform(service.creationDate)}}</v-subheader>
                    </div>
                  </v-col>
                  <v-col><v-spacer></v-spacer></v-col>
                  <v-col>
                    <v-subheader class="font-weight-bold title justify-end">${{service.price}}</v-subheader>
                  </v-col>
                </v-row>
                <v-subheader class="font-weight-bold align-lg-start mt-4 px-0">{{agency.description}}</v-subheader>
              </v-list-item-group>
            </v-list>
          </v-card>
          <v-container v-if="service.videoUrl != null">
            <v-row class="d-flex flex-md-row flex-xl-column">
              <v-col>
                <v-card class="py-4 px-8 mb-4 rounded-lg">
                  <v-row>
                    <v-subheader class="font-weight-bold title"> Video of our service</v-subheader>
                  </v-row>
                  <v-row class="mx-2 my-4">
                    <v-col class="d-flex justify-center">
                      <iframe width="480" height="320"
                              :src="service.videoUrl"
                       >
                      </iframe>
                    </v-col>
                  </v-row>
                </v-card>
              </v-col>
            </v-row>
          </v-container>
          <!-- Section 3: Service Activities -->
          <v-row>
            <v-col>
              <v-card min-height="175px" class="py-4 px-8 mb-4 rounded-lg">
                <v-list>
                  <header class="title font-weight-bold pl-0">The activities you will do</header>
                  <div v-if="activities.length > 0">
                    <v-subheader v-for="(act, index) in activities" v-bind:key="index">
                      <v-icon class="pa-1">mdi-playlist-check</v-icon>
                      {{act.description}}
                    </v-subheader>
                  </div>
                  <div v-else>
                    <v-subheader class="pa-0">No activities have been added for the service yet.</v-subheader>
                  </div>
                </v-list>
              </v-card>
            </v-col>
            <!-- Section 4: More Information -->
            <v-col>
              <v-card min-height="175px" class="py-4 px-8 mb-4 rounded-lg">
                <v-list>
                  <header class="title font-weight-bold pl-0">Good to Know</header>
                  <div v-if="service.description.length > 0">
                    <v-subheader class="pa-0">{{service.description}}</v-subheader>
                  </div>
                  <div v-else>
                    <v-subheader class="pa-0">Description of the service not yet available.</v-subheader>
                  </div>
                </v-list>
              </v-card>
            </v-col>
          </v-row>
          <!-- Section 5: Service Reviews -->
          <v-card class="py-4 px-8 rounded-lg">
            <header class="title pb-4 font-weight-bold pl-0">Reviews</header>
            <list-reviews v-bind:typeReview="'service'" v-bind:reviews="reviews"></list-reviews>
          </v-card>

        </v-col>
      </v-row>
    </v-container>
  </v-main>
</template>

<script>
import ListReviews from '../../common/pages/ListReviews'
import SolicitService from '../pages/SolicitService'
import ServicesService from '../services/services.service'
import AgenciesService from  '../services/agencies.service'
import moment from 'moment'
import servicesService from "@/agency/services/services.service";

export default {
  name: "ServiceDetail",
  components: { ListReviews, SolicitService },
  props: [
    'serviceId', 'typeUser', 'idUser'
  ],
  data: () => ({
    errors: [],
    dateRules: [
      v => !!v || 'Date is required',
    ],
    peopleRules: [
      v => !!v || '´Number people is required',
    ],
    service: [],
    agency: [],
    activities: [],
    reviews: [],
    dateOutput: '',
    nPeople: null,
    id: null,
    agencyId: null,
    dialogSolicit: false,
  }),
  methods: {
    dateTransform(date) {
      let monthName = moment(date).format("MMMM");
      let yearNumber = moment(date).format("YYYY");
      return monthName + ' ' + yearNumber;
    },
    async retrieveService() {
      await ServicesService.getById(this.id)
        .then(response => {
          this.service = response.data;
        })
        .catch(errors => {
          errors.push(errors.message);
        });
    },
    async retrieveActivities() {
      await ServicesService.getWithActivities(this.id)
        .then(response => {
          this.activities = response.data;
        })
        .catch(errors => {
          this.errors.push(errors);
        });
    },
    async retrieveReviews() {
      await ServicesService.getWithServiceReviews(this.id)
        .then(response => {
          this.reviews = response.data;
        })
        .catch(errors => {
          this.errors.push(errors);
        });
    },
    async retrieveAgency() {
      await AgenciesService.getById(this.service.agencyId)
        .then(response => {
          this.agency = response.data;
        })
        .catch(errors => {
          this.errors.push(errors);
        });
    },
    validateForm() {
      return this.$refs.form.validate();
    },
    setDialogSolicit() {
      this.dialogSolicit = !this.dialogSolicit;
    },
    continueDialogSolicit() {
      let isValid = this.validateForm();
      if (isValid) {
        if (this.typeUser == null || this.typeUser === '') this.$emit('sign-in');
        else if (this.typeUser === 'customer') this.setDialogSolicit();
      }
      this.$gtag.event('solicit', {'serviceName': this.service.name,'serviceId': this.service.id})
    },
    async reportService(){
      let serviceDto = {
        id: this.service.id,
        agencyId: this.service.agencyId,
        name: this.service.name,
        score: this.service.score,
        price: this.service.price,
        newPrice: this.service.newPrice,
        location: this.service.location,
        creationDate: this.service.creationDate,
        photos: this.service.photos,
        videoUrl: this.service.videoUrl,
        reports: this.service.reports += 1,
        description: this.service.description,
        isOffer: this.service.isOffer,
        agency: this.service.agency
      };
      //console.log(serviceDto)
      await servicesService.update(this.service.id, serviceDto).then(serviceDto = null).catch(error => {
        this.errors.push(error);
      });

    }
  },
  async mounted() {
    await this.retrieveService();
    await this.retrieveActivities();
    await this.retrieveReviews();
    await this.retrieveAgency();
  },
  beforeMount() {
    this.id = this.$route.params.id;
    this.typeUser = this.$store.state.user.typeUser;
  }
}
</script>

<style scoped>
  .logo{
    margin-top: 25px;
    border-radius: 50%;
  }
  .agency-div {
    min-width: 300px;
  }
</style>
