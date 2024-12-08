import { useEffect, useRef } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

// Initialize Mapbox with your access token
mapboxgl.accessToken = "pk.eyJ1IjoibG92YWJsZSIsImEiOiJjbHRwbWVxZWcwMXB4MmptbGVwNnBqY2NqIn0.Zmr2DqZGZQKUVuqA-JI8rA";

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
  const map = useRef<mapboxgl.Map | null>(null);

  // Default to San Francisco if no coordinates are provided
  const defaultLat = project.latitude || 37.7749;
  const defaultLng = project.longitude || -122.4194;

  useEffect(() => {
    if (!mapContainer.current) return;

    console.log("Initializing map with coordinates:", { lat: defaultLat, lng: defaultLng });

    map.current = new mapboxgl.Map({
      container: mapContainer.current,
      style: "mapbox://styles/mapbox/streets-v12",
      center: [defaultLng, defaultLat],
      zoom: 13,
    });

    // Add navigation controls
    map.current.addControl(new mapboxgl.NavigationControl(), "top-right");

    // Add fullscreen control
    map.current.addControl(new mapboxgl.FullscreenControl());

    // Add marker
    const marker = new mapboxgl.Marker()
      .setLngLat([defaultLng, defaultLat])
      .setPopup(
        new mapboxgl.Popup({ offset: 25 }).setHTML(
          `<strong>${project.title}</strong><br>${project.location}`
        )
      )
      .addTo(map.current);

    // Cleanup
    return () => {
      if (map.current) {
        map.current.remove();
      }
    };
  }, [project.title, project.location, defaultLat, defaultLng]);

  const handleGetDirections = () => {
    const url = `https://www.google.com/maps/dir/?api=1&destination=${encodeURIComponent(
      project.location
    )}`;
    window.open(url, "_blank", "noopener,noreferrer");
  };

  return (
    <div className="space-y-4">
      <div
        ref={mapContainer}
        className="h-[300px] w-full rounded-lg border"
        aria-label={`Map showing the location of ${project.title} in ${project.location}`}
        role="application"
      />
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