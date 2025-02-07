<template>
  <div class="header">STATE TABLE</div>
  <div class="header-button-group">
    <div class="button-group">
      <div class="search-group">
        <div class="search-item">
          <label for="icao24">ICAO24</label>
          <el-input
            id="icao24"
            v-model="searchIcao24"
            size="small"
            placeholder="Type to search"
            class="search-input"
          />
        </div>
        <div class="search-item">
          <label for="callsign">Callsign</label>
          <el-input
            id="callsign"
            v-model="searchCallsign"
            size="small"
            placeholder="Type to search"
            class="search-input"
          />
        </div>
        <div class="search-item">
          <label for="origin_country">Origin Country</label>
          <el-input
            id="origin_country"
            v-model="searchCountry"
            size="small"
            placeholder="Type to search"
            class="search-input"
          />
        </div>
      </div>
      <el-button class="fetch-button" type="primary" @click="fetchData">
        REFRESH DATA
      </el-button>
    </div>
  </div>
  <el-table
    class="table-group"
    v-loading="loading"
    row-key="icao24"
    :data="paginatedData"
    stripe
    style="width: 100%"
  >
    <el-table-column prop="icao24" label="ICAO24" />
    <el-table-column prop="callsign" label="Callsign" />
    <el-table-column prop="origin_country" label="Origin Country" />
    <el-table-column prop="velocity" label="Velocity" />
    <el-table-column prop="geo_altitude" label="Geo Altitude" />
  </el-table>

  <div class="example-pagination-block">
    <el-pagination
      v-model:current-page="currentPage"
      v-model:page-size="pageSize"
      :page-sizes="[25, 50, 100, 200]"
      :background="true"
      layout="sizes, prev, pager, next"
      :total="tableData.length"
      @size-change="handleSizeChange"
      @current-change="handleCurrentChange"
    />
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from "vue";
import axios from "axios";

const tableData = ref([]);
const currentPage = ref(1);
const loading = ref();
const pageSize = ref(25);

const searchIcao24 = ref("");
const searchCallsign = ref("");
const searchCountry = ref("");

const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;

const fetchData = async () => {
  loading.value = true;
  try {
    const response = await axios.get(
      "https://opensky-network.org/api/states/all",
      {
        auth: {
          username: USERNAME,
          password: PASSWORD,
        },
      }
    );
    if (response.data && response.data.states) {
      tableData.value = response.data.states.map((state) => ({
        icao24: state[0] || "N/A",
        callsign: state[1] || "N/A",
        origin_country: state[2] || "N/A",
        velocity: state[3] || 0,
        geo_altitude: state[4] || 0,
      }));
    }
  } catch (error) {
    console.error("Error fetching flight data:", error);
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  fetchData();
  setInterval(fetchData, 60000);
});

const filteredData = computed(() => {
  return tableData.value.filter((flight) => {
    const matchesIcao24 = searchIcao24.value
      ? flight.icao24.toLowerCase().includes(searchIcao24.value.toLowerCase())
      : true;
    const matchesCallsign = searchCallsign.value
      ? flight.callsign
          .toLowerCase()
          .includes(searchCallsign.value.toLowerCase())
      : true;
    const matchesCountry = searchCountry.value
      ? flight.origin_country
          .toLowerCase()
          .includes(searchCountry.value.toLowerCase())
      : true;

    return matchesIcao24 && matchesCallsign && matchesCountry;
  });
});

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return filteredData.value.slice(start, start + pageSize.value);
});

const handleSizeChange = (newSize) => {
  pageSize.value = newSize;
};

const handleCurrentChange = (newPage) => {
  currentPage.value = newPage;
};
</script>

<style scoped>
.example-pagination-block {
  margin-top: 10px;
  display: flex;
  justify-content: center;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS";
}

.button-group {
  width: 100%;
  display: flex;
  justify-content: space-between;
  align-items: center;
  gap: 20px;
  margin-bottom: 1%;
  border: 1px solid #3399ff;
  border-radius: 0.1cm;
}

.search-group {
  display: flex;
  gap: 20px;
  align-items: center;
  margin-bottom: 1%;
  margin-left: 1%;
}

.search-item {
  display: flex;
  flex-direction: column;
  width: 25%;
  margin-bottom: 1px;
}

.search-item label {
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS";
  font-weight: bold;
  color: rgb(126, 125, 125);
}

.search-input {
  width: 100%;
  height: 35px;
}
.header-button-group {
  background-color: white;
  border-radius: 0.1cm;
}

.fetch-button {
  width: 150px;
  height: 40px;
  font-family: "Segoe UI", Tahoma, Geneva, Verdana, sans-serif;
  margin-right: 1%;
}

.table-group {
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS", sans-serif;
  border: 1px solid #3399ff;
  border-radius: 0.1cm;
}
.header {
  display: flex;
  justify-content: center;
  font-size: 100px;
  font-family: "Gill Sans", "Gill Sans MT", Calibri, "Trebuchet MS";
  color: #3399ff;
  text-shadow: 2px 2px 0px black, -2px -2px 0px black, 2px -2px 0px black,
    -2px 2px 0px black;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
