import { Component } from '@angular/core';

@Component({
  selector: 'app-footer',
  standalone: true,
  template: `
    <footer class="footer footer-center bg-base-200 text-base-content p-4">
      <aside>
        <p>Copyright © 2026 - Todos los derechos reservados por Mi App</p>
      </aside>
    </footer>
  `
})
export class FooterComponent {}
