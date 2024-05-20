import { Component, OnInit } from '@angular/core';
import { SseService } from '../../services/sse/sse.service';
import { RouterOutlet } from '@angular/router';
import * as L from 'leaflet';
import * as Routing from 'leaflet-routing-machine';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css'],
})
export class DashboardComponent implements OnInit {
  map: any;
  marker: any;
  circle: any;
  sourceMarker: any;
  destinationMarker: any;
  sourceLatitude: any;
  sourceLongitude: any;
  destinationLatitude: any;
  destinationLongitude: any;
  fixedLat?: number;
  fixedLong?: number;

  constructor(private sseService: SseService) {}

  ngOnInit(): void {
    // this.initializeMap();
    this.sseService.getDeliveryEvents().subscribe(
      (eventData) => {
        console.log('Received Event:', eventData);
        // Handle received events
      },
      (error) => {
        console.error('Error In SSE:', error);
      }
    );
    // this.getSourceLocation();
    // this.getDestinationLocation();
    // this.setupRouting();
    // setInterval(() => {
    //   this.getDeliveryAgentLiveLocation();
    // }, 1000);
  }

  initializeMap(): void {
    this.map = L.map('map').setView([14.0860746, 100.608406], 6);
    L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
      attribution:
        '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
    }).addTo(this.map);

    if (!navigator.geolocation) {
      console.log("Your browser doesn't support geolocation feature!");
    } else {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          this.handleGeolocationSuccess(position);
        },
        (error) => {
          this.handleGeolocationError(error);
        },
        { enableHighAccuracy: true }
      );
    }
  }
  handleGeolocationSuccess(position: GeolocationPosition): void {
    const lat = position.coords.latitude;
    const long = position.coords.longitude;
    const accuracy = position.coords.accuracy;
    this.fixedLat = lat;
    this.fixedLong = long;

    if (this.marker) {
      this.map.removeLayer(this.marker);
    }
    if (this.circle) {
      this.map.removeLayer(this.circle);
    }

    this.marker = L.marker([lat, long]).addTo(this.map);
    this.circle = L.circle([lat, long], {
      radius: accuracy,
    }).addTo(this.map);

    const bikeIcon = L.icon({
      iconUrl: '../assets/bike.png',
      iconSize: [40, 40],
    });
    this.marker.setIcon(bikeIcon);

    const featureGroup = L.featureGroup([this.marker, this.circle]).addTo(
      this.map
    );
    this.map.fitBounds(featureGroup.getBounds());

    console.log(
      'Your coordinate is: Lat: ' +
        lat +
        ' Long: ' +
        long +
        ' Accuracy: ' +
        accuracy +
        ' meters'
    );
  }

  handleGeolocationError(error: GeolocationPositionError): void {
    console.error('Error getting location:', error.message);
  }

  getSourceLocation(): void {
    fetch('http://192.168.0.112:8081/api/v1/location/source')
      .then((response) => response.json())
      .then((data) => {
        this.sourceLatitude = data.latitude;
        this.sourceLongitude = data.longitude;
        this.sourceMarker = L.marker([
          this.sourceLatitude,
          this.sourceLongitude,
        ]).addTo(this.map);
        var shopIcon = L.icon({
          iconUrl: './shop.png',
          iconSize: [35, 35],
        });
        this.sourceMarker.setIcon(shopIcon);
      })
      .catch((error) =>
        console.error('Error fetching source location:', error)
      );
  }

  getDestinationLocation(): void {
    fetch('http://192.168.0.112:8081/api/v1/location/destination')
      .then((response) => response.json())
      .then((data) => {
        this.destinationLatitude = data.latitude;
        this.destinationLongitude = data.longitude;
        this.destinationMarker = L.marker([
          this.destinationLatitude,
          this.destinationLongitude,
        ]).addTo(this.map);
        var homeIcon = L.icon({
          iconUrl: './home.png',
          iconSize: [35, 35],
        });
        this.destinationMarker.setIcon(homeIcon);
      })
      .catch((error) =>
        console.error('Error fetching destination location:', error)
      );
  }

  setupRouting(): void {
    L.Routing.control({
      waypoints: [
        L.latLng(this.sourceLatitude, this.sourceLongitude),
        L.latLng(this.destinationLatitude, this.destinationLongitude),
      ],
    })
      .on('routesfound', (e: any) => {
        var routes = e.routes;
        console.log(routes);
        e.routes[0].coordinates.forEach((coord: any, index: number) => {
          setTimeout(() => {
            this.marker.setLatLng([coord.lat, coord.lng]);
          }, 1000 * index);
        });
      })
      .addTo(this.map);
  }

  getDeliveryAgentLiveLocation(): void {
    fetch('http://192.168.0.112:8081/api/v1/location')
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        this.marker.setLatLng([data.latitude, data.longitude]);
      })
      .catch((error) =>
        console.error('Error fetching delivery agent live location:', error)
      );
  }
}
