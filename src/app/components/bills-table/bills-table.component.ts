import { Component, Input } from '@angular/core';

@Component({
  selector: 'app-bills-table',
  templateUrl: './bills-table.component.html',
  styleUrls: ['./bills-table.component.scss']
})
export class BillsTableComponent {

    @Input() data: any[];
    public currentYear = (new Date).getFullYear();

    public getYears(): number[] {
        return Array.from({length: 7}, (_, i) => this.currentYear - i);
    }
}
