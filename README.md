<p align="center">
  简体中文 | <a href="./README-EN.md">English</a>
</p>

# Superpowers Lite

一个面向编码 Agent 的轻量级工程工作流。

Superpowers Lite 保留了结构化 Agent 工程开发中真正有价值的部分——头脑风暴、规格定义、实现规划、调试、测试和验证——同时避免强迫每个编码任务都经过同一套重型流程。

核心思想很简单：

> **使用能够保持信心的最轻量工作流。**

Superpowers Lite 面向日常编码工作而设计，让强模型保留工程判断力，而不是被迫执行不必要的流程仪式。

## 为什么需要它？

结构化工作流很有价值。它能帮助 Agent 在修改代码前先思考、澄清模糊需求、通过测试保护行为，并在宣布成功前验证结果。

但在以下情况下，工作流反而会成为负担：

- 修正一个拼写错误也需要设计阶段；
- 每个功能都必须同时编写 Spec 和 Plan；
- 每个 Bug 都必须执行完整的根因分析仪式；
- 每个任务都被拆成细小的机械步骤；
- 仅仅因为存在 sub-agent 就使用它；
- 每次修改都要求 worktree、review、commit 和 approval gate；
- 规划成本高于实现成本。

Superpowers Lite 采用不同的方式：

> **工作流服务于任务，而不是让任务服务于工作流。**

## 心智模型

Superpowers Lite 会做出两个相互独立的判断：

1. **这个任务需要多深的工作流？**
2. **这项工作应该如何执行？**

```text
                         Coding Request
                               │
                               ▼
                           using-lite
                               │
               ┌───────────────┴───────────────┐
               │                               │
        Workflow Depth                  Execution Mode
               │                               │
     SIMPLE / STANDARD / COMPLEX    INLINE / DELEGATED / MIXED
               │                               │
               └───────────────┬───────────────┘
                               │
                    select only useful phases
                               │
      ┌────────────────┬────────────────┬────────────────┬────────────────┐
      │                │                │                │
    design        behavior/contracts   failure cause    implementation
 uncertainty?          unclear?          unclear?       needs organizing?
      │                │                │                │
      ▼                ▼                ▼                ▼
lite-brainstorming lite-writing-specs lite-debugging lite-writing-plans
      │                │                │                │
      └────────────────┴────────────────┴────────────────┘
                               │
                               ▼
                         implementation
                               │
                               ▼
                          lite-testing
                     meaningful tests/checks
                               │
                               ▼
                       lite-verification
                               │
                               ▼
                    supported completion claim
```

这是一张关系图，**不是强制执行的流水线**。

任何不能显著提升信心的阶段都可以跳过。

## 安装

Superpowers Lite 以 Skills-only 插件形式分发，同时支持 Codex、Claude Code、Kimi Code 和 Qoder。四个平台共用同一套 `SKILL.md`，并分别使用各自的插件清单。

### Codex

将仓库添加为插件 marketplace：

```bash
codex plugin marketplace add lightless233/superpowers-lite --ref master
```

然后安装插件：

```bash
codex plugin add superpowers-lite@lightless233-plugins
```

安装后启动新的 Codex session，使已安装的 Skills 能够进入新上下文。

### Claude Code

在 Claude Code 中添加 marketplace：

```text
/plugin marketplace add lightless233/superpowers-lite
```

然后安装插件：

```text
/plugin install superpowers-lite@lightless233-plugins
```

安装后启动新的 Claude Code session，或运行 `/reload-plugins` 重新加载插件。

### Kimi Code

在 Kimi Code 中直接从 GitHub 安装：

```text
/plugins install https://github.com/lightless233/superpowers-lite
```

安装后运行 `/reload` 或 `/new`。`using-lite` 会在 session 开始时加载，其他 Skills 按需加载。

### Qoder

克隆仓库后，在 Qoder IDE 的插件页选择 **Create Plugin → Import from local folder**，导入：

```text
plugins/superpowers-lite
```

使用 Qoder CLI 或 Agent SDK 调试时，将同一目录作为本地 plugin 传入；CLI 对应的参数是：

```bash
qodercli --plugin-dir ./plugins/superpowers-lite
```

正常使用时，你不需要手动调用每一个 Skill。`superpowers-lite:using-lite` 会作为 Router，只选择能够增加价值的阶段。

你仍然可以在需要时通过命名空间显式调用单个 Skill。Codex 使用 `$` 前缀：

```text
$superpowers-lite:using-lite
$superpowers-lite:lite-debugging
```

Claude Code 使用 `/` 前缀：

```text
/superpowers-lite:using-lite
/superpowers-lite:lite-debugging
```

