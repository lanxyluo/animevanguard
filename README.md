# Anime Vanguards Wiki

一个专注于 Anime Vanguards 游戏的完整工具集，包含角色数据库、强度排行和计算工具。

## 🚀 核心功能

- **Tier List**: 基于社区反馈的角色强度排行
- **Unit Database**: 完整的角色数据库，支持搜索和筛选
- **Calculator**: 伤害计算和团队构建工具
- **响应式设计**: 支持桌面和移动设备
- **数据驱动**: 基于35个角色的完整数据
- **易于维护**: 简化的项目结构，专注于核心功能

## 📁 项目结构

```
animevanguard/
├── index.html                    # 主入口文件
├── pages/                       # 页面文件
│   ├── tierlist.html           # 强度排行页面
│   ├── database.html           # 角色数据库页面
│   ├── calculator.html         # 计算工具页面
│   └── about.html              # 关于页面
├── js/                         # JavaScript 模块
│   ├── main.js                # 应用启动文件
│   ├── app.js                 # 主应用控制器
│   ├── config/                # 数据配置
│   │   ├── units.js           # 完整角色数据 (35个)
│   │   ├── unit-database-data.js # 数据库格式数据
│   │   ├── characterImages.js # 角色图片配置
│   │   ├── materials.js       # 进化材料数据
│   │   └── constants.js       # 游戏常量
│   ├── pages/                 # 页面控制器
│   │   ├── tierlist.js        # 强度排行页面
│   │   ├── database.js        # 数据库页面
│   │   ├── calculator.js      # 计算工具页面
│   │   └── about.js           # 关于页面
│   ├── modules/               # 功能模块
│   │   ├── dps-calculator.js  # DPS计算器
│   │   ├── unit-selector.js   # 角色选择器
│   │   └── results-display.js # 结果展示
│   └── utils/                 # 工具函数
│       ├── dataStats.js       # 数据统计工具
│       └── helpers.js         # 通用工具函数
├── css/                       # 样式文件
│   ├── global.css            # 全局样式
│   ├── components/           # 组件样式
│   └── pages/               # 页面样式
├── images/                   # 图片资源
│   └── characters/          # 角色图片
└── components/              # 组件文件
    └── header.html         # 头部组件
```

## 📊 数据管理

项目包含35个角色的完整数据，采用手动管理方式：

### 数据文件
- `js/config/units.js` - 完整角色数据（35个角色）
- `js/config/unit-database-data.js` - 数据库页面专用数据
- `js/config/characterImages.js` - 角色图片配置

### 数据更新流程
1. 在 `units.js` 中添加/修改角色数据
2. 在 `unit-database-data.js` 中同步更新
3. 在 `characterImages.js` 中配置图片
4. 使用 `test-data-stats.html` 验证数据完整性

### 数据统计
- 总角色数: 35个
- 稀有度分布: Vanguard(5) + Secret(8) + Mythic(12) + Epic(10)
- 强度分布: BROKEN(5) + META(8) + SUB-META(15) + DECENT(7)

详细说明请参考 [DATA_MANAGEMENT_GUIDE.md](./DATA_MANAGEMENT_GUIDE.md)

## 🛠️ 技术栈

- **前端框架**: Vanilla JavaScript (ES6+)
- **模块系统**: ES6 Modules
- **样式**: CSS3 (Flexbox/Grid)
- **图标**: Font Awesome 6.4.0
- **性能**: 自定义性能监控和缓存系统
- **分析**: Google Analytics

## 🚀 快速开始

### 1. 克隆项目

```bash
git clone <repository-url>
cd animevanguard
```

### 2. 启动开发服务器

```bash
# 使用 Python 内置服务器
python -m http.server 8000

# 或使用 Node.js
npx http-server

# 或使用 Live Server (VS Code 扩展)
```

### 3. 访问应用

打开浏览器访问 `http://localhost:8000`

## 📖 使用指南

### 进化材料计算器

