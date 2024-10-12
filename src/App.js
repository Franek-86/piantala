import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import L from "leaflet";
import icon from "leaflet/dist/images/tree.png";
import iconGreen from "leaflet/dist/images/ti pianto per amore-APP-verde.png";
import iconYellow from "leaflet/dist/images/ti pianto per amore-APP-giallo.png";
import iconRed from "leaflet/dist/images/ti pianto per amore-APP-rosso.png";
// import iconShadow from "leaflet/dist/images/marker-shadow.png";
import Buttons from "./components/Buttons";
import { useState, useEffect } from "react";
import axios from "axios";
import BottomBar from "./components/BottomBar";
import { useNavigate } from "react-router-dom";
import Loading from "./pages/Loading";

// Set default icon
const DefaultIcon = L.icon({
  iconUrl: iconYellow, // This can be your default icon
  // shadowUrl: iconShadow,
});
L.Marker.prototype.options.icon = DefaultIcon;

// Define icon map without a default
const iconMap = {
  approved: L.icon({
    iconUrl: iconGreen,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
  pending: L.icon({
    iconUrl: iconYellow,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
  rejected: L.icon({
    iconUrl: iconRed,
    // shadowUrl: iconShadow,
    iconSize: [25, 41], // Adjust size here
  }),
};
function App() {
  const [piante, setPiante] = useState([]);
  const [error, setError] = useState(null);
  const [loading, setLoading] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await axios.get("http://localhost:3001/api/piantine");
        console.log(response);
        setPiante(response.data);
      } catch (err) {
        setError(err.message);
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);
  console.log("bbbb", piante);
  if (loading) {
    return <Loading />;
  }
  return (
    <div className='section map-section'>
      {/* 41.137379888248084, 16.867986684368702 */}
      <article className='map'>
        <MapContainer
          center={[41.118778112249046, 16.871917818963464]}
          zoom={10}
          scrollWheelZoom={false}
          zoomControl={false}
        >
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
          />
          <Buttons />
          {piante.map((e) => {
            // Determine the icon based on some property in your data
            const iconType = e.status_piantina; // Adjust this to match your data structure
            console.log(iconType);
            // const markerIcon = iconMap[iconType] || DefaultIcon;
            const markerIcon = iconMap[iconType];
            return (
              <Marker
                icon={markerIcon}
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
