# Measurement and Compensation of Tx/Rx Imperfections

| Imperfection                    | Measurement Method                           | Compensation Technique                             |
|--------------------------------|-----------------------------------------------|----------------------------------------------------|
| Power amplifier non-linearity  | Spectrum analyzer (ACLR), EVM                | Digital predistortion, PA back-off                |
| Phase noise                    | Phase noise analyzer                         | High-quality oscillator, PLL filtering            |
| IQ imbalance (Tx)              | VSA, image rejection                         | IQ correction algorithms                          |
| Frequency offset               | Pilot-based frequency error estimation       | CFO estimation and correction                     |
| Quantization noise             | SNR estimation, simulation                   | Higher bit-depth, dithering                       |
| Clock jitter                   | Jitter analyzer, oscilloscope TIE            | Low-jitter clocks, PLL cleanup                    |
| Signal clipping                | Digital scope, EVM analysis                  | AGC, PAPR reduction                               |
| Digital predistortion errors  | Compare PA input/output models               | Adaptive DPD feedback                             |
| LNA non-linearity              | Two-tone test, IP3 measurement               | High-linearity LNA, operate linearly              |
| Mixer leakage                  | Spectrum analyzer (LO spur detection)        | Improve LO isolation and layout                   |
| IQ imbalance (Rx)              | Image rejection, VSA                         | Digital baseband correction                       |
| Thermal noise                  | Noise figure analyzer                        | Low-noise components, shielding                   |
| ADC quantization               | SNR, ENOB measurement                        | Higher-resolution ADCs, noise shaping             |
| Timing recovery errors         | Eye diagram, timing error analysis           | Timing recovery loops (e.g., Gardner)             |
| Channel estimation inaccuracies| Pilot sequence error analysis                | Adaptive estimation and interpolation             |
| Equalization artifacts         | EVM/BER analysis                             | Robust equalizers (MMSE, DFE)                     |

---
# Communication System Measurement Parameters and Acceptable Limits

| Parameter                        | Definition                                                                 | Typical Max Acceptable Value                          |
|----------------------------------|---------------------------------------------------------------------------|--------------------------------------------------------|
| **EVM (Error Vector Magnitude)** | Measures modulation accuracy; deviation of received symbols from ideal   | 1.75% to 8% (depends on modulation & standard)         |
| **BER (Bit Error Rate)**         | Fraction of bits received incorrectly                                     | 1e-5 to 1e-3 (depends on FEC & system)                 |
| **SNR (Signal-to-Noise Ratio)**  | Ratio of signal power to noise power                                     | ≥ 20 dB (higher for higher modulations)               |
| **SINR**                         | SNR including interference from other signals                            | ≥ 18 dB (LTE min requirement)                         |
| **ACLR (Adjacent Channel Leakage Ratio)** | Signal leakage into adjacent frequency bands               | ≤ -30 dBc (can vary with channel spacing)             |
| **SEM (Spectrum Emission Mask)** | Limits power emitted outside intended frequency band                     | Must meet standard-specific spectral mask             |
| **TX Power / Output Power**      | Power level of transmitted signal                                        | +23 to +30 dBm (varies by system)                     |
| **OBW (Occupied Bandwidth)**     | Bandwidth containing 99% of transmitted signal power                     | 99% of power in allocated channel                     |
| **Frequency Error**              | Offset between actual and expected carrier frequency                     | ±0.1 to ±0.5 ppm (standard-dependent)                 |
| **Phase Noise**                  | Frequency stability of local oscillator                                  | < -100 dBc/Hz @ 1 MHz offset (typical)                |

# Error Vector Magnitude (EVM)

**EVM** quantifies the deviation of received symbols from ideal constellation points, reflecting overall modulation accuracy.

## Definition and Formats

| Form        | Equation                                                                 |
|-------------|--------------------------------------------------------------------------|
| Normalized  | \( \text{EVM}_{\text{RMS}} = \sqrt{ \frac{ \sum |S_i - R_i|^2 }{ \sum |S_i|^2 } } \) |
| Percentage  | \( \text{EVM}(\%) = \text{EVM}_{\text{RMS}} \times 100 \)                |
| dB          | \( \text{EVM}_{\text{dB}} = 20 \cdot \log_{10}(\text{EVM}_{\text{RMS}}) \) |

