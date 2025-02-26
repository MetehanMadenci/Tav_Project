<template>
  <div class="container">
    <div class="content">
      <div class="header">DEPARTURE TABLE</div>
      <div class="filter">Filter</div>
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
        max-height="60vh"
      >
        <el-table-column prop="icao24" label="ICAO24" />
        <el-table-column prop="callsign" label="Callsign" />
        <el-table-column prop="location" label="Departure Location" />
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
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted, onUnmounted } from "vue";
import axios from "axios";
import dayjs from "dayjs";
import { useAuthStore } from "../stores/AuthStore";
import { ElMessage } from "element-plus";

const isPageActive = ref(false);
const authStore = useAuthStore();
const tableData = ref([]);
const searchAirport = ref("LTFM");
const loading = ref(false);

const currentPage = ref(1);
const pageSize = ref(25);

const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;

const fetchData = async () => {
  if (!isPageActive.value || !authStore.isAuthenticated) return;
  if (!searchAirport.value.trim()) return;

  loading.value = true;

  tableData.value = [];
  try {
    const now = Math.floor(Date.now() / 1000);
    const oneDayAgo = now - 86400;

    const response = await axios.get(
      "https://opensky-network.org/api/flights/departure",
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
      location: flight.estDepartureAirport || "N/A",
      firstSeen: dayjs.unix(flight.firstSeen).format("HH:mm:ss"),
      lastSeen: dayjs.unix(flight.lastSeen).format("HH:mm:ss"),
    }));
  } catch (error) {
    ElMessage({
      message: "Error with Fetching Data!",
      duration: 3000,
      showClose: true,
      customClass: "data-error-message",
    });
  } finally {
    loading.value = false;
  }
};
onMounted(() => {
  isPageActive.value = true;
  fetchData();
});
onUnmounted(() => {
  isPageActive.value = false;
});
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
  font-family: "Jost", sans-serif;
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
  width: 100px;
  margin-top: 5px;
  margin-bottom: 5px;
  font-family: "Jost", sans-serif;
  font-weight: bold;
  color: rgb(126, 125, 125);
}

.search-input {
  width: 150px;
  height: 35px;
}
.header-button-group {
  background-color: rgb(238, 238, 238);
  border-radius: 0.1cm;
}

.fetch-button {
  width: 150px;
  height: 40px;
  font-family: "Jost", sans-serif;
  margin-right: 1%;
}

.table-group {
  font-family: "Jost", sans-serif;
  border: 1px solid #3399ff;
  border-radius: 0.1cm;
  height: calc(100vh - 500px);
}
.header {
  margin-top: 30px;
  display: flex;
  justify-content: left;
  font-size: 30px;
  font-family: "Jost", sans-serif;
  color: #3399ff;
  font-weight: bold;
}
.filter {
  margin-top: 2px;
  display: flex;
  justify-content: left;
  font-size: 20px;
  font-family: "Jost", sans-serif;
  color: #3399ff;
  font-weight: bold;
}
.example-showcase .el-loading-mask {
  z-index: 9;
}
</style>
