
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon, ZoomControl } from 'react-leaflet';

import "leaflet/dist/leaflet.css";
import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { Button, Typography } from '../../components';
import { LatLngTuple } from 'leaflet';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { isObjectEmpty } from '../../utlis/helperfunction';

interface MapProps {
  mapData: any
}



const MapComponent: React.FC<MapProps> = ({ mapData }) => {


  const getcoordinates = useCallback((value: any) => {

    return value.map((row: any) => [row[1], row[0]])
  }, [])

  const map = useMemo(() => <MapContainer style={{ height: "100%", width: "100%" }} center={[Number(mapData?.lat), Number(mapData?.lon)]} zoom={12} scrollWheelZoom={false} zoomControl={false}>
    <TileLayer
      attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
    />
    {
      mapData?.geojson?.type === "Polygon" && <Polygon pathOptions={{ color: 'blue' }} positions={getcoordinates(mapData?.geojson?.coordinates[0])} smoothFactor={1} />
    }

    {
      mapData?.geojson?.type === "MultiPolygon" && <Polygon pathOptions={{ color: 'blue' }} positions={mapData?.geojson?.coordinates} smoothFactor={1} />
    }
    <LocationMarker mapData={mapData} />
    <ZoomControl position="bottomleft" />

  </MapContainer>, [mapData, getcoordinates])

  return (

    <div style={{ flex: "1", borderRadius: '16px', overflow: "hidden" }} >
      {!isObjectEmpty(mapData) &&
        map}
    </div>
  )
}

export default MapComponent;






function LocationMarker(props: any) {
  const { mapData } = props;
  const [position, setPosition] = useState<any>(null);
  const map = useMap()

  const [isCopied, setCopied] = useState<boolean>(false)

  useEffect(() => {
    if (!isObjectEmpty(mapData)) {

      let value: LatLngTuple = [Number(mapData?.lat), Number(mapData?.lon)]
      setPosition(value)
      map.flyTo(value, map.getZoom())
    }

  }, [mapData, map])


  const copyTextToClipboard = async (text: string): Promise<any> => {
    if ('clipboard' in navigator) {
      let res = await navigator.clipboard.writeText(text);
      return res;
    } else {
      return document.execCommand('copy', true, text);
    }
  }

  const onCopyBtnClicked = (e: React.MouseEvent<HTMLButtonElement>) => {

    let text = btoa(mapData?.display_name)
    let copyText = `${window.location.href}?search=${text}`
    copyTextToClipboard(copyText).then(() => {
      // If successful, update the isCopied state value
      setCopied(true);
      setTimeout(() => {
        setCopied(false);
      }, 2000);
    })
      .catch((err) => {
        console.log(err);
      });
  }

  return position === null ? null : (
    <Marker position={position}>

      <Popup>
        <div>
          Address : {mapData?.display_name ?? "Unknown"}
        </div>
        <div>
          <Typography>
            Population : {mapData?.extratags?.population ?? "Unknown"}
          </Typography>
        </div>
        <div>
          <Typography>
            Census Year : {mapData?.extratags?.[`census:population`] ?? mapData?.extratags?.[`population:date`] ?? "Unknown"}
          </Typography>
        </div>
        <div style={{ padding: "8px" }}>
          <Button variant='outlined' disabled={isCopied} fullwidth onClick={onCopyBtnClicked} >
            {isCopied ? "Copied to cilpboard" : "Share"}
          </Button>
        </div>

      </Popup>
    </Marker>
  )
}
