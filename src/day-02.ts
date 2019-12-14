import { incrementingArray, copyWithUpdate } from "./utils"

// https://adventofcode.com/2019/day/2
export default class DayTwo {

	private static readonly MEMORY: number[] = [1, 12, 2, 3, 1, 1, 2, 3, 1, 3, 4, 3, 1, 5, 0, 3, 2, 1, 10, 19, 1, 19, 5, 23, 2, 23, 6, 27, 1, 27, 5, 31, 2, 6, 31, 35, 1, 5, 35, 39, 2, 39, 9, 43, 1, 43, 5, 47, 1, 10, 47, 51, 1, 51, 6, 55, 1, 55, 10, 59, 1, 59, 6, 63, 2, 13, 63, 67, 1, 9, 67, 71, 2, 6, 71, 75, 1, 5, 75, 79, 1, 9, 79, 83, 2, 6, 83, 87, 1, 5, 87, 91, 2, 6, 91, 95, 2, 95, 9, 99, 1, 99, 6, 103, 1, 103, 13, 107, 2, 13, 107, 111, 2, 111, 10, 115, 1, 115, 6, 119, 1, 6, 119, 123, 2, 6, 123, 127, 1, 127, 5, 131, 2, 131, 6, 135, 1, 135, 2, 139, 1, 139, 9, 0, 99, 2, 14, 0, 0]

	public solve(): number {
		return incrementingArray(10000)
			.map(words => [Math.floor(words / 100), words % 100] as sentence)
			.map(words => [words, this.testWords(...words)])
			.filter(wordsWithResult => wordsWithResult[1] == 19690720)
			.map(wordsWithResult => wordsWithResult[0])
			.map(words => words[0] * 100 + words[1])
			[0]
	}

	private testWords(noun: word, verb: word): number {
		return this
			.compute(
				State.initial(
					copyWithUpdate(DayTwo.MEMORY, [ 1, noun ], [ 2, verb ])))
			.valueAt(0)
	}

	private compute(state: State): State {
		return state.halted()
			? state
			: this.compute(this.executeInstruction(state))
	}

	private executeInstruction(state: State): State {
		return state.next(
			state.valueAtOffset(3),
			this.executeOperation(
				state.valueAtOffset(0),
				state.valueAt(state.valueAtOffset(1)),
				state.valueAt(state.valueAtOffset(2))))
	}

	private executeOperation(operation: number, operand1: number, operand2: number): number {
		switch (operation) {
			case 1: return operand1 + operand2
			case 2: return operand1 * operand2
			default: return 0
		}
	}

}

type word = number
type sentence = [ word, word ]
type memory = number[]

class State {

	private static readonly HALTED = 99

	private constructor(
		private readonly memory: memory,
		private readonly address: number) {
	}

	static initial(codes: memory): State {
		return new State(codes, 0)
	}

	valueAtOffset(offset: number) {
		return this.valueAt(this.address + offset)
	}

	valueAt(address: number) {
		if (address > this.memory.length) {
			const error = "Array out of bounds - index " + address
			console.log(error)
			throw { error }
		}
		return this.memory[address]
	}

	next(updatedIndex: number, updatedValue: number): State {
		return new State(
			copyWithUpdate(this.memory, [updatedIndex, updatedValue]),
			this.address + 4
		)
	}

	halted(): boolean {
		return this.address >= this.memory.length || this.memory[this.address] == State.HALTED
	}

}
