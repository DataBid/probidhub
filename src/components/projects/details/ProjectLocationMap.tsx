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

  const defaultLat = project.latitude || 37.7749;
  const defaultLng = project.longitude || -122.4194;

  useEffect(() => {
    if (!mapContainer.current) {
      console.log("Map container not found");
      return;
    }

    console.log("Starting map initialization");
    
    // Explicitly type the center as [number, number]
    const center: [number, number] = [defaultLng, defaultLat];
    
    const mapConfig: mapboxgl.MapboxOptions = {
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center,
      zoom: 13,
    };

    let map: mapboxgl.Map | undefined;
    let marker: mapboxgl.Marker | undefined;

    try {
      map = new mapboxgl.Map(mapConfig);
      console.log("Map instance created");

      const onLoad = () => {
        if (!map) return;
        
        map.addControl(new mapboxgl.NavigationControl(), "top-right");
        map.addControl(new mapboxgl.FullscreenControl());

        marker = new mapboxgl.Marker()
          .setLngLat(center)
          .setPopup(
            new mapboxgl.Popup({ offset: 25 }).setHTML(
              `<strong>${project.title}</strong><br>${project.location}`
            )
          )
          .addTo(map);

        console.log("Map fully initialized with controls and marker");
      };

      const onError = (e: Error) => {
        console.error("Map error:", e);
        setMapError("Failed to load map. Please try again later.");
      };

      map.once("load", onLoad);
      map.on("error", onError);

      return () => {
        if (marker) {
          marker.remove();
        }
        if (map) {
          map.off("load", onLoad);
          map.off("error", onError);
          map.remove();
        }
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