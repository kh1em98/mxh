import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './core/guard/auth.guard';
import { NewsFeedComponent } from './news-feed/news-feed.component';

const routes: Routes = [
    {
        path: '', pathMatch: 'full', canActivate: [AuthGuard],
        component: NewsFeedComponent,
    },
]

@NgModule({
    imports: [
        RouterModule.forRoot(routes)
    ],
    exports: [
        RouterModule
    ]
})
export class AppRoutingModule { }