# Comparison of M-PSK, M-QAM, and M-PAM Modulation Schemes

---

## 1. Key Parameter Relationships

- **Bits per symbol:** \( k = \log_2 M \)
- **Symbol/bit energy:** \( E_s = k E_b \)
- **SNR per bit:** \( \gamma_b = E_b / N_0 \)
- **SNR per symbol:** \( \gamma_s = E_s / N_0 = k \gamma_b \)
- **Spectral efficiency:** \( \eta = k \) bits/s/Hz

---

## 2. General BER Equations (AWGN, Gray Coding)

| Modulation | BER (in \(E_b/N_0\)) |
|------------|-----------------------|
| **M-PSK**  | \( \frac{2}{k} Q\left(\sqrt{2k\gamma_b}\sin\frac{\pi}{M}\right) \) |
| **M-QAM**  | \( \frac{4}{k}\left(1-\frac{1}{\sqrt{M}}\right) Q\left(\sqrt{\frac{3k\gamma_b}{M-1}}\right) \) |
| **M-PAM**  | \( \frac{2(M-1)}{Mk} Q\left(\sqrt{\frac{6k\gamma_b}{M^2-1}}\right) \) |

- \(Q(x)\): Q-function.
- \(k = \log_2 M\), \(\gamma_b = E_b / N_0\).

---

## 3. Side-by-Side Numerical Comparison: QAM vs PSK

| M  | \(k\) | \(E_s/E_b\) | Spectral Efficiency | **M-QAM** (BER in \(E_b/N_0\))                       | **M-PSK** (BER in \(E_b/N_0\))                         |
|----|-------|-------------|--------------------|-----------------------------------------------------|--------------------------------------------------------|
| 2  | 1     | 1           | 1                  | — (not used)                                        | \( Q\left(\sqrt{2\gamma_b}\right) \)                   |
| 4  | 2     | 2           | 2                  | \( Q\left(\sqrt{4\gamma_b}\right) \)                | \( Q\left(\sqrt{4\gamma_b}\right) \)                   |
| 16 | 4     | 4           | 4                  | \( \frac{3}{4} Q\left(\sqrt{12\gamma_b/15}\right) \)| \( \frac{1}{2} Q\left(\sqrt{8\gamma_b}\sin\frac{\pi}{16}\right) \) |

---

### Notes

- For \(M=2,4\): QAM and PSK have identical BER and SNR terms.
- For \(M=16\): QAM is more power-efficient than PSK at the same spectral efficiency.
- As \(M\) increases, PSK becomes less efficient than QAM (needs more SNR for same BER).

---

## 4. Additional Parameter Reference (M-PAM)

| M  | \(k\) | \(E_s/E_b\) | BER (in \(E_b/N_0\))                                        |
|----|-------|-------------|--------------------------------------------------------------|
| 4  | 2     | 2           | \( \frac{3}{4} Q\left(\sqrt{12\gamma_b/15}\right) \)        |
| 16 | 4     | 4           | \( \frac{15}{64} Q\left(\sqrt{24\gamma_b/255}\right) \)     |

---

## 5. Summary

- **Spectral Efficiency:** Identical for given \(M\).
- **Power Efficiency:** QAM \(>\) PSK \(>\) PAM (for same \(M\)).
- **Equation form:** Always use the relationships \( E_s = k E_b \) and \( \gamma_s = k \gamma_b \) for conversions.

---

*For more detail on derivations and constellation effects, see textbooks like Proakis, Goldsmith, or Haykin.*



---
_Last updated: June 06, 2025
