//to show the registration form when you so navigate into an URL for /sign up

import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';
import {UserProfileComponent} from './user-profile/user-profile.component';
import {SignInComponent} from './user/sign-in/sign-in.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,// to load User-component in app.component.html thanks its router-outled tag
        children: [{ path: '', component: SignUpComponent }]// to load children(sign-up) in user component thanks to another router-outlet tag in UserComponent html
    },
    {
        path: 'login', component: UserComponent,
        children: [{ path: '', component: SignInComponent }]
    },
    {
        path: 'userprofile', component: UserProfileComponent
    },
    {
        path: '', redirectTo: '/login', pathMatch: 'full'
    }
];