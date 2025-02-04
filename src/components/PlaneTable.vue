<template>
  <div class="example-pagination-block">
    <el-pagination
      :total="tableData.length"
      :page-size="pageSize"
      layout="prev, pager, next"
      @current-change="(page) => (currentPage = page)"
    />
  </div>
  <el-button-group>
    <el-button type="primary" @click="fetchData">Fetch Data</el-button>
  </el-button-group>

  <el-table row-key="icao24" :data="paginatedData" style="width: 100%">
    <el-table-column prop="icao24" label="ICAO24" />
    <el-table-column prop="callsign" label="callsign" />
    <el-table-column prop="origin_country" label="Origin Country" />
    <el-table-column prop="velocity" label="Velocity" />
    <el-table-column prop="geo_altitude" label="Geo Altidute" />
  </el-table>
</template>

<script setup>
import { ref, computed } from "vue";
import axios from "axios";

const tableData = ref([]);
const currentPage = ref(1);
const pageSize = 25;
const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;

const fetchData = async () => {
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
  }
};

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize;
  return tableData.value.slice(start, start + pageSize);
});
</script>

<style scoped>
.example-pagination-block + .example-pagination-block {
  margin-top: 10px;
}
.example-pagination-block .example-demonstration {
  margin-bottom: 16px;
}
</style>
