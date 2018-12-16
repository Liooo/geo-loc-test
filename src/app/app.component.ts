import { Component } from "@angular/core";
import { BackgroundGeolocation } from "nativescript-background-geolocation-lt";

@Component({
    moduleId: module.id,
    selector: "ns-app",
    templateUrl: "app.component.html"
})
export class AppComponent {
  ngOnInit() {
    BackgroundGeolocation.on("location", this.onLocation.bind(this));
    BackgroundGeolocation.on("heartbeat", this.onHeartbeat.bind(this));

    BackgroundGeolocation.ready({
      debug: true,
      enableHeadless: true,
      stopOnTerminate: false,
      desiredAccuracy: 0,
      stationaryRadius: 25,
      distanceFilter: 50,
      activityRecognitionInterval: 10000,
      autoSync: true
    }, (state) => {
      if (!state.enabled) { BackgroundGeolocation.start(); }
       BackgroundGeolocation.registerHeadlessTask(this.onHeadless.bind(this))
    });
  }

  onHeadless() {
    console.log("headless")
    BackgroundGeolocation.changePace(true);
  }

  onLocation() {
    BackgroundGeolocation.changePace(true);
    console.log("location")
  }

  onHeartbeat() {
    console.log("heartbeat")
  }

}
