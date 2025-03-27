import { HttpClient } from '@angular/common/http';
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { GoogleTranslateService } from './Services/google-translate.service';
declare var $: any;

interface WeatherForecast {
  date: string;
  temperatureC: number;
  temperatureF: number;
  summary: string;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.css'
})
export class AppComponent {
  
  showLayout: boolean = true;

  constructor(private router: Router, private googleTranslateService: GoogleTranslateService) {
    this.router.events.subscribe(() => {
      const hiddenRoutes = ['/login', '/signup'];

      this.showLayout = !hiddenRoutes.includes(this.router.url);
    });
  }

  ngOnInit() {
    this.googleTranslateService.loadGoogleTranslateScript();
  }
}
