import { Component, OnInit, OnDestroy } from '@angular/core';
import { DomSanitizer, SafeHtml } from '@angular/platform-browser';

import { EventComponent } from './event.component';
import { BookComponent } from './book.component';
import { WingsComponent } from './wings.component';

@Component({
  selector: 'my-app',
  template: `
  <div>
    広告バナー：<br />
    <ng-container *ngComponentOutlet="banner"></ng-container>
  </div>
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
    <div>こんにちは、{{myName | uppercase}}さん！</div>
  </form>
  <form>
      <label for="show">表示／非表示：</label>
      <input id="show" name="show" type="checkbox" [(ngModel)]="showFlag" />
  </form>
  <div *ngIf="showFlag; then trueContent; else elseContent">
    この部分は無視される！
  </div>
  <ng-template #trueContent>
    <p>本プロジェクトは、検証の位置づけで開始されました。</p>
    <p>その後、現在に至ります。</p>
  </ng-template>
  <ng-template #elseContent>
    <h3 style="color:Red">非表示中です。</h3>
  </ng-template>
  <div [style.display]="showFlag ? 'inline' : 'none'">
    <p>本プロジェクトは、検証の位置づけで開始されました。</p>
    <p>その後、現在に至ります。</p>
  </div>
  <form>
      <select name="season" [(ngModel)]="season">
      <option value="">四季を選択</option>
      <option value="spring">春</option>
      <option value="summer">夏</option>
      <option value="autumn">秋</option>
      <option value="winter">冬</option>
      </select>
    </form>
    <div [ngSwitch]="season">
      <span *ngSwitchCase="'spring'">春はあけぼの。
やうやう白くなりゆく山際、少しあかりて、紫だちたる雲の細くたなびきたる。</span>
      <span *ngSwitchCase="'summer'">夏は夜。
月の頃はさらなり。闇もなほ、蛍のおほく飛びちがひたる。また、ただ一つ二つなど、ほのかにうち光りて行くもをかし。雨など降るもをかし。</span>
      <span *ngSwitchCase="'autumn'">秋は夕暮れ。
夕日のさして山の端いと近うなりたるに、烏の、寝どころへ行くとて、三つ四つ、二つ三つなど飛び急ぐさへあはれなり。まいて、雁などのつらねたるが、いと小さく見ゆるは、いとをかし。日入り果てて、風の音、虫の音など、はた言ふべきにあらず。</span>
      <span *ngSwitchCase="'winter'">冬はつとめて。
雪の降りたるは言ふべきにもあらず、霜のいと白きも、またさらでもいと寒きに、火など急ぎおこして、炭持てわたるも、いとつきづきし。昼になりて、ぬるくゆるびもていけば、火桶の火も、白い灰がちになりてわろし。</span>
      <span *ngSwitchDefault>選択してください</span>
    </div>
    <table class="table">
    <tr>
    <th>ISBNコード</th><th>書名</th><th>価格</th><th>出版社</th>
    <th>index</th><th>first</th><th>last</th><th>odd</th><th>even</th>
    </tr>
    <tr *ngFor="let b of books; index as i; first as first;
    last as last; odd as odd; even as even;">
      <td>{{b.isbn}}</td>
      <td>{{b.title}}</td>
      <td>{{b.price}}円</td>
      <td>{{b.publisher}}</td>
      <td>{{i}}</td>
      <td>{{first ? '○' : '－'}}</td>
      <td>{{last ? '○' : '－'}}</td>
      <td>{{odd ? '○' : '－'}}</td>
      <td>{{even ? '○' : '－'}}</td>
    </tr>
  </table>
  <ul>
    <li *ngFor="let b of booksTrack; trackBy: trackFn">{{b.title}}（{{b.isbn}}）</li>
  </ul>
  <div><input type="button" (click)="onclick()" value="更新" /></div>
  <input type="button" (click)="back=!back" value="背景色" />
  <input type="button" (click)="fore=!fore" value="前景色" />
  <input type="button" (click)="space=!space" value="余白" />
  <div [ngStyle]="styles">
    <p>本プロジェクトは、検証の位置づけで開始されました。</p>
    <p>その後、現在に至ります。</p>
  </div>
  `,
  styles: [`
    .line { border: solid 1px #f00; }
    .back { background-color: #0ff; }
    .fore { color: Red; }
  `]
})
export class AppComponent implements OnInit, OnDestroy  { 
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
  showFlag = false;
  season = '';
  books = [
    {
      isbn: '978-4-7741-8411-1',
      title: '改訂新版JavaScript本格入門',
      price: 2980,
      publisher: '技術評論社',
    },
    {
      isbn: '978-4-7980-4853-6',
      title: 'はじめてのAndroidアプリ開発 第2版',
      price: 3200,
      publisher: '秀和システム',
    },
    {
      isbn: '978-4-7741-8030-4',
      title: '［改訂新版］Javaポケットリファレンス',
      price: 2680,
      publisher: '技術評論社',
    },
    {
      isbn: '978-4-7981-3547-2',
      title: '独習PHP 第3版',
      price: 3200,
      publisher: '翔泳社',
    },        
    {
      isbn: '978-4-8222-9893-7',
      title: '基礎からしっかり学ぶC++の教科書',
      price: 2800,
      publisher: '日経BP社',
    }
  ];
  trackFn(index: any, book: any) {
    return book.isbn;
  }
  booksTrack = [
    { isbn: '978-4-7741-8411-1', 
      title: '改訂新版JavaScript本格入門' },
    { isbn: '978-4-7980-4853-6', 
      title: 'はじめてのAndroidアプリ開発 第2版' },
    { isbn: '978-4-7741-8030-4', 
      title: '［改訂新版］Javaポケットリファレンス' }
  ];
  onclick() {
    this.booksTrack = [
      { isbn: '978-4-7741-8411-1', 
        title: '改訂新版JavaScript本格入門' },
      { isbn: '978-4-7980-4853-6', 
        title: 'はじめてのAndroidアプリ開発 第2版' },
      { isbn: '978-4-7741-8030-4', 
        title: '［改訂新版］Javaポケットリファレンス' },     
      { isbn: '978-4-7981-3547-2', 
        title: '独習PHP 第3版' }
    ];
  }
  back = false;
  fore = false;
  space = false;

  get styles() {
    return {
      'background-color': this.back  ? '#f00' : '',
      'color'           : this.fore  ? '#fff' : '#000',
      'padding.px'      : this.space ? 15 : 5
    };
  }
  interval: any;
  comps = [ EventComponent, BookComponent, WingsComponent ];
  current = 0;
  banner: any = EventComponent;

  ngOnInit() {
    this.interval = setInterval(() => {
      this.current = (this.current + 1) % this.comps.length;
      this.banner = this.comps[this.current];
    }, 3000);
  }

  ngOnDestroy() {
    clearInterval(this.interval);
  }
}
