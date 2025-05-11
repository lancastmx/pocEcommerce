import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterLinkWithHref } from '@angular/router';
import { HeaderComponent } from "../../../shared/components/header/header.component";
@Component({
  selector: 'app-notFound',
  standalone: true,
  imports: [CommonModule, RouterLinkWithHref, HeaderComponent],
  templateUrl: './notFound.component.html',
  styleUrls: ['./notFound.component.css']
})
export class NotFoundComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

}
