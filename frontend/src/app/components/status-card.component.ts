import { Component, Input, ElementRef, HostListener } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-status-card',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="card" [ngClass]="cardClass" [style.borderTopColor]="color" #cardElement>
      <div class="card-background" [style]="gradientStyle"></div>
      <div class="card-content">
        <div class="icon">{{ icon }}</div>
        <div class="body">
          <div class="status">{{ status }}</div>
          <div class="count">{{ count }}</div>
        </div>
        <div class="additional-info" *ngIf="showAdditionalInfo">
          <div class="trend" [class.positive]="trend === 'up'" [class.negative]="trend === 'down'">
            {{ trendIcon }} {{ trendValue }}
          </div>
          <div class="description">{{ description }}</div>
        </div>
      </div>
    </div>
  `,
  styles: [
    `:host { 
      display: block;
      height: 100%;
    }`,

    /* Base card */
    `.card {
      position: relative;
      display: flex;
      align-items: center;
      padding: 24px 20px;
      border-radius: 12px;
      background: #fff;
      box-shadow: 0 4px 12px rgba(2, 6, 23, 0.1);
      border-top: 6px solid #082240;
      transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
      cursor: pointer;
      min-height: 160px;
      height: auto;
      overflow: hidden;
    }`,

    /* Gradient Background that follows cursor */
    `.card-background {
      position: absolute;
      width: 200%;
      height: 200%;
      background: radial-gradient(
        circle at center,
        rgba(59, 130, 246, 0.15) 0%,
        rgba(139, 92, 246, 0.1) 30%,
        rgba(99, 102, 241, 0.05) 50%,
        transparent 70%
      );
      opacity: 0;
      transition: opacity 0.3s ease;
      pointer-events: none;
      z-index: 1;
      transform: translate(-50%, -50%);
    }`,

    `.card-content {
      position: relative;
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: center;
      text-align: center;
      width: 100%;
      gap: 16px;
      z-index: 2;
    }`,

    /* Hover animation */
    `.card:hover {
      transform: translateY(-8px) scale(1.02);
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.15),
        0 0 30px rgba(59, 130, 246, 0.2),
        0 0 0 1px rgba(59, 130, 246, 0.1);
    }`,

    `.card:hover .card-background {
      opacity: 1;
    }`,

    /* Enhanced glow effect */
    `.card:hover {
      box-shadow: 
        0 20px 40px rgba(0, 0, 0, 0.15),
        0 0 30px currentColor,
        0 0 0 1px rgba(255, 255, 255, 0.1);
    }`,

    /* Icon animation */
    `.icon {
      width: 60px;
      height: 60px;
      display: flex;
      align-items: center;
      justify-content: center;
      font-size: 24px;
      background: rgba(0, 0, 0, 0.04);
      border-radius: 12px;
      transition: all 0.3s ease;
      position: relative;
      overflow: hidden;
      z-index: 2;
    }`,

    `.card:hover .icon {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      color: white;
      transform: scale(1.1) rotate(5deg);
      box-shadow: 0 8px 20px rgba(59, 130, 246, 0.3);
    }`,

    /* Text animations */
    `.body { 
      display: flex; 
      flex-direction: column;
      align-items: center;
      gap: 8px;
      z-index: 2;
    }`,

    `.status { 
      font-weight: 600; 
      font-size: 16px; 
      color: #222;
      letter-spacing: -0.01em;
      transition: all 0.3s ease;
    }`,

    `.card:hover .status {
      color: #1e40af;
      transform: translateY(-2px);
    }`,

    `.count { 
      font-size: 28px; 
      font-weight: 700; 
      color: #082240;
      line-height: 1;
      transition: all 0.3s ease;
      background: linear-gradient(135deg, #082240, #3b82f6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      z-index: 2;
    }`,

    `.card:hover .count {
      background: linear-gradient(135deg, #3b82f6, #8b5cf6);
      -webkit-background-clip: text;
      -webkit-text-fill-color: transparent;
      background-clip: text;
      transform: scale(1.05);
    }`,

    /* Additional Info Section */
    `.additional-info {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 6px;
      margin-top: 8px;
      padding-top: 12px;
      border-top: 1px solid rgba(0, 0, 0, 0.1);
      width: 100%;
      transition: all 0.3s ease;
      z-index: 2;
    }`,

    `.card:hover .additional-info {
      border-top-color: rgba(59, 130, 246, 0.3);
      transform: translateY(2px);
    }`,

    `.trend {
      font-size: 12px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 4px;
      transition: all 0.3s ease;
    }`,

    `.card:hover .trend {
      transform: scale(1.1);
    }`,

    `.trend.positive {
      color: #10b981;
    }`,

    `.trend.negative {
      color: #ef4444;
    }`,

    `.description {
      font-size: 11px;
      color: #64748b;
      font-weight: 500;
      transition: all 0.3s ease;
    }`,

    `.card:hover .description {
      color: #475569;
    }`,

    /* Pulse animation for active state */
    `.card:active {
      transform: translateY(-4px) scale(1.01);
      transition: transform 0.1s ease;
    }`,

    /* On Hold status specific styles */
    `.card.on-hold {
      background: #EC1C24; /* Red background for On Hold status */
      color: white; /* White text for better contrast */
    }`
  ]
})
export class StatusCardComponent {
  @Input() icon = '•';
  @Input() status = '';
  @Input() count = 0;
  @Input() color = '#082240';
  
  // Additional optional inputs
  @Input() showAdditionalInfo = false;
  @Input() trend: 'up' | 'down' | 'neutral' = 'neutral';
  @Input() trendValue = '';
  @Input() description = '';

  mouseX = 0;
  mouseY = 0;

  constructor(private elementRef: ElementRef) {}

  @HostListener('mousemove', ['$event'])
  onMouseMove(event: MouseEvent) {
    const card = this.elementRef.nativeElement.querySelector('.card');
    const rect = card.getBoundingClientRect();
    
    this.mouseX = event.clientX - rect.left;
    this.mouseY = event.clientY - rect.top;
  }

  @HostListener('mouseleave')
  onMouseLeave() {
    this.mouseX = 0;
    this.mouseY = 0;
  }

  get gradientStyle() {
    return {
      'left.px': this.mouseX,
      'top.px': this.mouseY
    };
  }

  get trendIcon(): string {
    switch (this.trend) {
      case 'up': return '↗';
      case 'down': return '↘';
      default: return '→';
    }
  }

  get cardClass() {
    return {
      'on-hold': this.status.toLowerCase().includes('on hold')
    };
  }
}