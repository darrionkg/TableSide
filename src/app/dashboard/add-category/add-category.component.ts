import { Component, OnInit } from '@angular/core';

import { DataService } from 'src/services/data.service';

@Component({
  selector: 'app-add-category',
  templateUrl: './add-category.component.html',
  styleUrls: ['./add-category.component.css']
})
export class AddCategoryComponent implements OnInit {
  categories: {} = {};
  constructor(private database: DataService) {
    database.getMenuCatagories().subscribe(ref => {
      this.categories = ref;      
      console.log(ref);
      
    })
   }

  ngOnInit() {
  }

  catDelete(name) {
    this.database.deleteCategory(name);
  }

  addCategory(name) {    
    this.database.addCategory(name);
  }

}
