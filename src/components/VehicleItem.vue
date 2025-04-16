<template>
  <v-card class="py-4" color="surface-variant" rounded="lg" variant="outlined">
    <template #title>
      <h2 class="text-h5 font-weight-bold text-center mb-2">{{ name }}</h2>
    </template>

    <v-card-text class="test">
      <div v-if="!calculationAdvancedMode" class="d-flex flex-column align-center mb-8">
        <v-btn-toggle v-model="chosenSolver" color="warning" divided mandatory>
          <v-tooltip :text="$t('tooltipButtonVelocity')" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-speedometer" size="x-large" stacked value="velocity"></v-btn>
            </template>
          </v-tooltip>

          <v-tooltip :text="$t('tooltipButtonDistance')" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-road-variant" size="x-large" stacked value="distance"></v-btn>
            </template>
          </v-tooltip>

          <v-tooltip :text="$t('tooltipButtonTime')" location="bottom">
            <template v-slot:activator="{ props }">
              <v-btn v-bind="props" icon="mdi-clock-time-four-outline" size="x-large" stacked value="time"></v-btn>
            </template>
          </v-tooltip>
        </v-btn-toggle>
      </div>

      <template
        v-for="({ id, readonly, icon, label, placeholder, rules }, key) in fieldsConfiguration"
        v-bind:key="key"
      >
        <v-row no-gutters>
          <v-col
            :cols="calculationAdvancedMode ? 12 : 6"
            :sm="calculationAdvancedMode ? 12 : 5"
            :md="calculationAdvancedMode ? 12 : 8"
            :lg="calculationAdvancedMode ? 12 : 7"
          >
            <v-text-field
              v-model.number="formData[id]"
              :bg-color="editableBgColor(readonly)"
              :border-color="editableBorderColor(readonly)"
              :clearable="!calculationAdvancedMode || !readonly"
              :disabled="false"
              :label="label"
              :max="100000"
              :min="0"
              :placeholder="placeholder"
              :readonly="!calculationAdvancedMode && readonly"
              :rules="rules"
              :suffix="calculationAdvancedMode ? formData.units.distance : null"
              color="primary"
              density="comfortable"
              outlined
              persistent-placeholder
              type="number"
              variant="solo-filled"
              @click="readonly ? false : activateField(id)"
            >
              <template v-slot:prepend>
                <v-tooltip v-if="!readonly" location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" :icon="icon" size="x-large"></v-icon>
                  </template>
                  {{ $t('tooltipEnterValue', { field: label }) }}
                </v-tooltip>

                <v-tooltip v-else location="bottom">
                  <template v-slot:activator="{ props }">
                    <v-icon v-bind="props" :color="lockedBgColor" :icon="icon" size="x-large"></v-icon>
                  </template>
                  {{ $t('tooltipCalculatedValue', { field: label }) }}
                </v-tooltip>
              </template>
            </v-text-field>
          </v-col>

          <v-col cols="6" sm="7" md="4" lg="5" v-if="!calculationAdvancedMode">
            <v-select
              v-model="formData.units[id]"
              :disabled="calculationAdvancedMode"
              :items="unitsDictionary[id]"
              class="ml-1"
              color="primary"
              density="comfortable"
              outlined
              variant="filled"
            />
          </v-col>
        </v-row>
      </template>
    </v-card-text>
  </v-card>
</template>

