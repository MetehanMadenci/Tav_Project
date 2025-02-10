<template>
  <div id="map-container"></div>
</template>

<script setup>
import { onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";

const USERNAME = import.meta.env.VITE_USERNAME;
const PASSWORD = import.meta.env.VITE_PASSWORD;
const MAPTOKEN = import.meta.env.VITE_MAPBOX_KEY;

const tableData = ref([]);
const map = ref(null);
const markers = ref([]);

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
      tableData.value = response.data.states.slice(0, 100).map((state) => ({
        longitude: state[5] || null,
        latitude: state[6] || null,
      }));

      updateMarkers();
    }
  } catch (error) {
    console.error("Error fetching flight data:", error);
  }
};

const updateMarkers = () => {
  markers.value.forEach((marker) => marker.remove());

  tableData.value.forEach((flight) => {
    const marker = new mapboxgl.Marker()
      .setLngLat([flight.longitude, flight.latitude])
      .addTo(map.value);

    markers.value.push(marker);
  });
};

onMounted(() => {
  mapboxgl.accessToken = MAPTOKEN;

  map.value = new mapboxgl.Map({
    container: "map-container",
    style: "mapbox://styles/mapbox/streets-v11",
    center: [10, 20],
    zoom: 5,
  });

  fetchData();
  setInterval(fetchData, 6000);
  setInterval(updateMarkers, 6000);
});
</script>

<style>
#map-container {
  width: 100%;
  height: 1000px;
}
</style>
