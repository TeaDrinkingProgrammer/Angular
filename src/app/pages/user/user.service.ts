import { Injectable } from '@angular/core';
import { filter, from, Observable, of, take } from 'rxjs';
import { User } from './User.model';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  private userList : User[];
  constructor() { 
    this.userList = [{
      id: 0, name:  {firstName: "John", lastName: "Doe"}, email: "johndoe@aol.com"
    }]
  }
  setOption(id : number, value : User) {      
    this.userList.forEach((item) => {
      if(item.id === id){
        item = value
      }
    });  
  }
  pushItem(item : User){
    //TODO: how to make this observable
    item.id = this.userList.length;
    this.userList.push(item);
  }

  getForId(id: number): Observable<User>{
    return from(this.userList).pipe(
      filter((item) => item.id === id),
      take(1)
    )
  }
  getAll() : Observable<User[]> {  
    return of(this.userList);  
  }  
  deleteForId(id : number) : boolean{
    this.userList = this.userList.filter(function(ele){ 
      console.log(ele.id != id)
      return ele.id != id; 
  })
  console.log("array: ",this.userList)
    return true
  }
}
