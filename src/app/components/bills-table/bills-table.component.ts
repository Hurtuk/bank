import { PercentPipe } from '@angular/common';
import { Component, Input } from '@angular/core';
import { TypeComponent } from '../type/type.component';
import { AmountDirective } from 'src/app/shared/directives/amount.directive';

@Component({
    selector: 'app-bills-table',
    templateUrl: './bills-table.component.html',
    styleUrls: ['./bills-table.component.scss'],
    imports: [PercentPipe, TypeComponent, AmountDirective]
})
export class BillsTableComponent {

    @Input() data: any[];
    public currentYear = (new Date).getFullYear();

    public getYears(): number[] {
        return Array.from({length: 7}, (_, i) => this.currentYear - i);
    }
}
