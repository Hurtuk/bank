import { inject, Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { UrlBuilderService } from './url-builder.service';

@Injectable({
    providedIn: 'root'
})
export class LoginService {
    private urlBuilder = inject(UrlBuilderService);

    constructor(private http: HttpClient) { }

    /**
     * Vérifie si l'utilisateur a le droit d'accès selon son IP
     */
    canAccessByIp(): Observable<boolean> {
        return this.http.get<boolean>(this.urlBuilder.buildUrl('isIPallowed'));
    }

    /**
     * Vérifie si le mot de passe est correct
     * @param password Mot de passe entré par l'utilisateur
     */
    checkPassword(password: string): Observable<boolean> {
        return this.http.post<boolean>(this.urlBuilder.buildUrl('login', password), null);
    }
}
