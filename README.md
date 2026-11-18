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

上图是默认顺序。用户要求先审代码、最后统一测性能或做线上验收时，按该顺序执行，当前审查只要求与其范围对应的证据。后续验收仍须完成才能宣布整个任务完成，不因验收后置自动增加一轮 broad review。

Broad review 按本轮声明的范围检查完整实现，并把当前可发现的 blockers 成批提出。只有违反要求、破坏受支持用法的正确性、数据安全、承诺兼容性、主要流程、安全性或验证有效性的问题才阻塞；任务范围外的既存问题、推测风险、hardening、可选重构和 Task 外观察应 deferred。

默认自动预算是一次 pre-review correction、一次 broad review、一次 post-review batched fix、一次 scoped re-review。Fix 使 acceptance evidence 失效时，只在 re-review 前刷新受影响的检查。Late reviewer miss 若满足 blocking admission 则触发 breaker，否则 deferred；它不会自动开启第二轮 fix。Clean scoped re-review 通常是最后一个自动审查 gate，后置验收不会重置修复预算。

> **Review 应该收敛 Task，而不是创建无边界的 repair loop。**

## 安装

Superpowers Lite 以 Skills-only 包分发，支持 Codex、Claude Code、CodeBuddy Code、WorkBuddy、Kimi Code、Pi、OpenCode 和 Qoder。各宿主共用同一套 `SKILL.md`，通过相应的插件、包或原生 Skills 机制加载。

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

### CodeBuddy Code

在 CodeBuddy Code 中添加插件市场并安装：

```text
/plugin marketplace add lightless233/superpowers-lite
/plugin install superpowers-lite@lightless233-plugins
/reload-plugins
```

