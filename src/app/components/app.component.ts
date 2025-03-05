import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { MenuBarComponent } from './menu-bar/menu-bar.component';
import { InfoBarComponent } from './info-bar/info-bar.component';
import { LoginService } from '../shared/services/login.service';
import { FormsModule } from '@angular/forms';

@Component({
    selector: 'app-root',
    templateUrl: './app.component.html',
    styleUrls: ['./app.component.scss'],
    imports: [RouterOutlet, MenuBarComponent, InfoBarComponent, FormsModule]
})
export class AppComponent implements OnInit {
    private loginService = inject(LoginService);

    public logged = false;

    public password = '';

    ngOnInit(): void {
        this.loginService.canAccessByIp().subscribe(isOk => {
            this.logged = isOk;
            if (!this.logged) {
                const pass = localStorage.getItem('ahah');
                if (pass) {
                    this.check(pass);
                }
            }
        });
    }

    public loginByPassword() {
        this.check(this.password);
    }

    public check(password: string) {
        this.loginService.checkPassword(password).subscribe(isOk => {
            this.logged = isOk;
            if (this.logged) {
                localStorage.setItem('ahah', this.password);
            } else {
                localStorage.removeItem('ahah');
            }
        });
    }
}
