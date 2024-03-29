// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from "vue";
import App from "./App";

import { Cropper } from "vue-advanced-cropper";

Vue.component("crop-image", Cropper);
new Vue({
  el: "#app",
  components: { App },
  template: "<App/>"
});