本地开发时也可以在仓库根目录运行 `/plugin marketplace add .`，再按上述名称安装。市场入口为 `.codebuddy-plugin/marketplace.json`，插件清单为 `plugins/superpowers-lite/.codebuddy-plugin/plugin.json`。参见 [CodeBuddy 插件市场文档](https://www.codebuddy.cn/docs/cli/plugin-marketplaces)。

### WorkBuddy

在 WorkBuddy 的插件市场页面点击添加市场（`+`），输入仓库地址：

```text
https://github.com/lightless233/superpowers-lite
```

在新增的 `lightless233-plugins` 市场中找到 `superpowers-lite`，安装并启用。仓库提供 `.workbuddy-plugin/marketplace.json` 和 `plugins/superpowers-lite/.workbuddy-plugin/plugin.json`，与 CodeBuddy 入口共用同一套 Skills。参见 [WorkBuddy 插件文档](https://www.workbuddy.cn/docs/workbuddy/Plugins)。

安装后在新任务中通过 WorkBuddy 的技能选择机制明确选择 `using-lite`，或在手动交接时选择 `lite-elephant` / `lite-goldfish`，用自然语言描述任务并提供所需路径。

### Kimi Code

在 Kimi Code 中直接从 GitHub 安装：

```text
/plugins install https://github.com/lightless233/superpowers-lite/tree/master
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

### OpenCode

OpenCode 通过原生 Agent Skills 加载本包。克隆仓库后，在仓库根目录执行以下命令（Linux、macOS 或 WSL）：

```bash
mkdir -p "$HOME/.config/opencode/skills"
for skill in "$PWD"/plugins/superpowers-lite/skills/*; do
  ln -s "$skill" "$HOME/.config/opencode/skills/"
done
```

这会为每个完整的 Skill 目录建立链接。也可以将这些目录复制到同一位置；保留各目录之间的相对关系和 `references/`，使共享交接契约能够读取。随后启动新的 OpenCode session。原生搜索目录见 [OpenCode Agent Skills 文档](https://opencode.ai/docs/skills/)。

OpenCode 中的原生名称是 `using-lite`、`lite-elephant`、`lite-goldfish` 等。明确要求通过 `skill` 工具加载对应名称，再用自然语言描述任务并提供输入路径。包内的 `superpowers-lite:<skill-name>` 引用在这种原生安装中按 `<skill-name>` 解析。

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

Claude Code 和 CodeBuddy Code 使用 `/` 前缀：

```text
/superpowers-lite:using-lite
/superpowers-lite:lite-debugging
```

Kimi Code 通过带插件限定名的 Skill 命令调用：

```text
/skill:superpowers-lite:using-lite
/skill:superpowers-lite:lite-debugging
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

想知道怎么安装、该选哪个 Skill，或怎么调整正在跑的工作流，可以问 `lite-help`。例如在 Codex 中发送 `$superpowers-lite:lite-help 我只想先写 Spec，应该怎么跟 Agent 说？`

| Skill | 职责 |
|---|---|
| `using-lite` | 选择有价值的工作流阶段和执行模式 |
| `lite-help` | 回答 Lite 的安装、使用和 Skill 选择问题，按需给出示例 prompt |
| `lite-elephant` | 在手动角色工作流中编写 Spec、审核 Plan 和审查代码 |
| `lite-goldfish` | 在手动角色工作流中独立审查 Spec、规划、实现和修复 |
| `lite-brainstorming` | 解决影响重大的设计不确定性 |
| `lite-writing-specs` | 定义必要行为和契约 |
| `lite-writing-plans` | 组织已经确定的实现工作 |
| `lite-debugging` | 在选择修复方案前调查不明确的根因 |
| `lite-code-simplifier` | 在明确范围内简化代码，并保持已有行为和契约 |
| `lite-no-comments` | 删除站不住的注释；只有明确要求时才修注释掩盖的问题 |
| `lite-bro` | 用简洁、连贯的人话重述上一条回复 |
| `lite-in-your-own-words` | 用自己的话复述理解到的用户目标和问题 |
| `lite-teach` | 用 lite-how 与 lite-why 讲清机制、原因和取舍，中英文再用 lite-unslop |
| `lite-how` | 通过只读探索解释架构、运行流程和代码归属 |
| `lite-why` | 从 commit、PR 讨论等记录追溯设计原因与取舍 |
| `lite-unslop` | 清理中英文中的 AI 套话，保留原意、语气和已有术语 |
| `lite-technical-writing` | 按 Diátaxis 编写和审阅技术文档，用 lite-unslop 整理中英文 |
| `lite-testing` | 选择并运行有意义的行为测试或检查 |
| `lite-verification` | 判断哪些新鲜证据足以支持完成声明 |
| `lite-benchmark` | 在报告或采用一个量出来的性能数字之前检查它 |
| `lite-blast-radius` | 查找改动在 diff 之外可能破坏的地方，并在便宜时证明其安全事实 |
| `lite-arena` | 同一任务多候选竞赛，选底稿并手工整合，再验证 |
| `lite-swarm` | 并行分工或竞速，汇总一份报告 |
| `lite-recall` | 从近期聊天、现场状态和共享记录重建工作上下文 |
| `lite-ketchup` | 汇报当前聊天的新进展和待用户决策事项 |
| `lite-ketchup-video` | 用带字幕的短视频汇报进展，待决策事项仍用文字 |
| `lite-show-me-your-work` | 为长任务或无人值守执行留下可复核的决策记录 |
| `lite-automate-me` | 把反复出现的工作习惯写成项目内的个人 mode skill |
| `lite-reflect` | 从当前会话提炼对项目内已有 skill 的改进，批准后再改 |
| `lite-correct` | 用架构、类型、lint/CI 或测试堵住 Agent 反复犯的错 |
| `lite-maintaining-agents-md` | 检查或维护项目根目录 AGENTS.md 中的长期有效规则 |
| `lite-remote-operations` | 精确选择远程目标，复用已有权限与凭据通道，跟踪执行结果 |
| `lite-remote-recovery` | 诊断远程连接和服务故障，验证已授权的主机或服务恢复 |
| `lite-file-transfer` | 选择文件传输路径，校验完整性并准确解释扫描结果 |

三个远程运维 Skills 使用宿主已有的 SSH、CLI 或 MCP 工具，不依赖特定远程执行服务。可以直接选择对应 Skill，也可以通过 `using-lite` 路由；它们按需使用，不增加必经的编码阶段。

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

需要跨模型独立审查时，通过 Harness 明确选择 `lite-elephant` 或 `lite-goldfish`，再用自然语言描述本次任务并给出所需路径。两者是逻辑角色，不绑定模型；用户负责启动独立会话、交接和决定下一阶段。下列阶段名用于内部匹配，也可通过 `Stage:` 精确指定，但日常使用不必记住这些代号。每次只执行一个阶段。

| 入口 | 支持阶段 |
|---|---|
| `lite-elephant` | `spec`：编写或修订 Spec；`plan-review`：审核 Plan；`code-review`：审查代码 |
| `lite-goldfish` | `spec-clarity`：Spec 盲读；`spec-alignment`：目标一致性审查；`plan`：编写或修订 Plan；`implement`：实现；`fix`：修复用户确认的问题 |

常见交接顺序是：Elephant 写 Spec → Goldfish 独立审查 → Goldfish 写 Plan → Elephant 审核 Plan → Goldfish 实现 → Elephant 审查代码 → 按需由 Goldfish 修复。按任务选择有价值的阶段；模型给出的就绪结论不代替用户的决定和交接。

例如，在 Codex 中显式选择金鱼，用自然语言请求审查 Spec：

```text
$superpowers-lite:lite-goldfish
审一下这份 Spec：docs/specs/001-YYYY-MM-DD-feature.md
```

也可以使用阶段代号，例如审核 Plan：

```text
$superpowers-lite:lite-elephant
Stage: plan-review
Requirements: path/to/requirements.md
Spec: docs/specs/001-YYYY-MM-DD-feature.md
Plan: docs/plans/001-YYYY-MM-DD-feature.md
```

示例路径需替换为项目中的实际路径。其他 Harness 使用各自的 Skill 选择机制；不依赖自动匹配来指定角色。入口会先用一两句话说明角色、本次任务和读取范围，能够匹配时直接执行，不会仅因缺少阶段代号而追问。缺少必要路径时只问路径；只有范围存在实质歧义或冲突时才确认。角色阶段由当前会话 INLINE 执行，完成后停下，不自动启动另一个 Agent 或跨阶段继续。

金鱼收到“审一下 Spec”时默认进入 `spec-clarity`，只读指定 Spec，检查能否独立理解及其内部一致性。明确要求对照原始需求检查遗漏或目标偏移时，进入 `spec-alignment` 并读取所需原始需求。多给了其他文件路径本身不会扩大审查范围。盲读需要未接触相关背景的新会话；如果 Harness 已注入任务背景或外部记忆，Skill 无法消除这些信息，也不能提供真正的环境隔离。

“按 Spec 写 Plan”“按批准的 Plan 实现”“修复这批审查问题”会分别匹配相应阶段。已有明确授权时不重复确认；“继续”只能延续尚未完成的当前阶段，阶段已完成则先明确下一任务。

阶段结束后默认附上一份可复制的下一步交接文本，填写已知的实际路径、相关 Review、改动范围和验收证据，并说明发给哪个角色、使用新会话还是合适的原会话。按当前结果准备审查、修订、实现或复审交接；需要你决策时直接说明问题，最终审查通过则收口。缺少必要材料时只标明具体缺项，不越过当前阶段的读取边界；目标 Harness 未知时用自然语言明确选择角色 skill，不假定其命令语法。你发送交接文本才构成下一阶段指令，模型不会自动发送或执行。多项 findings 需要往返追踪时沿用同一组编号，修复和复审逐项说明处理结果或异议。

Spec 和 Plan 保存在实际开发项目中，沿用既有命名规则并按需创建。原始需求应可追溯，Spec 作者及 Plan 审查者核对整体目标与分阶段覆盖；优先级靠后不等于排除。Plan 明确各重要任务的具体变化及完成依据。审查区分需求违背、代码缺陷、报告失实和新增建议，不把报告中的夸大表述变成追溯适用的新要求。

在手动角色工作流中，金鱼的 `spec-clarity`、`spec-alignment` 和大象的 `plan-review`、`code-review` 默认保存 Review 文件，包括无阻断项时的简短通过结论；只有明确要求仅在对话中回复时才省略文件。优先使用指定路径或已知的项目惯例，否则保存到实际开发项目的 `docs/review/`。

默认文件名沿用被审 Spec／Plan 的工作项编号、原始日期和主题，再附阶段和轮次，例如 `docs/review/001-YYYY-MM-DD-feature-plan-review-r01.md`。复审递增到 `r02` 并保留旧报告，首次保存时才创建目录。命名只允许检查必要的路径和匹配的文件名，不扩大金鱼盲读的内容范围。

审查回复说明具体通过或阻断的阶段、保存路径，并按需附下一步交接文本。你把 Review 交给另一方修订 Spec、Plan 或修复代码；报告本身不会触发下一阶段，也不代替你的决定。

各阶段的输入、输出与固定交接模板见[手动交接契约](plugins/superpowers-lite/skills/using-lite/references/manual-handoff-contracts.md)。

### `lite-maintaining-agents-md`

按用户要求检查项目规则，或把本次会话中有证据支持、长期有效的项目约定提炼到 `<项目根目录>/AGENTS.md`。例如：“检查项目 AGENTS.md 是否过时，先给建议”只读；“把本次确定的项目约定整理到项目 AGENTS.md”允许最小修改。

普通的“总结一下”和任务完成不会触发写入。全局规则及其已知模板或副本、父目录和子目录中的指令文件均不在写入范围内；也不通过符号链接修改其它文件。文件不存在时先提出内容，只有明确要求创建或初始化时才新建。

保留稳定命令、项目约定和已确认约束，不记录任务进度、临时结论、运行状态或交接记忆。这是独立、可选的维护任务，不会自动接在大象／金鱼阶段之后。

### `lite-brainstorming`

仅在确实存在影响重大的决策时使用。

它负责解决以下实质性不确定性：

- 架构选择；
- 子系统边界；
- 重要的需求歧义；
- 存在真实权衡的竞争方案。

当未决问题就是数据形状、模块边界、状态归属或调用方需要知道多少细节时，只草拟够用来比较的结构，并按状态单一归属、任务单一路径、调用方所知最少来选择。有现成模式就跟，不为对比硬造第二种结构。

当现有项目模式已经适用时，它不会为了形式强制制造多个备选方案。

当实验是解决设计问题最便宜、可靠的方式时，它也允许使用小型、可丢弃的 probe。

直接调用 `lite-writing-specs` 或 `lite-writing-plans`、而这些结构选择仍未定时，它们会先回到这里，而不是在规格或计划里选定结构。要多份竞赛成果并手工整合时，用 `lite-arena`，不要在这里起竞赛。

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

性能故障的原因仍由 Debugging 查清。数字已经量出来、准备拿它下结论或选型时，再使用 `lite-benchmark`。

> **不要叠加猜测性的修复。**

### `lite-code-simplifier`

按请求对指定代码或当前任务已明确的改动做局部简化，减少不必要的嵌套、重复和间接层，同时保留行为、接口及错误语义。遵循项目自身约定，不固定模型或语言写法，也不以减少行数为目标。

例如：“简化当前任务的代码改动，保持行为不变”。请求审查或建议时只读；明确要求简化时允许范围内修改。完成后运行与影响相关的验证，并报告实际证据；没有值得简化的地方就保持原样。

它是可选任务，不会在每次写代码后自动执行。在大象／金鱼流程中继续遵守原阶段权限，不会把审查变成改代码，也不新增阶段。

### `lite-no-comments`

当你要求清理指定文件或 diff 里的注释时使用。它偏删除：只保留法律头、公开 API 契约注释、代码表达不了的外部约束、合格的格式化或 lint 例外，以及带 Issue／RFC 链接且代码本身表达不了的约束。自己的代码里用注释掩盖的意外行为要删注释，并标出需要改名、抽取、类型或结构调整的符号。

审查可以用一个委派 Agent，也可以在当前会话按同一套规则做。未指定范围时，对比该仓库的实际基线分支，不假定名字是 `main`。主会话审核删除与 `MUST KILL`；不合格报告最多重派一次。只要求清理注释时停在删除和清单，不改应用代码。用户要求处理注释掩盖的问题，或批准了某一条修复，才做范围内最小根因修复；需要结构方向时先走一次 `lite-brainstorming`。约束类注释只有在编码落地后才删除；用户拒绝编码，或无人值守且没有预先批准时，保留注释并标明未落实。

它不是 `lite-code-simplifier`。后者管嵌套和间接层。这个默认只动注释；改代码要另有明确要求。不会在每次写代码后自动执行。也可以通过 `$superpowers-lite:lite-no-comments` 调用。

### `lite-bro`

当你说“说人话”“讲简单点”时，用更简单、连贯的表达重述上一条回复，保留原意、关键事实和不确定性，直接给出改写结果。也可以通过 `$superpowers-lite:lite-bro` 显式调用。

这是独立的表达工具，不需要进入编码工作流，也不依赖特定模型或工具。

### `lite-in-your-own-words`

当你说“先复述一下我的需求”“你理解我要什么吗”时，用自己的话说明理解到的目标和要解决的问题，直接返回复述内容。也可以通过 `$superpowers-lite:lite-in-your-own-words` 显式调用。

### `lite-teach`、`lite-how`、`lite-why`、`lite-unslop`

这四个 Skill 保持显式调用，也允许由其他 Skill 调用；不会自动加入每次编码或回复的流程。Codex 中可用 `$superpowers-lite:lite-teach` 等名称，其他宿主使用自己的 Skill 调用方式。

`lite-teach` 按用户当前问题和已有知识组织讲解，实际调用 `lite-how` 获取机制、`lite-why` 查明历史理由。中英文讲解再通过 `lite-unslop` 按各自语言的规则整理。完整子系统通常同时调用 how 和 why，并行执行后综合；小问题允许只调用其中一个。有人在对话里时，先给结论并停在最小完整答案。一次性回复按问题给完整讲解，仍然先给结论。保留证据中的不确定性，不测验用户，也不要求用户复述。多部分系统逐步画图，空间问题使用图片生成能力。

三个依赖也可单独使用。`lite-how` 对归属、分层这类窄问题在当前会话只读查完并直接回答；范围是一个子系统时才派一个只读子 Agent。父会话可以按用户语言和清晰度改写，事实保持调查结果。`lite-why` 引用 commit、PR 等实际记录，区分作者理由、推断和未知。`lite-unslop` 清理中文和英文，保留项目已有术语。宿主缺少委派、并行或图片生成能力时，明确说明限制并使用对应替代方式，不虚报调用或图片结果。

### `lite-technical-writing`

显式调用 `$superpowers-lite:lite-technical-writing`。Diátaxis 用于各种语言，区分教程、操作指南、参考和解释。Google developer style、STE 和 Global English 的句子规则只用于英文。`lite-unslop` 用于中文和英文。代码片段的缩进跟随仓库现有写法。

适用于文档、RFC、README、PR 描述和 commit message；PR 描述和 commit message 不套用 Diátaxis 文档分类，产品 UI 文案遵循产品自身规范。也允许其他 Skill 调用，不自动加入每次回复。

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

声明本身是加速、变慢、吞吐、延迟，或要靠这个数字选型时，先按 `lite-benchmark` 给出结论。声明不是性能数字时不要调用它。

### `lite-benchmark`

在你要给出或采用一个量出来的性能数字时使用，包括加速、变慢、吞吐、延迟，以及靠这个数字选型。比较或准备据此行动时，它检查瓶颈、配置是否符合这次声明、有没有超出上限、错误和输出是否正确、差距是否大过各次运行之间的波动、局部结果占整条等待路径的多少，以及工作是否发生在计时区间内。

你要粗略量级时跑一次，只查错误和工作是否发生，并说明这是一次。这次结果看起来不对时，再补查其余项目。用来选型或报告一个准备据此行动的差异，就不是粗略量级。比较时交替跑两侧，报告中位数和范围。配置按这次声明来判断：比较开箱表现时，默认配置就是该测的配置；声明比的是实际运行方式，一边却对不上，就不能据此选赢家。说不出瓶颈、有一侧不符合这次声明，或者错误和工作发生没查，比较结论就是无法下结论。粗估不会只因为没有瓶颈分析而变成无法下结论。

它是显式工具，不进入编码阶段，也不进入 review。也可以通过 `$superpowers-lite:lite-benchmark` 调用。

### `lite-blast-radius`

当你问「这还会破坏哪里」时可以直接用。已授权的测试靠普通检查仍看不出受影响的消费者或行为，或者一项安全判断依赖一个尚未查清的事实时，工作流也会调用它。共享状态、持久化格式、外部接口和异步生命周期是排查方向，不是只要沾上就先跑一遍。

它查找 diff 外面可能破坏的地方，并尽量证明「它之所以安全」的那一两个事实。能便宜地跑真实代码就跑，并留下命令和输出；不便宜或跑不了，就停在已到达的证据级别并标成未证明。证明可以用聚焦测试或临时脚本，不改产品代码。

它不解释代码现在怎么运行，那是 `lite-how`。它也不决定测试覆盖到哪。`lite-testing` 在普通检查已经足够时直接定覆盖，只把看不清的部分交给它，再根据结果定覆盖。唯一一次 broad review 可以在同一轮里用它查清一个未证的安全事实，已有适用结果就复用。不另加阶段，不另开一轮 review。也可以通过 `$superpowers-lite:lite-blast-radius` 调用。

### `lite-arena`

当你要同一任务的多份独立候选，再选一个底稿、吸收其他候选的优点时使用。先定产物和 3–6 条可打分标准，再把相同任务分到隔离输出目录；有可用的不同模型时做交叉评分，主 Agent 读完全部候选后选底稿，手工整合，再验证。候选高度一致时不必硬改；分歧过大时重新明确任务再跑，不直接拼接。

不依赖 Cursor cloud Agent、固定模型面板或 `pstack-models` 规则。宿主能提供至少两个隔离候选才运行；评分前仍须至少两份有效产物，只剩一份就停下或补跑，不把单份成果当成竞赛结果。文档类产物可以用各自的输出目录；要改同一仓库并跑测试时，用 worktree 或等价的独立检出，做不到就停下。它和 `lite-brainstorming` 不同：后者用草图定设计方向，不产多份竞赛成果。也可以通过 `$superpowers-lite:lite-arena` 调用。

### `lite-swarm`

当你要把检查、探索、验证拆成多片并行，或对同一 brief 竞速，并要一份汇总报告时使用。先定完成条件和形状：切片、竞速，或两者混合；竞速时事先声明 `first pass`、`rank all` 或 `best-of`。每个 worker 拿到独立 brief、范围、验证方法和输出要求；涉及测量时 brief 写明准确 SHA 与方法。worker 用 `PASS` / `ISSUES` / `BLOCKED` 汇报。缺 SHA 或方法的结果丢弃并重派一次，再失败记为缺口。

默认使用宿主已有的委派能力，不默认 cloud Agent。只有工作需要本机资源时才要求在用户机器上跑。它不做选底稿和手工整合，那是 `lite-arena`。普通一个清晰工作单元仍优先走 `DELEGATED` / `MIXED`，不必为此开 swarm。也可以通过 `$superpowers-lite:lite-swarm` 调用。

### `lite-recall`

开始或恢复一个主题前，重建近期工作上下文。固定时间窗口、主题和 workspace 后，搜索当前项目聊天记录，排除当前聊天和无关测试记录；主题点名功能或子系统时，再扫 Git、issue、文档和错误跟踪等共享记录，并用当前 Git / PR / ticket 状态核实。

产出是短胶囊、带状态标签的工作线程、反复出现的问题，以及最有用的下一步。优先使用宿主提供的会话记录；Cursor 上可用其 transcript 路径。不依赖固定模型面板。只有一两份聊天时可直接搜索；用户已给完整状态说明时可跳过挖掘。也可以通过 `$superpowers-lite:lite-recall` 调用。

### `lite-ketchup`

用户暂时没跟进时，讲清从他上一条消息以来发生了什么，以及现在有哪些事情确实要他决定。语气跟 `lite-bro` 一样：人话、短句、少术语。这轮保持只读，不改代码、不启动任务、不发外部消息。

先给进展（能用已有截图、视频或小关系图就用），再列完整的用户待办；Agent 自己能继续做的事不能伪装成用户待办。不能为控制长度而漏掉待决策项。也可以通过 `$superpowers-lite:lite-ketchup` 调用。

### `lite-ketchup-video`

按 `lite-ketchup` 收集进展和待决策项，但用最多 10 张幻灯片做成带烧录字幕的静音横屏短视频来讲「发生了什么」；待决策事项仍用文字列出。工作文件放在 `.runtime/ketchup-video-<slug>/`。用宿主和本机已有的渲染能力；渲染失败时说明失败并只返回决策事项，不虚构成片。也可以通过 `$superpowers-lite:lite-ketchup-video` 调用。

### `lite-show-me-your-work`

长任务、多阶段或无人值守执行期间，维护一份 append-only TSV，记录时间、阶段、决定、原因、证据指针与结果。默认保存在 `decisions.tsv` 或 `.audit/<task>.tsv`，只有审查确实需要时才提交。附带 `log.sh` 负责时间戳和单行化。

交付前对照当前运行 transcript 检查真实性；宿主能换厂商模型时再交叉审查，否则标明不可用。回复末尾列出需用户注意的薄弱证据或风险。其他 skill 需要审计轨迹时引用它，不要另造格式。也可以通过 `$superpowers-lite:lite-show-me-your-work` 调用。

### `lite-automate-me`

把用户在本项目里反复出现的工作习惯写成项目内的 `<handle>-mode` skill。默认新建到 `.agents/skills/<handle>-mode/SKILL.md`；已有则原地更新。只挖本项目会话里的重复模式，单次纠正不成规则，不写项目根 `AGENTS.md`。也可以通过 `$superpowers-lite:lite-automate-me` 调用。

### `lite-reflect`

任务结束后，从当前会话提炼对项目内已有 skill 的改进。产出 Accepted / Rejected / Backlog；用户批准后才改，且只改项目树内的 skill 源文件，不改 `plugins/cache/` 或项目外副本。该进 `AGENTS.md` 的转交 `lite-maintaining-agents-md`。也可以通过 `$superpowers-lite:lite-reflect` 调用。

### `lite-correct`

找出本仓库里 Agent 至少犯过两次的错误类别，按「架构 → 类型 → lint/CI → 测试 → 最后才是文档」落地修复，并用历史真实错误证明新检查会失败。主产物是仓库改动，不是报告文件。需要写进项目根 `AGENTS.md` 的判断类规则，转交 `lite-maintaining-agents-md`。也可以通过 `$superpowers-lite:lite-correct` 调用。

### `lite-remote-operations`

执行远程管理任务，负责精确目标、现有权限与 secrets 通道、异步任务跟踪和结果确认。例如：“重启这台服务器的指定服务，并确认应用恢复”。先检查实际能力，优先使用匹配的 typed tool，否则复用已授权的 SSH 或 CLI；不因等待超时重复执行结果未知的变更。

它负责远程变更的执行纪律；故障原因不明时先由 `lite-remote-recovery` 定位，变更后再验证恢复。明确的常规操作无需先做完整诊断。

### `lite-remote-recovery`

诊断远程连接和服务故障，区分 DNS、TCP、SSH、认证、权限与应用健康等失败阶段，并明确探测来自 Agent 执行环境还是目标主机。例如：“服务器能登录，但应用请求失败，先定位原因”。使用有界的只读检查，不把诊断请求当成重启授权。

它负责定位原因和验证恢复；需要变更时遵循 `lite-remote-operations`。对已授权的更新或重启，确认实际任务结果及相关服务状态；重启后还要确认重连和启动身份，不仅以端口开放或 SSH 恢复作为业务恢复的依据。

### `lite-file-transfer`

处理本地、远程服务器和 artifact storage 之间的文件传输，明确路径、目录范围、覆盖策略及实际数据经过的系统。例如：“把服务器上的归档传到另一台主机，并核对完整性”。按所选工具的能力选择路径，校验传输文件或归档的确切字节。

服务或策略要求信誉检查时，按 digest、信誉检查、传输和接收端校验的顺序处理。不把未命中恶意记录或扫描未检出解释成安全，也不为普通文件复制额外强制引入扫描服务。

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
├── .codebuddy-plugin/
│   └── marketplace.json              # CodeBuddy marketplace
├── .workbuddy-plugin/
│   └── marketplace.json              # WorkBuddy marketplace
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
│       ├── .codebuddy-plugin/
│       │   └── plugin.json           # CodeBuddy manifest
│       ├── .workbuddy-plugin/
│       │   └── plugin.json           # WorkBuddy manifest
│       ├── .qoder-plugin/
│       │   └── plugin.json           # Qoder manifest
│       └── skills/
│           ├── using-lite/
│           ├── lite-help/
│           ├── lite-elephant/
│           ├── lite-goldfish/
│           ├── lite-brainstorming/
│           ├── lite-writing-specs/
│           ├── lite-writing-plans/
│           ├── lite-debugging/
│           ├── lite-code-simplifier/
│           ├── lite-no-comments/
│           ├── lite-bro/
│           ├── lite-in-your-own-words/
│           ├── lite-teach/
│           ├── lite-how/
│           ├── lite-why/
│           ├── lite-unslop/
│           ├── lite-technical-writing/
│           ├── lite-testing/
│           ├── lite-verification/
│           ├── lite-benchmark/
│           ├── lite-blast-radius/
│           ├── lite-arena/
│           ├── lite-swarm/
│           ├── lite-recall/
│           ├── lite-ketchup/
│           ├── lite-ketchup-video/
│           ├── lite-show-me-your-work/
│           ├── lite-automate-me/
│           ├── lite-reflect/
│           ├── lite-correct/
│           ├── lite-maintaining-agents-md/
│           ├── lite-remote-operations/
│           ├── lite-remote-recovery/
│           └── lite-file-transfer/
├── README.md
├── README-EN.md
└── LICENSE
```

每个 Skill 的 `SKILL.md` 由各宿主共用。Skill 不依赖 top-level `agents/`：这些文件只是支持它们的 Codex 环境可选使用的加速配置。各 Skill 内的 `agents/openai.yaml` 提供 Codex 专用的界面元数据，其他平台会忽略这些辅助文件。

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
