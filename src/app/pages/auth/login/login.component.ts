import { Component, OnInit, OnDestroy } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../../auth/auth.service';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { User } from 'src/app/pages/user/user.model';
import { delay } from 'rxjs/operators';
import { AlertService } from 'src/app/shared/alert/alert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['../auth.css'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm: FormGroup;
  subs?: Subscription;
  submitted = false;

  constructor(
    private authService: AuthService,
    private router: Router,
    private alertService: AlertService
  ) {}

  ngOnInit(): void {
    this.loginForm = new FormGroup({
      email: new FormControl(null, [
        Validators.required,
        this.validEmail.bind(this),
      ]),
      password: new FormControl(null, [
        Validators.required,
        this.validPassword.bind(this),
      ]),
    });

    this.subs = this.authService
      .getUserFromLocalStorage()
      .subscribe((user: any | undefined) => {
        //Cannot convert undefined to object
        if (user) {
          console.log('user:', user);
          console.log('User already logged in > to dashboard');
          this.router.navigate(['/']);
        }
      });
  }

  ngOnDestroy(): void {
    if (this.subs) {
      this.subs.unsubscribe();
    }
  }

  onSubmit(): void {
    if (this.loginForm.valid) {
      // this.alertService.success('You have been registered');
      this.submitted = true;
      const email = this.loginForm.value.email;
      const password = this.loginForm.value.password;
      this.authService
        .login(email, password)
        // .pipe(delay(1000))
        .subscribe((user) => {
          console.log('user');
          if (user) {
            console.log('Logged in');
            this.router.navigate(['/']);
          } else {
            console.log('not logged in');
          }
          this.submitted = false;
        });
    } else {
      this.submitted = false;
      console.error('loginForm invalid');
    }
  }

  validEmail(control: FormControl): { [s: string]: boolean } {
    const email = control.value;
    const regexp = new RegExp(
      '^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+.[a-zA-Z0-9-.]+$'
    );
    if (regexp.test(email) !== true) {
      return { email: false };
    } else {
      return {};
    }
  }

  validPassword(control: FormControl): { [s: string]: boolean } {
    const password = control.value;
    const regexp = new RegExp('^[a-zA-Z]([a-zA-Z0-9]){2,14}');
    const test = regexp.test(password);
    if (regexp.test(password) !== true) {
      return { password: false };
    } else {
      return {};
    }
  }
}
