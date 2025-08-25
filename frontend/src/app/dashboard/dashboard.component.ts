// Add to your dashboard.component.ts file
import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})
export class DashboardComponent implements OnInit {
  username = '';
  role = '';
  currentSlide = 0;

  constructor(private router: Router) {}

  ngOnInit() {
    // Get user info from localStorage
    this.username = localStorage.getItem('username') || '';
    this.role = localStorage.getItem('role') || '';

    // If no user info, redirect to login
    if (!this.username) {
      this.router.navigate(['/login']);
    }
    
    // Start the carousel auto-rotation
    this.startCarousel();
  }

  logout() {
    localStorage.clear();
    this.router.navigate(['/login']);
  }

  // Carousel functions
  startCarousel() {
    setInterval(() => {
      this.nextSlide();
    }, 5000); // Change slide every 5 seconds
  }

  nextSlide() {
    this.currentSlide = (this.currentSlide + 1) % 3;
    this.updateCarousel();
  }

  prevSlide() {
    this.currentSlide = (this.currentSlide - 1 + 3) % 3;
    this.updateCarousel();
  }

  setSlide(index: number) {
    this.currentSlide = index;
    this.updateCarousel();
  }

  updateCarousel() {
    const carousel = document.querySelector('.carousel') as HTMLElement;
    if (carousel) {
      carousel.style.transform = `translateX(-${this.currentSlide * 33.333}%)`;
    }
    
    // Update indicators
    const indicators = document.querySelectorAll('.indicator');
    indicators.forEach((indicator, index) => {
      if (index === this.currentSlide) {
        indicator.classList.add('active');
      } else {
        indicator.classList.remove('active');
      }
    });
  }
}