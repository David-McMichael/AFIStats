import { Component } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { WebService } from './web.service';
import { Router } from '@angular/router';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { NgForm } from '@angular/forms';
import { HttpClient } from '@angular/common/http';

@Component({
  selector: 'home',
  template: `<ul>
      <li
        *ngFor="
          let item of collection
            | paginate: { itemsPerPage: 10, currentPage: p }
        "
      >
        ...
      </li>
    </ul>
    <pagination-controls
      style="padding-left: 0px !important;"
      (pageChange)="p = $event"
    ></pagination-controls>`,
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  editForm: any;
  currentID: any;
  passIncompleteIsChecked = false;
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

  onSubmit(addPass: NgForm) {
    console.log(addPass);
    this.webService.addPass(addPass);
    this.modalService.dismissAll(); //dismiss the modal
    this.ngOnInit();
  }

  onEdit(editPass: NgForm) {
    console.log(editPass);
    this.webService.editPass(editPass, this.currentID);
    this.modalService.dismissAll(); //dismiss the modal
    this.ngOnInit();
  }

  p: number = 1;
  stat_list: any = [];
  closeResult: string = '';
  pass: any = [];

  open(content: any) {
    this.modalService
      .open(content, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          this.closeResult = `Closed with: ${result}`;
        },
        (reason) => {
          this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
        }
      );
  }

  openEdit(targetModal: any, stat: any) {
    this.currentID = stat._id;
    this.modalService.open(targetModal, {
      backdrop: 'static',
      size: 'lg',
    });
  }

  passDelete() {
    this.webService.deletePass(this.currentID);
    this.modalService.dismissAll(); //dismiss the modal
    this.ngOnInit();
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  getColor(team: any) {
    2;
    switch (team) {
      default:
        return '#022413';
    }
  }
}
