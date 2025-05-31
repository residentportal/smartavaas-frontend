import { inject, Injectable } from '@angular/core';
import { MessageService } from 'primeng/api';

@Injectable({
  providedIn: 'root',
})
export class ToastService {
  constructor() {}
  private toastService = inject(MessageService);

  showSuccess(summary: string, detail: string) {
    this.toastService.add({
      severity: 'success',
      summary,
      detail,
    });
  }

  showError(summary: string, detail: string) {
    this.toastService.add({ severity: 'error', summary, detail });
  }

  showInfo(summary: string, detail: string) {
    this.toastService.add({ severity: 'info', summary, detail });
  }

  showWarn(summary: string, detail: string) {
    this.toastService.add({ severity: 'warn', summary, detail });
  }

  clear() {
    this.toastService.clear();
  }
}
