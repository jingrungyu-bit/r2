/* ═══════════════════════════════════════════════════
   menu-data.js — 阿深 Thai Restaurant
   All translated menu data for the online menu.
═══════════════════════════════════════════════════ */

const STORE = {
  name: '阿深',
  tagline: {
    zh: '道地泰式家常料理',
    en: 'Authentic Home-style Thai Cuisine',
    ja: '本格タイ家庭料理',
    ko: '정통 태국 가정식 요리',
  },
  address: {
    zh: '545 南投縣埔里鎮西門里中正路577號',
    en: 'No. 577, Zhongzheng Rd., Ximen Village, Puli Township, Nantou County 545',
    ja: '台湾南投県埔里鎮西門里中正路577号（545）',
    ko: '545 난터우현 푸리진 시먼리 중정로 577호, 대만',
  },
  phone: '049-299-7150',
  image: null,
  dineInfo: null,
};

const LANG_LABELS = { zh: '繁中', en: 'EN', ja: '日本語', ko: '한국어' };

const CATEGORY_LABELS = {
  main:    { zh: '主餐類', en: 'Mains',    ja: 'メインディッシュ', ko: '메인요리' },
  side:    { zh: '單點類', en: 'Sides',    ja: 'サイドメニュー',  ko: '사이드메뉴' },
  dessert: { zh: '甜點類', en: 'Desserts', ja: 'デザート',       ko: '디저트' },
  drink:   { zh: '飲料類', en: 'Drinks',   ja: 'ドリンク',       ko: '음료' },
};

const CATEGORY_TAB_LABELS = {
  main:    { zh: '主餐', en: 'Mains',    ja: 'メイン',  ko: '메인' },
  side:    { zh: '單點', en: 'Sides',    ja: 'サイド',  ko: '사이드' },
  dessert: { zh: '甜點', en: 'Desserts', ja: 'デザート', ko: '디저트' },
  drink:   { zh: '飲料', en: 'Drinks',   ja: 'ドリンク', ko: '음료' },
};

const CATEGORY_ORDER = ['main', 'side', 'dessert', 'drink'];

const TAGS_DEF = {
  R: { icon: '⭐', zh: '本店推薦',  en: 'Recommended',     ja: 'おすすめ',      ko: '추천' },
  1: { icon: '🌶️',  zh: '小辣',     en: 'Mild Spicy',      ja: '少し辛い',      ko: '약간 매운' },
  2: { icon: '🌶️🌶️',zh: '中辣',     en: 'Medium Spicy',    ja: '中辛',         ko: '보통 매운' },
  3: { icon: '🔥',  zh: '大辣',     en: 'Very Spicy',      ja: '激辛',         ko: '매우 매운' },
  P: { icon: '🐷',  zh: '含豬肉',   en: 'Contains Pork',   ja: '豚肉入り',      ko: '돼지고기 포함' },
  B: { icon: '🐂',  zh: '含牛肉',   en: 'Contains Beef',   ja: '牛肉入り',      ko: '소고기 포함' },
  L: { icon: '🐑',  zh: '含羊肉',   en: 'Contains Lamb',   ja: 'ラム入り',      ko: '양고기 포함' },
  V: { icon: '🥬',  zh: '素食',     en: 'Vegetarian',      ja: 'ベジタリアン',  ko: '채식' },
  H: { icon: '☪️',  zh: '清真認證', en: 'Halal Certified', ja: 'ハラール認証',  ko: '할랄 인증' },
};

const MARKET_PRICE = { zh: '時價', en: 'Market Price', ja: '時価', ko: '시가' };

