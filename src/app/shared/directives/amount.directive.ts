import { Directive, ElementRef, Input, OnChanges, inject } from '@angular/core';

/**
 * Arguments :
 * 	- alwaysSign: boolean
 * 	- noSpaces: boolean
 *  - sign: string
 * 	- color: boolean
 *  - tag: boolean
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

				// Tag
				if (options.tag) {
					this.elementRef.nativeElement.style.fontSize = '0.7em';
					this.elementRef.nativeElement.style.backgroundColor = integer >= 0 ? '#d4f5d4' : '#f5d4d4';
					this.elementRef.nativeElement.style.padding = '0.1em 0.3em';
					this.elementRef.nativeElement.style.borderRadius = '0.3em';
					this.elementRef.nativeElement.style.marginBottom = '.1em';
					this.elementRef.nativeElement.style.position = 'relative';
					this.elementRef.nativeElement.style.top = '-0.3em';
				}

				this.elementRef.nativeElement.classList.add('amount');
			}
		}
	}
}