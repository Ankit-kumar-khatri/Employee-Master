import { Component, OnInit, ViewChild } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { NgbNavConfig } from '@ng-bootstrap/ng-bootstrap';
import { ToastrService } from 'ngx-toastr';
import Swal from 'sweetalert2';
import { passwordMatch } from './common/custom-validations';
import { DataFormat } from './common/dataFormat';
import { DBOperation } from './common/db-operation';
import { UserService } from './common/user.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  @ViewChild('nav') elf: any;
  title: string = 'Employee Master';
  addForm!: FormGroup;
  submitted: boolean = false;
  userList: DataFormat[] = [];
  buttonText!: string;
  dbOps!: DBOperation;
  filteredEmployee: DataFormat[] = [];

  constructor(
    config: NgbNavConfig,
    private userService: UserService,
    private toastr: ToastrService,
  ) {
    config.destroyOnHide = false;
    config.roles = false;
  }

  setFormState() {
    this.buttonText = 'Save';
    this.dbOps = DBOperation.add;

    this.addForm = new FormGroup(
      {
        id: new FormControl(0, Validators.required),
        empname: new FormControl('', Validators.required),
        address: new FormControl('', Validators.required),
        mobile: new FormControl(0, Validators.compose([Validators.required, Validators.maxLength(10)])),
        dob: new FormControl('', Validators.required),
        remarks: new FormControl(''),
      },
    );
  }

  ngOnInit() {
    this.setFormState();
    this.getUsers();
  }

  get e() {
    return this.addForm.controls;
  }
  register() {
    this.submitted = true;
    if (this.addForm.invalid) {
      return;
    } else {
      switch (this.dbOps) {
        case DBOperation.add:
          this.userService.addUser(this.addForm.value).subscribe((res) => {
            this.toastr.success('User Added Successfully', 'Success');
            this.getUsers();
            this.restForm();
            this.elf.select('secondTab');
          });
          break;
        case DBOperation.update:
          this.userService.updateUser(this.addForm.value).subscribe((res) => {
            this.toastr.success('User Updated Successfully', 'Success');
            this.getUsers();
            this.restForm();
            this.elf.select('secondTab');
          });
          break;

        default:
          break;
      }
    }
  }

  restForm() {
    this.submitted = false;
    this.addForm.reset();
    this.buttonText = 'Save';
    this.dbOps = DBOperation.add;
  }

  getUsers() {
    this.userService.getAllUsers().subscribe((res: any) => {
      this.userList = res;
      this.filteredEmployee = res;
    });
  }

  tabChange() {
    this.restForm();
  }
  edit(id: number) {
    this.buttonText = 'Update';
    this.dbOps = DBOperation.update;
    let user: any = this.userList.find((u: any) => u.id === id);
    this.elf.select('firstTab');
    this.addForm.patchValue(user);
  }
  del(id: number) {
    this.userService.deleteUser(id).subscribe((res: any) => {
      this.toastr.success('Success', 'User Deleted Successfully');
      this.getUsers();
    });
  }

  filterEmployee(text: any) {
    if (!text) {
      this.getUsers();
      return;
    }
    this.userList = this.filteredEmployee.filter((res) => res.empname.toLowerCase().includes(text.toLowerCase()));
  }

}
