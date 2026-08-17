# From World Models to World Action Models: A Concise Tutorial for Robotics

**Language / 语言:** English | [中文](https://github.com/clearlab-sustech/WorldModelSurvey/blob/main/README.zh-CN.md?plain=1)

[**Xiaoxiong Zhang**](https://xiaoxiongzzzz.github.io/),
[**Xiong Zeng**](https://zengxiong111.github.io/zengxiong.github.io/), and
[**Wei Zhang**](https://www.wzhanglab.site/)<br>
Southern University of Science and Technology; LimX Dynamics

[Website](https://clearlab-sustech.github.io/WorldModelSurvey/) |
[ArXiv](https://arxiv.org/abs/2607.00836) |
[Paper PDF](https://arxiv.org/pdf/2607.00836) |
[Resource Browser](https://clearlab-sustech.github.io/WorldModelSurvey/#resources) |
[Citation](https://clearlab-sustech.github.io/WorldModelSurvey/#citation)

This repository hosts the companion website and curated bibliography for our
concise tutorial on **world models** and **world action models** for robotics.
Rather than aiming to be an exhaustive survey, the tutorial builds a compact
architectural view: what constitutes a world, what a physical AI task asks a
policy to do, how world models predict future world evolution, and how world
action models couple those futures with executable actions.

## Architectural view

A **world** is the set of task-relevant entities, including the robot and its
environment. A **physical AI task** asks a policy to drive the world from an
initial state toward a goal set while satisfying task-specific constraints.

<table>
  <tr>
    <td align="center"><img src="https://clearlab-sustech.github.io/WorldModelSurvey/assets/world.png" alt="Components of a task-specific world" width="260"></td>
    <td align="center"><img src="https://clearlab-sustech.github.io/WorldModelSurvey/assets/two_tasks.png" alt="Physical AI task examples" width="260"></td>
    <td align="center"><img src="https://clearlab-sustech.github.io/WorldModelSurvey/assets/policy_all.png" alt="Policy framework for physical AI tasks" width="260"></td>
  </tr>
  <tr>
    <td align="center">World</td>
    <td align="center">Physical AI tasks</td>
    <td align="center">Policy framework</td>
  </tr>
</table>

## World models and world action models

A **world model** predicts how future observations or states evolve under
candidate actions, typically conditioned on the current observation. A **world
action model** is a policy whose action generation is coupled, during training
or inference, with a model or representation of future world evolution.

<table>
  <tr>
    <td align="center"><img src="https://clearlab-sustech.github.io/WorldModelSurvey/assets/world_model.png" alt="World model input-output view" width="420"></td>
    <td align="center"><img src="https://clearlab-sustech.github.io/WorldModelSurvey/assets/world_action_model.png" alt="World action model input-output view" width="420"></td>
  </tr>
  <tr>
    <td align="center">World model</td>
    <td align="center">World action model</td>
  </tr>
</table>

<p align="center">
  <img src="https://clearlab-sustech.github.io/WorldModelSurvey/assets/world_model_examples.png" alt="Examples of world models" width="840">
</p>

## Design space

We organize world models according to the space in which prediction is
performed:

- **Observation-space world models** directly predict future observations, such
  as RGB images, multi-view RGB, RGB-D frames, or point clouds.
- **State-space world models** first abstract observations into structured
  states, then model future evolution in that state space.

<table>
  <tr>
    <td align="center"><img src="https://clearlab-sustech.github.io/WorldModelSurvey/assets/obsWM.png" alt="Observation-space world model design space" width="420"></td>
    <td align="center"><img src="https://clearlab-sustech.github.io/WorldModelSurvey/assets/stateWM.png" alt="State-space world model design space" width="420"></td>
  </tr>
  <tr>
    <td align="center">Observation-space world models</td>
    <td align="center">State-space world models</td>
  </tr>
</table>

## World action model taxonomy

World action models couple future-oriented visual prediction with physical
decision making. The tutorial groups representative methods into four
paradigms: imagine-then-execute, video-feature-conditioned action prediction,
joint video-action modeling, and auxiliary video prediction for policy learning.

<p align="center">
  <img src="https://clearlab-sustech.github.io/WorldModelSurvey/assets/wam.png" alt="Taxonomy of world action model paradigms" width="840">
</p>

## Resource browser

The companion website includes a filterable paper list aligned with the survey
taxonomy:

https://clearlab-sustech.github.io/WorldModelSurvey/#resources

## Citation

```bibtex
@article{zhang2026worldactionmodels,
  title   = {From World Models to World Action Models: A Concise Tutorial for Robotics},
  author  = {Zhang, Xiaoxiong and Zeng, Xiong and Zhang, Wei},
  year    = {2026},
  note    = {Survey manuscript}
}
```

## Contact

Suggestions, taxonomy improvements, missing papers, and discussion are welcome:

```text
12433017@mail.sustech.edu.cn
```
