#  Waterfilling Power Allocation in MIMO and OFDM

The **waterfilling algorithm** is used in wireless communications to **optimally allocate power** across multiple channels (or subcarriers) to **maximize data rate** under a total power constraint.

---

##  Intuition

Imagine pouring water into vessels with different floor heights:
- **Each vessel = a channel**
- **Floor height = inverse of channel gain**
- More power (water) goes to channels with **better gains (deeper vessels)**

---

##  Mathematical Formulation

### Objective:
Maximize total data rate:

$$
\max_{\{P_i\}} \sum_{i=1}^{N} \log_2\left(1 + \frac{P_i |h_i|^2}{N_0}\right)
$$

Subject to:

$$
\sum_{i=1}^{N} P_i = P_{\text{total}}, \quad P_i \geq 0
$$

### Optimal Power Allocation:

$$
P_i = \left( \mu - \frac{N_0}{|h_i|^2} \right)^+
$$

Where:
- \( \mu \): Water level (chosen to meet total power constraint)
- \( (\cdot)^+ \): Zero if negative

---

##  Application in Wireless Systems

### OFDM Frequency-Domain Waterfilling
- Apply across **subcarriers** with different gains \( |H_k| \)
- More power to **strong subcarriers**, none to weak ones

### MIMO Spatial Waterfilling
- Use SVD: \( \mathbf{H} = \mathbf{U} \boldsymbol{\Sigma} \mathbf{V}^H \)
- Power allocated to **eigenchannels** \( \sigma_i^2 \):

$$
P_i = \left( \mu - \frac{N_0}{\sigma_i^2} \right)^+
$$

---

##  Summary Table

| Use Case | Domain         | Channel Basis         |
|----------|----------------|------------------------|
| OFDM     | Frequency       | Subcarriers            |
| MIMO     | Spatial         | Eigenmodes (SVD)       |
| General  | Any             | Parallel AWGN channels |

---

## Benefits

- Maximizes capacity
- Skips bad (deep fade) channels
- Dynamic and adaptive power use

---

## Does the Transmitter Need CSI?

? Yes ? **Channel State Information at the Transmitter (CSIT)** is required for waterfilling.

### Why?

Waterfilling allocates **more power to better channels**:
- In **OFDM**, this means knowing each subcarrier's gain \( |H_k|^2 \)
- In **MIMO**, this means knowing the **SVD** of the channel matrix \( \mathbf{H} \) to extract \( \sigma_i^2 \)

Without CSIT, the transmitter cannot:
- Differentiate between good and bad channels
- Apply waterfilling (no way to adjust \( P_i \))

### Result:
- Use **uniform power allocation** if no CSIT is available
- Waterfilling is **not possible** without CSIT

---


---
_Last updated: June 06, 2025
