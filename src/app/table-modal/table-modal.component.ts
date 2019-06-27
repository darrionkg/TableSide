import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.css']
})
export class TableModalComponent {
  @Input() modalItem;
  constructor() { }

  closeModal(event) {
    const modal = document.getElementById('table-modal');
    modal.style.display = 'none';
    if (event){ event.srcEvent.stopPropagation(); }
  }
}