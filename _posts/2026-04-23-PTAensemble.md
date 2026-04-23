---
title:  "Avegrage on "
tags: [引力, 统计]
image: /assets/figs/2511775127598_.pic.webp
layout: post
categories: media
wide: true
---

<span style="background-color: #d7c6e6; border: 1px solid #8246af; padding: 2px 6px; border-radius: 3px; font-weight: bold;">
We make a comparison between two regimes: Gaussian and non-Gaussian astrophysical SGWB </span>

## Regime comparison
<span style="color: #8246af; font-weight: bold; font-size: 1.2em;"> Gaussian (stochastic background limit) </span>
* **Assumptions:**
    * Isotropy (uniform distribution in Ω)
    * Large number of independent sources per bin $N_I\gg 1$
    * Random, uncorrelated phases

* **Mechanism:**
    * Central Limit Theorem (CLT) → field becomes Gaussian
    * Phase information is statistically erased

* **Practical treatment:**
    * Work directly with 2-point function
    * No explicit sum over sources

* **Result:**
    * Clean emergence of the Hellings–Downs curve

* **Interpretation:**
    * $\vec{\Omega}$-average is effectively equivalent to full ensemble average

<span style="color: #8246af; font-weight: bold; font-size: 1.2em;"> Non-Gaussian / discrete-source regime </span>
* **Assumptions:**
    * Finite number of sources (possibly small $N_{\rm strong}$)
    * Possibly isotropic, but not densely populated
    * Phases not averaged in a fixed realization

* **Mechanism:**
    * CLT does not apply
    * __Coherent__ sum over sources persists

* **Practical treatment:**
    * Must keep explicit sum over sources and phases

* **Result:**
    * Deviations from H–D
    * Higher-point statistics (e.g. skewness, kurtosis) become relevant

* **Interpretation:**
    * $\vec{\Omega}$-average alone is insufficient

## Analytical derivation
Start from the complex amplitude in the $I$-th frequency bin

$$
C_I^a = \sum_i c_{I,i}^a e^{i\Phi_{I,i}}, 
\qquad
c_{I,i}^a = \frac{A_I^i}{2 i \omega_I} R^a_{I,i},    \tag{1}
$$

with $I$: frequency bin, $i$: SMBHB or $\sqrt{-1}$, $a$: pulsar, $A$: amplitude, $R$: response function.

Here, we compute the two point correlation (2PT), as 

$$
\langle C_I^a C_I^{b*} \rangle. \tag{2}
$$

<span style="color: #8246af; font-weight: bold; font-size: 1.2em;"> Standard Gaussian (stochastic background limit) </span>