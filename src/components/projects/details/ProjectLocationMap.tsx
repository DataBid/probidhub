import { useEffect, useRef, useState } from "react";
import mapboxgl from "mapbox-gl";
import "mapbox-gl/dist/mapbox-gl.css";
import { Button } from "@/components/ui/button";
import { ExternalLink } from "lucide-react";

// Initialize Mapbox with your access token
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
  const map = useRef<mapboxgl.Map | null>(null);
  const marker = useRef<mapboxgl.Marker | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  // Default to San Francisco if no coordinates are provided
  const defaultLat = project.latitude || 37.7749;
  const defaultLng = project.longitude || -122.4194;

  useEffect(() => {
    if (!mapContainer.current) return;

    try {
      console.log("Initializing map with coordinates:", { lat: defaultLat, lng: defaultLng });

      // Create map instance
      const mapInstance = new mapboxgl.Map({
        container: mapContainer.current,
        style: "mapbox://styles/mapbox/streets-v12",
        center: [defaultLng, defaultLat],
        zoom: 13,
      });

      // Store map instance in ref
      map.current = mapInstance;

      // Add navigation controls
      mapInstance.addControl(new mapboxgl.NavigationControl(), "top-right");

      // Add fullscreen control
      mapInstance.addControl(new mapboxgl.FullscreenControl());

      // Create and add marker
      const markerInstance = new mapboxgl.Marker()
        .setLngLat([defaultLng, defaultLat])
        .setPopup(
          new mapboxgl.Popup({ offset: 25 }).setHTML(
            `<strong>${project.title}</strong><br>${project.location}`
          )
        )
        .addTo(mapInstance);

      // Store marker instance in ref
      marker.current = markerInstance;

      // Handle map load errors
      mapInstance.on('error', (e) => {
        console.error('Mapbox error:', e);
        setMapError('Failed to load map. Please try again later.');
      });

    } catch (error) {
      console.error('Error initializing map:', error);
      setMapError('Failed to initialize map. Please try again later.');
    }

    // Cleanup function
    return () => {
      if (marker.current) {
        marker.current.remove();
        marker.current = null;
      }
      if (map.current) {
        map.current.remove();
        map.current = null;
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