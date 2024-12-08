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
  const [mapError, setMapError] = useState<string | null>(null);

  const defaultLat = project.latitude || 40.22881;
  const defaultLng = project.longitude || -74.93228;

  useEffect(() => {
    let map: mapboxgl.Map | null = null;
    let marker: mapboxgl.Marker | null = null;

    const initializeMap = async () => {
      if (!mapContainer.current) {
        console.log("Map container not found");
        return;
      }

      try {
        console.log("Initializing map with coordinates:", defaultLng, defaultLat);
        
        map = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [defaultLng, defaultLat] as [number, number],
          zoom: 13,
        });

        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(new mapboxgl.FullscreenControl());

        await new Promise<void>((resolve) => {
          map?.once("load", () => {
            console.log("Map loaded successfully");
            resolve();
          });
        });

        marker = new mapboxgl.Marker()
          .setLngLat([defaultLng, defaultLat])
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<strong>${project.title}</strong><br>${project.location}`
            )
          )
          .addTo(map);

        console.log("Map initialization complete");
      } catch (error) {
        console.error("Map initialization error:", error);
        setMapError("Failed to load map. Please try again later.");
      }
    };

    initializeMap();

    return () => {
      console.log("Cleaning up map resources");
      if (marker) {
        marker.remove();
      }
      if (map) {
        map.remove();
      }
    };
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