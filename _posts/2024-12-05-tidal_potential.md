---
title:  "Bohr-Sommerfeld-Landau-Lifshitz approach to quantize a black hole"
mathjax: true
layout: post
categories: media
---

对于真实的天体物理系统，例如星系，其内部密度分布十分复杂。首先，星系中心有超大质量黑洞，稍远点的地方有各种恒星，更大尺度上则有暗物质晕。为了研究在距离$R$处的运动情况，我们需要知道该处引力势，也就是求解Poisson方程
$$\nabla ^2\Phi =4\pi G\rho  \tag{1}$$
本文列举如何使用球谐函数展开的方法求解引力势。

### 1.Laplace方程的球坐标展开
考虑一个薄的球壳。由于球壳的厚度非常薄，在球壳内部与外部的Poisson方程都退化为Laplace方程
$$\nabla ^2\Phi =0  \tag{2}$$
并拥有边界条件：无穷远处渐进平直，球壳内外连续，以及在$r=0$时避免发散。在球坐标系展开Laplace方程，得到
$$\frac{1}{r^2}\frac{\partial}{\partial r}\left( r^2\frac{\partial \Phi}{\partial r} \right) +\frac{1}{r^2\sin \theta}\frac{\partial}{\partial \theta}\left( \sin \theta \frac{\partial \Phi}{\partial \theta} \right) +\frac{1}{r^2\sin ^2\theta}\frac{\partial ^2\Phi}{\partial \phi ^2}=0 \tag{3}$$

### 2.变量分离
这个复杂的偏微分方程可以通过变量分离的方法求解，即假设
$$\Phi \left( r,\theta ,\phi \right) \equiv R\left( r \right) P\left( \theta \right) Q\left( \phi \right)  \tag{4}$$
将(4)代入(3)，得到
$$ \frac{\sin ^2\theta}{R}\frac{\mathrm{d}}{\mathrm{d}r}\left( r^2\frac{\mathrm{d}R}{\mathrm{d}r} \right) +\frac{\sin \theta}{P}\frac{\mathrm{d}}{\mathrm{d}\theta}\left( \sin \theta \frac{\mathrm{d}P}{\mathrm{d}\theta} \right) =-\frac{1}{Q}\frac{\mathrm{d}^2Q}{\mathrm{d}\phi ^2} \tag{5}$$
观察发现(5)右侧仅包含方位角$\phi$，令(5)式左右两边都等于$m^2$，立即得到指数解
$$Q\left( \phi \right) =Q^+\mathrm{e}^{\mathrm{i}m\phi}+Q^-\mathrm{e}^{-\mathrm{i}m\phi} \tag{6}$$
方位角$\phi$要求$Q$满足周期性边界条件，于是$m$只能取整数，进一步整理为
$$Q\left( \phi \right) =Q_m\mathrm{e}^{\mathrm{i}m\phi}, m=0,\pm 1,... \tag{7} $$
__注意到这里的引力场是纯经典场，没有引入任何量子化条件__

(5)式等号左边的$r,\theta$方程则可以进一步分离得到
$$\frac{1}{R}\frac{\mathrm{d}}{\mathrm{d}r}\left( r^2\frac{\mathrm{d}R}{\mathrm{d}r} \right) =\frac{m^2}{\sin ^2\theta}-\frac{1}{P\sin \theta}\frac{\mathrm{d}}{\mathrm{d}\theta}\left( \sin \theta \frac{\mathrm{d}P}{\mathrm{d}\theta} \right)  \tag{8}$$
引入第二个自由参数，使(8)等号两边等于$l(l+1)$，则关于半径$r$和极角$\theta$的方程可以整理为
$$\frac{\mathrm{d}}{\mathrm{d}r}\left( r^2\frac{\mathrm{d}R}{\mathrm{d}r} \right) -l\left( l+1 \right) R=0 \tag{9} $$
$$\frac{\mathrm{d}}{\mathrm{d}x}\left[ \left( 1-x^2 \right) \frac{\mathrm{d}P}{\mathrm{d}x} \right] -\frac{m^2}{1-x^2}P+l\left( l+1 \right) P=0 \tag{10}$$
其中$x\equiv \cos\theta$。

径向方程有两组线性独立的解，为
$$R\left( r \right) =Ar^l, R\left( r \right) =Br^{-\left( l+1 \right)}  \tag{11} $$
而极角方程的解由连带勒让德函数(associated Legendre function) $P_l^m(x)$所给出。这套操作在量子力学里面已经很熟悉了，接下来我们定义球谐函数
$$Y_{lm}\left( \theta ,\phi \right) \equiv P_{l}^{m}\left( \cos \theta \right) \mathrm{e}^{\mathrm{i}m\phi} \tag{12}$$
同样，球谐函数要求$l$是整数，并且$\left|m\right|\le l$。这样，球壳所产生的引力势球谐函数展开则为
$$\Phi _{lm}\left( r,\Omega \right) =\left[ A_{lm}r^l+B_{lm}r^{-\left( l+1 \right)} \right] Y_{lm}\left( \Omega \right) \tag{13} $$
其中$l\ge0, -l\le m\le l$。

