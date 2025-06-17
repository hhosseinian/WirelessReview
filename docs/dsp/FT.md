# Comparison of CTFT, DTFT, and DFT

| Feature                           | Continuous-Time FT (CTFT)                           | Discrete-Time FT (DTFT)                                      | Discrete Fourier Transform (DFT)                          |
|----------------------------------|-----------------------------------------------------|---------------------------------------------------------------|------------------------------------------------------------|
| **Input Signal Type**             | Continuous-time $x(t)$                              | Discrete-time $x[n]$                                          | Discrete-time, finite-length $x[n]$                        |
| **Output Frequency Type**         | Continuous frequency $X(f)$                         | Continuous frequency $X(e^{j\omega})$                         | Discrete frequency $X[k]$                                  |
| **Mathematical Formula**          | $X(f) = \int_{-\infty}^{\infty} x(t)e^{-j2\pi ft} \, dt$ | $X(e^{j\omega}) = \sum_{n=-\infty}^{\infty} x[n] e^{-j\omega n}$ | $X[k] = \sum_{n=0}^{N-1} x[n] e^{-j \frac{2\pi}{N}kn}$       |
| **Inverse Transform**             | $x(t) = \int_{-\infty}^{\infty} X(f)e^{j2\pi ft} \, df$ | $x[n] = \frac{1}{2\pi} \int_{-\pi}^{\pi} X(e^{j\omega}) e^{j\omega n} \, d\omega$ | $x[n] = \frac{1}{N} \sum_{k=0}^{N-1} X[k] e^{j \frac{2\pi}{N}kn}$ |
| **Periodicity (Frequency Domain)**| Non-periodic                                        | Periodic with period $2\pi$                                  | Periodic with period $N$                                   |
| **Computation Method**            | Integral                                            | Infinite summation                                            | Finite summation (numerical via FFT)                      |
| **Spectrum Nature**               | Continuous, infinite extent                         | Continuous, periodic                                          | Discrete, finite-length, periodic                         |
| **Applications**                  | Analog signal analysis, circuit theory              | Theoretical signal analysis, filter design                   | Digital signal processing, FFT computations               |
| **Implementation**                | Analytical or numerical                             | Primarily analytical                                          | Digital computation, FFT in hardware/software             |

---

# Relationship Between CTFT, DTFT, and DFT

Understanding how sampling in one domain leads to periodicity in the other is crucial in signal processing. This concept ties together the Continuous-Time Fourier Transform (CTFT), the Discrete-Time Fourier Transform (DTFT), and the Discrete Fourier Transform (DFT).

---


## Summary Table

| Step              | Time Domain Operation       | Frequency Domain Effect         | Periodicity Induced In |
|-------------------|-----------------------------|----------------------------------|-------------------------|
| CTFT â DTFT       | Sampling (discretization)   | Periodic DTFT ($2\pi$-periodic) | Frequency domain        |
| DTFT â DFT        | Truncation (finite length)  | Sampling DTFT at $N$ points     | Time domain             |

---

## Illustration

Below is a minimal JavaScript demo illustrating how **time-domain sampling causes frequency-domain periodicity**, and vice versa.

<div style="padding: 1em; border: 1px solid #ccc; border-radius: 10px;">
  <label><b>Time Sampling (CTFT vs DTFT)</b></label>
  <input type="range" id="timeSamples" min="1" max="20" value="10" />
  <span id="timeSamplesValue">10</span> samples
  <canvas id="freqPlot" width="400" height="150"></canvas>
</div>

<script>
const canvas = document.getElementById("freqPlot");
const ctx = canvas.getContext("2d");
const slider = document.getElementById("timeSamples");
const label = document.getElementById("timeSamplesValue");

function drawSinc(samples) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  ctx.beginPath();
  ctx.moveTo(0, canvas.height / 2);
  for (let x = 0; x < canvas.width; x++) {
    const omega = (x / canvas.width - 0.5) * 10 * Math.PI;
    const y = Math.sin(samples * omega / 2) / (Math.sin(omega / 2) || 1e-6);
    const yNorm = canvas.height / 2 - y * 5;
    ctx.lineTo(x, yNorm);
  }
  ctx.strokeStyle = "#007acc";
  ctx.stroke();
}

slider.oninput = () => {
  label.textContent = slider.value;
  drawSinc(parseInt(slider.value));
};

drawSinc(parseInt(slider.value));
</script>

---

## Key Insights

- **Sampling in time** â **Periodicity in frequency** (CTFT â DTFT)
- **Sampling in frequency** (via truncation in time) â **Periodicity in time** (DTFT â DFT)
- DFT can be viewed as a **sampled DTFT**, ideal for digital computation.

---




---
_Last updated: June 06, 2025
