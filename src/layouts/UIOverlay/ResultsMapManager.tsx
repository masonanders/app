import {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { MapContext } from "../GoogleMap";
import { ResultType } from "../../data/sample-data";
import bbox from "@turf/bbox";
// eslint-disable-next-line import/no-webpack-loader-syntax
import iconPin from "!raw-loader!../../assets/svg/icon-pin.svg";
import palette from "../../theme/palette";

type MapManagerProps = {
  focusedResult: ResultType | null;
  hoveredResult: ResultType | null;
  onSelectResult: (result: ResultType) => void;
  results: ResultType[];
};

type MarkerWithResultId = { id: ResultType["id"]; marker: google.maps.Marker };

export default function ResultsMapManager({
  children,
  focusedResult,
  hoveredResult,
  onSelectResult,
  results,
}: PropsWithChildren<MapManagerProps>) {
  const { map } = useContext(MapContext);

  const markersRef = useRef<MarkerWithResultId[]>([]);

  // Get path from raw svg - courtesy of https://stackoverflow.com/questions/57247916/how-to-access-path-data-of-an-svg-file-and-use-it-as-google-maps-marker
  const iconConfig = useMemo<google.maps.Symbol | null>(() => {
    if (map) {
      const parser = new DOMParser();
      const parsedSvg = parser.parseFromString(iconPin, "image/svg+xml");

      const svgPath = parsedSvg.querySelector("path")?.getAttribute("d");
      const svgWidth = parsedSvg.querySelector("svg")?.getAttribute("width");
      const svgHeight = parsedSvg.querySelector("svg")?.getAttribute("height");

      if (svgPath != null && svgWidth != null && svgHeight != null) {
        const width = Number(svgWidth);
        const height = Number(svgHeight);

        return {
          anchor: new google.maps.Point(width / 2, height),
          fillColor: palette.primary(),
          fillOpacity: 1,
          path: svgPath,
          scale: 2.25,
          strokeWeight: 0,
        };
      }
    }
    return null;
  }, [map]);

  useEffect(() => {
    if (map) {
      const markers = markersRef.current;

      markers.forEach(({ marker }) => marker.setMap(null));

      const newMarkers = results.map((result) => {
        const position = new google.maps.LatLng(
          result.location.lat,
          result.location.lon
        );

        const marker = new google.maps.Marker({
          position,
          icon: iconConfig,
        });

        marker.addListener("click", () => onSelectResult(result));
        marker.setMap(map);

        return { id: result.id, marker };
      }, {});

      if (newMarkers.length) {
        setMapBoundsMarkers(map, newMarkers);
      }

      markersRef.current = newMarkers;
    }
  }, [results, map, iconConfig, onSelectResult]);

  useEffect(() => {
    if (map) {
      const markersList = Object.values(markersRef.current);
      if (focusedResult) {
        setMapBoundsResult(map, focusedResult);
      } else if (markersList.length) {
        setMapBoundsMarkers(map, markersList);
      }
    }
  }, [map, focusedResult]);

  useEffect(() => {
    if (map && iconConfig) {
      const markers = markersRef.current;
      markers.forEach(({ id, marker }) =>
        marker.setIcon({
          ...iconConfig,
          fillColor:
            id === hoveredResult?.id ? palette.secondary() : palette.primary(),
        })
      );
    }
  }, [hoveredResult, iconConfig, map]);

  return <>{children}</>;
}

function setMapBoundsMarkers(
  map: google.maps.Map,
  markers: MarkerWithResultId[]
) {
  const bounds = bbox({
    type: "LineString",
    coordinates: markers.map(({ marker }) => {
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
