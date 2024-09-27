import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/tree.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Buttons from "./components/Buttons";
import { useState, useEffect } from "react";
import axios from "axios";
import BottomBar from "./components/BottomBar";
import { useNavigate } from "react-router-dom";

let DefaultIcon = L.icon({
  iconUrl: icon,
  shadowUrl: iconShadow,
});

// var CartoDB_Voyager = L.tileLayer(
//   "https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png",
//   {
//     attribution:
//       '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors &copy; <a href="https://carto.com/attributions">CARTO</a>',
//     subdomains: "abcd",
//     maxZoom: 20,
//   }
// );
L.Marker.prototype.options.icon = DefaultIcon;
function App() {
  const [piante, setPiante] = useState([]);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get("http://localhost:3001/api/piantine");
        console.log(response);
        setPiante(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      }
    };
    console.log(piante);
    fetchData();
  }, []);

  return (
    <div className='section map-section'>
      {/* 41.137379888248084, 16.867986684368702 */}
      <article className='map'>
        <MapContainer
          center={[41.118778112249046, 16.871917818963464]}
          zoom={13}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          />
          <Buttons />
          {piante.map((e) => {
            return (
              <Marker
                position={[e.lat, e.lang]}
                key={e.id}
                eventHandlers={{
                  click: () => {
                    console.log("marker clicked");
                    navigate(`/map/${e.id}`);
                  },
                }}
              >
                {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
              </Marker>
            );
          })}
        </MapContainer>
      </article>
      <article className='bottom-bar'>
        <BottomBar />
      </article>
    </div>
  );
}

export default App;
