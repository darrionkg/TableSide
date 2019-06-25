import { Component } from '@angular/core';
import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'TableSide';
  constructor (private dataservice: DataService) { 
    dataservice.getOrders('8JTHuYZppP1W13ukqh1B').subscribe( ref => {
      console.log(ref);
      
    })
        dataservice.getMenuCatagories().subscribe( ref => {
      //console.log(ref['Names']);
    });
    dataservice.getMenuItems().subscribe( ref => {
      //console.log(ref);      
    });

    dataservice.getMenuItems('Entree').subscribe( ref => {
      //console.log(ref);
    });
  }
} 
