# <img src="./public/icons8-plane.png" alt="SkyTrack Logo" style="height:25px; width: 25px;"> **SkyTrack**

SkyTrack is a web application that provides airplane tracking on a map generated with **Mapbox.js** using data from **OpenSky API**. It also provides filterable flight information in **Arrival, Departure and State** tables by pulling data from 3 different **OpenSky API**'s.

---

# <img width="27" height="27" src="https://img.icons8.com/pulsar-gradient/48/extra-features.png" alt="icons9-features"/> **Features**

- Real-time aircraft tracking
- Aircraft locations on the map
- View detailed airplane information
- 3 different API sources with filterable flight tables
- Access with admin authorization

---

## <img width="27" height="27" src="https://img.icons8.com/external-sbts2018-outline-color-sbts2018/58/external-install-basic-ui-elements-2.3-sbts2018-outline-color-sbts2018.png" alt="icons8-install"/> **Installation**

### 📌 **Requirements**

- **Node.js** must be installed.
- **Vite, Vue.js** and project dependencies must be installed.

### 📌 **Steps**

1️⃣ **Clone the repo:**

```sh
git clone https://github.com/MetehanMadenci/Tav_Project
cd Tav_Project
```

2️⃣ **Install dependencies:**

```sh
npm install
```

3️⃣ **Define environmental variables (create `.env` file):**

```env
VITE_MAPBOX_ACCESS_TOKEN=senin_mapbox_api_anahtarin
VITE_OPENSKY_USERNAME=senin_opensky_kullanici_adi
VITE_OPENSKY_PASSWORD=senin_opensky_sifren
VITE_USER=admin_username
VITE_PASSWORD=admin_password
```

4️⃣ **Launch the application:**

```sh
npm run dev
```

---

## <img width="27" height="27" src="https://img.icons8.com/ios-filled/50/228BE6/computers-connecting.png" alt="icons8-dependency"/> **Dependencies**

TAV_Project uses the following dependencies:

- **@element-plus/icons-vue** (`^2.3.1`): Element Plus icons for Vue
- **axios** (`^1.7.9`): To make HTTP requests
- **dayjs** (`^1.11.13`): For date and time operations
- **element-plus** (`^2.9.3`): UI components for Vue
- **mapbox-gl** (`^3.9.4`): For maps and geographic data
- **pinia** (`^3.0.1`): State management for Vue
- **vue** (`^3.5.13`): Vue.js framework
- **vue-router** (`^4.5.0`): Routing system for Vue
- **@vitejs/plugin-vue** (`^5.2.1`): Vite plugin for Vue
- **vite** (`^6.0.5`): Fast development server

---

## <img width="27" height="27" src="https://img.icons8.com/ios-glyphs/30/228BE6/spaceship-launch-documentation.png" alt="icons8-deploy"/> **Deployed Version**

The project has been published on **Vercel**. You can access it from the link below:

<img width="15" height="15" src="https://img.icons8.com/ios-filled/50/228BE6/attach.png" alt="icons8-attach"/> **[SkyTrack Live Demo](https://tav-project.vercel.app/)**

---

## <img width="27" height="27" src="https://img.icons8.com/ios-glyphs/30/228BE6/checked-user-male.png" alt="icons8-login"/> **Login Information**

A **username and password** are required to access the application. To log in, use the provided admin username and password. Contact the project owner for access credentials.
