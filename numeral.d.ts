declare namespace numeral {
    type RoundingFunction = (value: number) => number;

    interface Delimiters {
        thousands: string;
        decimal: string;
    }

    interface Abbreviations {
        thousand: string;
        million: string;
        billion: string;
        trillion: string;
    }

    interface Locale {
        delimiters: Delimiters;
        abbreviations: Abbreviations;
        ordinal: (value: number) => string;
        currency: {
            symbol: string;
        };
    }

    interface Format {
        regexps: {
            format: RegExp;
            unformat?: RegExp | (() => RegExp);
        };
        format: (value: number | null, format: string, roundingFunction: RoundingFunction) => string;
        unformat?: (value: string) => number | null;
    }

    interface Options {
        currentLocale: string;
        zeroFormat: string | null;
        nullFormat: string | null;
        defaultFormat: string;
        scalePercentBy100: boolean;
    }

    interface Numeral {
        clone(): Numeral;
        format(format?: string, roundingFunction?: RoundingFunction): string;
        value(): number | null;
        input(): unknown;
        set(value: number): Numeral;
        add(value: number): Numeral;
        subtract(value: number): Numeral;
        multiply(value: number): Numeral;
        divide(value: number): Numeral;
        difference(value: number): number;
    }

    interface NumeralStatic {
        (input?: unknown): Numeral;
        version: string;
        options: Options;
        formats: Record<string, Format>;
        locales: Record<string, Locale>;
        fn: Numeral;
        _: {
            numberToFormat(value: number | null, format: string, roundingFunction: RoundingFunction): string;
            stringToNumber(value: string): number | null;
            isNaN(value: unknown): boolean;
            includes(value: string, search: string): boolean;
            insert(value: string, subString: string, start: number): string;
            reduce(array: any[], callback: (...args: any[]) => any, initialValue?: any): any;
            multiplier(value: number): number;
            correctionFactor(...args: number[]): number;
            toFixed(value: number, maxDecimals: number, roundingFunction: RoundingFunction, optionals?: number): string;
        };
        isNumeral(value: unknown): value is Numeral;
        locale(key?: string): string;
        localeData(key?: string): Locale;
        reset(): void;
        zeroFormat(format: string | null): void;
        nullFormat(format: string | null): void;
        defaultFormat(format: string | null): void;
        register(type: 'locale', name: string, format: Locale): Locale;
        register(type: 'format', name: string, format: Format): Format;
        register(type: string, name: string, format: any): any;
        validate(val: unknown, culture?: string): boolean;
    }
}

declare const numeral: numeral.NumeralStatic;
export = numeral;
