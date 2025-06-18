# Shannon Capacity (Shannon Limit)

The **Shannon capacity** is a concept from information theory, introduced by **Claude Shannon** in his 1948 paper *A Mathematical Theory of Communication*. It defines the **maximum rate** at which information can be transmitted over a **communication channel** **without error**, given a certain level of **noise** and **bandwidth**.

---

## Key Formula (for AWGN channel):

---
$$C = B \log_2(1 + \frac{S}{N})$$ (bits per second)

Where:
- `C`: Channel capacity (maximum data rate)
- `B`: Bandwidth of the channel (Hz)
- `S`: Signal power
- `N`: Noise power
- `S/N`: Signal-to-noise ratio (SNR)

---
## Key Insights:
- **Theoretical Limit**: Shannon capacity is the upper bound of reliable communication. It tells us what is possible, not necessarily how to achieve it.
- **Error-Free Communication**: Below this limit, it's theoretically possible to transmit data with an **arbitrarily low error rate** using appropriate coding.
- **Beyond Capacity**: If you try to send data faster than this capacity, errors are inevitable regardless of the coding scheme.
- **Bandwidth vs. Power Trade-off**: Capacity can be increased by increasing either **bandwidth** or **SNR**, showing a trade-off between the two.
---

## Applications:
- Used in **wireless communication**, **data compression**, and **network design**
- Basis for evaluating performance of modern coding techniques like **Turbo Codes**, **LDPC**, and **5G/6G** standards

---



_Last updated: June 06, 2025
