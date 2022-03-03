import { Component, OnInit } from '@angular/core';
import { AuthService } from '@auth0/auth0-angular';
import { Router } from '@angular/router'

@Component({
    selector: 'navigation',
    templateUrl: './nav.component.html',
    styleUrls: ['./nav.component.css']
})
export class NavComponent implements OnInit{
    profileJson: any = [];
    public static userEmail: any;
    userDetails: any;

    constructor(public authService: AuthService, public router: Router) { }

    ngOnInit(): void{
        this.authService.user$.subscribe(
            (response:any) => (this.userDetails = response)
        )
    }

}
