# Link Budget:
## Definition:
A ***link budget*** is an accounting of all the gains and losses from the transmitter, through the medium (free space, cables, etc.), to the receiver in a communications system. It determines if the received signal is strong enough for reliable communication.

$$
P_{RX} = P_{TX} + G_{TX} + G_{RX} - L_{P} - L_{TX} - L_{RX} - L_{M}
$$


## Parameter Table

| Symbol      | Name                     | Description                                       | Units     |
| ----------- | ------------------------ | ------------------------------------------------- | --------- |
| $P_{RX}$ | Received Power           | Power at the receiver input                       | dBm / dBW |
| $P_{TX}$ | Transmitted Power        | Power at the transmitter output                   | dBm / dBW |
| $G_{TX}$ | Transmitter Antenna Gain | Gain of transmitting antenna                      | dBi       |
| $G_{RX}$ | Receiver Antenna Gain    | Gain of receiving antenna                         | dBi       |
| $L_{P}$  | Path Loss                | Free space or other path loss                     | dB        |
| $L_{TX}$ | Transmitter Losses       | Losses before the transmit antenna (cables, etc.) | dB        |
| $L_{RX}$ | Receiver Losses          | Losses after the receive antenna (cables, etc.)   | dB        |
| $L_{M}$  | Miscellaneous Losses     | Other losses (fade margin, polarization, etc.)    | dB        |


## Key Points

* All terms are in dB (logarithmic scale) for easy addition/subtraction.
* Path loss is typically the largest single loss.
* Link budget ensures that the received power $(P_{RX})$ exceeds the receiver sensitivity for reliable communication.


# Receiver Sensitivity:

## Definition:
***Receiver Sensitivity*** is the ***minimum input signal power*** that a receiver can detect with acceptable quality (i.e., with a given bit error rate, SNR, or other performance metric).

$$
P_{sens} = -174 + 10 \log_{10}(B) + NF + SNR_{min}
$$

Where:

* $P_{sens}$: Receiver Sensitivity (in dBm)
* $B$: Bandwidth (Hz)
* $$NF$$: Receiver Noise Figure (dB)
* $SNR_{min}$: Minimum required Signal-to-Noise Ratio (dB)

-174 dBm/Hz is the thermal noise power density at room temperature ($kT$ at $T=290$K).

## Parameter Table (Receiver Sensitivity)

| Symbol         | Name                 | Description                         | Units |
| -------------- | -------------------- | ----------------------------------- | ----- |
| $P_{sens}$  | Receiver Sensitivity | Minimum detectable power            | dBm   |
| $B$          | Bandwidth            | Receiver bandwidth                  | Hz    |
| NF         | Noise Figure         | Receiver noise figure               | dB    |
| $SNR_{min}$ | Minimum SNR Required | For desired performance (e.g., BER) | dB    |

**Note:** $k$ (Boltzmann's constant) and $T$ (Temperature) are already included in the -174 dBm/Hz term for standard calculations at room temperature.



# Noise Figure and Noise Factor

**Noise Figure (NF)** quantifies how much additional noise a receiver or component adds to the signal, relative to an ideal (noise-free) system.

* It describes the **degradation of the Signal-to-Noise Ratio (SNR)** as the signal passes through a device.
* Lower NF means a better receiver (adds less noise).

---

* **Noise Factor ($F$)** is the **linear ratio** (unitless):

  $$
  F = \frac{SNR_{in}}{SNR_{out}}
  $$
* **Noise Figure ($NF$)** is the **decibel (dB) form** of Noise Factor:

  $$
  NF = 10 \log_{10}(F)
  $$

Where:

* $NF$: Noise Figure (dB)
* $SNR_{in}$: Signal-to-Noise Ratio at the input
* $SNR_{out}$: Signal-to-Noise Ratio at the output

---

## Parameter Table (Noise Figure & Noise Factor)

| Term         | Symbol         | Definition                      | Unit     |
| ------------ | -------------- | ------------------------------- | -------- |
| Noise Figure | $NF$         | $NF = 10 \log_{10}(F)$       | dB       |
| Noise Factor | $F$          | $F = SNR_{in} / SNR_{out}$  | Unitless |
| Input SNR    | $SNR_{in}$  | Signal-to-noise ratio at input  | dB       |
| Output SNR   | $SNR_{out}$ | Signal-to-noise ratio at output | dB       |

---

### Key Points

* **NF** and **F** both describe noise performance: **NF** (in dB) is more common in datasheets.
* **Lower NF/F means better receiver quality**—less noise is added by the system.
* **NF** is critical in receiver sensitivity calculations and overall link performance.

# Multistage (Cascaded) Amplifier Noise Figure – Quick Reference

---

* **Friis Formula for Cascaded Noise:**

  * For N amplifier stages in cascade:

    $$
    F_{\text{total}} = F_1 + \frac{F_2 - 1}{G_1} + \frac{F_3 - 1}{G_1 G_2} + \cdots + \frac{F_N - 1}{G_1 G_2 \cdots G_{N-1}}
    $$

    * $F_i$: Noise factor (linear, not dB) of the i-th stage
    * $G_i$: Power gain (linear, not dB) of the i-th stage

* **Key Points:**

  * **First stage** dominates total noise performance—maximize its gain and minimize its noise figure for best results.
  * Later stages contribute less noise if early stage gains are high.
  * Always use **linear values** for noise and gain in the Friis equation.

* **Example Calculation:**

  * Given three stages:

    * Noise figures: 3 dB, 5 dB, 7 dB
    * Gains: 10 dB, 8 dB
  * **Step 1:** Convert to linear:

    * $F_1 = 10^{3/10} = 2$
    * $F_2 = 10^{5/10} = 3.16$
    * $F_3 = 10^{7/10} = 5.01$
    * $G_1 = 10^{10/10} = 10$
    * $G_2 = 10^{8/10} = 6.31$
  * **Step 2:** Plug into Friis:

    * $F_{\text{total}} = 2 + \frac{3.16 - 1}{10} + \frac{5.01 - 1}{10 \times 6.31} = 2 + 0.216 + 0.0635 = 2.28$
  * **Step 3:** Back to dB:

    * $NF_{\text{total}} = 10 \log_{10}(2.28) \approx 3.58\,\text{dB}$

* **Summary Table:**

| Stage | Noise Figure (dB) | Noise Factor | Gain (dB) | Gain (linear) |
| ----- | ----------------- | ------------ | --------- | ------------- |
| 1     | 3                 | 2.00         | 10        | 10.00         |
| 2     | 5                 | 3.16         | 8         | 6.31          |
| 3     | 7                 | 5.01         | –         | –             |

---

**Key Tip:**

* Focus on minimizing the noise figure and maximizing the gain of the **first stage** in a cascaded amplifier chain for best overall system noise performance.

---


---
_Last updated: June 06, 2025
