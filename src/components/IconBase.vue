<template>
  <svg xmlns="http://www.w3.org/2000/svg" 
    :width="iconWidth" 
    :height="iconHeight" 
    viewBox="0 0 24 24" 
    :aria-labelledby="icon" 
    role="presentation"
  >
    <title :id="iconName" lang="en">{{iconName}} icon</title>
    <g :fill="iconColor">
      <component :is="iconName" />
    </g>
  </svg>
</template>

<script>
import IconClock from './icons/IconClock.vue'
import IconSpeed from './icons/IconSpeed.vue'
import IconRoad from './icons/IconRoad.vue';
import IconGithub from './icons/IconGithub.vue';
import IconWeb from './icons/IconWeb.vue';

export default {
  name: 'IconBase',
  components: {
    IconClock,
    IconSpeed,
    IconRoad,
    IconGithub,
    IconWeb
  },
  props: {
    icon: {
      type: String,
      default: 'clock'
    },
    width: {
      type: [Number, String],
      default: 24
    },
    height: {
      type: [Number, String],
      default: 24
    },
    iconColor: {
      type: String,
      default: 'currentColor'
    },
    size: {
      type: String,
      default: ''
    }
  },
  computed: {
    iconWidth() {
      return this.size === 'x-large' ? '32px' : this.width;
    },
    iconHeight() {
      return this.size === 'x-large' ? '32px' : this.height;
    },
    iconName() {
      return 'Icon' + this.icon.charAt(0).toUpperCase() + this.icon.slice(1);
    }
    
  },
}
</script>

<style scoped>
svg {
  display: inline-block;
  vertical-align: baseline;
  margin-bottom: -2px;
  /* yes, I'm that particular about formatting */
}
</style>