const MENU_ITEMS = [

  // ── 主餐類 ──────────────────────────────────────────────────
  {
    id: 'main-001', category: 'main',
    names: { zh: '手作泰式紅咖哩', en: 'Handmade Thai Red Curry', ja: '手作りタイレッドカレー', ko: '수제 태국 레드커리' },
    price: [
      { label: { zh: '烤雞腿', en: 'Chicken Leg', ja: 'チキン', ko: '치킨' }, value: 270 },
      { label: { zh: '牛肉',   en: 'Beef',        ja: '牛肉',   ko: '소고기' }, value: 340 },
      { label: { zh: '蔬食',   en: 'Veggie',      ja: 'ベジ',   ko: '채식' },  value: 250 },
    ],
    image: null, emoji: '🍛', tags: ['R', '1', 'B'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'main-002', category: 'main',
    names: { zh: '手作泰式黃咖哩（微辣）', en: 'Handmade Thai Yellow Curry (Mild)', ja: '手作りタイイエローカレー（少し辛い）', ko: '수제 태국 옐로우커리 (약간 매운)' },
    price: [
      { label: { zh: '烤雞腿', en: 'Chicken Leg', ja: 'チキン', ko: '치킨' }, value: 250 },
      { label: { zh: '牛肉',   en: 'Beef',        ja: '牛肉',   ko: '소고기' }, value: 320 },
      { label: { zh: '蔬食',   en: 'Veggie',      ja: 'ベジ',   ko: '채식' },  value: 230 },
    ],
    image: null, emoji: '🍛', tags: ['1', 'B'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'main-003', category: 'main',
    names: { zh: '泰式檸檬蒸鱸魚', en: 'Thai Steamed Sea Bass with Lemon', ja: 'タイ風レモン蒸しスズキ', ko: '태국식 레몬 찜 농어' },
    price: [
      { label: { zh: '整尾', en: 'Whole Fish', ja: '一尾',  ko: '한 마리' }, value: 400 },
      { label: { zh: '半尾', en: 'Half Fish',  ja: '半身',  ko: '반 마리' }, value: 240 },
    ],
    image: null, emoji: '🐟', tags: [],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'main-004', category: 'main',
    names: { zh: '酥炸無骨海鱸佐羅望子醬（不辣）', en: 'Crispy Boneless Sea Bass with Tamarind Sauce', ja: 'サクサク骨なしスズキ タマリンドソース（辛くない）', ko: '바삭한 뼈없는 농어 타마린드 소스 (안 매운)' },
    price: [
      { label: { zh: '整尾', en: 'Whole Fish', ja: '一尾',  ko: '한 마리' }, value: 430 },
      { label: { zh: '半尾', en: 'Half Fish',  ja: '半身',  ko: '반 마리' }, value: 240 },
    ],
    image: null, emoji: '🐟', tags: ['R'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'main-005', category: 'main',
    names: { zh: '冬蔭功酸辣海鮮湯', en: 'Tom Yum Seafood Soup', ja: 'トムヤムシーフードスープ', ko: '똠얌 해물 수프' },
    price: [
      { label: { zh: '小', en: 'Small', ja: '小', ko: '소' }, value: 270 },
      { label: { zh: '大', en: 'Large', ja: '大', ko: '대' }, value: 510 },
    ],
    image: null, emoji: '🍲', tags: ['3'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'main-006', category: 'main',
    names: { zh: '南薑香茅椰奶雞湯（不辣）', en: 'Galangal Lemongrass Coconut Chicken Soup', ja: 'ガランガル レモングラス ココナッツチキンスープ（辛くない）', ko: '갈랑갈 레몬그라스 코코넛 치킨수프 (안 매운)' },
    price: [
      { label: { zh: '小', en: 'Small', ja: '小', ko: '소' }, value: 250 },
      { label: { zh: '大', en: 'Large', ja: '大', ko: '대' }, value: 460 },
    ],
    image: null, emoji: '🍲', tags: [],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },

  // ── 單點類 ──────────────────────────────────────────────────
  {
    id: 'side-001', category: 'side',
    names: { zh: '月亮蝦餅佐手工甜雞醬', en: 'Moon Shrimp Cake with Sweet Chili Sauce', ja: '月エビケーキ 手作り甘辛ソース', ko: '달 새우 케이크와 수제 스위트 칠리 소스' },
    price: [
      { label: { zh: '大 8片', en: 'Large 8pcs', ja: '大 8枚', ko: '대 8조각' }, value: 310 },
      { label: { zh: '小 4片', en: 'Small 4pcs', ja: '小 4枚', ko: '소 4조각' }, value: 170 },
    ],
    image: null, emoji: '🥟', tags: ['R'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'side-002', category: 'side',
    names: { zh: '泰式炸雞佐羅望子醬（不辣）', en: 'Thai Fried Chicken with Tamarind Sauce', ja: 'タイ風フライドチキン タマリンドソース（辛くない）', ko: '태국식 프라이드치킨 타마린드 소스 (안 매운)' },
    price: [{ label: null, value: 220 }],
    image: null, emoji: '🍗', tags: [],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'side-003', category: 'side',
    names: { zh: '炸豆腐佐手工酸甜醬', en: 'Fried Tofu with Sweet & Sour Sauce', ja: '揚げ豆腐 手作り甘酸っぱいソース', ko: '튀긴 두부와 수제 새콤달콤 소스' },
    price: [{ label: null, value: 95 }],
    image: null, emoji: '🧈', tags: ['V'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'side-004', category: 'side',
    names: { zh: '泰式女婿蛋', en: 'Thai Son-in-Law Eggs', ja: 'タイ風ムコ養い卵', ko: '태국식 사위 달걀' },
    price: [{ label: null, value: 95 }],
    image: null, emoji: '🥚', tags: ['V'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'side-005', category: 'side',
    names: { zh: '豆醬高麗菜', en: 'Cabbage with Bean Paste', ja: '豆味噌キャベツ', ko: '된장 양배추' },
    price: [
      { label: { zh: '大', en: 'Large', ja: '大', ko: '대' }, value: 180 },
      { label: { zh: '小', en: 'Small', ja: '小', ko: '소' }, value: 100 },
    ],
    image: null, emoji: '🥬', tags: ['V'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'side-006', category: 'side',
    names: { zh: '蝦醬高麗菜', en: 'Cabbage with Shrimp Paste', ja: 'エビ味噌キャベツ', ko: '새우 페이스트 양배추' },
    price: [
      { label: { zh: '大', en: 'Large', ja: '大', ko: '대' }, value: 180 },
      { label: { zh: '小', en: 'Small', ja: '小', ko: '소' }, value: 100 },
    ],
    image: null, emoji: '🥬', tags: [],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'side-007', category: 'side',
    names: { zh: '泰式涼拌沙拉', en: 'Thai Cold Salad', ja: 'タイ風コールドサラダ', ko: '태국식 냉채 샐러드' },
    price: [
      { label: { zh: '大', en: 'Large', ja: '大', ko: '대' }, value: 170 },
      { label: { zh: '小', en: 'Small', ja: '小', ko: '소' }, value: 100 },
    ],
    image: null, emoji: '🥗', tags: ['V'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'side-008', category: 'side',
    names: { zh: '泰國茉莉香米', en: 'Thai Jasmine Rice', ja: 'タイジャスミンライス', ko: '태국 쌀' },
    price: [{ label: null, value: 20 }],
    image: null, emoji: '🍚', tags: ['V'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '一碗', en: 'Per Bowl', ja: '一杯', ko: '한 공기' },
  },

  // ── 甜點類 ──────────────────────────────────────────────────
  {
    id: 'dessert-001', category: 'dessert',
    names: { zh: '焦糖糯米炸香蕉', en: 'Caramel Sticky Rice Fried Banana', ja: 'キャラメル餅米バナナ揚げ', ko: '캐러멜 찹쌀 바나나 튀김' },
    price: [{ label: null, value: 50 }],
    image: null, emoji: '🍌', tags: ['V'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '一份', en: 'Per Serving', ja: '一人前', ko: '1인분' },
  },
  {
    id: 'dessert-002', category: 'dessert',
    names: { zh: '椰汁西米露', en: 'Coconut Milk Sago', ja: 'ココナッツミルクサゴ', ko: '코코넛 밀크 사고' },
    price: [{ label: null, value: 30 }],
    image: null, emoji: '🥥', tags: ['V'],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '一杯', en: 'Per Cup', ja: '一杯', ko: '한 잔' },
  },

  // ── 飲料類 ──────────────────────────────────────────────────
  {
    id: 'drink-001', category: 'drink',
    names: { zh: '泰式奶茶', en: 'Thai Milk Tea', ja: 'タイ風ミルクティー', ko: '태국식 밀크티' },
    price: [
      { label: { zh: '杯', en: 'Cup', ja: 'カップ', ko: '잔' },   value: 70 },
      { label: { zh: '壺', en: 'Pot', ja: 'ポット', ko: '포트' }, value: 160 },
    ],
    image: null, emoji: '🧋', tags: [],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'drink-002', category: 'drink',
    names: { zh: '山竹汁', en: 'Mangosteen Juice', ja: 'マンゴスチンジュース', ko: '망고스틴 주스' },
    price: [
      { label: { zh: '杯', en: 'Cup', ja: 'カップ', ko: '잔' },   value: 70 },
      { label: { zh: '壺', en: 'Pot', ja: 'ポット', ko: '포트' }, value: 160 },
    ],
    image: null, emoji: '🧃', tags: [],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'drink-003', category: 'drink',
    names: { zh: '羅望子汁', en: 'Tamarind Juice', ja: 'タマリンドジュース', ko: '타마린드 주스' },
    price: [
      { label: { zh: '杯', en: 'Cup', ja: 'カップ', ko: '잔' },   value: 70 },
      { label: { zh: '壺', en: 'Pot', ja: 'ポット', ko: '포트' }, value: 160 },
    ],
    image: null, emoji: '🧃', tags: [],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'drink-004', category: 'drink',
    names: { zh: '椰子汁', en: 'Coconut Juice', ja: 'ココナッツジュース', ko: '코코넛 주스' },
    price: [
      { label: { zh: '杯', en: 'Cup', ja: 'カップ', ko: '잔' },   value: 70 },
      { label: { zh: '壺', en: 'Pot', ja: 'ポット', ko: '포트' }, value: 160 },
    ],
    image: null, emoji: '🥥', tags: [],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '', en: '', ja: '', ko: '' },
  },
  {
    id: 'drink-005', category: 'drink',
    names: { zh: '泰國啤酒（聖獅／大象 330ml）', en: 'Thai Beer (Leo / Chang 330ml)', ja: 'タイビール（レオ／チャーン 330ml）', ko: '태국 맥주 (레오/창 330ml)' },
    price: [{ label: null, value: 80 }],
    image: null, emoji: '🍺', tags: [],
    desc: { zh: '', en: '', ja: '', ko: '' },
    note: { zh: '瓶裝', en: 'Bottled', ja: '瓶入り', ko: '병' },
  },
];