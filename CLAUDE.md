@AGENTS.md

# Kakaxi — 视频编辑工作室

这是一个集成了 AI 视频编辑能力的工作室项目。Next.js 前端 + 两套 AI 编辑工具链。

---

## 视频编辑流水线

**完整流程：** 原始素材 → 转录 → 去除填充词 → 剪辑 → 动态图形 → final.mp4

### 工具一：video-use（剪辑 + 去除填充词）

skill 已安装在 `.claude/skills/video-use/`。使用前请阅读：
- `.claude/skills/video-use/SKILL.md` — 每次会话的操作指南
- `.claude/skills/video-use/install.md` — 首次安装说明

**需要的环境：**
- `ELEVENLABS_API_KEY` — 用于 ElevenLabs Scribe 转录（参考 `.env.example`）
- `ffmpeg` + `ffprobe` — 已安装在系统上
- Python 依赖 — 已通过 `uv sync` 安装在 `/home/user/video-use/`

**每次会话开始时验证：**
```bash
which ffmpeg && which ffprobe
python /home/user/video-use/helpers/transcribe.py --help
```

**标准工作流：**
1. 将原始素材放入 `videos/` 目录
2. 运行转录：`python /home/user/video-use/helpers/transcribe_batch.py videos/`
3. 打包转录文本：`python /home/user/video-use/helpers/pack_transcripts.py --edit-dir videos/edit/`
4. 阅读 `videos/edit/takes_packed.md`，与用户确认剪辑策略
5. 生成 `edl.json`，执行渲染：`python /home/user/video-use/helpers/render.py videos/edit/edl.json -o videos/edit/final.mp4`

**Helpers 路径：** `/home/user/video-use/helpers/`

---

### 工具二：HyperFrames（动态图形 / Motion Graphics）

15 个 skills 已安装在 `.agents/skills/`：
- `/hyperframes` — 主要编辑 skill
- `/hyperframes-cli` — CLI 命令参考
- `/hyperframes-media` — 素材预处理
- `/gsap` — GSAP 动画
- `/lottie` — Lottie 动画
- `/three` — Three.js 3D
- `/css-animations` — CSS 动画
- `/tailwind` — Tailwind 样式
- `/waapi` — Web Animations API
- `/animejs` — Anime.js
- `/hyperframes-registry` — 50+ 预制 blocks

**使用方式：**
```bash
npx hyperframes init <slot-dir> --example blank --non-interactive --skip-skills
npx hyperframes preview   # 浏览器预览
npx hyperframes render . -o render.mp4
```

**要求：** Node.js 22+（已满足）、FFmpeg（已安装）

**与 video-use 配合：** 在 `videos/edit/animations/slot_N/` 内创建 HyperFrames 项目，渲染后在 `edl.json` 的 `overlays` 字段中引用输出路径。

---

## API 密钥配置

在 `/home/user/video-use/.env` 中设置（不要提交到 git）：
```
ELEVENLABS_API_KEY=your_key_here
```

获取密钥：https://elevenlabs.io/app/speech-synthesis/text-to-speech（登录后 → API Keys）

---

## 目录结构

```
kakaxi/
├── src/              ← Next.js 前端（视频工作室 UI）
├── videos/           ← 放置原始素材（不提交到 git）
│   └── edit/         ← 所有输出文件（自动生成）
│       ├── project.md
│       ├── takes_packed.md
│       ├── edl.json
│       ├── transcripts/
│       ├── animations/
│       └── final.mp4
├── .agents/skills/   ← HyperFrames 相关 skills（15个）
└── .claude/skills/   ← video-use skill（symlink）
```

---

## 快速开始（给我一个视频文件就能工作）

当用户提供视频文件时，按以下步骤执行：

1. 将文件放入或确认在 `videos/` 目录
2. 检查 `ELEVENLABS_API_KEY` 是否已配置
3. 运行转录（自动缓存，不会重复计费）
4. 打包转录，用中文向用户展示内容摘要
5. 询问用户的剪辑意图（目标时长、风格、需要保留/删除的内容）
6. 提出 4–8 句话的策略，**等待用户确认**
7. 执行剪辑、渲染预览
8. 如需动态图形，在 animations slot 内用 HyperFrames 并行构建
9. 输出 `final.mp4`

**语言说明：** 用户使用中文，请用中文回应。

---

## Next.js 前端

详见 `AGENTS.md`。前端代码在 `src/`，用于展示视频工作室 UI。
