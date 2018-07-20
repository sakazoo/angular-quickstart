import { Component } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

@Component({
  selector: 'my-app',
  template: `
  <h1>Hello {{name}}!!!</h1>
  <img [src]="image" width="128" height="128"/>
  <h1>age is {{member?.age}}</h1>
  <div [innerHTML]="safeMsg">リンク先：</div>
  <table border="1">
    <tr><td [attr.rowspan]="len">結合</td><td>1</td></tr>
    <tr><td>2</td></tr>
    <tr><td>3</td></tr>
  </table>
  <div class="line back" [class.fore]="flag">クラスバインディング</div>
  <div [style.background-color]="bcolor" [style.font-size.%]="size">スタイルバインディング</div>
  <input type="button" (click)="show($event)" value="現在時刻">
  {{currentTime}}
  <form>
    <label for="key">キー入力：</label>
    <input id="key" name="key" (keydown)="show2($event)" />
  </form>
  <div>キーコード：{{which}}</div>
  <div [hidden]="!altKey">［Alt］</div>
  <div [hidden]="!ctrlKey">［Ctrl］</div>
  <div [hidden]="!shiftKey">［Shift］</div>
  <form>
    <label for="zip">郵便番号：</label>
    <input id="zip" name="zip" type="text" size="10" (keydown)="mask($event)" maxlength="4" />
  </form>
  <input #txt id="txt" name="txt" type="text" (keyup.enter)="addShow(txt.value)" />
  <ul [innerHTML]="msg2"></ul>
  <label>姓：<input #last type="text"  (change)="0"/></label><br />
  <label>名：<input #first type="text" (change)="0" /></label>
  <div>こんにちは、{{last.value}}{{first.value}}さん！</div>
  <form>
    <label for="name">名前：</label>
    <input id="name" name="name" type="text" [(ngModel)]="myName" />
    <div>こんにちは、{{myName}}さん！</div>
  </form>
  `,
  styles: [`
    .line { border: solid 1px #f00; }
    .back { background-color: #0ff; }
    .fore { color: Red; }
  `]
})
export class AppComponent  { 
  name = 'Angular';
  member = {
    name: 'sakazoo',
    age: 29
  };
  image = "https://naruhodo.repop.jp/wp-content/uploads/2018/01/s_server.jpg";
  safeMsg: SafeHtml;
  msg: string = "<script>window.alert('hello');</script><a href=\"https://www.google.com\">Google</a>";
  constructor(private sanitizer: DomSanitizer){
    this.safeMsg = sanitizer.bypassSecurityTrustHtml(this.msg);
  }
  len = 3;
  clazz = 'fore';
  flag = true;
  bcolor='#0f2';
  size=150;
  currentTime: string ='---';
  show(e: any){
    this.currentTime = new Date().toLocaleString();
    console.log(e)
  }
  which = '';
  altKey = false;
  ctrlKey = false;
  shiftKey = false;
  show2(e : any) {
    this.which = e.which;
    this.altKey = e.altKey;
    this.ctrlKey = e.ctrlKey;
    this.shiftKey = e.shiftKey;
  }
  mask(e : any) {
    let k = e.which;
    if(!((k >= 48 && k <= 57) || k === 45 || k === 8 || k === 0)){
      e.preventDefault();
    }
  }
  msg2 = '';
  addShow(input: string) {
    this.msg2 += `<li>${input}</li>`;
  }
  myName = "saka";
}
