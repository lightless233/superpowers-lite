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
                 planned acceptance evidence
                               │
                               ▼
               optional one-pass review gate
                               │
                               ▼
                    supported completion claim
```

这是一张关系图，**不是强制执行的流水线**。

任何不能显著提升信心的阶段都可以跳过。

## 有界的 Review 收敛

Code review 仍然不是必选阶段。需要 review 时，它应该收敛当前 Task，而不是制造没有上限的修复循环：

```text
IMPLEMENT
   ↓
RUN PLANNED ACCEPTANCE / BLACK-BOX / E2E
   ↓
IF NEEDED: ONE PRE-REVIEW CORRECTION / BREAKER
   ↓
ONE BROAD TASK REVIEW
   ↓
BATCH ALL BLOCKING FINDINGS
   ↓
ONE FIX WAVE
   ↓
REFRESH INVALIDATED ACCEPTANCE EVIDENCE
   ↓
ONE SCOPED RE-REVIEW
   ↓
CLEAN → COMPLETE
STILL BLOCKED → BREAKER / USER
```

验收范围应在第一次运行前根据 acceptance criteria 和风险冻结。外部行为优先验证真实 CLI、API 或 UI 入口；内部改动可使用足够的 focused integration evidence，不为形式制造 E2E。失败时只允许一次 batched correction，并只重跑失败或受 correction 影响的证据；仍失败则触发 breaker。

Broad review 一次检查完整 Task，并把当前可发现的 blockers 成批提出。只有违反要求、破坏受支持用法的正确性、数据安全、承诺兼容性、主要流程、安全性或验证有效性的问题才阻塞；既存问题、推测风险、hardening、可选重构和 Task 外观察应 deferred。

默认自动预算是一次 pre-review correction、一次 broad review、一次 post-review batched fix、一次 scoped re-review。Fix 使 acceptance evidence 失效时，只在 re-review 前刷新受影响的检查。Late reviewer miss 若满足 blocking admission 则触发 breaker，否则 deferred；它不会自动开启第二轮 fix。Clean scoped re-review 通常是最后一个自动 gate。

> **Review 应该收敛 Task，而不是创建无边界的 repair loop。**

## 安装

Superpowers Lite 以 Skills-only package/plugin 形式分发，同时支持 Codex、Claude Code、Kimi Code、Pi 和 Qoder。五个平台共用同一套 `SKILL.md`，并使用各平台对应的 package 或 plugin manifest。

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

### Pi

使用 Pi 直接从 GitHub 安装：

```bash
pi install https://github.com/lightless233/superpowers-lite
```

也可以固定到指定 ref：

```bash
pi install git:github.com/lightless233/superpowers-lite@master
```

安装后启动新的 Pi session，或在交互模式中运行 `/reload` 以发现这些 Skills。

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

Pi 同样通过 Skill 命令调用：

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
| `lite-elephant` | 在手动角色工作流中编写 Spec、审核 Plan 和审查代码 |
| `lite-goldfish` | 在手动角色工作流中独立审查 Spec、规划、实现和修复 |
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

执行模式会适应当前宿主提供的能力。没有 sub-agent 或 parallel execution 时，Lite 会保持相同的工作流深度并退化为 INLINE；缺少可选的 delegation 能力不会阻塞任务，也不会跳过必要的测试或验证。

当宿主提供专用探索角色时，Lite 可以让快速角色处理有界的文件定位、调用链追踪和测试发现，并在边界不清、跨组件或高风险调查中选择更深的探索能力。只有通用 sub-agent 时，仅委派能够通过自包含 Brief 独立完成的工作；没有合适角色时则由当前 Agent INLINE 完成。

### 手动大象 / 金鱼交接（可选）

需要跨模型独立审查时，通过 Harness 明确选择 `lite-elephant` 或 `lite-goldfish`，并指定本次阶段和输入路径。两者是逻辑角色，不绑定模型；用户负责启动独立会话、交接和决定下一阶段。每次只执行指定阶段。

| 入口 | 支持阶段 |
|---|---|
| `lite-elephant` | `spec`：编写或修订 Spec；`plan-review`：审核 Plan；`code-review`：审查代码 |
| `lite-goldfish` | `spec-clarity`：Spec 盲读；`spec-alignment`：目标一致性审查；`plan`：编写或修订 Plan；`implement`：实现；`fix`：修复用户确认的问题 |

常见交接顺序是：Elephant 写 Spec → Goldfish 独立审查 → Goldfish 写 Plan → Elephant 审核 Plan → Goldfish 实现 → Elephant 审查代码 → 按需由 Goldfish 修复。按任务选择有价值的阶段；模型给出的就绪结论不代替用户的决定和交接。

例如，在 Codex 中显式选择金鱼并执行 Spec 清晰性盲读：

```text
$superpowers-lite:lite-goldfish
Stage: spec-clarity
Spec: docs/specs/001-YYYY-MM-DD-feature.md
```

审核 Plan：

```text
$superpowers-lite:lite-elephant
Stage: plan-review
Requirements: path/to/requirements.md
Spec: docs/specs/001-YYYY-MM-DD-feature.md
Plan: docs/plans/001-YYYY-MM-DD-feature.md
```

示例路径需替换为项目中的实际路径。其他 Harness 使用各自的 Skill 选择机制；不依赖自动匹配来指定角色。入口会先列出角色、阶段和输入范围，缺少必要信息时先确认。角色阶段由当前会话 INLINE 执行，完成后停下，不自动启动另一个 Agent 或跨阶段继续。

`spec-clarity` 只读指定 Spec，检查能否独立理解及其内部一致性；`spec-alignment` 另读原始需求，检查目标是否偏移。盲读需要未接触相关背景的新会话；如果 Harness 已注入任务背景或外部记忆，Skill 无法消除这些信息，也不能提供真正的环境隔离。

Spec、Plan 和必要的 Review 文件保存在实际开发项目中，沿用既有目录约定并按需创建。原始需求不可静默改写；审查只将有依据的需求违背或真实缺陷列为必须修复，可选优化单独列出。

各阶段的输入、输出与固定交接模板见[手动交接契约](plugins/superpowers-lite/skills/using-lite/references/manual-handoff-contracts.md)。

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
├── AGENTS.md                          # 仓库中维护的长期工程规则
├── .agents/
│   └── plugins/
│       └── marketplace.json          # Codex marketplace
├── .claude-plugin/
│   └── marketplace.json              # Claude Code marketplace
├── agents/                            # 可选的 Codex sub-agent profiles
│   ├── explorer.toml                  # 快速、有界的只读探索
│   ├── deep_explorer.toml             # 深度、跨组件的只读探索
│   ├── worker.toml                    # 通用实现 worker
│   └── reviewer.toml                  # 独立 review gate
├── kimi.plugin.json                  # Kimi Code manifest
├── package.json                      # Pi package manifest
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
│           ├── lite-elephant/
│           ├── lite-goldfish/
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

每个 Skill 的 `SKILL.md` 由五个平台共用。Skill 不依赖 top-level `agents/`：这些文件只是支持它们的 Codex 环境可选使用的加速配置。各 Skill 内的 `agents/openai.yaml` 提供 Codex 专用的界面元数据，其他平台会忽略这些辅助文件。

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
