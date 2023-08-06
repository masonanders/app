import {
  PropsWithChildren,
  useContext,
  useEffect,
  useMemo,
  useRef,
} from "react";
import { ResultType } from "../../data/sample-data";
import bbox from "@turf/bbox";
// eslint-disable-next-line import/no-webpack-loader-syntax
import rawIconPinSVG from "!raw-loader!../../assets/svg/icon-pin.svg";
import palette from "../../theme/palette";
import { MapContext } from "../../contexts/GoogleMapContext";
import { ResultContext } from "../../contexts/ResultContext";

type MapManagerProps = {
  results: ResultType[];
};

type MarkerWithResultId = {
  id: ResultType["id"];
  marker: google.maps.Marker;
};

export default function ResultsMapManager({
  children,
  results,
}: PropsWithChildren<MapManagerProps>) {
  const { focusedMapResult, hoveredListResult, setModalResult } =
    useContext(ResultContext);
  const { map } = useContext(MapContext);

  const iconConfig = useMemo<google.maps.Symbol | null>(() => {
    if (map) {
      // Get path from raw svg - courtesy of https://stackoverflow.com/questions/57247916/how-to-access-path-data-of-an-svg-file-and-use-it-as-google-maps-marker
      const parser = new DOMParser();
      const parsedSvg = parser.parseFromString(rawIconPinSVG, "image/svg+xml");

      const svgPathAttr = parsedSvg.querySelector("path")?.getAttribute("d");
      const svgWidthAttr = parsedSvg
        .querySelector("svg")
        ?.getAttribute("width");
      const svgHeightAttr = parsedSvg
        .querySelector("svg")
        ?.getAttribute("height");

      if (
        svgPathAttr != null &&
        svgWidthAttr != null &&
        svgHeightAttr != null
      ) {
        const width = Number(svgWidthAttr);
        const height = Number(svgHeightAttr);

        return {
          anchor: new google.maps.Point(width / 2, height),
          fillColor: palette.primary(),
          fillOpacity: 1,
          path: svgPathAttr,
          scale: 2.25,
          strokeWeight: 0,
        };
      }
    }
    return null;
  }, [map]);

  const markersRef = useRef<MarkerWithResultId[]>([]);

  // Handle create new markers when results updates
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

        marker.addListener("click", () => setModalResult(result));
        marker.setMap(map);

        return { id: result.id, marker };
      }, {});

      if (newMarkers.length) {
        setMapBoundsMarkers(map, newMarkers);
      }

      markersRef.current = newMarkers;
    }
  }, [map, iconConfig, results, setModalResult]);

  // Handle updates to focusedMapResult
  useEffect(() => {
    if (map) {
      const markers = markersRef.current;

      if (focusedMapResult) {
        setMapBoundsResult(map, focusedMapResult);
      } else if (markers.length) {
        setMapBoundsMarkers(map, markers);
      }
    }
  }, [map, focusedMapResult]);

  // Handle updates to hoveredListResult
  useEffect(() => {
    if (map && iconConfig) {
      const markers = markersRef.current;

      markers.forEach(({ id, marker }) =>
        marker.setIcon({
          ...iconConfig,
          fillColor:
            id === hoveredListResult?.id
              ? palette.secondary()
              : palette.primary(),
        })
      );
    }
  }, [map, iconConfig, hoveredListResult]);

  return <>{children}</>;
}

function setMapBoundsMarkers(
  map: google.maps.Map,
  markers: MarkerWithResultId[]
) {
  const [swLat, swLng, neLat, neLng] = bbox({
    type: "LineString",
    coordinates: markers.map(({ marker }) => {
      const position = marker.getPosition();
      return [position?.lat(), position?.lng()];
    }),
  });

  const latLngBounds = new google.maps.LatLngBounds(
    new google.maps.LatLng(swLat, swLng),
    new google.maps.LatLng(neLat, neLng)
  );

  // Extra padding to account for Results list
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
