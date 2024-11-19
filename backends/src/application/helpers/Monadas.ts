export class Maybe<T> {
	private value: T | null;

	constructor(value: T | null) {
		this.value = value;
	}

	static of<T>(value: T | null) {
		return new Maybe<T>(value);
	}

	isNothing(): boolean {
		return this.value === null || this.value === undefined;
	}

	map<U>(fn: (value: T) => U | null): Maybe<U> {
		if (this.isNothing()) {
			return Maybe.of<U>(null);
		}
		return Maybe.of<U>(fn(this.value as T));
	}

	getValue(): T | null {
		return this.value;
	}
}