Kimi Code 通过 Skill 命令调用：

```text
/skill:using-lite
/skill:lite-debugging
```

Qoder 中的插件 Skill 使用插件限定名：

```text
/superpowers-lite:using-lite
/superpowers-lite:lite-debugging
```

## Skills

| Skill | 职责 |
|---|---|
| `using-lite` | 选择有价值的工作流阶段和执行模式 |
| `lite-brainstorming` | 解决影响重大的设计不确定性 |
| `lite-writing-specs` | 定义必要行为和契约 |
| `lite-writing-plans` | 组织已经确定的实现工作 |
| `lite-debugging` | 在选择修复方案前调查不明确的根因 |
| `lite-testing` | 选择并运行有意义的行为测试或检查 |
| `lite-verification` | 判断哪些新鲜证据足以支持完成声明 |

### `using-lite`

整个工作流的轻量 Router。

它将工作大致分类为：

```text
SIMPLE
STANDARD
COMPLEX / AMBIGUOUS
```

并独立选择执行模式：

```text
INLINE
DELEGATED
MIXED
```

复杂度决定工作流深度。

执行模式决定规划粒度。

复杂任务并不自动需要 sub-agent；当任务边界清晰时，STANDARD 任务也可能从 delegation 中获益。

### `lite-brainstorming`

仅在确实存在影响重大的决策时使用。

它负责解决以下实质性不确定性：

- 架构选择；
- 子系统边界；
- 重要的需求歧义；
- 存在真实权衡的竞争方案。

当现有项目模式已经适用时，它不会为了形式强制制造多个备选方案。

当实验是解决设计问题最便宜、可靠的方式时，它也允许使用小型、可丢弃的 probe。

### `lite-writing-specs`

定义**系统必须做什么**。

一份轻量 Spec 可以描述：

- 必要行为；
- 外部可见契约；
- 边界；
- 重要边界情况；
- 非目标；
- 验收标准。

它不会规定 private helper、内部文件布局或实现细节。

进入 Spec 阶段并不意味着必须创建 Spec 文件。

### `lite-writing-plans`

定义**如何组织已经确定的实现工作**。

规划粒度会根据执行模式调整。

对于 Inline 执行，通常只需要：

```text
方向
+ 边界
+ 依赖
+ 验证预期
```

对于 Delegated 工作：

```text
一个独立任务
→ 简短且自包含的 Brief

多个需要协调的任务
→ High-Level Plan
→ Just-in-Time Detailed Task Briefs
```

在前序工作尚未产出真实接口之前，不会预先把未来 delegated task 写成函数级规格。

> **全局规划，按需即时定义 delegated task。**

### `lite-debugging`

仅在故障根因确实不明确时使用。

它不会因为任务被标记为 Bug 就自动触发。

目标是减少不确定性：

```text
描述故障
→ 复现或收集证据
→ 定位偏差
→ 在需要时检验具体假设
→ 建立证据充分的原因解释
```

如果原因已经清楚，则跳过 Debugging。

> **不要叠加猜测性的修复。**

### `lite-testing`

保护行为，但不把 TDD 变成仪式。

一般倾向如下：

```text
可复现的 Bug
→ 强烈倾向先写回归测试

隔离且确定性的逻辑
→ 在有价值时优先 test-first

测试保护不足的重构
→ characterization tests

Glue / 配置 / 集成接线
→ 使用有意义的集成或运行时检查
```

任务可能需要测试，但不一定需要调用 `lite-testing` Skill。

测试应该在有意义的行为被破坏时失败，而不是仅仅因为内部实现发生变化。

### `lite-verification`

防止缺乏证据支持的完成声明。

它的核心规则是：

> **声明的范围不能超过证据的范围。**

例如：

```text
一个聚焦的回归测试通过
≠
项目的全部测试通过
```

结构性声明可以由文件检查或搜索等结构性证据支持。

行为声明需要测试、构建、运行时检查或复现等行为证据。

Verification 应足以支持声明，而不是默认追求最大范围。

## 工作流示例

### 微小修改

```text
“将默认 timeout 从 10 改为 20。”

SIMPLE
→ 修改
→ 明确的配置检查
→ Verification
```

不需要 Brainstorm，不需要 Spec，也不需要 Plan。

### 清晰的多步骤功能

```text
“为多个现有 CLI command 增加一致的 JSON 输出。”

STANDARD
→ 在有价值时使用轻量 Spec 和/或 Plan
→ 实现
→ 有意义的测试
→ Verification
```

### 架构存在歧义

```text
“增加权限系统，但尚未决定使用 RBAC 还是 ABAC。”

COMPLEX / AMBIGUOUS
→ Brainstorming
→ Spec
→ 在有价值时使用 Plan
→ 实现
→ Testing
→ Verification
```

