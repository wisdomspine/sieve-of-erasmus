/**
 * Interface declaration for the application's prime state
 *
 */
export interface PrimeState {
  /**
   * The lower bound for the prime numbers
   * Implies numbers in `primeNumbers` must be greater or equal to the specified value
   */
  min: number | null;

  /**
   * The upper bound for the prime numbers
   * Implies numbers in `primeNumbers` must be less than or equal to the specified value
   */
  max: number | null;

  /**
   * currently generated prime numbers between `min` and `max` (inclusive)
   */
  primeNumbers: number[];

  /**
   * A dictionary of prime numbers, and eliminated multiples.
   * Also, it includes numbers not eliminated (which serves as input to the next prime number in the dictionary)
   */
  primeSteps: { [key: number]: { [value: number]: boolean } };

  /**
   * if `true`, it implies  the prime numbers between `min` and `max` are being generated at the moment
   * Otherwise, they're not
   */
  isCalculating: boolean;

  /**
   * refers to the current prime in `primeSteps` whose elimination steps are being viewed
   */
  currentPreview: number | null;
}
