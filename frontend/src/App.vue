<template>
  <v-app>
    <component :is="currentLayout">
    </component>
  </v-app>
</template>

<script>
import { computed } from "vue";
import { useRoute } from "vue-router";
import DefaultLayout from "@/layouts/DefaultLayout.vue";
import AuthLayout from "@/layouts/AuthLayout.vue";

export default {
  components: {
    DefaultLayout,
    AuthLayout,
  },
  setup() {
    const route = useRoute();

    const layouts = {
      default: DefaultLayout,
      auth: AuthLayout,
    };

    const currentLayout = computed(() => {
      const layoutName = route.meta.layout;
      return layoutName ? layouts[layoutName] : DefaultLayout;
    });

    return {
      currentLayout,
    };
  },
};
</script>

