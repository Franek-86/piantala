import { MapContainer, TileLayer, useMap, Popup, Marker } from "react-leaflet";
import icon from "leaflet/dist/images/tree.png";
import iconShadow from "leaflet/dist/images/marker-shadow.png";
import L from "leaflet";
import Buttons from "./components/Buttons";

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
  return (
    <div className='App'>
      {/* 41.137379888248084, 16.867986684368702 */}
      <MapContainer
        center={[41.118778112249046, 16.871917818963464]}
        zoom={13}
        scrollWheelZoom={false}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url='https://{s}.basemaps.cartocdn.com/rastertiles/voyager/{z}/{x}/{y}{r}.png'
        />
        <Buttons />
        <Marker position={[41.119828319867715, 16.879972196686786]}>
          {/* <Popup>
            A pretty CSS3 popup. <br /> Easily customizable.
          </Popup> */}
        </Marker>
      </MapContainer>
    </div>
  );
}

export default App;
