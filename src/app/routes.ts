//to show the registration form when you so navigate into an URL for /sign up

import { Routes } from '@angular/router';
import { UserComponent } from './user/user.component';
import { SignUpComponent } from './user/sign-up/sign-up.component';

export const appRoutes: Routes = [
    {
        path: 'signup', component: UserComponent,// to load User-component in app.component.html thanks its router-outled tag
        children: [{ path: '', component: SignUpComponent }]// to load children(sign-up) in user component thanks to another router-outlet tag in UserComponent html
    },
    {
        path: '', redirectTo: '/signup', pathMatch: 'full'
    }//show the registration form inside the default route also
];