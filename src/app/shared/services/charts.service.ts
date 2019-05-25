import { Injectable } from '@angular/core';

import { Subject } from 'rxjs';

@Injectable()
export class ChartsService {
	public typesChartData = new Subject<any>();
	public monthEndsData = new Subject<any>();
	public totalData = new Subject<any>();
	public currentsData = new Subject<any>();
	public benefitData = new Subject<any>();

	constructor() { }
}
