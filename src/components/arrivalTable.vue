<template>
  <div class="header">ARRIVAL TABLE</div>
  <div class="header-button-group">
    <div class="button-group">
      <div class="search-group">
        <div class="search-item">
          <label for="airport">Airport ICAO</label>
          <el-input
            id="airport"
            v-model="searchAirport"
            size="small"
            placeholder="Enter ICAO (e.g., LTFM)"
            class="search-input"
          />
        </div>
      </div>
      <el-button class="fetch-button" type="primary" @click="fetchData">
        GET DATA
      </el-button>
    </div>
  </div>

  <el-table
    class="table-group"
    v-loading="loading"
    :data="paginatedData"
    stripe
  >
    <el-table-column prop="icao24" label="ICAO24" />
    <el-table-column prop="callsign" label="Callsign" />
    <el-table-column prop="destination" label="Destination" />
    <el-table-column prop="firstSeen" label="First Seen" />
    <el-table-column prop="lastSeen" label="Last Seen" />
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
import dayjs from "dayjs";

const tableData = ref([]);
const searchAirport = ref("LTBJ");
const loading = ref(false);

const currentPage = ref(1);
const pageSize = ref(25);

const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;

const fetchData = async () => {
  if (!searchAirport.value.trim()) return;

  loading.value = true;

  tableData.value = [];
  try {
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 86400;

    const response = await axios.get(
      "https://opensky-network.org/api/flights/arrival",
      {
        params: {
          airport: searchAirport.value.trim(),
          begin: oneDayAgo,
          end: now,
        },
        auth: { username: USERNAME, password: PASSWORD },
      }
    );

    tableData.value = response.data.map((flight) => ({
      icao24: flight.icao24 || "N/A",
      callsign: flight.callsign || "N/A",
      destination: flight.estArrivalAirport || "N/A",
      firstSeen: dayjs.unix(flight.firstSeen).format("HH:mm:ss"),
      lastSeen: dayjs.unix(flight.lastSeen).format("HH:mm:ss"),
    }));
  } catch (error) {
    console.error("Error fetching departure flights:", error);
  } finally {
    loading.value = false;
  }
};

onMounted(fetchData);

const paginatedData = computed(() => {
  const start = (currentPage.value - 1) * pageSize.value;
  return tableData.value.slice(start, start + pageSize.value);
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
  width: 150px;
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