1. 在单位选择器中选择要进化的单位
2. 查看所需的进化材料列表
3. 查看成本汇总和刷图建议
4. 使用筛选功能快速找到特定材料

### DPS 计算器

1. 选择要计算的单位
2. 设置单位等级和特性
3. 配置游戏状态参数
4. 查看详细的 DPS 计算结果

### 单位数据库

1. 浏览所有可用单位
2. 使用搜索和筛选功能
3. 查看单位详细信息
4. 比较不同单位的属性

## 🔧 开发指南

### 添加新单位

1. 在 `js/config/units.js` 中添加单位数据
2. 确保数据格式符合验证规则
3. 运行测试验证数据正确性

### 创建新组件

1. 在 `js/components/` 目录下创建新组件文件
2. 实现组件的生命周期方法
3. 在相应的页面控制器中集成组件

### 添加新页面

1. 在 `js/pages/` 目录下创建页面控制器
2. 在 `js/app.js` 中注册新页面
3. 更新导航和路由逻辑

### 性能优化

项目已集成以下性能优化功能：

- **懒加载**: 使用 Intersection Observer 实现组件懒加载
- **缓存系统**: 智能缓存管理，自动清理过期数据
- **性能监控**: 实时监控应用性能指标
- **资源预加载**: 预加载关键资源

## 🧪 测试

### 运行测试

打开 `final-test.html` 页面运行完整的测试套件：

- 模块加载测试
- 性能指标测试
- 代码质量检查
- 错误处理测试
- 集成测试
- 最终验证

### 测试覆盖范围

- ✅ 所有模块加载
- ✅ 数据验证
- ✅ 组件功能
- ✅ 页面切换
- ✅ 错误处理
- ✅ 性能监控

## 📊 性能指标

- **首次加载时间**: < 2 秒
- **页面切换时间**: < 300ms
- **内存使用**: < 50MB
- **模块数量**: 15+ 个模块

## 🔒 错误处理

项目实现了多层次的错误处理：

1. **全局错误处理**: 捕获未处理的错误和 Promise 拒绝
2. **模块级错误处理**: 每个模块都有自己的错误处理逻辑
3. **用户友好的错误提示**: 清晰的错误信息和恢复建议
4. **错误日志**: 详细的错误日志用于调试

## 🚀 部署

### 生产环境部署

1. 确保所有文件路径正确
2. 配置 Web 服务器支持 ES6 模块
3. 启用 Gzip 压缩
4. 设置适当的缓存头
5. 配置 HTTPS

### 推荐服务器配置

```nginx
# Nginx 配置示例
server {
    listen 80;
    server_name your-domain.com;
    
    location / {
        root /path/to/animevanguard;
        index index.html;
        try_files $uri $uri/ /index.html;
    }
    
    # 启用 Gzip 压缩
    gzip on;
    gzip_types text/javascript application/javascript;
    
    # 设置缓存
    location ~* \.(js|css|png|jpg|jpeg|gif|ico|svg)$ {
        expires 1y;
        add_header Cache-Control "public, immutable";
    }
}
```

## 🤝 贡献指南

1. Fork 项目
2. 创建功能分支 (`git checkout -b feature/AmazingFeature`)
3. 提交更改 (`git commit -m 'Add some AmazingFeature'`)
4. 推送到分支 (`git push origin feature/AmazingFeature`)
5. 打开 Pull Request

## 📝 更新日志

### v1.0.0 (2024-01-XX)
- ✅ 完成基础架构重构
- ✅ 实现模块化设计
- ✅ 添加性能优化
- ✅ 完善错误处理
- ✅ 创建测试套件

## 📄 许可证

本项目采用 MIT 许可证 - 查看 [LICENSE](LICENSE) 文件了解详情

## 🙏 致谢

- Font Awesome 提供的图标
- Google Analytics 提供的分析服务
- 所有贡献者的辛勤工作

## 📞 联系方式

如有问题或建议，请通过以下方式联系：

- 创建 Issue
- 发送邮件
- 提交 Pull Request

---

**注意**: 这是一个持续开发的项目，功能会不断更新和完善。 