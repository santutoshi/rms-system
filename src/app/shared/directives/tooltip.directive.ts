import {
  Directive,
  ElementRef,
  HostListener,
  Input,
  Renderer2,
} from '@angular/core';

@Directive({
  selector: '[appTooltip]',
  standalone: true,
})
export class TooltipDirective {
  @Input('appTooltip') tooltipTitle!: string;
  tooltip: HTMLElement | undefined;

  constructor(private el: ElementRef, private renderer: Renderer2) {
    this.renderer.setStyle(this.el.nativeElement, 'position', 'relative');
    this.renderer.setStyle(this.el.nativeElement, 'display', 'inline-block');
  }

  @HostListener('mouseenter') onMouseEnter() {
    const firstButton = this.el.nativeElement.querySelector('button');
    const isDisabled = firstButton.disabled;
    if (!this.tooltip && isDisabled) {
      this.showTooltip();
    }
  }

  @HostListener('mouseleave') onMouseLeave() {
    if (this.tooltip) {
      this.hideTooltip();
    }
  }

  private showTooltip() {
    this.tooltip = this.renderer.createElement('span');
    if (!this.tooltip) return;
    this.tooltip.innerHTML = this.tooltipTitle;
    this.renderer.appendChild(this.el.nativeElement, this.tooltip);
    this.renderer.setStyle(this.tooltip, 'position', 'absolute');
    this.renderer.setStyle(this.tooltip, 'bottom', '100%');
    this.renderer.setStyle(this.tooltip, 'left', '50%');
    this.renderer.setStyle(this.tooltip, 'transform', 'translateX(-50%)');
    this.renderer.setStyle(this.tooltip, 'backgroundColor', 'black');
    this.renderer.setStyle(this.tooltip, 'color', 'white');
    this.renderer.setStyle(this.tooltip, 'padding', '5px 10px');
    this.renderer.setStyle(this.tooltip, 'borderRadius', '4px');
    this.renderer.setStyle(this.tooltip, 'whiteSpace', 'nowrap');
    this.renderer.setStyle(this.tooltip, 'zIndex', '1000');
    this.renderer.setStyle(this.tooltip, 'pointerEvents', 'none');
  }

  private hideTooltip() {
    if (this.tooltip) {
      this.renderer.removeChild(this.el.nativeElement, this.tooltip);
      this.tooltip = undefined;
    }
  }
}
