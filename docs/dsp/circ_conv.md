**Linear convolution** is a mathematical operation used to combine two signals (e.g., input signal `x[n]` and impulse response `h[n]`) to produce an output signal. It is commonly used in signal processing and is defined as:

$$
y[n] = \sum_{k=0}^{M-1} x[k] \cdot h[n-k]
$$

Where `y[n]` is the output signal.

Linear convolution assumes the signals are finite in length, and however in circular convolution using FFT/DFT, **boundary effects** can occur at the **edges** of the signal.

**Solution to boundary effects**

- Zero Padding
- Cyclic Prefix

for both methods the purpose is to 1)**Avoids edge effects** in convolution, and 2)**Simulates circular convolution** by ensuring that the signal wraps around.

**Zero padding** adds zeros to the **end** of a signal to prevent edge effects in convolution, particularly in **FFT-based methods**. It ensures the signal is long enough so that **circular convolution** yields the same result as **linear convolution**, matching the expected output length \( L + M - 1 \).

**Example**: This example compares **linear** and **circular convolution**, both **with** and **without zero padding**, to highlight the impact of padding on the accuracy of convolution results.


- **Input signal `x[n] = [1, 2, 3]`**
- **Impulse response `h[n] = [0, 1, 0.5]`**

- **Linear Convolution**

<div style="display: flex; justify-content: space-around;">
  <div id="stem-x" style="width: 300px; height: 300px;"></div>
  <div id="stem-h" style="width: 300px; height: 300px;"></div>
  <div id="stem-y" style="width: 300px; height: 300px;"></div>
</div>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script>
function makeStem(id, signal, title) {
  const x = [...Array(signal.length).keys()];
  const stems = x.map((xi, i) => ({
    x: [xi, xi],
    y: [0, signal[i]],
    type: 'scatter',
    mode: 'lines',
    line: { color: 'steelblue', width: 2 },
    showlegend: false
  }));
  const markers = {
    x: x,
    y: signal,
    type: 'scatter',
    mode: 'markers',
    marker: { color: 'red', size: 8 },
    showlegend: false
  };
  Plotly.newPlot(id, [...stems, markers], {
    title,
    xaxis: { title: 'n', zeroline: false },
    yaxis: { title: 'Amplitude', zeroline: true },
    margin: { t: 40 }
  });
}

(function() {
  const x = [1, 2, 3];
  const h = [0, 1, 0.5];
  const yLen = x.length + h.length - 1;
  const y = Array(yLen).fill(0);

  for (let i = 0; i < x.length; i++) {
    for (let j = 0; j < h.length; j++) {
      y[i + j] += x[i] * h[j];
    }
  }

  makeStem('stem-x', x, 'Input x[n]');
  makeStem('stem-h', h, 'Impulse Response h[n]');
  makeStem('stem-y', y, 'Output y[n] = x[n] * h[n]');
})();
</script>

- **Circular Convolution with and without Zero Padding**

<div style="display: flex; justify-content: space-around;">
  <div id="circ-x" style="width: 300px; height: 300px;"></div>
  <div id="circ-h" style="width: 300px; height: 300px;"></div>
  <div id="circ-y" style="width: 300px; height: 300px;"></div>
</div>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>

<script>
function makeStem(id, signal, title) {
  const x = [...Array(signal.length).keys()];
  const stems = x.map((xi, i) => ({
    x: [xi, xi],
    y: [0, signal[i]],
    type: 'scatter',
    mode: 'lines',
    line: { color: 'steelblue', width: 2 },
    showlegend: false
  }));
  const markers = {
    x: x,
    y: signal,
    type: 'scatter',
    mode: 'markers',
    marker: { color: 'red', size: 8 },
    showlegend: false
  };
  Plotly.newPlot(id, [...stems, markers], {
    title: title.replace('\n', '<br>'),  // Use <br> for line break in the title
    xaxis: { title: 'n', zeroline: false },
    yaxis: { title: 'Amplitude', zeroline: true },
    margin: { t: 40 }
  });
}

(function() {
  const x = [1, 2, 3];  // Input signal
  const h = [0, 1, 0.5];  // Impulse response
  
  // Zero padding to make the length 5 (as 3 + 3 - 1 = 5 for linear convolution)
  const xPadded = [...x, ...Array(2).fill(0)];  // Zero pad x[n] with 2 zeros
  const hPadded = [...h, ...Array(2).fill(0)];  // Zero pad h[n] with 2 zeros
  
  // Circular Convolution calculation
  const y = Array(5).fill(0);  // Length of result is 5
  for (let n = 0; n < 5; n++) {
    for (let k = 0; k < 5; k++) {
      y[n] += xPadded[k] * hPadded[(n - k + 5) % 5];  // Wrap around using modulo
    }
  }

  makeStem('circ-x', xPadded, 'Zero Padded\nInput x[n]');
  makeStem('circ-h', hPadded, 'Zero Padded<br>Impulse Response h[n]');
  makeStem('circ-y', y, 'Circular Convolution <br>Output y[n]');
})();
</script>



