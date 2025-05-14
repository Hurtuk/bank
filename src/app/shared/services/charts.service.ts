import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class ChartsService {
	public typesChartData = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public monthEndsData = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public rangesDataP = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public rangesDataM = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public incomeData = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public incomeDetailData = new Subject<{label: string, data: {date: Date, value: number}[]}[]>();
	public totalData = new Subject<{label: string; data: {date: Date, value: number}[]}[]>();
	public currentsData = new Subject<{ actionCode: string, quantity: number, sumneg: number, sumpos: number, total: number, totalneg: number, totalpos: number, value: number, initial: number }[]>();
	public benefitData = new Subject<{label: string; data: {date: Date, value: number}[]}[]>();
	public elecData = new Subject<{label: string; data: {date: Date, value: number}[]}[]>();
	public retirementData = new Subject<{label: string; data: {date: Date, value: number}[]}[]>();

	constructor() { }
}
