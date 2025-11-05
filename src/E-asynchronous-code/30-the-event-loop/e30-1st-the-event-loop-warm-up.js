import { assertThat } from '../../j4b1-assert.js'
/**
 * e30-the-event-loop
 * Warm up
 *
 *
 * * Reguły:
 * - Nie możesz usuwać istniejącego kodu
 * - Możesz jedynie dodawać nowy kod
 */

// #1 Task ----------------------------------------------------------

const collector = [];

collector.push(1);


collector.push(3);


collector.push(2);

queueMicrotask(() => {
		assertThat(
			'Collector has elements in proper order',
			expect => expect(collector).toEqual([1, 2, 3])
		) //=
	})

// #2 Task ----------------------------------------------------------

const secondCollector = [];

secondCollector.push(1);


secondCollector.push(3);


secondCollector.push(2);

queueMicrotask(() => {
		assertThat(
			'Second Collector has elements in proper order',
			expect => expect(secondCollector).toEqual([1, 2])
		) //=
	})
