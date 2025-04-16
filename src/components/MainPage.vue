<template>
  <v-container>
    <v-app-bar class="d-flex justify-space-between align-center">
      <v-app-bar-title>{{ $t('titleApp') }}</v-app-bar-title>
      <language-switch class="mx-4" />
    </v-app-bar>

    <v-row justify="center">
      <v-col cols="12" sm="6" lg="3">
        <v-btn :color="calculationAdvancedMode ? 'default' : 'orange'" class="w-100" @click="setAdvancedMode(false)">
          {{ $t('labelSolverSimple') }}
        </v-btn>
      </v-col>
      <v-col cols="12" sm="6" lg="3">
        <v-btn :color="calculationAdvancedMode ? 'orange' : 'dark'" class="w-100" @click="setAdvancedMode()">
          {{ $t('labelSolverAdvanced') }}
        </v-btn>
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" :md="calculationAdvancedMode ? 4 : 5" :lg="calculationAdvancedMode ? 2 : 4">
        <vehicle-item
          :calculation-advanced-mode="calculationAdvancedMode"
          :name="calculationAdvancedMode ? $t('trainA') : $t('labelSolverSimple')"
          :order="1"
          ref="vehicle1"
          @update="showResults"
        />
      </v-col>

      <v-col cols="12" md="4" lg="2" v-if="calculationAdvancedMode">
        <distance-item @update="showResults" calculation-advanced-mode ref="distance" />
      </v-col>

      <v-col cols="12" md="4" lg="2" v-if="calculationAdvancedMode">
        <vehicle-item :name="$t('trainB')" :order="2" @update="showResults" calculation-advanced-mode ref="vehicle2" />
      </v-col>
    </v-row>

    <v-row justify="center">
      <v-col cols="12" md="8" lg="6">
        <v-alert :text="calculatorInfo" class="my-4 align-center" variant="tonal" />
      </v-col>
    </v-row>

    <v-row v-if="calculationAdvancedMode" justify="center">
      <v-col col="12" md="8" lg="6">
        <road-image :data="resultsAdvanced" />
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
  import VehicleItem from '@/components/VehicleItem.vue'
  import DistanceItem from '@/components/DistanceItem.vue'
  import RoadImage from './RoadImage.vue'
  import CalculatorMixin from '@/mixins/CalculatorMixin'

  export default {
    components: { VehicleItem, DistanceItem, RoadImage },
    name: 'MainPage',
    mixins: [CalculatorMixin],
    data() {
      return {
        calculationAdvancedMode: false,
        results1: {
          distance: '',
          time: '',
          velocity: ''
        },
        results2: {
          distance: '',
          time: '',
          velocity: ''
        },

        advancedResults: {
          vehicle1: {
            velocity: null,
            distance: null,
            time: null,
            units: {
              velocity: '',
              distance: '',
              time: ''
            },
            order: 1
          },
          vehicle2: {
            velocity: null,
            distance: null,
            time: null,
            units: {
              velocity: '',
              distance: '',
              time: ''
            },
            order: 2
          },
          distance: null
        },

        distance: null,

        resultsAdvanced: {
          distanceTotal: '',
          velocity1: '',
          velocity2: '',
          distanceToMeetFromA: '',
          distanceToMeetFromB: '',
          timeToMeet: ''
        }
      }
    },
    computed: {
      calculationModeLabel() {
        return !!this.calculationAdvancedMode ? this.$t('labelSolverAdvanced') : this.$t('labelSolverSimple')
      },
      canCalculateAdvanced() {
        return (
          !!this.advancedResults?.vehicle1?.normalized?.velocity &&
          !!this.advancedResults?.vehicle2?.normalized?.velocity &&
          !!this.advancedResults?.distance?.distance
        )
      },
      calculatorInfo() {
        return this.calculationAdvancedMode ? this.$t('infoAdvancedCalculator') : this.$t('infoSimpleCalculator')
      }
    },
    methods: {
      setAdvancedMode(isAdvanced = true) {
        this.calculationAdvancedMode = isAdvanced
      },
      showResults(data) {
        if (data.order === 1) {
          this.advancedResults.vehicle1 = data
        } else if (data.order === 2) {
          this.advancedResults.vehicle2 = data
        } else {
          this.advancedResults.distance = data
        }

        this.calculateResults()
      },

      calculateResults() {
        if (this.canCalculateAdvanced) {
          const data = {
            d: this.advancedResults?.distance?.distance,
            v1: this.advancedResults?.vehicle1?.normalized?.velocity,
            v2: this.advancedResults?.vehicle2?.normalized?.velocity
          }

          const timeToMeet = this.calculateTimeToMeet(data.d, data.v1, data.v2)
          this.resultsAdvanced.timeToMeet = timeToMeet

          const distanceToMeet = this.calculateDistanceToMeet(data.d, data.v1, data.v2)
          this.resultsAdvanced.distanceToMeetFromA = this.calculateDistanceAfterTime(timeToMeet, data.v1)
          this.resultsAdvanced.distanceToMeetFromB = parseFloat((data.d - distanceToMeet).toFixed(2))
          this.resultsAdvanced.distanceTotal = data.d
          this.resultsAdvanced.velocity1 = this.advancedResults?.vehicle1?.normalized?.velocity
          this.resultsAdvanced.velocity2 = this.advancedResults?.vehicle2?.normalized?.velocity
        }
      }
    }
  }
</script>
