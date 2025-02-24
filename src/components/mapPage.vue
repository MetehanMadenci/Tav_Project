<template>
  <PageHeader />
  <div class="header">MAP</div>
  <div class="container">
    <div class="content"><div id="map-container"></div></div>
  </div>
  <PageFooter />
</template>

<script setup>
import { onMounted, ref } from "vue";
import mapboxgl from "mapbox-gl";
import axios from "axios";
import "mapbox-gl/dist/mapbox-gl.css";
import PageHeader from "./pageHeader.vue";
import PageFooter from "./pageFooter.vue";

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
      tableData.value = response.data.states.map((state) => ({
        callsign: state[1] || "Unknown",
        origin_country: state[2] || "Unknown",
        longitude: state[5] || null,
        latitude: state[6] || null,
        velocity: state[9] ? (state[9] * 3.6).toFixed(1) : "Unknown",
        true_track: state[10] || 0,
        altitude: state[13] || "N/A",
        icao24: state[0] || "Unknown",
      }));

      updateMarkers();
    }
  } catch (error) {
    console.error("Error fetching flight data:", error);
  }
};

const updateMarkers = () => {
  const bounds = map.value.getBounds();

  const openPopups = new Set(
    markers.value
      .filter((marker) => marker.getPopup().isOpen())
      .map((marker) => marker._flightId)
  );

  markers.value.forEach((marker) => marker.remove());
  markers.value = [];

  const visibleFlights = tableData.value
    .filter(
      (flight) =>
        flight.longitude >= bounds.getWest() &&
        flight.longitude <= bounds.getEast() &&
        flight.latitude >= bounds.getSouth() &&
        flight.latitude <= bounds.getNorth()
    )
    .slice(0, 100);

  visibleFlights.forEach((flight) => {
    const el = document.createElement("div");
    el.className = "marker";

    const img = document.createElement("img");
    img.src = "/p-airplane-svgrepo-com.svg";
    img.style.width = "30px";
    img.style.height = "30px";

    const mapBearing = map.value.getBearing();
    const correctedAngle = flight.true_track - mapBearing;
    img.style.transform = `rotate(${correctedAngle - 90}deg)`;

    el.appendChild(img);

    const description = `
      <div class="description">
        <div class="popup-header">
      <img class="plane-icon" src="/pop-airplane-flight-svgrepo-com.svg" alt="Plane">
      <h3>${flight.callsign}</h3>
    </div>
        <div class="prop"><strong>Country:</strong> ${flight.origin_country} </div><br>
        <div class="prop"><strong>Speed:</strong> ${flight.velocity} km/h </div><br>
        <div class="prop"><strong>Altitude:</strong> ${flight.altitude} m </div><br>
        <div class="prop"><strong>Track:</strong> ${flight.true_track}° </div><br>
      </div>
    `;

    const popup = new mapboxgl.Popup({ offset: 15 })
      .setHTML(description)
      .on("open", () => {
        img.src = "/y-airplane-svgrepo-com.svg";
      })
      .on("close", () => {
        img.src = "/p-airplane-svgrepo-com.svg";
      });

    const marker = new mapboxgl.Marker(el)
      .setLngLat([flight.longitude, flight.latitude])
      .setPopup(popup)
      .addTo(map.value);
    if (openPopups.has(flight.icao24)) {
      popup.addTo(map.value);
    }

    marker._flightId = flight.icao24;

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
  setInterval(fetchData, 3000);
  map.value.on("moveend", updateMarkers);
});
</script>

<style>
.popup-header {
  display: flex;
  align-items: center;
  gap: 10px;
  margin-bottom: 10px;
  color: #409eff;
}
.mapboxgl-popup {
  transform: none !important;
  top: 65%;
  left: 10px;
  width: 300px;
  max-height: 500px;
}
.description {
  font-size: 14px;
  font-family: "Jost", sans-serif;
  padding: 15px;
  padding-right: 20px;
  text-align: left;
  border: 1px solid rgb(158, 155, 155);
  background-color: rgb(238, 238, 238);
  border-radius: 2%;
  width: 80%;
  margin-top: 2%;
}
strong {
  color: #409eff;
}

.mapboxgl-popup-anchor-top .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-center .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-right .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-right .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-bottom-left .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-right .mapboxgl-popup-tip,
.mapboxgl-popup-anchor-top-left .mapboxgl-popup-tip {
  display: none !important;
}
#map-container {
  margin-top: 5px;
  width: 90%;
  padding: 5%;
  height: 1000px;
  border: 2px solid #3399ff;
}
.marker img {
  transition: transform 0.3s ease-out;
}
.container {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
}

.content {
  flex-grow: 1;
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
</style>
