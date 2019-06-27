import { Component, OnInit } from '@angular/core';
import { DataService } from 'src/services/data.service';
import {CdkDragDrop, moveItemInArray} from '@angular/cdk/drag-drop';

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

  drop(event: CdkDragDrop<string[]>) {
    moveItemInArray(this.categories['Names'], event.previousIndex, event.currentIndex);
    this.database.updateCategories(this.categories['Names']);
  }
}