### 原因明确的 Bug

```text
“空输入触发了一个明显的 nil dereference。”

SIMPLE
→ 直接修复
→ 聚焦的回归保护
→ Verification
```

不需要 Debugging 仪式。

### 原因不明确的 Bug

```text
“路由更新偶尔重复，来源未知。”

→ lite-debugging
→ 确定原因
→ 实现
→ 回归保护
→ Verification
```

### 复杂但高度耦合

```text
“重构一个需要持续架构判断的高度耦合状态机。”

COMPLEX
+
INLINE
```

复杂度本身并不意味着需要 delegation。

### 标准但适合 Delegated

```text
“在一个已经稳定的接口后实现五个相互独立的 decoder。”

STANDARD
+
DELEGATED
```

即使任务整体在架构上并不复杂，清晰的边界仍可能让 delegation 带来价值。

## Inline 与 Delegated Planning

Superpowers Lite 会有意地为 Inline 和 Delegated 执行提供不同的规划粒度。

### Inline

实现模型已经拥有周边上下文。

优先描述：

```text
要修改什么
为什么修改
重要边界
依赖
验证预期
```

局部工程决策交给实现模型。

### Delegated

Worker 可能没有父模型的上下文。

因此，Delegated Brief 应携带足够的信息：

```text
目标
相关上下文
契约
约束
验收标准
验证
```

使其能够被独立理解。

对于多个需要协调的任务，Detailed Brief 会根据仓库的真实当前状态和前序结果即时创建。

## Superpowers Lite 不强制什么

Superpowers Lite 本身不强制要求：

- Git worktree；
- feature branch；
- 每个任务后都 commit；
- pull request；
- 强制 code reviewer；
- 强制 sub-agent；
- 每个任务使用一个全新的 worker；
- 严格的 test-first 开发；
- Brainstorming 每轮只能提一个问题；
- 强制的 Design/Spec approval gate；
- 持久化 Spec 或 Plan 文件；
- 固定的微步骤实现计划。

这些工具和实践仍然可能有用。

它们只是不属于默认工作流，除非能为当前任务带来明确价值。

## 仓库结构

```text
.
├── .agents/
│   └── plugins/
│       └── marketplace.json          # Codex marketplace
├── .claude-plugin/
│   └── marketplace.json              # Claude Code marketplace
├── kimi.plugin.json                  # Kimi Code manifest
├── plugins/
│   └── superpowers-lite/
│       ├── .codex-plugin/
│       │   └── plugin.json           # Codex manifest
│       ├── .claude-plugin/
│       │   └── plugin.json           # Claude Code manifest
│       ├── .qoder-plugin/
│       │   └── plugin.json           # Qoder manifest
│       └── skills/
│           ├── using-lite/
│           ├── lite-brainstorming/
│           ├── lite-writing-specs/
│           ├── lite-writing-plans/
│           ├── lite-debugging/
│           ├── lite-testing/
│           └── lite-verification/
├── README.md
├── README-EN.md
└── LICENSE
```

每个 Skill 的 `SKILL.md` 由四个平台共用。`agents/openai.yaml` 提供 Codex 专用的界面元数据，其他平台会忽略这些辅助文件。

## 设计原则

Superpowers Lite 遵循几条刻意保持简单的规则：

> **使用能够保持信心的最轻量流程。**

> **跳过仪式，而不是跳过思考。**

> **文档应该记录决策，而不是制造决策。**

> **只有确实存在影响重大的决策时才进行 Brainstorm。**

> **规划粒度应该同时匹配任务复杂度和执行上下文。**

> **Inline 执行需要方向；Delegated 执行需要契约。**

> **全局规划，按需即时定义 delegated task。**

> **测试应该保护行为，而不是满足仪式。**

> **原因不明确时，先理解再修改。**

> **完成声明绝不能超出已有证据。**

Superpowers Lite 刻意保持小而精。在增加另一个 Skill 或强制工作流步骤前，请先问：

> **它对编码质量的提升，是否足以证明其协调成本和上下文成本是值得的？**

如果不是，它很可能不应该出现在这里。

## 与 Superpowers 的关系

Superpowers Lite 受到 Superpowers 工程纪律的启发，但刻意选择了不同的权衡。

目标不是用更少的文件复制完整的 Superpowers 工作流。

目标是保留高价值的工程推理，同时允许强大的编码 Agent 保留局部判断力，并跳过对当前任务帮助不大的工作流阶段。

简而言之：

```text
Superpowers：
流程一致性优先

Superpowers Lite：
最小充分流程优先
```

## 许可证

MIT
