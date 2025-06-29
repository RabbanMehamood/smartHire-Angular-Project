import {
  Directive, ElementRef, OnInit, Renderer2, 
  AfterViewInit
} from '@angular/core';

@Directive({
  selector: '[appSalaryHightlight]'
})
export class SalaryHightlightDirective implements OnInit,AfterViewInit { 
  markedSalary = 80000;
  constructor(private el: ElementRef, private renderer:Renderer2) { }
  ngOnInit(): void {
      
  }
  ngAfterViewInit(): void {
    this.highlightElement()
  }
  highlightElement() {
    let userSalary = this.el.nativeElement.innerText.split('');
   userSalary.splice(0, 1)
    let newModifiedSal= userSalary.filter(item => item !== ",").join("")


    if (Number(newModifiedSal) < this.markedSalary) {
      this.renderer.addClass(this.el.nativeElement,'highlightLowSal')
      
    }
    else {
      this.renderer.addClass(this.el.nativeElement,'highlightHighSal')
     }
   }
}
