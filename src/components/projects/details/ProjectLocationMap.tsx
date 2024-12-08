import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRwbXY3ZWUwMXlrMnFueXE1Z2ppZXJ6In0.HP3anVYbqxtkLcMQqgppFQ";

interface ProjectLocationMapProps {
  project: {
    title: string;
    location: string;
    latitude?: number | null;
    longitude?: number | null;
  };
}

export const ProjectLocationMap = ({ project }: ProjectLocationMapProps) => {
  const mapContainer = useRef<HTMLDivElement>(null);
  const mapInstance = useRef<mapboxgl.Map | null>(null);
  const markerInstance = useRef<mapboxgl.Marker | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const defaultLat = project.latitude || 40.22881;
  const defaultLng = project.longitude || -74.93228;

  useEffect(() => {
    if (!mapContainer.current) {
      console.log("Map container not found");
      return;
    }

    console.log("Starting map initialization with coordinates:", defaultLng, defaultLat);
    
    try {
      // Clean up existing map instance if it exists
      if (mapInstance.current) {
        mapInstance.current.remove();
      }

      // Create new map instance
      const map = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [defaultLng, defaultLat] as [number, number],
        zoom: 13,
      });

      mapInstance.current = map;

      const onLoad = () => {
        if (!map) return;
        
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(new mapboxgl.FullscreenControl());

        // Remove existing marker if it exists
        if (markerInstance.current) {
          markerInstance.current.remove();
        }

        // Create new marker
        const marker = new mapboxgl.Marker()
          .setLngLat([defaultLng, defaultLat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<strong>${project.title}</strong><br>${project.location}`
            )
          )
          .addTo(map);

        markerInstance.current = marker;
        console.log("Map fully initialized with controls and marker");
      };

      const onError = (event: mapboxgl.ErrorEvent) => {
        console.error("Map error:", event.error);
        setMapError("Failed to load map. Please try again later.");
      };

      map.once("load", onLoad);
      map.on("error", onError);

      return () => {
        if (markerInstance.current) {
          markerInstance.current.remove();
        }
        if (mapInstance.current) {
          mapInstance.current.off("load", onLoad);
          mapInstance.current.off("error", onError);
          mapInstance.current.remove();
        }
        mapInstance.current = null;
        markerInstance.current = null;
      };
    } catch (error) {
      console.error("Error during map initialization:", error);
      setMapError("Failed to initialize map. Please try again later.");
      return undefined;
    }
  }, [project.title, project.location, defaultLat, defaultLng]);

  const handleGetDirections = () => {
    window.open(
      `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(project.location)}`,
      "_blank",
      "noopener,noreferrer"
    );
  };

  return (
    <div className="space-y-4">
      {mapError ? (
        <div className="h-[300px] w-full rounded-lg border bg-gray-50 flex items-center justify-center">
          <p className="text-gray-500">{mapError}</p>
        </div>
      ) : (
        <div
          ref={mapContainer}
          className="h-[300px] w-full rounded-lg border"
          aria-label={`Map showing the location of ${project.title} in ${project.location}`}
          role="application"
        />
      )}
      <div className="flex items-center justify-between">
        <p className="text-sm text-gray-600">{project.location}</p>
        <Button
          onClick={handleGetDirections}
          variant="outline"
          className="gap-2"
        >
          Get Directions
          <ExternalLink className="h-4 w-4" />
        </Button>
      </div>
    </div>
  );
};