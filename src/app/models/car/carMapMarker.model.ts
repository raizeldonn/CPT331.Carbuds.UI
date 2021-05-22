import { LngLat } from "mapbox-gl";

export interface CarMapMarker {
    mapLocation: LngLat;
    carUuid: string;
}