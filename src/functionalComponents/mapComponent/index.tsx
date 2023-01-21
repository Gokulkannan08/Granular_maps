
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon } from 'react-leaflet';

import "leaflet/dist/leaflet.css";
import { useCallback, useEffect, useMemo, useState } from 'react';
import { Typography } from '../../components';

interface MapProps {
  mapData: any
}



const MapComponent: React.FC<MapProps> = ({ mapData }) => {
  const [data, setData] = useState<any>({});
  const [coordinates, setCoordinates] = useState([]);

  useEffect(() => {



    // setData(mapData)
    console.log(mapData);

    // let d = getcoordinates(mapData?.geojson?.coordinates[0])
    // setCoordinates(d)


  }, [mapData])

  const getcoordinates = useCallback((value: any) => {
    // console.log(value.map((item: any) => [item[0], item[1]]))
    return value.map((row: any) => [row[1], row[0]])
  }, [])

  return (

    <div style={{ flex: "1", borderRadius: '16px', overflow: "hidden" }} >
      {!isObjectEmpty(mapData) &&
        <MapContainer style={{ height: "100%", width: "100%" }} center={[Number(mapData?.lat), Number(mapData?.lon)]} zoom={12} scrollWheelZoom={false}>
          <TileLayer
            attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
          />
          {
            mapData?.geojson?.type === "Polygon" && <Polygon pathOptions={{ color: 'blue' }} positions={getcoordinates(mapData?.geojson?.coordinates[0])} />
          }

          {
            mapData?.geojson?.type === "MultiPolygon" && <Polygon pathOptions={{ color: 'blue' }} positions={mapData?.geojson?.coordinates} />
          }

          <Marker position={[Number(mapData?.lat), Number(mapData?.lon)]}>

            <Popup>
              <div>
                Address : {mapData?.display_name}
              </div>
              <div>
                <Typography>
                  Population : {mapData?.extratags?.population}
                </Typography>
              </div>
              <div>
                <Typography>
                  Census Year : {mapData?.extratags?.[`census:population`]}
                </Typography>
              </div>
            </Popup>
          </Marker>

        </MapContainer>}
    </div>
  )
}

export default MapComponent;


const isObjectEmpty = (objectName: object) => {
  for (let prop in objectName) {
    if (objectName.hasOwnProperty(prop)) {
      return false;
    }
  }
  return true;
};


