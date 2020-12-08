<template>
  <div class="d-flex" id="wrapper">
    <sidebar />
    <div id="page-content-wrapper">
      <leftlink />
      <div class="container-fluid">
        <h1 class="mt-4">Currencr Rates</h1>
        <select v-model="per_page" @change="setPerPage">
            <option value="10">10</option>
            <option value="20">20</option>
            <option value="30">30</option>
        </select>
        <table class="table">
          <thead>
            <tr>
              <!-- <th scope="col">#</th> -->
              <th scope="col">Currency</th>
              <th scope="col">Value</th>
              <th scope="col">Date</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(rate) in rates" :key="rate.char_code">
              <!-- <th scope="row">{{  ((page -1) +per_page) }}</th> -->
              <td>{{ rate.char_code }}</td>
              <td>{{ rate.value }}</td>
              <td>{{ rate.valcurs_date }}</td>
            </tr>
          </tbody>
        </table>
        <nav aria-label="Page navigation example">
          <ul class="pagination">
            <li class="page-item" @click="setPage((page - 1), $event)">
              <a class="page-link" href="#">Previous</a>
            </li>
            <li
              class="page-item"
              v-for="p in pages"
              :key="p"
              :class="{ 'page-number active': p === page }"
              @click="setPage(p, $event)"
            >
              <a class="page-link" href="#">{{ p }}</a>
            </li>
            <li class="page-item" @click="setPage((page + 1), $event)"><a class="page-link" href="#">Next</a></li>
          </ul>
        </nav>
      </div>
    </div>
  </div>
</template>

<script>
import Sidebar from "./Common/Sidebar";
import rateService from "../services/rate-service";
import LeftLink from './Common/LeftLink';

export default {
  data() {
    return {
      rates: [],
      page: 1,
      per_page: 10,
      total: 0,
      pages: 0,
    };
  },
  components: {
    sidebar: Sidebar,
    leftlink: LeftLink,
  },
  methods: {
    getRates() {
      rateService.getHistory(this.$route.params.rate).then((response) => {
        if (response.data.rates) {
          this.rates = response.data.rates.data;
          this.total = response.data.rates.total;
          this.pages = Math.ceil(response.data.rates.total / this.per_page);
        }
      });
    },
    setPage(page, e) {
        e.preventDefault();
        if(page <= 0 || page >this.pages) return;
        if(page === this.page) return;
        this.page = page;
        this.getRates();
    },
    setPerPage(){
        this.page = 1;
        this.getRates();
    }
  },
  mounted() {
    this.getRates();
  },
};
</script>
<style scoped>
#page-content-wrapper,
#wrapper {
  height: 100%;
  width: 100%;
}
</style>