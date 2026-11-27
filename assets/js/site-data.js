/**
 * 站点内容配置文件
 * ------------------------------------------------------------
 * 只需修改本文件中的文字与链接，刷新页面即可生效，无需任何构建步骤。
 */

window.SITE_DATA = {
  // 基本信息
  profile: {
    brand: "jj.",
    pageTitle: "毛嘉俊 (jj) · Agent 全栈开发",
    name: "毛嘉俊",
    initials: "JJ", // 未设置头像图片时显示的极简徽标
    avatarUrl: "", // 如需使用头像，放图片到 ./assets/images/avatar.jpg 并填入路径
    badge: "26届杭电计算机本科 · 专注 Agent 全栈开发",
    headlinePrefix: "你好，我是",
    headlineAccent: "Agent 全栈开发者",
    tagline:
      "也可以叫我 jj。2026 届杭州电子科技大学计算机科学与技术本科毕业生，现居杭州，专注于 AI Agent 应用架构、工具协同与全栈工程落地。",
    location: "中国 · 杭州",
    email: "jiajunmao92@gmail.com",
    resumeUrl: "", // 填入简历链接（如 PDF 或在线链接）即可自动显示“查看简历”按钮
    facts: [
      { label: "昵称 / 姓名", value: "jj · 毛嘉俊" },
      { label: "教育背景", value: "杭州电子科技大学 · 计科 26 届" },
      { label: "专注方向", value: "Agent 全栈开发" },
      { label: "所在城市", value: "杭州", highlight: true },
    ],
  },

  // 社交媒体与外部链接
  socials: [
    {
      label: "GitHub",
      href: "https://github.com/jj22235",
      icon: "github",
    },
    {
      label: "Email",
      href: "mailto:jiajunmao92@gmail.com",
      icon: "mail",
    },
    // {
    //   label: "技术博客",
    //   href: "https://你的博客地址",
    //   icon: "globe",
    // },
  ],

  // 关于我
  about: {
    title: "关于我",
    subtitle: "连接大模型能力与可靠软件工程，构建真正好用的 Agent 产品。",
    paragraphs: [
      "我是毛嘉俊（jj），2026 届杭州电子科技大学计算机科学与技术专业本科毕业生，目前坐标杭州。扎实的计算机基础让我既关注模型编排与智能体范式，也注重系统稳定性、交互体验与工程可维护性。",
      "我专注于 Agent 全栈开发，覆盖从多智能体工作流设计、Tool Calling / MCP 协议集成、上下文与记忆管理，到后端 API 服务以及流式交互前端界面的端到端实现。",
    ],
    highlights: [
      { value: "2026", label: "杭电计科本科" },
      { value: "Agent", label: "智能体工程" },
      { value: "全栈", label: "端到端落地" },
    ],
  },

  // 技能栈分组
  skills: [
    {
      category: "AI Agent 与智能体工程",
      description: "围绕可控、可观测的智能体系统构建任务规划与工具协同能力。",
      items: [
        "Agent Workflow",
        "Tool Calling",
        "MCP 协议集成",
        "Multi-Agent 协同",
        "RAG & 上下文管理",
        "Prompt 工程与评测",
      ],
    },
    {
      category: "后端与系统架构",
      description: "构建高可靠的服务端接口、流式通信链路与数据持久化方案。",
      items: [
        "Python / FastAPI",
        "Node.js / TypeScript",
        "SSE / WebSocket 流式输出",
        "PostgreSQL / Redis",
        "向量检索",
        "Docker",
      ],
    },
    {
      category: "前端交互与工程化",
      description: "打磨清晰的 Agent 交互界面、实时状态反馈与响应式 Web 应用。",
      items: [
        "React / Next.js",
        "HTML5 / CSS3",
        "JavaScript (ES6+)",
        "Tailwind CSS",
        "Git & GitHub Actions",
        "Linux",
      ],
    },
  ],

  // 项目分类（"全部" 置顶，其余与下方 projects 中的 category 对应）
  projectCategories: ["全部", "Agent 应用", "全栈工程", "效率工具"],

  // 精选项目列表（当前为基于你方向的示例占位，可随时替换为你的真实项目与仓库链接）
  projects: [
    {
      id: "agent-workspace",
      title: "多智能体协同工作台（示例占位）",
      category: "Agent 应用",
      year: "2026",
      summary:
        "面向复杂长链路任务的 Multi-Agent 编排与可视化执行平台，支持工具调用追踪、状态持久化与人工介入审批。",
      description:
        "可替换为你的核心 Agent 项目：展示任务拆解、子智能体分工、MCP 工具接入以及前端实时流式轨迹渲染等端到端实现细节。",
      tags: ["Multi-Agent", "MCP", "FastAPI", "React", "SSE"],
      highlights: [
        "支持多角色 Agent 协作、工具调用日志回放与异常重试",
        "前后端通过 SSE 实现思考过程、工具状态与结果的实时流式呈现",
        "（提示：打开 assets/js/site-data.js 替换为你的真实项目介绍与仓库链接）",
      ],
      demoUrl: "",
      repoUrl: "",
      featured: true,
    },
    {
      id: "rag-assistant",
      title: "知识库检索与对话助手（示例占位）",
      category: "全栈工程",
      year: "2026",
      summary:
        "结合混合检索、重排序与引用溯源的领域知识问答系统，兼顾检索准确度与流畅的阅读交互体验。",
      description:
        "可替换为你的 RAG / 全栈实战项目：重点介绍文档切分管线、向量 + 关键词混合召回、流式引用高亮与评测指标优化。",
      tags: ["RAG", "Python", "TypeScript", "Vector DB"],
      highlights: [
        "支持多格式文档解析、分块索引与增量更新",
        "回答支持原文片段溯源定位，降低模型幻觉风险",
        "（提示：打开 assets/js/site-data.js 替换为你的真实项目介绍与仓库链接）",
      ],
      demoUrl: "",
      repoUrl: "",
      featured: true,
    },
    {
      id: "personal-site",
      title: "个人主页 · GitHub Pages",
      category: "效率工具",
      year: "2026",
      summary:
        "零依赖、轻量级的现代极简个人主页，支持明暗主题切换、配置化内容管理与移动端自适应。",
      description:
        "使用原生 HTML、CSS 与 JavaScript 构建并部署在 GitHub Pages，通过单一配置文件管理站点内容，作为个人技术名片与作品展示入口。",
      tags: ["HTML5", "CSS Variables", "Vanilla JS", "GitHub Pages"],
      highlights: [
        "零构建工具依赖，推送至 GitHub 即可自动部署",
        "支持系统主题跟随、手动切换与本地持久化记忆",
        "内置项目分类筛选、详情弹窗与一键复制联系邮箱",
      ],
      demoUrl: "https://maojiajun.site",
      repoUrl: "https://github.com/jj22235/jj22235.github.io",
      featured: false,
    },
  ],

  // 教育与经历时间线
  timeline: [
    {
      period: "2026 — 至今",
      role: "Agent 全栈开发",
      org: "杭州 · 持续探索与工程实践",
      description:
        "聚焦 AI Agent 应用开发与全栈工程化，持续打磨智能体工作流、工具生态集成与人机协同交互体验。",
    },
    {
      period: "2022 — 2026",
      role: "计算机科学与技术 · 本科",
      org: "杭州电子科技大学（HDU）",
      description:
        "系统学习数据结构与算法、操作系统、计算机网络、数据库与软件工程等核心课程，并在校期间深入实践全栈开发与 AI 应用构建。",
    },
  ],

  // 联系区域文案
  contact: {
    title: "欢迎联系我",
    description:
      "无论你是想交流 Agent 全栈技术、探讨项目合作，还是分享工作与开源机会，都欢迎通过邮件联系我。",
  },

  // 页脚
  footer: {
    note: "杭州 · Hosted on GitHub Pages",
  },
};
