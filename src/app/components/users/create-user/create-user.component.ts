import { Component, OnInit } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { UsersService } from '../users.service';
import { Router } from '@angular/router';
import { User } from '../users';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent implements OnInit {

  form: FormGroup

  constructor(private fb: FormBuilder, private service: UsersService, private router: Router) { }

  ngOnInit() {
    this.buildForm();
  }

  buildForm() {
    this.form = this.fb.group({
      first_name: ['', [Validators.required, Validators.maxLength(50)]],
      last_name: ['', [Validators.required, Validators.maxLength(50)]],
      email: ['', [Validators.required, Validators.maxLength(50), Validators.email]],
      avatar: ['', Validators.length]
    })
  }

  onSubmit() {
    let user: User = this.form.value;
    user.avatar = this.convertImageToBAse64(this.form.get('avatar').value)
    console.log(this.form.get('avatar').value);

    this.service.saveUserLocalStorage(this.form.value);
    this.router.navigateByUrl('/usuarios');
  }

  convertImageToBAse64(image) {
    var reader = new FileReader();
    reader.readAsDataURL(image);
    reader.onload = function () {
      return reader.result;
    };
    reader.onerror = function (error) {
      console.log('Error: ', error);
    };
    return null
  }

}
