<template>
  <v-card class="py-4" color="surface-variant" rounded="lg" variant="outlined">
    <template #title>
      <h2 class="text-h5 font-weight-bold text-center mb-2">{{ $t('distance') }}</h2>
    </template>

    <v-card-text>
      <v-row no-gutters>
        <v-col cols="12">
          <v-text-field
            v-model.number="formData.distance"
            :label="label"
            :max="100000"
            :min="0"
            :rules="[rules.required, rules.nonNegativeNumber, rules.maxNumber(1000)]"
            :suffix="formData.units.distance"
            border-color="primary"
            clearable
            color="primary"
            density="comfortable"
            outlined
            persistent-placeholder
            placeholder="0.00"
            type="number"
            variant="solo-filled"
            @input="emitFormData"
          >
            <template v-slot:prepend>
              <v-tooltip location="bottom">
                <template v-slot:activator="{ props }">
                  <icon-base v-bind="props" icon="road" size="x-large" />
                </template>
                {{ $t('tooltipEnterValue', { field: label }) }}
              </v-tooltip>
            </template>
          </v-text-field>
        </v-col>
      </v-row>
    </v-card-text>
  </v-card>
</template>

<script>
  import CalculatorMixin from '@/mixins/CalculatorMixin'

  export default {
    name: 'DistanceItem',
    mixins: [CalculatorMixin],
    props: {
      calculationAdvancedMode: Boolean
    },
    data() {
      return {
        formData: {
          distance: 0,
          type: 'distance',
          units: {
            distance: 'km'
          }
        },
        label: this.$t('distance'),
        distance: null,
        rules: {
          nonNegativeNumber: value => !!value || this.$t('rules.value.required'),
          positiveNumber: value => value > 0 || this.$t('rules.value.positiveNumber'),
          maxNumber: value => v => v <= value || this.$t('rules.value.maxNumber', { value })
        }
      }
    },
    methods: {
      emitFormData() {
        this.$emit('update', this.formData)
      }
    }
  }
</script>
