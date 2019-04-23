import Vue from 'vue';
import Vuex from 'vuex';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    products: [],
    brandMeasurement: {
      'knit-boxy': {
        shoulder: {
          sizeMeasure: [16.8, 17.9, 19, 19.9, 20.9],
          values_fit: 0.921,
        },
        chest: {
          sizeMeasure: [44, 45.1, 46.1, 47.2, 48.2],
          values_fit: 0.771,
        },
        waist: {
          sizeMeasure: [41.4, 42.4, 43.5, 44.5, 45.5],
          values_fit: 0.721,
        },
      },
      'knit-form-fitting': {
        shoulder: {
          sizeMeasure: [13.2, 14.3, 15.3, 16.3, 17.3],
          values_fit: 0.971,
        },
        chest: {
          sizeMeasure: [31.5, 32.7, 33.7, 34.7, 35.7],
          values_fit: 0.921,
        },
        waist: {
          sizeMeasure: [25.5, 26.6, 27.6, 28.6, 29.6],
          values_fit: 0.921,
        },
      },
      'knit-regular': {
        shoulder: {
          sizeMeasure: [14.4, 15.5, 16.5, 17.5, 18.5],
          values_fit: 0.921,
        },
        chest: {
          sizeMeasure: [35.7, 36.8, 37.8, 38.9, 39.9],
          values_fit: 0.87,
        },
        waist: {
          sizeMeasure: [30.8, 31.9, 32.9, 33.9, 34.9],
          values_fit: 0.821,
        },
      },
      'knit-relaxed': {
        shoulder: {
          sizeMeasure: [15.6, 16.7, 17.8, 18.7, 19.7],
          values_fit: 0.921,
        },
        chest: {
          sizeMeasure: [39.9, 40.9, 42, 43, 44],
          values_fit: 0.821,
        },
        waist: {
          sizeMeasure: [36.1, 37.2, 38.2, 39.2, 40.2],
          values_fit: 0.771,
        },
      },
      'shirt-boxy': {
        shoulder: {
          sizeMeasure: [16.0, 17.1, 18.2, 19.2, 20.2],
          values_fit: 0.9,
        },
        chest: {
          sizeMeasure: [39.0, 40.2, 41.2, 42.1, 43.2],
          values_fit: 0.8,
        },
        waist: {
          sizeMeasure: [39.1, 40.2, 41.2, 42.1, 43.2],
          values_fit: 0.75,
        },
      },
      'shirt-regular': {
        shoulder: {
          sizeMeasure: [13.9, 15.1, 16.1, 17.1, 18.0],
          values_fit: 0.9,
        },
        chest: {
          sizeMeasure: [37.7, 39.1, 39.9, 41.0, 42.0],
          values_fit: 0.85,
        },
        waist: {
          sizeMeasure: [35.9, 37.1, 38.1, 39.1, 40.0],
          values_fit: 0.8,
        },
      },
      'woven-regular': {
        shoulder: {
          sizeMeasure: [14.2, 15.4, 16.4, 17.2, 18.4],
          values_fit: 0.9,
        },
        chest: {
          sizeMeasure: [36.6, 37.8, 38.7, 39.7, 40.8],
          values_fit: 0.85,
        },
        waist: {
          sizeMeasure: [35.6, 36.6, 37.6, 38.7, 39.6],
          values_fit: 0.8,
        },
      },
      'woven-relaxed': {
        shoulder: {
          sizeMeasure: [14.7, 15.9, 16.9, 17.7, 18.9],
          values_fit: 0.9,
        },
        chest: {
          sizeMeasure: [38.7, 39.8, 40.8, 41.8, 42.9],
          values_fit: 0.8,
        },
        waist: {
          sizeMeasure: [39.7, 40.8, 41.8, 42.9, 43.8],
          values_fit: 0.75,
        },
      },
      'woven-slim': {
        shoulder: {
          sizeMeasure: [13.7, 14.8, 15.9, 16.8, 17.8],
          values_fit: 0.9,
        },
        chest: {
          sizeMeasure: [34.5, 35.7, 36.6, 37.7, 38.7],
          values_fit: 0.9,
        },
        waist: {
          sizeMeasure: [31.4, 32.4, 33.4, 34.5, 35.5],
          values_fit: 0.9,
        },
      } 
    },
  },
  mutations: {
    setData(state, json) {
      state.products = json
    }
  },
  actions: {
    getData({ commit }) {
      fetch('https://shahrukh.dev/fuzzy-logic/data.json')
        .then(response => response.json())
        .then(json => commit('setData', json));
    },
  },
  getters: {
    getProduct: state => (id) => {
      return state.products.find(product => product.id == id);
    },
    getProductsByKnit: state => (knit) => {
      return state.products.filter(product => product.knit === knit);
    }
  }
})
