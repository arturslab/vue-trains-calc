<template>
  <v-footer height="40" app>
    <a
      v-for="item in items"
      :key="item.title"
      :href="item.href"
      :title="item.title"
      class="d-inline-block mx-2 social-link"
      rel="noopener noreferrer"
      target="_blank"
    >
      <icon-base :icon="item.icon" width="18" height="18" />
    </a>

    <div class="text-caption text-disabled" style="position: absolute; right: 16px">
      V.{{ version }} &copy; {{ new Date().getFullYear() }}
      <span class="d-none d-sm-inline-block">
        <a href="https://melma.pl" target="_blank" class="text-decoration-none on-surface">melma.pl</a>
      </span>
    </div>
  </v-footer>
</template>

<script>
// import file with version
import { version } from '../../package.json';

export default {
  data() {
    return {
      version: version,
      items: [
        {
          title: 'Source code on GitHub',
          icon: 'github',
          href: 'https://github.com/arturslab/vue-trains-calc'
        },
        {
          title: 'Author website',
          icon: 'web',
          href: 'https://melma.pl'
        }
      ]
    };
  }
};
</script>

<style scoped lang="sass">
  .social-link :deep(.v-icon)
    color: rgba(var(--v-theme-on-background), var(--v-disabled-opacity))
    text-decoration: none
    transition: .2s ease-in-out

    &:hover
      color: rgba(25, 118, 210, 1)
</style>
