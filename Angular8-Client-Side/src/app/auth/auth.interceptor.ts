//to attach JWT token into request Header in general way

import { HttpInterceptor, HttpRequest, HttpHandler, HttpEvent } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { tap } from 'rxjs/operators';
import { Router } from "@angular/router";

import { UserService } from "../shared/user.service";

@Injectable()
export class AuthInterceptor implements HttpInterceptor {

    constructor(private userService : UserService,private router : Router){}

    // after adding this HTTP interceptor(below), all the request from this application will be go through this intercept func
    intercept(req: HttpRequest<any>, next: HttpHandler){// in order to intercept HttpInterceptor interface
        
        if (req.headers.get('noauth'))//check wether the request header has a property noauth, all request which does not need JWT in token had like login and sign up requests we don't need JWT token
            return next.handle(req.clone());// to bypass the intercept function
        else {// attach JWT in the request header
            const clonedreq = req.clone({
                headers: req.headers.set("Authorization", "Bearer " + this.userService.getToken())
            });
            return next.handle(clonedreq).pipe(
                tap(//has two callback, if evirything is fine this function will be call(event)
                    event => { },
                    err => {//if JWT is manipulated
                        if (err.error.auth == false) {
                            this.router.navigateByUrl('/login');
                        }
                    })
            );
        }
    }
}