<script>
  // import { id, tr } from "vuetify/locale";
  import CalculatorMixin from '@/mixins/CalculatorMixin'

  export default {
    name: 'VehicleItem',
    mixins: [CalculatorMixin],
    emits: ['update'],
    data() {
      return {
        chosenSolver: 'distance',
        velocityMax: 100000,
        distanceMax: 100000,
        timeMax: 100000,

        lockedBgColor: 'warning',
        lockedBorderColor: 'warning',

        formData: {
          chosenSolver: 'velocity',
          distance: 0,
          velocity: 0,
          time: 0,
          normalized: {
            distance: 0,
            velocity: 0,
            time: 0
          },
          units: {
            velocity: 'kmphr',
            distance: 'km',
            time: 'h'
          }
        },

        rules: {
          required: value => !!value || this.$t('requiredField'),
          positiveNumber: value => {
            const valid = value === '' || (!isNaN(value) && value > 0)
            return valid || this.$t('rules.value.positiveNumber')
          },
          nonNegativeNumber: value => {
            const valid = value === '' || (!isNaN(value) && value >= 0)
            return valid || this.$t('rules.value.nonNegativeNumber')
          },
          maxNumber: maxNum => {
            return v => (v || 0) <= maxNum || this.$t('rules.value.max', { max: maxNum })
          }
        }
      }
    },
    props: {
      calculationAdvancedMode: Boolean,
      name: String,
      order: Number
    },
    created() {
      this.resetForm()
    },
    computed: {
      fieldsConfiguration() {
        const items = [
          {
            id: 'velocity',
            type: 'number',
            value: 0,
            label: this.$t('velocity'),
            placeholder: '0.00',
            suffix: this.$t('velocityUnitKmPHr'),
            rules:
              this.chosenSolver === 'velocity'
                ? []
                : [this.rules.required, this.rules.nonNegativeNumber, this.rules.maxNumber(100000)],
            disabled: this.chosenSolver === 'velocity',
            readonly: !this.calculationAdvancedMode && this.chosenSolver === 'velocity',
            show: true,
            icon: 'mdi-speedometer'
          },
          {
            id: 'distance',
            type: 'number',
            value: 0,
            label: this.$t('distance'),
            placeholder: '0.00',
            suffix: this.$t('distanceUnitKm'),
            rules:
              this.chosenSolver === 'distance'
                ? []
                : [this.rules.required, this.rules.nonNegativeNumber, this.rules.maxNumber(100000)],
            disabled: this.chosenSolver === 'distance',
            readonly: !this.calculationAdvancedMode && this.chosenSolver === 'distance',
            show: !this.calculationAdvancedMode,
            icon: 'mdi-road-variant'
          },
          {
            id: 'time',
            type: 'number',
            value: 0,
            label: this.$t('time'),
            placeholder: '0.00',
            suffix: this.$t('timeUnitH'),
            rules:
              this.chosenSolver === 'time'
                ? []
                : [this.rules.required, this.rules.nonNegativeNumber, this.rules.maxNumber(100000)],
            disabled: this.chosenSolver === 'time',
            readonly: !this.calculationAdvancedMode && this.chosenSolver === 'time',
            show: !this.calculationAdvancedMode,
            icon: 'mdi-clock-time-four-outline'
          }
        ]

        return items.filter(item => item.show)
      }
    },
    methods: {
      setSolverMode() {
        this.activeFields = {
          distance: false,
          time: false,
          velocity: false
        }

        this.activeFields[this.chosenSolver] = true
      },

      activateField(key) {
        if (this.formData[key] === 0) this.formData[key] = ''
      },

      editableBgColor(readonly = false) {
        return readonly ? 'warning' : 'default'
      },
      editableBorderColor(readonly = false) {
        return readonly ? 'warning' : 'default'
      },

      resetForm() {
        this.formData = {
          chosenSolver: 'velocity',
          distance: 0,
          velocity: 0,
          time: 0,
          normalized: {
            distance: 0,
            velocity: 0,
            time: 0
          },
          units: {
            velocity: 'kmphr',
            distance: 'km',
            time: 'h'
          }
        }
      },

      calculateVelocity() {
        // check if we have all necessary data (in SI units) to calculate velocity
        let { distance, time } = this.formData.normalized
        if (!time || time === 0 || !distance || distance === 0) {
          this.formData.velocity = null
          this.formData.normalized.velocity = null
          return
        }

        let velocityInSiUnit = distance / time
        this.formData.normalized.velocity = velocityInSiUnit

        const velocity = this.convertUnits(
          velocityInSiUnit,
          this.unitsSi.velocity,
          this.formData.units.velocity,
          'velocity'
        )

        this.formData.velocity = parseFloat(velocity.toFixed(2))
        this.emitFormData()
      },

      calculateDistance() {
        let { velocity, time } = this.formData.normalized
        if (!velocity || velocity === 0 || !time || time === 0) {
          this.formData.distance = null
          this.formData.normalized.distance = null
          return
        }

        let distanceInSiUnit = velocity * time
        this.formData.normalized.distance = distanceInSiUnit

        const distance = this.convertUnits(
          distanceInSiUnit,
          this.unitsSi.distance,
          this.formData.units.distance,
          'distance'
        )

        this.formData.distance = parseFloat(distance.toFixed(2))
        this.emitFormData()
      },

      calculateTime() {
        let { distance, velocity } = this.formData.normalized
        if (!velocity || velocity === 0 || !distance || distance === 0) {
          this.formData.time = null
          this.formData.normalized.time = null
          return
        }

        let timeInSiUnit = distance / velocity
        this.formData.normalized.time = timeInSiUnit

        const time = this.convertUnits(timeInSiUnit, this.unitsSi.time, this.formData.units.time, 'time')

        this.formData.time = parseFloat(time.toFixed(2))
        this.emitFormData()
      },

      emitFormData(fieldName = null) {
        if (fieldName) {
          this.saveValueInSiUnit(fieldName)
        }

        this.formData.order = this.order
        this.formData.type = 'vehicle'
        this.$emit('update', this.formData)
      },

      // Recalculate the value to SI unit
      saveValueInSiUnit(fieldName) {
        const unitSelected = this.formData.units[fieldName]

        if (unitSelected !== this.unitsSi[fieldName]) {
          // Convert the value to SI unit
          this.formData.normalized[fieldName] = this.convertUnits(
            this.formData[fieldName],
            unitSelected,
            this.unitsSi[fieldName],
            fieldName
          )
        } else {
          this.formData.normalized[fieldName] = this.formData[fieldName]
        }
      },

      onChangeValue(fieldName, newVal, oldVal) {
        if (oldVal === null || oldVal === undefined) {
          oldVal = 0
        }

        if (newVal === oldVal || !['velocity', 'distance', 'time'].includes(fieldName)) {
          return
        }

        // 1. Save changed value in SI unit section
        this.saveValueInSiUnit(fieldName)

        // 2. Calculate locked value if we can
        if (!this.calculationAdvancedMode) {
          if (!['velocity', 'distance', 'time'].includes(this.chosenSolver)) {
            return
          }
          const functionNameSufix = this.chosenSolver.charAt(0).toUpperCase() + this.chosenSolver.slice(1)
          this[`calculate${functionNameSufix}`]()
        }

        this.emitFormData()
      },
      onChangeUnits(fieldName, newVal, oldVal) {
        if (newVal === oldVal || !['velocity', 'distance', 'time'].includes(fieldName)) {
          return
        }

        // convertUnits
        const computedValue = this.convertUnits(this.formData[fieldName], oldVal, newVal, fieldName)

        this.formData[fieldName] = parseFloat(computedValue.toFixed(2))

        this.emitFormData()
      }
    },
    watch: {
      chosenSolver: {
        handler: function (val) {
          this.resetForm()
          this.setSolverMode()
        }
      },

      calculationAdvancedMode: {
        handler: function (val, oldVal) {
          this.resetForm()
        }
      },

      'formData.units.velocity': {
        handler: function (newVal, oldVal) {
          this.onChangeUnits('velocity', newVal, oldVal)
        },
        immediate: true
      },
      'formData.units.distance': {
        handler: function (newVal, oldVal) {
          this.onChangeUnits('distance', newVal, oldVal)
        },
        immediate: true
      },
      'formData.units.time': {
        handler: function (newVal, oldVal) {
          this.onChangeUnits('time', newVal, oldVal)
        },
        immediate: true
      },
      'formData.distance': {
        handler: function (newVal, oldVal) {
          this.onChangeValue('distance', newVal, oldVal)
        },
        immediate: true
      },
      'formData.time': {
        handler: function (newVal, oldVal) {
          this.onChangeValue('time', newVal, oldVal)
        },
        immediate: true
      },
      'formData.velocity': {
        handler: function (newVal, oldVal) {
          this.onChangeValue('velocity', newVal, oldVal)
        },
        immediate: true
      }
    }
  }
</script>
