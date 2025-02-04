<template>
    <el-button-group>
    
    <el-button type="primary" @click="fetchData">Fetch Data</el-button>
    
    </el-button-group>

      <el-table ref="tableRef" row-key="icao24" :data="tableData" style="width: 100%">
      <el-table-column prop="icao24" label="ICAO24" />
      <el-table-column prop="callsign" label="callsign" />
      <el-table-column prop="origin_country" label="Origin Country" />
      <el-table-column prop="velocity" label="Velocity" />
      <el-table-column prop="geo_altitude" label="Geo Altidute"  />
    
      </el-table>
    </template>
    
    <script setup>
    
    import { ref } from 'vue'
    import axios from 'axios'
    import {
      ArrowLeft,
      ArrowRight,
    } from '@element-plus/icons-vue'
  
    const tableRef = ref(null)
    const tableData = ref(null)

    const USERNAME = "anapros"
    const PASSWORD = "BM1ykO6y"

    const fetchData = async () => {
    try {
      const response = await axios.get('https://opensky-network.org/api/states/all', {
      auth: {
        username: USERNAME,
        password: PASSWORD}
      })
      if (response.data && response.data.states) {
        tableData.value = response.data.states.map((state) => ({
          icao24: state[0] || 'N/A',
          callsign: state[1] || 'N/A',
          origin_country: state[2] || 'N/A',
          velocity: state[3] || 0,
          geo_altitude: state[4] || 0
        }))
      }
    } catch (error) {
      console.error("Error fetching flight data:", error)
    }
  }

    </script>