import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { ThemePalette } from '@angular/material/core';

interface stat{
  passer: string;
  reciever: string;
  startYards: any;
  endYards: any;
  gainYards: any;
  toGoYards: number;
  isComplete: boolean;
  isIncomplete: boolean;
  isIntercepted: boolean;
  isSack: boolean;
  isSafety: boolean;
  isPenalty: boolean;
  isTouchdown: boolean;
  quarter: number;
  tackler:string;
  intercepter:string;
}

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})



export class GameComponent{

  stat: stat = {
    passer: 'passer',
    reciever: 'reciever',
    startYards: 5,
    endYards: null,
    gainYards: null,
    toGoYards: 20,
    isComplete: false,
    isIncomplete: false,
    isIntercepted: false,
    isSack:false,
    isSafety: false,
    isPenalty: false,
    isTouchdown: false,
    quarter: 1,
    tackler: 'tackler',
    intercepter: 'intercepter'
  }

  isDisplayBase=false;
  isDisplayRun=true;
  isDisplayPass=true;
  isDisplayToolbar = false;
  isDisplayEditPass=true;
  isDisplayTackle=true;

  currentPasser: any;
  currentReceiver: any;
  currentPassStatus: any;
  currentYardsGained: any;
  toggleDisplay(type: any){
    this.isDisplayBase=!this.isDisplayBase;
    if (type == "run"){
      this.isDisplayRun=!this.isDisplayRun;
    }
    if (type == "pass"){
      this.webService.getStats
      this.stat.startYards = this.webService.last_stat.endYards;
      this.isDisplayPass=!this.isDisplayPass;
      this.isDisplayToolbar=!this.isDisplayToolbar;
    }
    if (type == "tacklePass"){
      this.isDisplayBase=!this.isDisplayBase;
      this.isDisplayPass=!this.isDisplayPass;
      this.isDisplayTackle=!this.isDisplayTackle;
    }
    if (type == "editPass"){
      this.isDisplayEditPass=!this.isDisplayEditPass;
      console.log(this.isDisplayPass)
    }
  }
  toggleDisplayEdit(type:any, stat:any){
    this.isDisplayBase=!this.isDisplayBase;
    if (type == "editPass"){
      this.currentID = stat._id;
      this.currentPasser = stat.Passer;
      this.currentReceiver = stat.Receiver;
      this.currentPassStatus = stat.PassStatus;
      this.currentYardsGained = stat.Yards;
      console.log(this.currentPassStatus);
      this.isDisplayEditPass=!this.isDisplayEditPass;
    }
  }
  editForm: any;
  currentID: any;
  passIncompleteIsChecked = false;
  stat_list: any;
  constructor(
    public authService: AuthService,
    public webService: WebService,
    private router: Router,
    private modalService: NgbModal,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.stat_list = this.webService.getStats();
  }





  onPassSubmit(addPassForm: NgForm) {
    this.isDisplayPass=!this.isDisplayPass;
    this.isDisplayTackle=!this.isDisplayTackle;
    console.log(this.stat.isIntercepted);


    // this.webService.addPass(addPassForm);
    this.ngOnInit();
  }

  onTackleSubmit(addTackleForm: NgForm) {
    this.isDisplayToolbar=!this.isDisplayToolbar;
    this.isDisplayTackle=!this.isDisplayTackle;
    this.isDisplayBase=!this.isDisplayBase;
    console.log(addTackleForm.value);
    console.log(this.stat);


    // this.webService.addPass(addPassForm);
    this.ngOnInit();
  }

  checkExclusive(type: any){
    if (type == 'complete'){
      this.stat.isIncomplete = false;
      this.stat.isIntercepted = false;
      this.stat.isSack = false;
    }
    else if (type == 'incomplete'){
      this.stat.isComplete = false;
      this.stat.isIntercepted = false;
      this.stat.isSack = false;
      this.stat.isTouchdown = false;
      this.stat.isSafety = false;
    }
    else if (type == 'sack'){
      this.stat.isIncomplete = false;
      this.stat.isIntercepted = false;
      this.stat.isComplete = false;
      this.stat.isTouchdown = false;
    }
    else if (type == 'int'){
      this.stat.isIncomplete = false;
      this.stat.isComplete = false;
      this.stat.isSack = false;
    }
    else if (type == 'touchdown'){
      this.stat.isIncomplete = false;
      this.stat.isSack = false;
      this.stat.isSafety = false;
    }

    else if (type == 'safety'){
      this.stat.isIncomplete = false;
      this.stat.isTouchdown = false;
    }

    console.log(this.stat)
  }


  onEdit(editPass: NgForm) {
    console.log(editPass);
    this.webService.editPass(editPass, this.currentID);
    this.ngOnInit();
  }

  onSearchChange(searchValue: number): void {  
    console.log(searchValue);
  }




  passDelete() {
    this.webService.deletePass(this.currentID);
    this.isDisplayBase=!this.isDisplayBase;
    this.isDisplayEditPass=!this.isDisplayEditPass;
    this.ngOnInit();
  }

  getColor(team: any) {
    2;
    switch (team) {
      default:
        return '#022413';
    }
  }
}
