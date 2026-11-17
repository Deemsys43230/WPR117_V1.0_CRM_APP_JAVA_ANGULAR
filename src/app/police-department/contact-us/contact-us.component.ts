import { Component, OnDestroy } from '@angular/core';
import { Router } from '@angular/router';

@Component({
  selector: 'app-contact-us',
  standalone: false,
  templateUrl: './contact-us.component.html',
  styleUrls: ['./contact-us.component.scss']
})
export class ContactUsComponent implements OnDestroy {

  readonly supportEmail = 'support@crashreportsonline.com';

  readonly requiredFields: string[] = ['First Name', 'Last Name'];
  readonly optionalFields: string[] = ['Crash Date', 'Crash Report Number', 'Location'];

  /** true for 2 seconds after the address is copied */
  copied = false;
  private copyTimer: any = null;

  constructor(private router: Router) { }

  /** mailto link with the subject and a ready-to-fill body */
  get mailtoHref(): string {
    const subject = 'Crash report request';
    const body = [
      'Hello,',
      '',
      'I need help getting my crash report.',
      '',
      'First Name (required):',
      'Last Name (required):',
      'Crash Date (optional):',
      'Crash Report Number (optional):',
      'Location (optional):',
      '',
      'Thank you.'
    ].join('\r\n');

    return `mailto:${this.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
  }

  /** Copy the support address, with a fallback for older browsers */
  copyEmail(): void {
    const done = () => {
      this.copied = true;
      if (this.copyTimer) { clearTimeout(this.copyTimer); }
      this.copyTimer = setTimeout(() => (this.copied = false), 2000);
    };

    if (navigator.clipboard && window.isSecureContext) {
      navigator.clipboard.writeText(this.supportEmail).then(done).catch(() => this.legacyCopy(done));
    } else {
      this.legacyCopy(done);
    }
  }

  private legacyCopy(done: () => void): void {
    const ta = document.createElement('textarea');
    ta.value = this.supportEmail;
    ta.style.position = 'fixed';
    ta.style.opacity = '0';
    document.body.appendChild(ta);
    ta.select();
    try {
      document.execCommand('copy');
      done();
    } catch (e) { /* ignore */ }
    document.body.removeChild(ta);
  }

  /** "Back to Search" – change the route if your search page is not at "/" */
  goBack(): void {
    this.router.navigate(['/']);
  }

  ngOnDestroy(): void {
    if (this.copyTimer) { clearTimeout(this.copyTimer); }
  }
}