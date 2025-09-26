# Anime Vanguards 数据管理指南

## 项目结构简化

项目已简化为三个核心模块：
1. **Tier List** - 角色强度排行
2. **Unit Database** - 角色数据库
3. **Calculator** - 计算工具

## 数据文件说明

### 主要数据文件
- `js/config/units.js` - 完整的角色数据（35个角色）
- `js/config/unit-database-data.js` - 数据库页面专用数据
- `js/config/characterImages.js` - 角色图片配置
- `js/config/materials.js` - 进化材料数据
- `js/config/constants.js` - 游戏常量

### 数据格式标准

#### 角色数据结构
```javascript
{
  id: "unique-kebab-case-id",
  name: "Character Name",
  rarity: "Vanguard|Secret|Mythic|Epic",
  tier: "BROKEN|META|SUB-META|DECENT",
  element: "Dark|Holy|Fire|Nature|Water|Wind|Unknown",
  type: "DPS|Support|Farm|Buffer",
  deploymentCost: 1700, // 数字，不含¥符号
  maxUpgradeCost: 105700, // 数字
  costEfficiency: "High|Medium|Low",
  baseDPS: "Very High|High|Medium|Low",
  maxDPS: "190k+ with abilities",
  range: "Long|Medium|Short",
  description: "1-2句描述",
  pros: ["优势1", "优势2"],
  cons: ["劣势1", "劣势2"],
  obtainMethod: "获取方式",
  availability: "Permanent|Limited|Event",
  evolutionPath: "进化路径（如有）",
  isEvolution: true|false,
  baseForm: "基础形态名称（如为进化体）",
  tags: ["标签1", "标签2"]
}
```

## 数据更新流程

### 1. 添加新角色
1. 在 `js/config/units.js` 中添加完整角色数据
2. 在 `js/config/unit-database-data.js` 中添加数据库格式数据
3. 在 `js/config/characterImages.js` 中添加图片配置
4. 更新相关常量文件（如需要）

### 2. 修改现有角色
1. 同时更新两个数据文件中的对应角色
2. 确保数据格式一致性
3. 测试所有相关功能

### 3. 数据验证
- 确保所有必填字段完整
- 验证数据格式正确性
- 检查图片路径有效性
- 测试数据库搜索和筛选功能

## 当前角色统计

### 按稀有度分布
- Vanguard: 5个
- Secret: 8个  
- Mythic: 12个
- Epic: 10个
- **总计: 35个角色**

### 按强度分布
- BROKEN: 5个
- META: 8个
- SUB-META: 15个
- DECENT: 7个

## 维护注意事项

1. **数据一致性**: 确保两个数据文件中的角色信息保持一致
2. **格式标准**: 严格按照定义的数据格式添加/修改数据
3. **测试验证**: 每次数据更新后测试相关功能
4. **备份**: 重要更新前备份数据文件
5. **版本控制**: 使用Git跟踪数据变更

## 文件依赖关系

```
units.js (主数据)
    ↓
unit-database-data.js (数据库格式)
    ↓
characterImages.js (图片配置)
    ↓
前端页面 (Tier List, Database, Calculator)
```

## 常见问题

### Q: 如何添加新角色？
A: 按照上述流程，在两个数据文件中添加对应数据，确保格式一致。

### Q: 如何修改角色强度？
A: 更新 `tier` 字段，同时更新两个数据文件。

### Q: 如何添加新图片？
A: 将图片放入 `images/characters/` 目录，在 `characterImages.js` 中配置路径。

### Q: 数据更新后需要做什么？
A: 清除浏览器缓存，测试所有相关功能，确保数据正确显示。

## 联系信息

如有数据相关问题，请检查：
1. 数据格式是否正确
2. 必填字段是否完整
3. 图片路径是否有效
4. 两个数据文件是否同步
