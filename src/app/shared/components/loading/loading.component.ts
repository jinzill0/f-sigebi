import { Component, OnInit } from '@angular/core';
import { LoadingService } from 'src/app/common/services/loading.service';

@Component({
  selector: 'app-loading',
  templateUrl: './loading.component.html',
  styles: [
    `
      .lds-spinner {
        top: 0 !important;
        position: fixed;
        width: 100vw;
        height: 100vh;
        background: rgba(20, 20, 20, 0.9);
        z-index: 1111;
        display: flex;
        justify-content: center;
        align-items: center;
        overflow-y: hidden;
        -webkit-user-select: none;
        -khtml-user-select: none;
        -moz-user-select: none;
        -o-user-select: none;
        -ms-user-select: none;
        user-select: none;
      }
      .lds-spinner div {
        transform-origin: 40px 40px;
        animation: lds-spinner 1.2s linear infinite;
      }
      .lds-spinner div:after {
        content: ' ';
        display: block;
        position: absolute;
        top: 3px;
        left: 37px;
        width: 6px;
        height: 18px;
        border-radius: 20%;
        background: #fff;
      }
      .lds-spinner div:nth-child(1) {
        transform: rotate(0deg);
        animation-delay: -1.1s;
      }
      .lds-spinner div:nth-child(2) {
        transform: rotate(30deg);
        animation-delay: -1s;
      }
      .lds-spinner div:nth-child(3) {
        transform: rotate(60deg);
        animation-delay: -0.9s;
      }
      .lds-spinner div:nth-child(4) {
        transform: rotate(90deg);
        animation-delay: -0.8s;
      }
      .lds-spinner div:nth-child(5) {
        transform: rotate(120deg);
        animation-delay: -0.7s;
      }
      .lds-spinner div:nth-child(6) {
        transform: rotate(150deg);
        animation-delay: -0.6s;
      }
      .lds-spinner div:nth-child(7) {
        transform: rotate(180deg);
        animation-delay: -0.5s;
      }
      .lds-spinner div:nth-child(8) {
        transform: rotate(210deg);
        animation-delay: -0.4s;
      }
      .lds-spinner div:nth-child(9) {
        transform: rotate(240deg);
        animation-delay: -0.3s;
      }
      .lds-spinner div:nth-child(10) {
        transform: rotate(270deg);
        animation-delay: -0.2s;
      }
      .lds-spinner div:nth-child(11) {
        transform: rotate(300deg);
        animation-delay: -0.1s;
      }
      .lds-spinner div:nth-child(12) {
        transform: rotate(330deg);
        animation-delay: 0s;
      }
      @keyframes lds-spinner {
        0% {
          opacity: 1;
        }
        100% {
          opacity: 0;
        }
      }
    `,
  ],
})
export class LoadingComponent implements OnInit {
  loader: boolean;
  constructor(private readonly loadService: LoadingService) {
    loadService.loader.subscribe({ next: load => (this.loader = load) });
  }

  ngOnInit(): void {}
}