### 3.边界条件
对于球壳内部与外部引力势解，球谐函数分别为
$$\Phi _{\mathrm{in}}\left( r,\Omega \right) =\sum_{l,m}{\left[ A_{lm}r^l+B_{lm}r^{-\left( l+1 \right)} \right] Y_{lm}\left( \Omega \right) , r<a}
\\
\Phi _{\mathrm{ex}}\left( r,\Omega \right) =\sum_{l,m}{\left[ C_{lm}r^l+D_{lm}r^{-\left( l+1 \right)} \right] Y_{lm}\left( \Omega \right) , r\ge a} \tag{14}$$
无穷远处，渐进平直的引力势需要为0，从而对于所有的$l,m$，$C_{lm}=0$。同样，在$r=0$处，引力势有限，从而$B_{lm}=0$。由连续性条件，在$r=a$处，有
$$\sum_{l,m}{\left[ A_{lm}a^l \right] Y_{lm}\left( \Omega \right) =}\sum_{l,m}{\left[ D_{lm}a^{-\left( l+1 \right)} \right] Y_{lm}\left( \Omega \right)} \tag{15} $$
由于不同$l,m$的球谐函数相互正交，立即得到
$$D_{lm}=A_{lm}a^{2l+1} \tag{16}$$

### 4.确定各项系数
非常薄的球壳可以定义面密度，由高斯定理，有
$$\left. \frac{\partial \Phi _{\mathrm{ex}}}{\partial r} \right|_{r=a}-\left. \frac{\partial \Phi _{\mathrm{in}}}{\partial r} \right|_{r=a}=4\pi G\sigma _{\Omega} \tag{17}$$
将球谐函数展开式带入，得到
$$-\sum_{l,m}{\left[ \left( l+1 \right) D_{lm}a^{-\left( l+2 \right)}+lA_{lm}a^{l-1} \right] Y_{lm}\left( \Omega \right)}=4\pi G\sum_{l,m}{\sigma _{lm}Y_{lm}\left( \Omega \right)} \tag{18}$$
同样，对于每一项，有
$$A_{lm}=-4\pi Ga^{-\left( l-1 \right)}\frac{\sigma _{lm}}{2l+1}
\\[1em]
D_{lm}=-4\pi Ga^{l+2}\frac{\sigma _{lm}}{2l+1} \tag{19}$$
把系数$A, D$带入引力势(14)，得到
$$\Phi _{\mathrm{in}}\left( r,\Omega \right) =-4\pi Ga\sum_{l,m}{\left( \frac{r}{a} \right) ^l\frac{\sigma _{lm}}{2l+1}Y_{lm}\left( \Omega \right)}
\\
\Phi _{\mathrm{ex}}\left( r,\Omega \right) =-4\pi Ga\sum_{l,m}{\left( \frac{a}{r} \right) ^{l+1}\frac{\sigma _{lm}}{2l+1}Y_{lm}\left( \Omega \right) ,r\ge a} \tag{20}$$

### 5.对整个球积分
对于夹在半径$a$到$a+\delta a$之间的薄壳层，有
$$\delta \sigma _{lm}\left( a \right) =\int_0^{\pi}{\mathrm{d}\theta}\sin \theta \int_0^{2\pi}{\mathrm{d}\phi}\,\,Y_{lm}\left( \Omega \right) \rho \left( a,\Omega \right) \delta a\equiv \rho _{lm}\left( a \right) \delta a \tag{21} $$
得到最终表达式
$$\Phi \left( r,\Omega \right) =-4\pi G\sum_{l,m}{\frac{1}{2l+1}Y_{lm}\left( \Omega \right) \left\{ \frac{1}{r^{l+1}}\int_0^r{\mathrm{d}a}\,\,a^{l+2}\rho _{lm}\left( a \right) +r^l\int_r^{\infty}{\frac{\mathrm{d}a}{a^{l-1}}\rho _{lm}\left( a \right)} \right\}} \tag{22}$$

### 6.对双星系统
对于双星系统，对于位于壳层内的伴星$M_2$，考虑伴星尺寸与壳层厚度相当，球谐展开得到
$$m_{lm}\left( a_i \right) \approx \sum_{a_i-\delta a<r_i\le a_i+\delta a}{M_i Y_{lm}^{*}\left( \theta_i ,\phi_i \right)} \tag{23}$$
对于$M_2\ll M_1$的情况，可以用等效单体系统描述，其中主星质量为$M$，伴星为$\mu$，$\{r_1,\theta_1,\phi_1\}=\boldsymbol{0}$，$\{r_2,\theta_2,\phi_2\}=\{r,\theta,\phi\}$。