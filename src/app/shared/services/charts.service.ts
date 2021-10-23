import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class ChartsService {
	public typesChartData = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public monthEndsData = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public incomeData = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public incomeDetailData = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public totalData = new Subject<{label: string; data: {date: Date, value: number}[]}[]>();
	public currentsData = new Subject<{label: string; data: {date: Date, value: number}[]}[]>();
	public benefitData = new Subject<{label: string; data: {date: Date, value: number}[]}[]>();

	constructor() { }
}
