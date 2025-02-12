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
        true_track: state[10] || 0,
      }));

      updateMarkers();
    }
  } catch (error) {
    console.error("Error fetching flight data:", error);
  }
};

const updateMarkers = () => {
  const bounds = map.value.getBounds();

  markers.value.forEach((marker) => marker.remove());
  markers.value = [];

  const visibleFlights = tableData.value.filter(
    (flight) =>
      flight.longitude >= bounds.getWest() &&
      flight.longitude <= bounds.getEast() &&
      flight.latitude >= bounds.getSouth() &&
      flight.latitude <= bounds.getNorth()
  );

  visibleFlights.forEach((flight) => {
    const el = document.createElement("div");
    el.className = "marker";
    const img = document.createElement("img");
    img.src = "https://www.svgrepo.com/show/326465/airplane-outline.svg";
    img.style.width = "30px";
    img.style.height = "30px";
    img.style.transform = `rotate(${flight.true_track}deg)`;

    el.appendChild(img);
    const marker = new mapboxgl.Marker(el)
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
    center: [35, 39],
    zoom: 6,
    minZoom: 5,
  });

  map.value.addControl(new mapboxgl.NavigationControl());
  map.value.addControl(new mapboxgl.FullscreenControl());
  map.value.addControl(
    new mapboxgl.GeolocateControl({
      positionOptions: { enableHighAccuracy: true },
      trackUserLocation: true,
    })
  );
  map.value.addControl(new mapboxgl.ScaleControl({ unit: "metric" }));

  fetchData();
  setInterval(fetchData, 6000);
  map.value.on("moveend", updateMarkers);
});
</script>

<style>
#map-container {
  width: 100%;
  height: 1000px;
}
.marker img {
  transition: transform 0.3s ease-out;
}
</style>
