import { Directive, ElementRef, Input, OnChanges } from '@angular/core';

/**
 * Arguments :
 * 	- alwaysSign: boolean
 * 	- noSpaces: boolean
 *  - sign: string
 * 	- color: boolean
 */
@Directive({
	selector: '[amount]'
})
export class AmountDirective implements OnChanges {
	@Input() amount: any[] = [];
	private elementRef: ElementRef;

	constructor(el: ElementRef) {
		this.elementRef = el;
	}

	ngOnChanges() {
		this.formatAmount();
	}

	private static spaces(value: number, result = ''): string {
		if (value < 1000) {
			return value + (result ? ' ' + result : '');
		}
		return this.spaces(Math.floor(value / 1000), ('000' + (value % 1000)).slice(-3) + (result ? ' ' + result : ''));
	}

	private formatAmount() {
		if (this.amount) {
			const value = this.amount[0];
			const options = this.amount.length > 1 ? this.amount[1]: {};
			if (value && !isNaN(value)) {
				const decimal = Math.abs(Math.round((value % 1 * 100)));
				const integer = Math.floor(value);
				let result;

				// No space
				if (!options.noSpaces) {
					result = (integer < 0 ? '-' : '') + AmountDirective.spaces(Math.abs(integer)) + ',' + (!decimal ? '00' : decimal < 10 ? '0' + decimal : decimal);
				} else {
					result = value;
				}

				// Always sign
				if (options.alwaysSign) {
					if (integer >= 0) {
						result = '+' + result;
					}
				}

				// Color
				if (options.color) {
					this.elementRef.nativeElement.style.color = integer >= 0 ? 'green' : 'red';
				} else {
					this.elementRef.nativeElement.style.color = 'inherit';
				}

				// Sign
				this.elementRef.nativeElement.innerText = result.replace(/\./gi, ',') + ' ' + (options.sign ? options.sign : '€');
			}
		}
	}
}