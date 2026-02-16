---
title:  "Bohr-Sommerfeld-Landau-Lifshitz approach to quantize a black hole"
mathjax: true
layout: post
tags: [引力]
image: /assets/figs/DSCF9357.webp
categories: media
---



人们有充足的理由认为引力应当被量子化，然而对引力场方程所作出的各种量子化尝试都遇到了或多或少的疑难。仿照量子化氢原子的早期尝试，一个非常自然的量子化条件要求周期性边界条件$\chi(\phi+2\pi)=\chi(\phi)$。对于一个周期运动（用环路积$\oint$表示）的物理系统，作用量

$$S=\oint{p\mathrm{d}q-\oint{H\mathrm{d}t}} \tag{1}$$  


Bohr-Sommerfeld量子化条件给出

$$\int{p\mathrm{d}q}=2\pi n\hbar \;, n=0,1,2,\cdots \tag{2}$$

实际上是要求把一个完整的环路分为整数份，以保证周期性边界条件。Landau和Lifshitz在此基础上提出基态的存在，

$$\int{p\mathrm{d}q}=2\pi \left(n+\frac{1}{2}\right)\hbar \;, n=0,1,2,\cdots \tag{3}$$

即，当$n=0$时，环路积分并没有消失，还有额外的$\pi\hbar$项。


下面进行一些推广。考虑最简单的Schwarzschild黑洞，其度规由

$$\mathrm{d}s^2=-\left( 1-\frac{2M}{r} \right) \mathrm{d}t^2+\left( 1-\frac{2M}{r} \right) ^{-1}\mathrm{d}r^2+r^2\mathrm{d}\Omega \tag{4}$$

给出。
我们知道，Schd度规并不能很好地描述穿过坐标奇异性$r=2M$的事件，因此做Kruskal延拓，得到

$$\mathrm{d}s^2=\frac{32}{r}M^3e^{-\frac{r}{2M}}\left( -\mathrm{d}v^2+\mathrm{d}u^2 \right) +r^2\mathrm{d}\Omega \tag{5}$$

在事件视界以外，类光坐标$u,v$表示为

$$\begin{cases}
	u=\pm \sqrt{\frac{r}{2M}-1}\times e^{\frac{r}{2M}}\cosh \frac{t}{4M}\\
	v=\pm \sqrt{\frac{r}{2M}-1}\times e^{\frac{r}{2M}}\sinh \frac{t}{4M}\\
\end{cases}\tag{6}$$

立即注意到，Wick转动在欧化作用量的同时，使得

$$\begin{cases}
	\cosh \frac{t}{4M}\xrightarrow{t\equiv -i\tau}\cos \frac{\tau}{4M}\\
	\sinh \frac{t}{4M}\xrightarrow{t\equiv -i\tau}-i\sin \frac{\tau}{4M}\\
\end{cases}\tag{7}$$

欧化的坐标$u,v$变得有周期性，其周期为$\beta\equiv 8\pi M$。这里根据有限温度场论的结论，可以立即得出在事件视界处，黑洞与温度为$T=1/\beta$的黑体辐射处于热平衡态，也就是说Schd.黑洞视界温度为$(8\pi M)^{-1}$。


回到量子化，由于黑洞度规对“广义坐标”$u,v$都具有周期性，欧化的作用量(1)由

$$S_E=\int{p_E\mathrm{d}_q}-M_{\mathrm{ADS}}\beta \tag{9}$$

给出。其中$M_{\mathrm{ADM}}$为Schd.黑洞的Arnowitt-Deser-Misner(ADM)质量。由于我们考虑的黑洞系统为一带边流形，$S_E$实际上由Gibbons-Hawking-York表面项给出：

$$S_E=4\pi M^2 \tag{10}$$

即$\mathbb{Z}=$从而

$$\int{p_E\mathrm{d}q}=12\pi M^2 \tag{11}$$


于是套用Landau-Lifshitz量子化条件，有

$$12\pi M^2=2\pi \left( n+\frac{1}{2} \right) m_{pl}^{2} , \;n=0,1,2\cdots \tag{12}$$

其中Planck质量平方$m^2_{pl}$代替约化Planck常数$\hbar$，是一个自然推广。这样就得到了量子化的Schd.黑洞质量：

$$M=\sqrt{\frac{1}{6}\left( n+\frac{1}{2} \right)}m_{pl} \tag{13}$$

这样就得到Schd.黑洞的理论最小质量为$M_{\mathrm{Schd.,}G}=\frac{1}{2\sqrt{3}}m_{pl}$。正因如此，不少理论认为黑洞不会完全蒸发，会留下一个Planck质量（但熵趋于发散从而在热力学上不大合理）的残留物。

以及通过对$M^2$求微得到

$$\delta M=\frac{1}{12}\frac{m_{pl}^{2}}{M} \tag{14}$$

即为黑洞质量的最小增量，黑洞能增长的质量应当为这一质量的整数倍。对于质量远大于Planck质量的原初黑洞或天体物理黑洞，黑洞质量的增长都应退回经典极限。

同时，量子化的黑洞面积 $A\equiv 16\pi M^2$为

$$A=\frac{8\pi}{3}\left( n+\frac{1}{2} \right) \frac{1}{m_{pl}^{2}} \tag{15}$$

以及

$$\delta A=\frac{8\pi}{3}\frac{1}{m_{pl}^{2}} \tag{16}$$
