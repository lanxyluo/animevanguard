/**
 * Character Images Configuration
 * 角色图片配置文件
 * 
 * 用途：将角色名称映射到对应的图片路径
 * 更新：每次添加新角色图片后更新此文件
 */

// 图片路径配置
const IMAGE_CONFIG = {
  basePath: 'assets/img/characters/',
  defaultImage: null, // 设置为 null 则使用 emoji 作为后备
  format: 'png',
  fallbackEmoji: true // 如果图片不存在，显示 emoji
};

// 角色名称 -> 图片文件名映射
// ⚠️ 重要：使用 data.js 中的 unit.name 值（不是 displayName）
const CHARACTER_IMAGE_MAP = {
  // Mythic 稀有度 - 已添加图片 ✅
  'goju': 'goju.png',              // Gojo
  'song_jinwu': 'song_jinwu.png',  // Song Jinwu
  'cha_in': 'cha_in.png',          // Cha-In
  
  // Rare 稀有度 - 已添加图片 ✅
  'norutu': 'norutu.png',          // Norutu
  
  // Secret 稀有度 - 待添加
  // 'sukuna': 'sukuna.png',
  
  // Mythic 稀有度 - 待添加
  // 'igros': 'igros.png',
  // 'alucard': 'alucard.png',
  // 'sprintwagon': 'sprintwagon.png',
  // 'alligator': 'alligator.png',
  // 'broly': 'broly.png',
  // 'all_might': 'all_might.png',
  // 'shanks': 'shanks.png',
  // 'whitebeard': 'whitebeard.png',
  
  // Legendary 稀有度 - 待添加
  // 'jotaro': 'jotaro.png',
  // 'dio': 'dio.png',
  // 'luffy': 'luffy.png',
  // 'zoro': 'zoro.png',
  // 'sasuke': 'sasuke.png',
  // 'ichigo': 'ichigo.png',
  // 'gon': 'gon.png',
  // 'killua': 'killua.png',
};

/**
 * 获取角色图片路径
 * @param {Object} unit - 角色对象（来自 data.js）
 * @returns {String|null} - 图片路径或 null（如果不存在）
 */
function getCharacterImagePath(unit) {
  if (!unit) return null;
  
  const fileName = CHARACTER_IMAGE_MAP[unit.name];
  if (!fileName) return null;
  
  return `${IMAGE_CONFIG.basePath}${fileName}`;
}

/**
 * 获取角色图片 HTML
 * @param {Object} unit - 角色对象
 * @param {String} sizeClass - Tailwind CSS 尺寸类名（如 'w-24 h-24'）
 * @param {String} additionalClasses - 额外的 CSS 类名
 * @returns {String} - 图片 HTML 或 emoji 后备
 */
function getCharacterImageHTML(unit, sizeClass = 'w-24 h-24', additionalClasses = '') {
  const imagePath = getCharacterImagePath(unit);
  
  if (imagePath) {
    // 如果有图片，返回 img 标签
    return `
      <img 
        src="${imagePath}" 
        alt="${unit.displayName || unit.name}"
        class="${sizeClass} ${additionalClasses} object-cover"
        onerror="this.style.display='none'; this.nextElementSibling.style.display='flex';"
        loading="lazy"
      />
      <div class="${sizeClass} ${additionalClasses} items-center justify-center text-5xl hidden">
        ${unit.emoji || '👤'}
      </div>
    `;
  } else if (IMAGE_CONFIG.fallbackEmoji && unit.emoji) {
    // 如果没有图片但有 emoji，返回 emoji
    return `
      <div class="${sizeClass} ${additionalClasses} flex items-center justify-center text-5xl">
        ${unit.emoji}
      </div>
    `;
  } else {
    // 完全没有后备方案
    return `
      <div class="${sizeClass} ${additionalClasses} flex items-center justify-center text-5xl bg-slate-800">
        👤
      </div>
    `;
  }
}

/**
 * 检查角色是否有图片
 * @param {Object} unit - 角色对象
 * @returns {Boolean} - 是否有图片
 */
function hasCharacterImage(unit) {
  return CHARACTER_IMAGE_MAP.hasOwnProperty(unit.name);
}

/**
 * 批量预加载图片（可选，用于优化性能）
 * @param {Array} units - 角色数组
 */
function preloadCharacterImages(units) {
  units.forEach(unit => {
    const imagePath = getCharacterImagePath(unit);
    if (imagePath) {
      const img = new Image();
      img.src = imagePath;
    }
  });
}

// 导出到全局命名空间
window.CharacterImages = {
  getPath: getCharacterImagePath,
  getHTML: getCharacterImageHTML,
  hasImage: hasCharacterImage,
  preload: preloadCharacterImages,
  config: IMAGE_CONFIG,
  map: CHARACTER_IMAGE_MAP
};

// 如果使用模块系统
if (typeof module !== 'undefined' && module.exports) {
  module.exports = {
    getCharacterImagePath,
    getCharacterImageHTML,
    hasCharacterImage,
    preloadCharacterImages,
    IMAGE_CONFIG,
    CHARACTER_IMAGE_MAP
  };
}

