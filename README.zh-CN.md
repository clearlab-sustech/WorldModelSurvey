# 从世界模型到世界动作模型：面向机器人学的简明教程

**语言 / Language:** [English](README.md) | 中文

[**Xiaoxiong Zhang**](https://xiaoxiongzzzz.github.io/),
[**Xiong Zeng**](https://zengxiong111.github.io/zengxiong.github.io/) 和
[**Wei Zhang**](https://www.wzhanglab.site/)<br>
南方科技大学；LimX Dynamics

[项目主页](https://clearlab-sustech.github.io/WorldModelSurvey/) |
[arXiv](https://arxiv.org/abs/2607.00836) |
[论文 PDF](https://clearlab-sustech.github.io/WorldModelSurvey/assets/Understanding_World_Models__A_Tutorial_Perspective.pdf) |
[分类体系](https://clearlab-sustech.github.io/WorldModelSurvey/#design-space) |
[资源浏览器](https://clearlab-sustech.github.io/WorldModelSurvey/#resources) |
[引用](https://clearlab-sustech.github.io/WorldModelSurvey/#citation)

本综述以教程视角梳理具身智能中的世界模型。我们围绕三个核心问题组织已有研究：模型预测什么、预测发生在哪个表示空间中，以及如何将预测到的未来与可执行的机器人行为连接起来。

## 概览

世界模型是动作条件下的预测模型，用于描述任务相关的世界要素如何随时间演化。在许多具身任务中，世界只能被部分观测，因此预测目标既可以是未来观测，也可以是未来状态表示。由此形成两类互补的建模方式：

- **观测空间世界模型**直接预测未来观测，例如 RGB 图像、多视角 RGB、RGB-D 帧或点云。我们根据观测显式程度和动作抽象程度来组织这一类方法。
- **状态空间世界模型**先将观测抽象为紧凑状态，再在该状态空间中建模未来演化。典型状态选择包括潜变量状态、点轨迹、神经符号谓词和物理状态。

## 世界动作模型

仅有预测并不足以支撑具身决策：机器人还必须推断哪些动作能够实现想象中的未来。因此，我们进一步讨论 **世界动作模型**，即将视觉未来预测与可执行机器人动作连接起来的模型。

本文将世界动作模型归纳为四种范式：

- **先想象再执行**：先生成视觉未来，再通过逆动力学模型或目标条件策略将其落地为动作。
- **视频特征条件动作预测**：使用视频预测模型的中间特征来条件化动作模型，推理时不需要解码完整的未来视频。
- **联合视频-动作建模**：使用统一的生成模型同时预测未来观测和动作序列。
- **用于策略学习的辅助视频预测**：将未来预测作为训练目标，以塑造更好的策略表示。

![世界动作模型范式分类图](website/assets/wam.png)

## 资源浏览器

配套网站提供了一个与综述分类体系对齐的可筛选论文列表，覆盖观测空间世界模型、状态空间世界模型、世界动作模型，以及相关工作中使用的基础模型和视频模型。

浏览入口：  
https://clearlab-sustech.github.io/WorldModelSurvey/#resources

## 引用

```bibtex
@article{zhang2026worldactionmodels,
  title   = {From World Models to World Action Models: A Concise Tutorial for Robotics},
  author  = {Zhang, Xiaoxiong and Zeng, Xiong and Zhang, Wei},
  year    = {2026},
  note    = {Survey manuscript}
}
```

## 联系

欢迎提出建议、补充遗漏论文、改进分类体系或参与讨论：

```text
12433017@mail.sustech.edu.cn
```
