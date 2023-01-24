import React, { useCallback, useEffect, useMemo, useState } from 'react';
import { MapContainer, TileLayer, useMap, Marker, Popup, Polygon, ZoomControl } from 'react-leaflet';
import styles from "./map.module.scss";
import "leaflet/dist/leaflet.css";
import { LatLngTuple } from 'leaflet';
import "leaflet-defaulticon-compatibility";
import "leaflet-defaulticon-compatibility/dist/leaflet-defaulticon-compatibility.css";
import { Button, Typography } from '../../components';
import { isObjectEmpty } from '../../utlis/helperfunction';
import { RiTeamFill } from 'react-icons/ri';
import { FaCalendarAlt } from 'react-icons/fa';
interface MapProps {
  mapData: any
}



const MapComponent: React.FC<MapProps> = ({ mapData }) => {


  const getcoordinates = useCallback((value: any) => {

    return value.map((row: any) => [row[1], row[0]])
  }, [])

  const map = useMemo(() => <MapContainer style={{ height: "100%", width: "100%" }} center={[+mapData?.lat, +mapData?.lon]} zoom={12} scrollWheelZoom={false} zoomControl={false}>
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

      let value: LatLngTuple = [+mapData?.lat, +mapData?.lon]
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

      <Popup >

        {/* <div>
          Address : {mapData?.display_name ?? "Unknown"}
        </div> */}
        <div className={styles.cardRoot} >
          <div className={styles.listItem}>
            <div className={styles.avaterColored} >
              <RiTeamFill />
            </div>
            <div>
              <Typography variant='caption'>
                Population
              </Typography>
              <Typography variant='h3' >
                {mapData?.extratags?.population ?? "Unknown"}
              </Typography>
            </div>
          </div>
          <hr className={styles.divider} />
          <div className={styles.listItem}>
            <div className={styles.avaterColored} >
              <FaCalendarAlt />
            </div>
            <div>
              <Typography variant='caption'>
                Census Year
              </Typography>
              <Typography variant='h3' >
                {mapData?.extratags?.[`census:population`] ?? mapData?.extratags?.[`population:date`] ?? "Unknown"}
              </Typography>
            </div>
          </div>
          <hr className={styles.divider} />

          <div style={{ padding: "8px" }}>
            <Button variant='outlined' disabled={isCopied} fullwidth onClick={onCopyBtnClicked} >
              {isCopied ? "Copied to cilpboard" : "Share link"}
            </Button>
          </div>
        </div>


      </Popup>
    </Marker>
  )
}
