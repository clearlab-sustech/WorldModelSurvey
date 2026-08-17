(function () {
  const resourceGrid = document.getElementById("resource-grid");
  const resourceDataElement = document.getElementById("resource-data");
  const languageToggle = document.getElementById("language-toggle");
  let currentLanguage = "en";
  let resourceCards = [];

  const zhText = {
    "title": "从世界模型到世界动作模型：面向机器人学的简明教程",
    ".brand span:last-child": "世界（动作）模型",
    ".site-nav a[href='#overview']": "概览",
    ".site-nav a[href='#introduction']": "引言",
    ".site-nav a[href='#design-space']": "设计空间",
    ".site-nav a[href='#world-action-models']": "WAM",
    ".site-nav a[href='#resources']": "资源",
    ".site-nav a[href='#citation']": "引用",
    "#overview .eyebrow": "综述与教程地图",
    "#hero-title": "从世界模型到世界动作模型：面向机器人学的简明教程",
    ".edited-date": "编辑日期：2026 年 8 月 17 日",
    ".subtitle": "本教程从任务特定世界和物理 AI 策略出发，逐步介绍预测式世界模型，并进一步讨论如何将想象出的未来与可执行机器人动作耦合起来。",
    ".authors p:last-child": "南方科技大学；LimX Dynamics",
    "#introduction .section-heading .eyebrow": "架构视角",
    "#introduction-title": "📘 引言",
    "#introduction .section-heading p:not(.eyebrow)": "预测世界如何在动作下演化，是物理 AI 和生成式仿真的核心问题。统一的架构能够说明模型表示什么、预测什么，以及这些预测如何支持控制器设计、规划、决策和策略学习。",
    ".introduction-block:nth-child(1) h3": "世界",
    ".introduction-block:nth-child(1) .introduction-copy p": "<em>世界</em>是任务相关实体的集合，包括<em>机器人</em>及其<em>环境</em>。环境中既包括<em>感兴趣对象</em>，也包括周围环境。",
    ".introduction-block:nth-child(1) figcaption": "图 1. 任务特定世界的组成部分。",
    ".introduction-block:nth-child(2) h3": "物理 AI 任务与策略",
    ".introduction-block:nth-child(2) .introduction-copy p:nth-of-type(1)": "<em>世界状态</em>是机器人、对象、其他智能体以及周围环境的联合任务相关状态。物理 AI 任务要求策略在满足任务约束的同时，将世界从初始状态驱动到目标集合。",
    ".introduction-block:nth-child(2) .introduction-copy p:nth-of-type(2)": "自动驾驶任务包含车辆、交通参与者和道路环境；机器人桌面清洁任务包含机器人、餐具、抹布、桌面以及家庭周围环境。",
    ".policy-row h4": "物理 AI 任务的策略框架",
    ".policy-row p": "策略将人类意图 <var>I</var> 和当前观测 <var>o<sub>t</sub></var> 映射为机器人动作 <var>a<sub>t</sub></var>。它可以由模块化的决策-规划-控制流水线、快慢系统架构，或端到端策略实现。",
    ".policy-row figcaption": "图 3. 用于完成物理 AI 任务的策略框架。",
    ".introduction-block:nth-child(2) > figure figcaption": "图 2. 物理 AI 任务：自动驾驶和机器人桌面清洁。",
    ".introduction-block:nth-child(3) h3": "世界模型与世界动作模型",
    ".introduction-block:nth-child(3) .introduction-copy p:nth-of-type(1)": "对于给定世界，<em>世界模型</em>预测未来观测 <var>o<sub>t+1</sub></var> 或状态 <var>x<sub>t+1</sub></var> 如何在动作 <var>a<sub>t</sub></var> 下演化，通常以当前观测 <var>o<sub>t</sub></var> 为条件。",
    ".introduction-block:nth-child(3) .introduction-copy p:nth-of-type(2)": "该模型可以是符号动力学方程、神经动力学模型，或基于扩散的视频预测器。观测可以是 RGB 或 RGB-D 图像、点云或本体状态；预测状态可以是物体位姿、关键点、潜变量状态，或其他任务相关变量。",
    ".introduction-block:nth-child(3) > figure:nth-of-type(1) figcaption": "图 4. 世界（动作）模型。",
    ".introduction-block:nth-child(3) > figure:nth-of-type(2) figcaption": "图 5. 世界模型示例。",
    ".wam-callout .eyebrow": "从预测到动作",
    ".wam-callout h4": "世界动作模型",
    ".wam-callout p:not(.eyebrow)": "<em>世界动作模型</em>是一类策略，其动作生成在训练或推理阶段与未来世界演化的模型或表示相耦合。这种耦合可以是显式的、潜在的、联合的或辅助的。",
    ".wam-callout .text-link": "查看四类 WAM 范式 →",
    "#design-space .section-heading .eyebrow": "预测建模选择",
    "#design-title": "🧭 世界模型设计空间",
    "#design-space .section-heading p:not(.eyebrow)": "我们首先根据预测发生的空间，将世界模型分为两种形式：观测空间世界模型和状态空间世界模型。",
    ".taxonomy-intro article:nth-child(1) h3": "🔮 观测空间世界模型",
    ".taxonomy-intro article:nth-child(1) p": "这类模型直接预测未来观测，例如 RGB 图像、RGB-D 帧或点云。",
    ".taxonomy-intro article:nth-child(2) h3": "🧩 状态空间世界模型",
    ".taxonomy-intro article:nth-child(2) p": "这类模型首先将观测抽象为状态表示，然后预测该状态如何演化。",
    ".design-feature:nth-child(1) .taxonomy-title": "🔮 观测空间世界模型",
    ".design-feature:nth-child(1) .taxonomy-caption": "分类标准：观测显式性与动作抽象程度。",
    ".design-feature:nth-child(1) .taxonomy-subheading p:not(.taxonomy-caption)": "对于观测空间世界模型，我们根据模型生成何种未来观测，以及条件动作如何表示，对已有方法进行分类。这形成了一个双轴设计空间。",
    ".design-feature:nth-child(1) figcaption": "图 6. 观测空间世界模型设计空间。",
    ".design-feature:nth-child(2) .taxonomy-title": "🧩 状态空间世界模型",
    ".design-feature:nth-child(2) .taxonomy-caption": "分类标准：用于预测的状态表示。",
    ".design-feature:nth-child(2) .taxonomy-subheading p:not(.taxonomy-caption)": "对于状态空间世界模型，我们根据用于中介预测过程的状态表示来分类。关键问题是：在进行动力学建模之前，模型从观测中保留了哪些信息？",
    ".design-feature:nth-child(2) figcaption": "图 7. 状态空间世界模型设计空间。",
    "#world-action-models .section-heading .eyebrow": "从未来预测到动作",
    "#wam-title": "🤖 世界动作模型",
    "#world-action-models .section-heading p:not(.eyebrow)": "世界动作模型连接面向未来的视觉预测与物理决策。现有工作的差异主要在于：它们如何显式表示未来观测，以及这些未来与动作生成耦合得有多紧密。",
    "#world-action-models figcaption": "图 8. 世界动作模型分类体系。",
    ".paradigm-card:nth-child(1) .tag": "显式规划",
    ".paradigm-card:nth-child(1) h3": "Imagine-then-execute：先想象，再执行",
    ".paradigm-card:nth-child(1) p": "首先生成视觉子目标或未来 rollout，然后使用逆动力学、位姿估计、光流或目标条件策略来生成可执行动作。",
    ".paradigm-card:nth-child(2) .tag": "特征迁移",
    ".paradigm-card:nth-child(2) h3": "视频特征条件动作预测",
    ".paradigm-card:nth-child(2) p": "复用视频预测骨干网络中的内部表示，而不需要在推理时解码完整的未来帧。",
    ".paradigm-card:nth-child(3) .tag": "统一模型",
    ".paradigm-card:nth-child(3) h3": "视频与动作联合建模",
    ".paradigm-card:nth-child(3) p": "学习未来观测与对应机器人动作序列之间的共享生成分布。",
    ".paradigm-card:nth-child(4) .tag": "训练信号",
    ".paradigm-card:nth-child(4) h3": "用于策略学习的辅助视频预测",
    ".paradigm-card:nth-child(4) p": "将未来预测作为辅助目标来塑造策略表征，并在部署阶段移除视频分支。",
    "#resources .section-heading .eyebrow": "综述参考文献",
    "#resources-title": "📚 资源浏览器",
    "#resources .section-heading p:not(.eyebrow)": "资源浏览器覆盖综述中的去重参考文献，并遵循论文中的分类体系。当一些工作同时出现在世界模型和世界动作模型部分时，它们会被交叉列出。",
    "#contact .eyebrow": "反馈与更新",
    "#contact-title": "💬 参与完善本综述",
    ".contact-panel p:not(.eyebrow)": "如果你有建议、分类体系改进想法、希望补充的工作，或想讨论世界模型与世界动作模型，欢迎联系我们。",
    "#citation .eyebrow": "引用本综述",
    "#citation-title": "✍️ 引用",
    "#citation .section-heading p:not(.eyebrow)": "当前论文由本地 LaTeX 源文件和编译后的 PDF 表示。随着稿件更新，可在此处更新会议与出版信息。",
    "#copy-bibtex": "复制 BibTeX",
    ".site-footer p": "由本地综述源文件构建。图片和 PDF 已镜像到 <code>website/assets/</code> 以支持静态托管。"
  };

  const filterLabels = {
    all: "全部",
    "observation-space": "观测空间",
    rgb: "RGB",
    "multi-view-rgb": "多视角 RGB",
    "rgb-d": "RGB-D",
    "point-cloud": "点云",
    "state-space": "状态空间",
    "latent-state": "潜变量状态",
    "point-track": "点轨迹",
    "neural-symbolic": "神经符号",
    "physical-state": "物理状态",
    wam: "世界动作模型",
    "imagine-execute": "先想象再执行",
    "video-feature": "视频特征",
    "joint-video-action": "视频-动作联合",
    "auxiliary-video": "辅助视频",
    "foundation-video": "基础/视频模型"
  };

  const tagLabels = {
    "Observation-space": "观测空间",
    "State-space": "状态空间",
    "Point cloud": "点云",
    "Multi-view RGB": "多视角 RGB",
    "Latent state": "潜变量状态",
    "Point track": "点轨迹",
    "Neural-symbolic": "神经符号",
    "Physical state": "物理状态",
    "World action model": "世界动作模型",
    "Imagine-then-execute": "先想象再执行",
    "Video-feature": "视频特征",
    "Joint video-action": "视频-动作联合",
    "Auxiliary video": "辅助视频",
    "Foundation/video": "基础/视频模型"
  };

  const originalHtml = new Map();

  function getSavedLanguage() {
    try {
      return window.localStorage ? window.localStorage.getItem("wm-language") : null;
    } catch (error) {
      return null;
    }
  }

  function saveLanguage(language) {
    try {
      if (window.localStorage) {
        window.localStorage.setItem("wm-language", language);
      }
    } catch (error) {
      // Ignore storage failures in local file previews or restricted browsers.
    }
  }

  function rememberOriginal(selector) {
    document.querySelectorAll(selector).forEach((element) => {
      if (!originalHtml.has(element)) {
        originalHtml.set(element, element.innerHTML);
      }
    });
  }

  function escapeHtml(value) {
    return String(value)
      .replace(/&/g, "&amp;")
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;");
  }

  function renderResource(resource) {
    const href = resource.url || (resource.eprint ? `https://arxiv.org/abs/${resource.eprint}` : "");
    const title = href
      ? `<a href="${escapeHtml(href)}">${escapeHtml(resource.title)}</a>`
      : escapeHtml(resource.title);
    const groups = resource.groups.join(" ");
    const tags = resource.tags
      .map((tag) => {
        const label = currentLanguage === "zh" ? tagLabels[tag] || tag : tag;
        return `<span class="resource-type">${escapeHtml(label)}</span>`;
      })
      .join("");

    return `
      <article class="resource-card" data-category="${escapeHtml(groups)}">
        <div class="resource-main">
          <span class="resource-year">${escapeHtml(resource.year || "n.d.")}</span>
          <h3>${title}</h3>
        </div>
        <div class="resource-tags">${tags}</div>
      </article>
    `;
  }

  function applyResourceFilter(filter) {
    resourceCards.forEach((card) => {
      const categories = (card.dataset.category || "").split(/\s+/);
      const show = filter === "all" || categories.includes(filter);
      card.classList.toggle("hidden", !show);
    });
  }

  function renderResources() {
    if (!resourceGrid || !resourceDataElement) return;

    try {
      const resources = JSON.parse(resourceDataElement.textContent);
      resourceGrid.innerHTML = resources.map(renderResource).join("");
    } catch (error) {
      const message = currentLanguage === "zh" ? "无法加载资源。" : "Unable to load resources.";
      resourceGrid.innerHTML = `<p class="resource-error">${message}</p>`;
    }

    resourceCards = Array.from(document.querySelectorAll(".resource-card"));
    const activeFilter = document.querySelector(".filter-button.active")?.dataset.filter || "all";
    applyResourceFilter(activeFilter);
  }

  const filterButtons = Array.from(document.querySelectorAll(".filter-button"));

  filterButtons.forEach((button) => {
    button.dataset.enLabel = button.textContent;

    button.addEventListener("click", () => {
      const filter = button.dataset.filter;

      filterButtons.forEach((item) => item.classList.toggle("active", item === button));
      applyResourceFilter(filter);
    });
  });

  const copyButton = document.getElementById("copy-bibtex");
  const bibtex = document.getElementById("bibtex");

  function copyLabel() {
    return currentLanguage === "zh" ? "复制 BibTeX" : "Copy BibTeX";
  }

  function setCopyState(text) {
    if (!copyButton) return;
    copyButton.textContent = text;
    window.setTimeout(() => {
      copyButton.textContent = copyLabel();
    }, 1800);
  }

  function fallbackCopy(text) {
    const textarea = document.createElement("textarea");
    textarea.value = text;
    textarea.setAttribute("readonly", "");
    textarea.style.position = "fixed";
    textarea.style.left = "-9999px";
    document.body.appendChild(textarea);
    textarea.select();
    try {
      document.execCommand("copy");
      setCopyState(currentLanguage === "zh" ? "已复制" : "Copied");
    } catch (error) {
      setCopyState(currentLanguage === "zh" ? "请选择文本" : "Select text");
    } finally {
      document.body.removeChild(textarea);
    }
  }

  if (copyButton && bibtex) {
    copyButton.addEventListener("click", () => {
      const text = bibtex.textContent.trim();
      if (navigator.clipboard && window.isSecureContext) {
        navigator.clipboard
          .writeText(text)
          .then(() => setCopyState(currentLanguage === "zh" ? "已复制" : "Copied"))
          .catch(() => fallbackCopy(text));
      } else {
        fallbackCopy(text);
      }
    });
  }

  function translateStaticContent(language) {
    Object.keys(zhText).forEach((selector) => {
      if (selector === "title") {
        document.title =
          language === "zh"
            ? zhText.title
            : "From World Models to World Action Models: A Concise Tutorial for Robotics";
        return;
      }

      rememberOriginal(selector);
      document.querySelectorAll(selector).forEach((element) => {
        element.innerHTML = language === "zh" ? zhText[selector] : originalHtml.get(element);
      });
    });

    filterButtons.forEach((button) => {
      button.textContent =
        language === "zh" ? filterLabels[button.dataset.filter] || button.dataset.enLabel : button.dataset.enLabel;
    });

    if (languageToggle) {
      languageToggle.textContent = language === "zh" ? "EN" : "中文";
      languageToggle.setAttribute("aria-pressed", language === "zh" ? "true" : "false");
      languageToggle.setAttribute("aria-label", language === "zh" ? "Switch to English" : "切换到中文");
    }

    document.documentElement.lang = language === "zh" ? "zh-CN" : "en";
  }

  function applyLanguage(language) {
    currentLanguage = language;
    translateStaticContent(language);
    renderResources();
    saveLanguage(language);
  }

  if (languageToggle) {
    languageToggle.addEventListener("click", () => {
      applyLanguage(currentLanguage === "zh" ? "en" : "zh");
    });
  }

  currentLanguage = getSavedLanguage() === "zh" ? "zh" : "en";
  applyLanguage(currentLanguage);

  const navLinks = Array.from(document.querySelectorAll(".site-nav a"));
  const sections = navLinks
    .map((link) => document.querySelector(link.getAttribute("href")))
    .filter(Boolean);

  if ("IntersectionObserver" in window && sections.length) {
    const observer = new IntersectionObserver(
      (entries) => {
        const visible = entries
          .filter((entry) => entry.isIntersecting)
          .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

        if (!visible) return;

        navLinks.forEach((link) => {
          link.classList.toggle("active", link.getAttribute("href") === `#${visible.target.id}`);
        });
      },
      {
        rootMargin: "-18% 0px -64% 0px",
        threshold: [0.05, 0.2, 0.5],
      }
    );

    sections.forEach((section) => observer.observe(section));
  }
})();
