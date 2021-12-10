import { Injectable } from '@angular/core';
import { filter, from, Observable, of, take } from 'rxjs';
import { GenericService } from 'src/app/shared/services/generic.service';
import { User } from './user.model';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  route: string;
  constructor(private genericService: GenericService<User>) {
    this.route = 'user';
  }
  update(id: string, item: any) {
    return this.genericService.update(id, item, this.route);
  }
  add(item: User) {
    return this.genericService.add(item, this.route, true);
  }
  getForId(id: string): Observable<User> {
    return this.genericService.getForId(id, this.route);
  }
  public deleteForId(id: string) {
    console.log('deleteForId');
    return this.genericService.deleteForId(id, this.route, true);
  }

  public getAll(options?: any): Observable<User[]> {
    return this.genericService.getAll(this.route, undefined, options);
  }
}
