import {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { MapContext } from "../../layouts/GoogleMap";
import { ResultType } from "./sample-data";
import bbox from "@turf/bbox";
// eslint-disable-next-line import/no-webpack-loader-syntax
import iconPin from "!raw-loader!../../assets/svg/icon-pin.svg";

type MapManagerProps = {
  results: ResultType[];
  focusedResult: ResultType | null;
  onSelectResult: (result: ResultType) => void;
};

export default function ResultsMapManager({
  focusedResult,
  children,
  onSelectResult,
  results,
}: PropsWithChildren<MapManagerProps>) {
  const { map } = useContext(MapContext);

  const markersRef = useRef<google.maps.Marker[]>([]);

  // Get path from raw svg - courtesy of https://stackoverflow.com/questions/57247916/how-to-access-path-data-of-an-svg-file-and-use-it-as-google-maps-marker
  const pinIconSvgAttrs = useMemo<{
    path: string;
    height: number;
    width: number;
  } | null>(() => {
    const parser = new DOMParser();
    const parsedSvg = parser.parseFromString(iconPin, "image/svg+xml");

    const svgPath = parsedSvg.querySelector("path")?.getAttribute("d");
    const svgWidth = parsedSvg.querySelector("svg")?.getAttribute("width");
    const svgHeight = parsedSvg.querySelector("svg")?.getAttribute("height");

    if (svgPath != null && svgWidth != null && svgHeight != null) {
      return {
        path: svgPath,
        width: Number(svgWidth),
        height: Number(svgHeight),
      };
    } else {
      return null;
    }
  }, []);

  useEffect(() => {
    if (map) {
      const markers = markersRef.current;

      markers.forEach((marker) => marker.setMap(null));

      const newMarkers = results.map((result) => {
        const position = new google.maps.LatLng(
          result.location.lat,
          result.location.lon
        );

        const marker = new google.maps.Marker({
          position,
        });

        marker.addListener("click", () => onSelectResult(result));

        if (pinIconSvgAttrs)
          marker.setIcon({
            fillColor: "#5281f7",
            fillOpacity: 1,
            strokeWeight: 0,
            scale: 2.25,
            path: pinIconSvgAttrs.path,
            anchor: new google.maps.Point(
              pinIconSvgAttrs.width / 2,
              pinIconSvgAttrs.height
            ),
          });

        marker.setMap(map);

        return marker;
      });

      if (newMarkers.length) {
        setMapBoundsMarkers(map, newMarkers);
      }

      markersRef.current = newMarkers;
    }
  }, [results, map, pinIconSvgAttrs, onSelectResult]);

  useEffect(() => {
    if (map) {
      if (focusedResult) {
        setMapBoundsResult(map, focusedResult);
      } else if (markersRef.current.length) {
        setMapBoundsMarkers(map, markersRef.current);
      }
    }
  }, [map, focusedResult]);

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

  map.fitBounds(latLngBounds, 200);
  if (markers.length === 1) map.setZoom(15);
}

function setMapBoundsResult(map: google.maps.Map, result: ResultType) {
  const latLngBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(result.location.lat, result.location.lon)
  );

  map.fitBounds(latLngBounds);
  map.setZoom(15);
}
