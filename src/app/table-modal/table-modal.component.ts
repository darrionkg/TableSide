import { Component, OnInit, Input } from '@angular/core';
import { DataService } from './../../services/data.service';
import { PartyDetailComponent } from '../party-detail/party-detail.component';

@Component({
  selector: 'app-table-modal',
  templateUrl: './table-modal.component.html',
  styleUrls: ['./table-modal.component.css']
})
export class TableModalComponent {
  @Input() modalItem;
  @Input() tableToUpdate;
  constructor(private dataService: DataService) { }

  closeModal(event) {
    const modal = document.getElementById('table-modal');
    modal.style.display = 'none';
    if (event){ event.srcEvent.stopPropagation(); }
  }

  updateTable(newTableNumber) {
    this.dataService.updateTable(this.tableToUpdate, newTableNumber)
  }
}