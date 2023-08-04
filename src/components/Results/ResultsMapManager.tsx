import { PropsWithChildren, useContext, useEffect, useRef } from "react";
import { MapContext } from "../../layouts/GoogleMap";
import { ResultType } from "./sample-data";
import bbox from "@turf/bbox";

type MapManagerProps = {
  results: ResultType[];
  activeResult: ResultType | null;
};

export default function ResultsMapManager({
  results,
  activeResult,
  children,
}: PropsWithChildren<MapManagerProps>) {
  const { map } = useContext(MapContext);

  const markersRef = useRef<google.maps.Marker[]>([]);

  useEffect(() => {
    if (map) {
      const markers = markersRef.current;

      markers.forEach((marker) => marker.setMap(null));

      const newMarkers = results.map((result) => {
        const position = new google.maps.LatLng(
          result.location.lat,
          result.location.lon
        );

        return new google.maps.Marker({
          position,
          map,
        });
      });

      if (newMarkers.length) {
        setMapBoundsMarkers(map, newMarkers);
      }

      markersRef.current = newMarkers;
    }
  }, [results, map]);

  useEffect(() => {
    if (map) {
      if (activeResult) {
        setMapBoundsResult(map, activeResult);
      } else if (markersRef.current.length) {
        setMapBoundsMarkers(map, markersRef.current);
      }
    }
  }, [map, activeResult]);

  return <>{children}</>;
}

function setMapBoundsMarkers(
  map: google.maps.Map,
  markers: google.maps.Marker[]
) {
  const bounds = bbox({
    type: "LineString",
    coordinates: markers.map((marker) => {
      const position = marker.getPosition();
      return [position?.lat(), position?.lng()];
    }),
  });

  const latLngBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(bounds[0], bounds[1]),
    new google.maps.LatLng(bounds[2], bounds[3])
  );

  map.fitBounds(latLngBounds);
  if (markers.length === 1) map.setZoom(15);
}

function setMapBoundsResult(map: google.maps.Map, result: ResultType) {
  const latLngBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(result.location.lat, result.location.lon)
  );

  map.fitBounds(latLngBounds);
  map.setZoom(15);
}
