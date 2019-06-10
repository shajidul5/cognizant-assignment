import { Component, OnInit } from '@angular/core';
import { RxjsService } from '../rxjs.service';

@Component({
  selector: 'app-rxjs',
  templateUrl: './rxjs.component.html',
  styleUrls: ['./rxjs.component.scss']
})
export class RxjsComponent implements OnInit {

  constructor(private rxjsService: RxjsService) { }

  ngOnInit() {
    let t0 = performance.now();
    this.rxjsService.sequential();
    let t1 = performance.now();
    console.log("The requests in sequential take " + (t1-t0) + " milliseconds!")

    let t2 = performance.now();
    this.rxjsService.paralell();
    let t3 = performance.now();
    console.log("The requests in parallel take " + (t3-t2) + " milliseconds!")
  }



}
