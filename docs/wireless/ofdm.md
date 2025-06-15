# Orthogonal Frequency Division Multiplexing (OFDM)

---

## 1. System Overview & Block Diagram

![OFDM Block Diagram](https://upload.wikimedia.org/wikipedia/commons/4/45/OFDM_system_diagram.png)

* **OFDM** splits total bandwidth $B$ into $N$ narrow, orthogonal subcarriers.
* Each subcarrier transmits a low-rate QAM/PSK symbol.
* **Subcarrier spacing:** $\Delta f = \frac{1}{T}$, where $T$ = useful OFDM symbol duration (without cyclic prefix).

**Time-domain OFDM symbol** (without CP):

$$
s[n] = \sum_{k=0}^{N-1} S_k \exp\left(j2\pi \frac{k n}{N}\right), \quad n = 0, 1, ..., N-1
$$

---

## 2. Discrete Implementation & DFT/IDFT

* **IFFT:** Converts frequency domain QAM symbols to time domain OFDM symbol.
* **FFT:** At receiver, recovers subcarrier symbols.
* **Cyclic prefix (CP):** Appends last $L_{cp}$ samples of each OFDM symbol to its front.

**DFT Properties:**

* **DFT:** $X[i] = \frac{1}{\sqrt{N}} \sum_{n=0}^{N-1} x[n] e^{-j2\pi n i / N}$
* **IDFT:** $x[n] = \frac{1}{\sqrt{N}} \sum_{i=0}^{N-1} X[i] e^{j2\pi n i / N}$
* **Circular convolution:** In frequency, becomes pointwise multiplication.

---

## 3. ISI and Cyclic Prefix

* **ISI (Inter-Symbol Interference)** occurs in frequency-selective fading.

* **Cyclic Prefix:**

  * If $L_{cp} \geq L_{ch}$ (channel length), linear convolution becomes circular, eliminating ISI.

* **Received symbol after FFT:**

  $$
  Y_k = H_k S_k + W_k
  $$

  Where $H_k$ = channel response at subcarrier $k$, $W_k$ = noise.

* **Spectral efficiency penalty:** CP overhead reduces net data rate by $N/(N + L_{cp})$.

---

## 4. Inter-Carrier Interference (ICI)

### a. Ideal Synchronization

* Subcarriers are orthogonal:

  $$
  \frac{1}{N} \sum_{n=0}^{N-1} e^{j2\pi (k-l)n/N} = \delta_{kl}
  $$
* No ICI when time/frequency perfectly aligned.

### b. ICI Due to Frequency Offset

* Frequency offset ($\epsilon$, normalized to subcarrier spacing):

  $$
  r[n] = s[n] e^{j2\pi \epsilon n / N}
  $$
* After FFT:

  $$
  Y_k = \sum_{l=0}^{N-1} S_l \cdot \mathrm{ICI}(k, l, \epsilon)
  $$

  with

  $$
  \mathrm{ICI}(k, l, \epsilon) = \frac{\sin(\pi (l - k + \epsilon))}{N \sin \left( \frac{\pi}{N}(l - k + \epsilon) \right)} \exp \left( j\pi \frac{N-1}{N}(l - k + \epsilon) \right)
  $$
* **Effect:** Frequency offset causes energy leakage (ICI), rotating/distorting constellation points.

### c. ICI Due to Timing Offset

* Timing offset ($\tau$):

  $$
  r[n] = s[n-\tau]
  $$

  $$
  Y_k = S_k e^{-j2\pi k \tau / N} + \text{ICI terms}
  $$
* **If $\tau < L_{cp}$:** Only phase rotation; no ISI.
* **If $\tau \geq L_{cp}$:** Both ISI and ICI appear.

---

## 5. Constellation Rotation & SNR Degradation

* **Frequency offset ($\epsilon$)**: Rotates constellation by $2\pi \epsilon$ per symbol.
* **Timing offset ($\tau$)**: Rotates constellation by $2\pi k \tau / N$ per subcarrier.
* Both effects **increase error rate and reduce SNR**.

---

## 6. Peak-to-Average Power Ratio (PAPR)

$$
\mathrm{PAPR} = \frac{\max |s[n]|^2}{\mathbb{E}[|s[n]|^2]}
$$

* OFDM signals have **high PAPR** (up to $N$ for $N$ subcarriers).
* Requires **linear power amplifiers**, reducing power efficiency.
* **Mitigation:** Clipping, peak cancellation, special coding, etc.

---

## 7. Adaptive Loading & Water-Filling

* **Water-filling algorithm**: Allocates power/rate based on subcarrier SNR $\gamma_i$:

$$
P_i = \left( \frac{1}{\gamma_0} - \frac{N_0 B_N}{|H_i|^2} \right)^+
$$

$$
C = \sum_{i=1}^N B_N \log_2 \left(1 + \frac{|H_i|^2 P_i}{N_0 B_N}\right)
$$

* Improves overall rate in frequency-selective channels.

---

## 8. Diversity, Coding & Equalization

* **Channel coding** and **interleaving** spread errors over subcarriers (frequency diversity).
* **Precoding** and **equalization** can compensate for fading, at the cost of complexity and required channel state information (CSI).

---

## 9. Summary Table

| Feature                | Effect/Formula                                          |      |                 |
| ---------------------- | ------------------------------------------------------- | ---- | --------------- |
| OFDM Signal            | $s[n] = \sum_k S_k e^{j2\pi k n / N}$                   |      |                 |
| ISI Elimination        | CP: $L_{cp} \geq L_{ch}$                                |      |                 |
| ICI from Freq Offset   | Increases with offset; see formula above                |      |                 |
| ICI from Timing Offset | Phase shift; ISI if offset $> CP$                       |      |                 |
| PAPR                   | High ($\sim N$); reduces PA efficiency                  |      |                 |
| Water-filling          | ( P\_i = \left( \frac{1}{\gamma\_0} - \frac{N\_0 B\_N}{ | H\_i | ^2} \right)^+ ) |
| Constellation Effect   | Rotated/distorted; higher error rates                   |      |                 |

---

## 10. Key Drawbacks of OFDM

| Drawback                             | Explanation                                                                              |
| ------------------------------------ | ---------------------------------------------------------------------------------------- |
| **High PAPR**                        | Requires highly linear, less efficient amplifiers.                                       |
| **Sensitivity to Freq/Phase Errors** | Frequency/phase offset and Doppler cause ICI, degrade orthogonality.                     |
| **CP Overhead**                      | Reduces net spectral efficiency due to redundant samples.                                |
| **Complexity**                       | Needs FFT/IFFT, accurate synchronization, and digital processing.                        |
| **Nonlinearity Sensitivity**         | High PAPR increases distortion from analog/RF components.                                |
| **Spectral Leakage**                 | Significant sidelobes increase out-of-band emissions unless windowing/filtering is used. |
| **Channel Estimation Required**      | Accurate and fast channel tracking needed for mobility/fast fading.                      |

---

## 11. OFDM vs. Vector Coding

* **Vector Coding (VC)**: SVD-based decomposition for ISI-free parallel channels.

  * Theoretically optimal for ISI elimination, but requires full channel knowledge and is computationally expensive.
  * Not practical for real-time wireless systems.
* **OFDM**: Efficient, does not need full CSI at transmitter, uses CP for simple ISI removal, widely adopted.

---

## 12. Case Study: IEEE 802.11a (WiFi)

* **Bandwidth**: 20 MHz (5 GHz band)
* **Subcarriers**: 64 (48 data, 4 pilots, 12 null)
* **CP Length**: 16 samples ($\approx 0.8\,\mu\text{s}$)
* **OFDM Symbol Time**: 4 $\mu$s (80 samples at 20 MHz)
* **Data Rates**: 6–54 Mbps (varies with modulation and coding)
* **Modulations**: BPSK, QPSK, 16QAM, 64QAM
* **Coding rates**: 1/2, 2/3, 3/4 (convolutional)

---

## 13. References

* D. Tse, P. Viswanath, *Fundamentals of Wireless Communication*
* J. Proakis, *Digital Communications*
* [Wikipedia: OFDM](https://en.wikipedia.org/wiki/Orthogonal_frequency-division_multiplexing)

---

_Last updated: June 06, 2025
