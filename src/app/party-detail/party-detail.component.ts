import { Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { DataService } from './../../services/data.service';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-party-detail',
  templateUrl: './party-detail.component.html',
  styleUrls: ['./party-detail.component.css']
})
export class PartyDetailComponent implements OnInit {
  partyId: string;
  seats;
  constructor(private router: Router, private route: ActivatedRoute, private dataService: DataService) { }

  ngOnInit() {
    this.partyId = this.route.snapshot.paramMap.get('partyId');
    this.getSeatNum();
    
  }

  goToMenu() {
    this.router.navigate(['menu']);
  }

  addSeat() {
    this.dataService.addSeat(this.partyId);
    // this.numberOfSeats = this.dataService.getNumberOfSeats(this.partyId).subscribe( ref => this.numberOfSeats = ref);
    // console.log(this.numberOfSeats);
  }

  getSeatNum() {
    this.dataService.getParty(this.partyId).subscribe(party => this.seats = party);
  }
}
