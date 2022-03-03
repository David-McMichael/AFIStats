import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { WebService } from '../web.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
})
export class GameComponent{
  isDisplayBase=false;
  isDisplayRun=true;
  isDisplayPass=true;
  isDisplayEditPass=true;
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
      this.isDisplayPass=!this.isDisplayPass;
      console.log(this.isDisplayPass)
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
  stat: any;
  editForm: any;
  currentID: any;
  passIncompleteIsChecked = false;
  stat_list: any;
  passer:any;
  constructor(
    public authService: AuthService,
    public webService: WebService,
    private router: Router,
    private modalService: NgbModal,
    public http: HttpClient
  ) {}

  ngOnInit() {
    this.stat_list = this.webService.getStats();
    this.stat = this.stat_list[0];
    console.log(this.stat_list)
    this.passer = "test";
  }


  onSubmit(addPass: NgForm) {
    console.log(addPass);
    this.webService.addPass(addPass);
    this.ngOnInit();
  }

  onEdit(editPass: NgForm) {
    console.log(editPass);
    this.webService.editPass(editPass, this.currentID);
    this.ngOnInit();
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
