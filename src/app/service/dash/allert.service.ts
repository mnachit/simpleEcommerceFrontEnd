import { Injectable } from '@angular/core';
import Swal from 'sweetalert2';

@Injectable({
  providedIn: 'root'
})
export class AllertService {

  constructor() { }

  showError(text: string, time: number): void {
    Swal.fire({
      title: 'Error!',
      text: text,
      icon: 'error',
      showConfirmButton: false, // Remove the confirm button
      timer: time // Set the timer to 1 second (1000 milliseconds)
    });
  }


  showSuccess(text: string, time: number): void {
    Swal.fire({
      title: 'Success!', // Change title to 'Success!'
      text: text, // Change text to indicate success
      icon: 'success', // Change icon to 'success'
      showConfirmButton: false, // Remove the confirm button
      timer: time // Set the timer to 1 second (1000 milliseconds)
    });
  }
}
