# 🖼️ 角色图片设置指南

## 📂 文件结构（已创建）

```
assets/img/
├── characters/          ✅ 已创建 - 角色头像 (200x200px)
│   ├── README.md       ✅ 文件规范说明
│   ├── gojo.png        ⏳ 待上传
│   ├── sukuna.png      ⏳ 待上传
│   └── ...             ⏳ 其他角色
├── heroes/             ✅ 已创建 - 首页大图
│   ├── homepage-hero.png    ⏳ 可选
│   └── featured-units.png   ⏳ 可选
├── tools/              ✅ 已创建 - 工具图标
│   └── ...             ⏳ 可选
└── backgrounds/        ✅ 已创建 - 装饰背景
    └── ...             ⏳ 可选
```

## 📋 快速上手 3 步骤

### 步骤 1：下载角色图片

#### 方法 A：从官方 Wiki 获取（推荐）⭐
1. 访问：https://animevanguards.fandom.com/wiki/Category:Units
2. 点击角色页面
3. 右键保存角色图片
4. 重命名为规范格式（见下方命名规则）

#### 方法 B：游戏内截图
1. 进入游戏角色界面
2. 截取角色头像部分
3. 使用图片编辑工具裁剪为正方形
4. 调整尺寸为 200x200px

#### 方法 C：使用社区资源包
在 Discord/Reddit 询问是否有现成的图标包

---

### 步骤 2：重命名并上传图片

#### 文件命名规则

| 角色名 | 正确文件名 | ❌ 错误示例 |
|--------|-----------|------------|
| Gojo | `gojo.png` | Gojo.png, GOJO.PNG |
| Song Jinwu | `song-jinwu.png` | Song_Jinwu.png, SongJinwu.png |
| Cha-In | `cha-in.png` | Cha In.png, ChAin.png |

**规则总结**：
- ✅ 全部小写
- ✅ 用连字符 `-` 连接单词
- ✅ 使用 `.png` 格式

#### 上传到目录
将所有角色图片复制到：
```
D:\animevanguard\assets\img\characters\
```

---

### 步骤 3：在代码中启用图片

#### 3.1 在 HTML 中引入图片配置文件

打开需要显示角色图片的页面（如 `recommend.html`），在 `<head>` 部分添加：

```html
<!-- 在 data.js 之后引入 -->
<script src="assets/js/data.js"></script>
<script src="assets/js/character-images.js"></script>
```

#### 3.2 更新 `character-images.js` 中的映射表

打开 `assets/js/character-images.js`，将你下载的角色添加到 `CHARACTER_IMAGE_MAP`：

```javascript
const CHARACTER_IMAGE_MAP = {
  // 已添加图片的角色
  'Gojo': 'gojo.png',
  'Sukuna': 'sukuna.png',
  'Igros': 'igros.png',
  // ... 继续添加其他角色
};
```

#### 3.3 修改 `recommend.html` 中的卡片渲染函数

找到 `createUnitCard` 函数，将 emoji 部分替换为图片逻辑：

**原代码（只有 emoji）**：
```javascript
<div class="w-24 h-24 rounded-2xl ${iconBg} flex items-center justify-center text-5xl ...">
  ${unit.emoji || '👤'}
</div>
```

**新代码（优先使用图片）**：
```javascript
<div class="w-24 h-24 rounded-2xl ${iconBg} overflow-hidden">
  ${window.CharacterImages ? window.CharacterImages.getHTML(unit, 'w-full h-full', 'rounded-2xl') : `
    <div class="w-full h-full flex items-center justify-center text-5xl">
      ${unit.emoji || '👤'}
    </div>
  `}
</div>
```

---

## 🎨 图片规格详细说明

### 角色头像推荐规格

| 属性 | 推荐值 | 最小值 | 最大值 |
|------|--------|--------|--------|
| 宽度 | 200px | 150px | 400px |
| 高度 | 200px | 150px | 400px |
| 格式 | PNG | PNG/JPG | PNG/WebP |
| 背景 | 透明 | - | - |
| 文件大小 | <50KB | - | <200KB |

### 图片优化建议

1. **压缩图片**：使用 [TinyPNG](https://tinypng.com/) 压缩
2. **统一尺寸**：使用批处理工具统一调整为 200x200px
3. **统一风格**：尽量从同一来源获取，保持一致性
4. **移除背景**：使用 [Remove.bg](https://www.remove.bg/) 移除背景

---

## 🧪 测试图片是否正常显示

### 方法 1：浏览器控制台
1. 打开 `http://localhost:8000/recommend.html`
2. 按 F12 打开开发者工具
3. 在 Console 中输入：
```javascript
window.CharacterImages.map
```
4. 检查是否显示了你添加的角色映射

### 方法 2：检查网络请求
1. 打开开发者工具的 Network 标签页
2. 刷新页面
3. 筛选 "Img" 类型
4. 检查角色图片是否成功加载（200 状态码）

### 方法 3：查看页面
直接访问 Characters 页面的 "All Units" 标签，查看角色卡片是否显示图片

---

## 📦 批量处理工具（可选）

### Windows PowerShell 批量重命名
```powershell
# 批量转换为小写并替换空格
Get-ChildItem *.png | Rename-Item -NewName {$_.Name.ToLower().Replace(' ','-')}
```

### Python 批量调整尺寸
```python
from PIL import Image
import os

target_size = (200, 200)
input_dir = "raw_images/"
output_dir = "assets/img/characters/"

for filename in os.listdir(input_dir):
    if filename.endswith('.png'):
        img = Image.open(os.path.join(input_dir, filename))
        img = img.resize(target_size, Image.Resampling.LANCZOS)
        img.save(os.path.join(output_dir, filename))
        print(f"Processed: {filename}")
```

---

## ❓ 常见问题

### Q1: 图片不显示怎么办？
**A**: 检查以下几点：
1. 文件名是否完全匹配（区分大小写）
2. 文件是否在 `assets/img/characters/` 目录
3. 浏览器控制台是否有 404 错误
4. `character-images.js` 是否正确引入

### Q2: 可以使用 JPG 格式吗？
**A**: 可以，但需要修改 `CHARACTER_IMAGE_MAP` 中的文件扩展名。推荐使用 PNG 以支持透明背景。

### Q3: 需要为所有角色添加图片吗？
**A**: 不需要！系统会自动回退到 emoji。建议优先添加高稀有度角色（Secret, Mythic, Legendary）。

### Q4: 图片显示变形怎么办？
**A**: 确保图片是正方形（1:1 比例）。使用 `object-cover` CSS 属性会自动裁剪居中显示。

---

## 🎯 优先级建议

### 阶段 1（必做）：Top 10 热门角色 ⭐⭐⭐
```
1. Gojo (Secret)
2. Sukuna (Secret)
3. Igros (Mythic)
4. Song Jinwu (Mythic)
5. Alucard (Mythic)
6. Broly (Mythic)
7. All Might (Mythic)
8. Jotaro (Legendary)
9. Luffy (Legendary)
10. Naruto (Legendary)
```

### 阶段 2（推荐）：S/A Tier 角色 ⭐⭐
添加 Tier List 中 S 和 A 级别的所有角色

### 阶段 3（可选）：完整数据库 ⭐
补充所有角色图片，实现完整视觉体验

---

## 📞 需要帮助？

如果在设置过程中遇到问题：
1. 检查浏览器控制台的错误信息
2. 参考 `assets/img/characters/README.md`
3. 确认文件路径和命名是否正确

---

**创建日期**: 2024-11-08  
**版本**: 1.0  
**状态**: ✅ 目录已创建，配置文件已就绪

