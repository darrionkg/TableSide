import { Component, OnInit, Input } from '@angular/core';

@Component({
  selector: 'app-menu-modal',
  templateUrl: './menu-modal.component.html',
  styleUrls: ['./menu-modal.component.css']
})
export class MenuModalComponent implements OnInit {
@Input() modalItem;
  constructor() { }

  closeModal() {
    const modal = document.getElementById('menu-modal');
    modal.style.display = 'none';
  }

  ngOnInit() {
  }

}
