<template>
  <div class="container-fluid">
    <div
      class="mt-4 page-header min-height-200 border-radius-xl bg-dark"
      :style="{
        backgroundImage:
          'url(' + require('@/assets/img/curved-images/curved14.jpg') + ')',
        backgroundPositionY: '50%',
      }"
    >
      <span class="mask bg-gradient-success opacity-6"></span>
    </div>
    <div class="mx-4 overflow-hidden card card-body blur shadow-blur mt-n6">
      <div class="row gx-4">
        <div class="col-auto my-auto">
          <div class="h-100 py-2">
            <h5 class="mb-1">Registrar Medidas</h5>
            <small>Registrar medidas realizadas durante a consulta</small>
          </div>
        </div>
      </div>
    </div>
  </div>
  <MeasureForm :onSubmit="handleCreate" />
</template>

<script>
import register from "@/views/Measure/_store/register";
import { createNamespacedHelpers } from "vuex";
const { mapActions } = createNamespacedHelpers("measures");

import MeasureForm from "./_components/MeasureForm.vue";

import { onToastify } from "@/helpers";
import setNavPills from "@/assets/js/nav-pills.js";
import setTooltip from "@/assets/js/tooltip.js";

export default {
  name: "measureCreate",
  components: {
    MeasureForm,
  },
  methods: {
    ...mapActions(["measureCreate"]),

    async handleCreate(dataMeasure) {
      const patientId = this.$route.params.patientId;

      const { success, error } = await this.measureCreate({
        payload: dataMeasure,
        patientId,
      });

      if (!success) {
        const {
          response: { data: message },
        } = error;

        onToastify(message);
      } else {
        this.$router.push(`/patients/${patientId}/details`);
      }
    },
  },
  mounted() {
    this.$store.state.isAbsolute = true;
    setNavPills();
    setTooltip(this.$store.state.bootstrap);
  },
  beforeMount() {
    this.$store.state.isAbsolute = false;
  },
  created() {
    register(this.$store);
  },
};
</script>
