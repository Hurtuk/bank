import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-re-bars',
  templateUrl: './re-bars.component.html',
  styleUrls: ['./re-bars.component.scss']
})
export class ReBarsComponent implements OnInit {

  @Input('data') rawData: any;

  public data: any[];

  constructor() { }

  ngOnInit(): void {
    const res = [];
    const now = new Date();
    now.setMonth(11);
    now.setDate(31);
    let idRoom = 0;
    for (const room in this.rawData) {
      res[idRoom] = { name: room, data: [] };
      let currentIndex = 0;
      let occupying = false;
      const year = this.rawData[room][0].startDate.getFullYear();
      const month = 0;
      const day = 1;
      for (let date = new Date(year, month, day); date <= now; date.setDate(date.getDate() + 1)) {
        // Current day info
        let y = date.getFullYear();
        let m = date.getMonth();
        let d = date.getDate();
        // Init arrays
        let currentYear = res[idRoom].data.find(r => r.year === y);
        if (!currentYear) {
          res[idRoom].data.push({ year: y, months: [] });
          currentYear = res[idRoom].data.find(r => r.year === y);
        }
        if (!currentYear.months[m]) {
          currentYear.months.push({ occupied: 0, letter: date.toLocaleString('default', { month: 'short' }), days: [] });
        }
        // If it's a start, then flag on
        if (ReBarsComponent.equalDates(this.rawData[room][currentIndex].startDate, date)) {
          occupying = true;
        }
        // If it's an end, then flag off
        else if (ReBarsComponent.equalDates(this.rawData[room][currentIndex].endDate, date)) {
          occupying = false;
        }
        // Save the day state
        currentYear.months[m].days[d - 1] = occupying;
        // If the next tenant start on the end date of the previous one, rewind of one day to do it again
        if (this.rawData[room].length > currentIndex + 1 && ReBarsComponent.equalDates(this.rawData[room][currentIndex + 1].startDate, date)) {
          date.setDate(date.getDate() - 1);
          currentIndex++;
        }
      }

      // Formatting additional data
      res[idRoom].data.forEach((year, index) => {
        // Calculating month occupied
        year.months.forEach(month => {
          month.occupied = month.days.filter(d => d).length / month.days.length;
        });

        // Calculating year occupied
        let daysInYear = year.months.reduce((cur, prev) => cur + prev.days.length, 0);
        // If first year, start at the first rental
        if (index === 0) {
          // Remove unrented days
          let firstDayFound = false;
          for (let m = 0; m < year.months.length && !firstDayFound; m++) {
            for (let d = 0; d < year.months[m].days.length; d++) {
              if (year.months[m].days[d]) {
                firstDayFound = true;
                break;
              }
              daysInYear--;
            }
          }
        }
        // Calculate
        year.occupied = year.months.reduce((cur, prev) => cur + prev.days.filter(d => d).length, 0) / daysInYear;
      });

      // Set years DESC
      res[idRoom].data.reverse();

      idRoom++;
    }

    this.data = res;
  }

  public static equalDates(d1: Date, d2: Date): boolean {
    if (!d1 || !d2) {
      return false;
    }
    return d1.getFullYear() === d2.getFullYear() && d1.getMonth() === d2.getMonth() && d1.getDate() === d2.getDate();
  }

}
