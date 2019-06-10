import { Component, OnInit } from '@angular/core';
import { RxjsService } from '../rxjs.service';

@Component({
  selector: 'app-user-interaction',
  templateUrl: './user-interaction.component.html',
  styleUrls: ['./user-interaction.component.scss']
})
export class UserInteractionComponent implements OnInit {

  dropdownList = [];
  selectedItems = [];
  dropdownSettings = {};

  columnDefs = [
    {headerName: 'Name', field: 'name' },
    {headerName: 'Username', field: 'username' },
    {headerName: 'Email', field: 'email'}
  ];

  rowData = [];

  constructor(private rxjsService: RxjsService) { }

  ngOnInit() {
    this.dropdownList = [
      { item_id: 1, item_text: 'User 1' },
      { item_id: 2, item_text: 'User 2' }
    ];
    this.selectedItems = [];
    this.dropdownSettings = {
      singleSelection: false,
      idField: 'item_id',
      textField: 'item_text',
      selectAllText: 'Select All',
      unSelectAllText: 'UnSelect All',
      itemsShowLimit: 3,
      allowSearchFilter: true
    };
  }

  onItemSelect(item: any) {
    this.rxjsService.getOne(item.item_id).subscribe(data => {
      this.selectedItems.push(data);
      console.log(this.selectedItems);
      this.setRow();
    });
  }
  onSelectAll(items: any) {
    this.selectedItems = [];
    items.map(item => {
      this.rxjsService.getOne(item.item_id).subscribe(data => {
        this.selectedItems.push(data);
        console.log(this.selectedItems);
        this.setRow();
      });
    })
  }

  onItemDeSelect(item: any) {
    this.selectedItems = this.selectedItems.filter(user => {
      item.item_id != user.id;
    })
    console.log(this.selectedItems);
    this.setRow();
  }

  onDeSelectAll() {
    this.selectedItems = [];
    console.log(this.selectedItems);
    this.setRow();
  }

  setRow() {
    this.rowData = [];
    this.selectedItems.map(user => {
      this.rowData.push({ name: user.name, username: user.username, email: user.email})
    })
  }
}

// { make: 'Toyota', model: 'Celica', price: 35000 },
// { make: 'Ford', model: 'Mondeo', price: 32000 },
// { make: 'Porsche', model: 'Boxter', price: 72000 }