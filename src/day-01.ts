// https://adventofcode.com/2019/day/1
export default class DayOne {

	private static readonly MASSES: number[] = [115919, 56833, 117651, 56733, 89472, 91010, 119618, 85667, 141042, 106401, 121495, 50136, 83755, 122558, 149188, 110381, 132060, 145791, 141381, 136467, 104712, 133530, 65297, 52640, 59637, 78410, 107791, 96909, 136738, 109794, 66831, 58426, 97955, 90496, 119294, 83101, 80466, 114370, 67631, 106482, 73996, 50367, 113976, 68998, 109714, 96308, 89350, 143077, 102052, 93325, 86870, 94449, 119448, 53472, 140668, 64989, 112056, 88880, 131335, 94943, 88061, 122883, 129059, 55345, 82362, 60500, 147652, 83147, 87106, 97384, 136883, 62198, 130290, 129715, 93082, 72179, 72109, 70604, 94894, 98139, 97056, 86236, 144191, 108008, 79225, 93551, 103116, 130702, 87599, 143630, 104476, 108922, 134209, 85636, 81591, 127980, 90425, 126133, 118135, 93722]

	public solve() {
		return this.computeTotalFuel(DayOne.MASSES);
	}

	private computeTotalFuel(masses: number[]): number {
		return masses
				.map(mass => this.computeFuelForMass(mass))
				.map(fuel => this.addFuelForFuel(fuel))
				.reduce((m1, m2) => m1 + m2)
	}

	private computeFuelForMass(mass: number): number {
		return Math.max(Math.floor(mass/3) - 2, 0)
	}

	private addFuelForFuel(fuel: number): number {
		return fuel === 0 ? 0 : fuel + this.addFuelForFuel(this.computeFuelForMass(fuel))
	}

}