Where:
- \( S_i \): Ideal symbol
- \( R_i \): Received symbol
- \( N \): Number of symbols

---

## Visual Concept

In I/Q constellation:
- **Ideal point**: expected symbol position  
- **Measured point**: actual received position  
- **Error vector**: \( \text{EVM}_i = |S_i - R_i| \)

---

## Interpretation

| EVM Value      | Meaning                                 |
|----------------|-----------------------------------------|
| Low (e.g. <3%) | High signal quality, minimal distortion |
| High           | Indicates noise, non-linearities, or RF impairments |

---

# Why EVM Matters in Standards

## 1. Standard Compliance

| Standard   | Modulation | EVM Limit     |
|------------|------------|---------------|
| LTE        | 64-QAM     | ≤ 8%          |
| 5G NR      | 256-QAM    | ≤ 3.5%        |
| Wi-Fi 6    | 1024-QAM   | ≤ 1.75%       |
| Bluetooth  | GFSK       | ≤ 20%         |

- Devices must meet EVM limits to ensure certification and interoperability.

## 2. Captures Key Impairments

EVM reflects combined effects of:
- IQ imbalance
- Phase noise
- PA non-linearity
- Frequency offset
- ADC/DAC resolution
- Noise floor

## 3. Correlates with Other Metrics

| Metric | Relationship with EVM                  |
|--------|----------------------------------------|
| BER    | ↑ EVM → ↑ Bit Error Rate               |
| SNR    | ↑ EVM → ↓ Signal-to-Noise Ratio        |

## 4. Used in Testing and Manufacturing

- Fast diagnostic tool for verifying signal integrity
- Supports calibration and real-time tuning in production lines

---

## EVM Measurement
| Method                     | Description                                                                   | Tools/Environment                | Notes                                                            |
| -------------------------- | ----------------------------------------------------------------------------- | -------------------------------- | ---------------------------------------------------------------- |
| **Vector Signal Analyzer** | Measures EVM by demodulating the signal and comparing to ideal constellation  | Keysight, R\&S, NI VSA           | Industry standard; fast and accurate                             |
| **Software/DSP Tools**     | Use MATLAB, Python, or other DSP tools to calculate EVM from captured IQ data | MATLAB, Python (NumPy), Simulink | Requires access to ideal symbol mapping and synchronized samples |
| **Built-in in SDR Tools**  | SDR tools (e.g., GNU Radio, LabVIEW) may have EVM blocks or add-ons           | SDR test platforms               | Real-time or post-processing support                             |
| **Simulation-Based**       | Direct computation using known ideal and simulated received symbols           | MATLAB, SystemVue, Simulink      | Ideal for design/testbench validation                            |


## Summary

> **EVM is a comprehensive, fast, and standard-compliant metric to evaluate modulation accuracy and system integrity in modern digital communication systems.**

# Measuring Signal-to-Noise Ratio (SNR)

| Method                           | Description                                                                 | Tools Used                          | Notes                                                                 |
|----------------------------------|-----------------------------------------------------------------------------|-------------------------------------|-----------------------------------------------------------------------|
| **Spectrum Analyzer**            | Measure peak signal vs. noise floor near carrier                            | Spectrum Analyzer                   | Set correct resolution bandwidth (RBW); used in RF systems            |
| **Digital Sample Analysis**      | Compute power of signal and noise using ADC samples                         | ADC, DSP software, MATLAB/Python    | Must isolate signal and noise samples; accurate in simulations        |
| **VSA / Oscilloscope**          | Use built-in SNR function based on demodulated or raw waveform              | Vector Signal Analyzer, Oscilloscope| Fast and standardized; supports modulated signals                     |
| **EVM-Based Estimation**         | Approximate SNR from EVM when noise is dominant                             | VSA or EVM measurement              | Valid if distortion is negligible: `SNR ≈ -20·log10(EVM_RMS)`         |
| **Baseband Simulation**         | Extract signal and noise power from known model or testbench                | MATLAB, Simulink, etc.              | Most controlled; ideal for design phase                               |



---
_Last updated: June 06, 2025
