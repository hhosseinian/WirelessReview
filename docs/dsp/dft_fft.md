# Fast Fourier Transform (FFT) vs Discrete Fourier Transform (DFT)

## Overview

Discrete Fourier Transform (DFT) and Fast Fourier Transform (FFT) algorithms are fundamental techniques in digital signal processing, widely used to analyze frequency content within signals.

---

## Discrete Fourier Transform (DFT)

- Converts a finite sequence of equally-spaced samples of a function into a same-length sequence of equally-spaced frequency samples.
- Primarily used for frequency analysis of discrete-time signals.

### Mathematical Representation

The DFT is mathematically defined as:

`X[k] = sum_{n=0}^{N-1} x[n] * e^(-j*(2*pi/N)*k*n), k = 0, 1, ..., N-1`

**Where:**
- `x[n]` is the input signal.
- `X[k]` is the frequency-domain representation.
- `N` is the total number of samples.

### Limitations
- Computational complexity: `O(N^2)`
- Inefficient for large datasets.

---

## Fast Fourier Transform (FFT)

- An efficient algorithm to compute the DFT.
- Significantly reduces computational complexity.

### Mathematical Concept

FFT exploits symmetry and periodicity properties of the complex exponential, breaking down computations into smaller, repetitive calculations.

- **Radix-2 FFT**: Requires input length to be a power of two.
- **Divide and Conquer**: Splits original sequence recursively.

#### Complexity
- FFT reduces complexity from `O(N^2)` to `O(N log N)`.

---

## Comparison Table

| Feature                  | DFT                    | FFT                          |
|--------------------------|------------------------|------------------------------|
| Computational Complexity | `O(N^2)`               | `O(N log N)`                 |
| Computation Speed        | Slow for large datasets| Fast for large datasets      |
| Efficiency               | Lower                  | Higher                       |
| Input Length             | Arbitrary              | Usually powers of two        |

---

## Intuitive Illustration

Imagine calculating frequency components from a long list of numbers:

- **DFT**: Directly computes each frequency individually, like multiplying every single number with every possible frequency. *(Slow, repetitive)*

Input signal: x[n] → [x₀, x₁, x₂, ..., xₙ₋₁]
↓
Compute every frequency separately: X[k]


- **FFT**: Groups numbers smartly, computes smaller groups first, then combines the results:

Input signal: x[n] → [x₀, x₁, x₂, ..., xₙ₋₁]
↓
Divide into smaller parts → Compute each smaller part
↓
Combine computed results efficiently

---
_Last updated: June 06, 2025