<div style="display: flex; justify-content: space-around;">
  <div id="x-signal" style="width: 300px; height: 300px;"></div>
  <div id="h-signal" style="width: 300px; height: 300px;"></div>
  <div id="y-signal" style="width: 300px; height: 300px;"></div>
</div>

<script src="https://cdn.plot.ly/plotly-latest.min.js"></script>
<script>
function makeStem(id, signal, title, highlight = []) {
  const x = [...Array(signal.length).keys()];
  const stems = x.map((xi, i) => ({
    x: [xi, xi],
    y: [0, signal[i]],
    type: 'scatter',
    mode: 'lines',
    line: {
      color: highlight.includes(i) ? 'orange' : 'steelblue',
      width: 2
    },
    showlegend: false
  }));
  const markers = {
    x: x,
    y: signal,
    type: 'scatter',
    mode: 'markers',
    marker: {
      color: x.map(i => highlight.includes(i) ? 'orange' : 'red'),
      size: 8
    },
    showlegend: false
  };
  Plotly.newPlot(id, [...stems, markers], {
    title: title,
    xaxis: { title: 'n', zeroline: false },
    yaxis: { title: 'Amplitude', zeroline: true },
    margin: { t: 40 }
  });
}

(function() {
  const x = [1, 2, 3];                // Input signal
  const h = [0.5, 1];                 // Impulse response
  const yLen = x.length + h.length - 1;
  const y = Array(yLen).fill(0);

  // Linear Convolution
  for (let n = 0; n < yLen; n++) {
    for (let k = 0; k < h.length; k++) {
      if (n - k >= 0 && n - k < x.length) {
        y[n] += x[n - k] * h[k];
      }
    }
  }

  const boundary = [0, 1, yLen - 2, yLen - 1]; // Highlight start and end as boundary

  makeStem("x-signal", x, "Input Signal x[n]");
  makeStem("h-signal", h, "Impulse Response<br> h[n]");
  makeStem("y-signal", y, "Linear Convolution <br> y[n] (Boundary highlighted)", boundary);
})();
</script>



### Example:
If you have a signal of length \( N \) and an impulse response of length \( M \), the total length of the output in linear convolution will be \( N + M - 1 \). By zero padding, the signal is extended to the required length, and linear convolution behaves like circular convolution.


## 3. Cyclic Prefix

A **cyclic prefix** is used in communication systems, particularly in **OFDM (Orthogonal Frequency Division Multiplexing)**, to mitigate the effects of **multipath interference** and inter-symbol interference (ISI). It is created by copying a part of the **end** of the signal and placing it at the **beginning**, forming a **periodic** signal.

**Purpose:**

  - To handle **multipath propagation** and **ISI**.
  - To ensure the signal is **periodic** for **circular convolution**.
  - Allows the receiver to treat the signal as **periodic**, eliminating boundary effects and making the signal easier to demodulate.

**How It Works:**

  - The cyclic prefix is added **before each transmitted symbol** in the OFDM system.
  - It extends the signal to allow it to fit into the next transmission symbol period.
  - The prefix helps in **circular convolution**, treating the signal as periodic to avoid interference from delayed signals.

**Example:**
For a signal \( x[n] = [1, 2, 3] \), a cyclic prefix of length 1 would result in the signal:

$$
x_{\text{cp}}[n] = [3, 1, 2, 3]
$$

---


## Comparison of Zero Padding and Cyclic Prefix

| **Feature**              | **Zero Padding**                                     | **Cyclic Prefix**                                     |
|--------------------------|------------------------------------------------------|-------------------------------------------------------|
| **Purpose**              | To avoid edge effects in linear convolution and simulate circular convolution. | To mitigate multipath interference and ensure periodicity in transmission. |
| **Position**             | Zeros are added to the **end** of the signal.        | The **end** of the signal is copied to the **beginning** of the signal. |
| **Circular Convolution** | Helps achieve the periodic nature needed for circular convolution. | Naturally results in circular convolution since the signal is periodic due to the prefix. |
| **Required Length**      | At least `length(x) + length(h) - 1` for linear convolution via FFT. | At least equal to the **maximum delay spread of the channel**. |
| **Application**          | Commonly used in signal processing tasks like FFT-based convolution. | Widely used in communication systems (e.g., OFDM) to prevent inter-symbol interference. |


---

## Summary

- **Linear Convolution** is the basic method of combining signals, but it may have edge effects.
- **Zero Padding** is used in signal processing to extend the signal's length, avoid edge effects, and enable circular convolution.
- **Cyclic Prefix** is a technique used in communication systems (e.g., OFDM) to create a periodic signal that can be handled by circular convolution, ensuring there are no issues with multipath interference and inter-symbol interference.

Both zero padding and cyclic prefixes ensure that the convolution operation can be handled smoothly without unwanted boundary effects, with cyclic prefixes being specifically designed for communication systems to enable periodicity.



---
_Last updated: June 06, 2025
