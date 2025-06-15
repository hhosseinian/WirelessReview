
# Zero-Forcing (ZF) Receiver Summary: Uplink vs Downlink (2-User MIMO)

This summary compares Zero-Forcing (ZF) techniques for both **uplink** and **downlink** in a multi-user MIMO scenario with:

- **2 users** with single antennas
- **1 Access Point (AP)** with 2 antennas

---

## Common Goal

**Eliminate inter-user interference** by linearly separating data streams using CSI.

---

## Uplink ZF Receiver

### System Model

- Users transmit:  
  $$
  \mathbf{y} = \mathbf{H} \mathbf{x} + \mathbf{n}
  $$
  - \( \mathbf{y} \in \mathbb{C}^{2 \times 1} \): signal at AP  
  - \( \mathbf{H} \in \mathbb{C}^{2 \times 2} \): uplink channel matrix  
  - \( \mathbf{x} \in \mathbb{C}^{2 \times 1} \): user symbols  
  - \( \mathbf{n} \sim \mathcal{CN}(0, \sigma^2 \mathbf{I}) \): AWGN  

### ZF Detection

AP applies:

$$
\mathbf{W}_{ZF} = (\mathbf{H}^H \mathbf{H})^{-1} \mathbf{H}^H
$$

Recovered:

$$
\hat{\mathbf{x}} = \mathbf{W}_{ZF} \mathbf{y} = \mathbf{x} + (\mathbf{H}^H \mathbf{H})^{-1} \mathbf{H}^H \mathbf{n}
$$

Interference-free  
Noise amplified

---

## Downlink ZF Precoding

### System Model

- AP transmits:  
  $$
  \mathbf{s} = \mathbf{W} \mathbf{x}
  $$
- Each user receives:  
  $$
  y_k = \mathbf{h}_k \mathbf{s} + n_k
  $$
  where \( \mathbf{h}_k \) is the row vector for user \( k \)

### ZF Precoding

Design:

$$
\mathbf{W}_{ZF} = \mathbf{H}^H (\mathbf{H} \mathbf{H}^H)^{-1}
$$

Then:

$$
\mathbf{H} \mathbf{W}_{ZF} = \mathbf{I} \Rightarrow y_k = x_k + n_k
$$

Interference-free  
Requires full CSI at AP (CSIT)

---

## 2-User Example

Let:

$$
\mathbf{H} =
\begin{bmatrix}
1 & 1 \\
1 & -1
\end{bmatrix}
$$

Then:

- **Uplink ZF Receiver**:  
  $$
  \mathbf{W}_{ZF}^{\text{UL}} = (\mathbf{H}^H \mathbf{H})^{-1} \mathbf{H}^H = \frac{1}{2}
  \begin{bmatrix}
  1 & 1 \\
  1 & -1
  \end{bmatrix}
  $$

- **Downlink ZF Precoding**:  
  $$
  \mathbf{W}_{ZF}^{\text{DL}} = \mathbf{H}^H (\mathbf{H} \mathbf{H}^H)^{-1} = \frac{1}{2}
  \begin{bmatrix}
  1 & 1 \\
  1 & -1
  \end{bmatrix}
  $$

Same matrix! But different interpretation.

---

## Summary Table

| Feature               | Uplink ZF                  | Downlink ZF                 |
|------------------------|----------------------------|------------------------------|
| Interference removed? | Yes                         |  Yes                       |
| Noise amplified?      | Yes                         | Yes (post equalization)   |
| CSI required at AP?   | (Receive side)              | (Transmit side)           |
| CSIT needed?          | No                          | Yes                       |
| Complexity at AP      | Linear filter (RX)          | Precoding (TX)              |

---

## Conclusion

- **ZF uplink**: separates signals at the receiver (no CSIT needed).
- **ZF downlink**: cancels interference before transmission (needs CSIT).


---
_Last updated: June 06, 2025
