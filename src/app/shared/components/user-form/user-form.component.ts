import { Component, OnInit, Output, EventEmitter, Input } from '@angular/core';
import { FormGroup, FormControl, Validators } from '@angular/forms';

@Component({
  selector: 'app-user-form',
  templateUrl: './user-form.component.html',
  styleUrls: ['./user-form.component.scss'],
  standalone: false,
})
export class UserFormComponent implements OnInit {
  @Input() initialData: any = {}; // Para inicializar el formulario si hay datos
  @Output() formSubmit = new EventEmitter<any>();

  userForm!: FormGroup;

  countries: { value: string; label: string }[] = [
    { value: 'Colombia', label: '🇨🇴 Colombia' },
    { value: 'México', label: '🇲🇽 México' },
    { value: 'Argentina', label: '🇦🇷 Argentina' }
  ];

  ngOnInit() {
    this.userForm = new FormGroup({
      name: new FormControl(this.initialData.name || '', Validators.required),
      lastName: new FormControl(this.initialData.lastName || '', Validators.required),
      country: new FormControl(this.initialData.country || '', Validators.required),
      email: new FormControl(this.initialData.email || '', [Validators.required, Validators.email]),
      password: new FormControl('', Validators.required),
      confirmPassword: new FormControl('', Validators.required)
    });
  }

  submit() {
    if (this.userForm.invalid) {
      console.log('Formulario incompleto o inválido');
      return;
    }

    const { password, confirmPassword } = this.userForm.value;
    if (password !== confirmPassword) {
      console.log('Las contraseñas no coinciden');
      return;
    }

    this.formSubmit.emit(this.userForm.value);
  }
}
