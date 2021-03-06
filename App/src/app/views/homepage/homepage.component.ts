import { Component, OnDestroy, OnInit } from '@angular/core';

import echarts from 'echarts';
import * as moment from 'moment';
import { Subscription } from 'rxjs';

import { fadeIn } from '../../shared/animations/fade-in';
import { flyIn } from '../../shared/animations/fly-in';
import { NotificationEntity, NotificationService } from '../../core/notification/notification.service';
import { AutoUnsubscribe } from '../../shared/utils/autoUnsubscribe';
import { HttpService } from '../../core/http/http.service';


@Component({
  selector: 'app-homepage',
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss'],
  animations: [fadeIn, flyIn]
})
@AutoUnsubscribe()
export class HomepageComponent implements OnInit, OnDestroy {
  animation: any;
  time: any;
  demoValue: number;

  option: any = {
    title: {
      text: 'ECharts 入门示例',
      textStyle: {
        color: '#333',
        fontStyle: 'normal',
        fontWeight: 'border',
        fontSize: 20,
      },
      left: 'center',
      top: '5%'
    },
    tooltip: {
      show: true,
      trigger: 'axis'
    },
    toolbox: {
      show: true,
      feature: {
        dataZoom: {show: true},
        restore: {show: true},
        saveAsImage: {show: true}
      },
      right: 30,
      top: 15
    },
    dataZoom: [{
      type: 'slider',
      start: 0,
      end: 100
    }],
    legend: {
      selectedMode: true,
      selected: {},
      right: 0,
      top: 150,
      orient: 'vertical',
      textStyle: {
        fontSize: 12,
      },
      show: true,
      data: ['销量', '售22222222价']
    },
    grid: {
      show: false,
      top: 150,
      right: 200,

    },
    xAxis: {
      data: ['衬衫', '羊毛衫', '雪纺衫', '裤子', '高跟鞋', '袜子'],
      axisLabel: {
        interval: 0,
      }
    },
    yAxis: [
      {
        type: 'value',
        name: '',
      }
    ],
    series: [{
      name: '销量',
      type: 'line',
      data: [5, 20, 36, 10, 10, 2000000]
    }, {
      name: '售22222222价',
      type: 'line',
      data: [500, 2099, 3699, 1099, 1990, 2000000]
    }]
  };
  _subscription: Subscription;

  constructor(private http: HttpService, private notificationService: NotificationService) {
    this.demoValue = 1;
  }

  ngOnInit() {
    this.animation = 'void';
    this.createCharts();
    $('#jq').css('background-color', 'yellow');
    this.time = moment().format();

    this._subscription = this.notificationService.getNotification().subscribe((data: NotificationEntity) => {
      switch (data.act) {
        case 'test':
          console.log(data);
          console.log('this is homepage component in homepage module');
          break;
      }
    });
  }

  ngOnDestroy() {
  }

  createCharts() {
    let that = this;
    let dom: any = document.getElementById('main');
    let myChart: any = echarts.init(dom, 'macarons');
    myChart.setOption(that.option);
  }

  toggleState() {
    this.animation = (this.animation === 'void' ? '*' : 'void');
  }

  postData() {
    const api = '/api/hero';
    const heroes = [
      {id: 0, name: 'Zero'},
      {id: 11, name: 'Mr. Nice'},
      {id: 12, name: 'Narco'},
      {id: 13, name: 'Bombasto'},
      {id: 14, name: 'Celeritas'},
      {id: 15, name: 'Magneta'},
      {id: 16, name: 'RubberMan'},
      {id: 17, name: 'Dynama'},
      {id: 18, name: 'Dr IQ'},
      {id: 19, name: 'Magma'},
      {id: 20, name: 'Tornado'}
    ];
    this.http.postData(api, heroes).subscribe(() => {
      console.log('post data');
    });
  }
}
