import { Component } from '@angular/core';

@Component({
  selector: 'my-event',
  template: `
    <div class="book">
      <h3>GitHub</h3>
      ぜひ、ご覧ください。<br />
      <a href="https://github.com/sakazoo">https://github.com/sakazoo</a>
    </div>
  `,
  styleUrls: ['app/app.component.css']
})
export class BookComponent {
}
