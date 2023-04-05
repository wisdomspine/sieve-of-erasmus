import { Observable } from 'rxjs';

export function sieveOfEratosthenes(
  min: number,
  max: number
): Observable<{ prime: number; eliminated: { [num: number]: boolean } }> {
  let numbers: number[] = [];
  for (let i = 2; i <= max; i++) {
    numbers.push(i);
  }
  let possiblePrimes: number[] = numbers;
  let currentPrimeIndex = 0;
  let results: ReturnType<typeof primeStep>;
  let prime: number;

  return new Observable<{
    prime: number;
    eliminated: { [num: number]: boolean };
  }>((observer) => {
    while (currentPrimeIndex < possiblePrimes.length) {
      prime = possiblePrimes[currentPrimeIndex];
      results = primeStep(currentPrimeIndex, possiblePrimes);
      const { nextPossiblePrimes, ...eliminated } = results;
      if (prime >= min) {
        observer.next({
          prime: possiblePrimes[currentPrimeIndex],
          eliminated: eliminated,
        });
      }

      possiblePrimes = nextPossiblePrimes;
      ++currentPrimeIndex;
    }
    observer.complete();
  });
}

function primeStep(
  index: number,
  possiblePrimes: number[]
): {
  [key: number]: boolean;
  //   numbers that can move to next step
  nextPossiblePrimes: number[];
} {
  const prime = possiblePrimes[index];
  const result: { [key: number]: boolean; nextPossiblePrimes: number[] } = {
    nextPossiblePrimes: [],
  };
  let possiblePrime: number;

  for (let i = 0; i <= index; ++i) {
    possiblePrime = possiblePrimes[i];
    result[possiblePrime] = false;
    result.nextPossiblePrimes.push(possiblePrime);
  }

  for (let i = index + 1; i < possiblePrimes.length; i++) {
    possiblePrime = possiblePrimes[i];
    if (possiblePrime % prime === 0) {
      // is a multiple of prime
      result[possiblePrime] = true;
    } else {
      result[possiblePrime] = false;
      result.nextPossiblePrimes.push(possiblePrime);
    }
  }

  return result;
}
