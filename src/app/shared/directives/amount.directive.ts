import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';

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

	constructor() {
		const el = inject(ElementRef);

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
			const value = parseFloat(this.amount[0] ?? '0');
			const options = this.amount.length > 1 ? this.amount[1]: {};
			if ((value && !isNaN(value)) || value === 0) {
				let decimal = Math.abs(Math.round((value % 1 * 100)));
				let integer = value >= 0 ? Math.floor(value): Math.ceil(value);
				if (decimal >= 100) {
					integer++;
					decimal = 0;
				}
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
				this.elementRef.nativeElement.innerHTML = result.replace(/\./gi, ',') + '&nbsp;' + (options.sign ? options.sign : '€');

				this.elementRef.nativeElement.classList.add('amount');
			}
		}
	}
}