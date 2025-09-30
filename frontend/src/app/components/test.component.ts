import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'app-test',
  standalone: true,
  template: `
    <div>
      <h2>Backend Connection Test</h2>
      <p>{{ message }}</p>
    </div>
  `
})
export class TestComponent implements OnInit {
  message = 'Loading...';

  constructor(private http: HttpClient) {}

  ngOnInit() {
    this.http.get('http://localhost:3000/api/test')
      .subscribe({
        next: (response: any) => {
          this.message = response.message;
        },
        error: (error) => {
          this.message = 'Error connecting to backend';
          console.error('Error:', error);
        }
      });
  }
}