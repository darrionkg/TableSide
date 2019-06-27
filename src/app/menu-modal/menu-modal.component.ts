import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css']
})
export class MenuModalComponent {
@Input() modalItem;
  constructor() { }

  closeModal(event) {
    const modal = document.getElementById('menu-modal');
    modal.style.display = 'none';
    if (event){ event.srcEvent.stopPropagation(); }
  }
}
