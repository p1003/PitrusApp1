import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {UserService} from '../user.service';

@Component({
  selector: 'app-registration',
  templateUrl: './registration.component.html',
  styleUrls: ['./registration.component.css']
})
export class RegistrationComponent implements OnInit {
  modelForm: FormGroup;

  constructor(private formBuilder: FormBuilder, private userService: UserService, private router: Router) { }

  formErrors = {
    email: '',
    password: '',
  };

  private validationMessages = {
    required: 'field is required',
  };

  ngOnInit() {
    this.modelForm = this.formBuilder.group({
      email: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onSubmit(form) {
    if (form.status === 'VALID') {
      this.userService.registerUser(form.value.email, form.value.password)
        .then(result => {
          this.router.navigateByUrl('/');
        });
    }
  }
}
