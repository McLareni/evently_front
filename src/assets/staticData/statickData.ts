// this file is for static data that can be used like props for CustoomSelect.tsx

export const eventTypes = [
  { label: 'Усі події', value: 'all_events' },
  { label: 'Під домом', value: 'nearby' },
  { label: 'Популярні', value: 'popular' },
  { label: 'Концерти', value: 'concerts' },
  { label: 'Майстер класи', value: 'workshops' },
  { label: 'Stand-up', value: 'stand_up' },
  { label: 'Бізнес та нетворкінг', value: 'business_networking' },
  { label: 'Спортивні заходи', value: 'sports_events' },
  { label: 'Інше', value: 'another' },
];

export const eventDate = [
  { label: 'Сьогодні', value: 'today' },
  { label: 'На вихідних', value: 'on_weekend' },
  { label: 'На цьому тижні', value: 'this_week' },
];

export const eventPrice = [
  { label: 'Безкоштовні', value: 0 },
  { label: 'До 500 ₴', value: 500 },
  { label: '500 ₴ - 1000 ₴', value: 1000 },
];

export const cityOptions = [
  { label: 'Київ', value: 'Kyiv' },
  { label: 'Одеса', value: 'Odesa' },
  { label: 'Львів', value: 'Lviv' },
  { label: 'Харків', value: 'Kharkiv' },
  { label: 'Дніпро', value: 'Dnipro' },
];

export const laguageOptions = [
  { label: 'UA', value: 'UA' },
  { label: 'EN', value: 'EN' },
];

// Під домом
export const radiusInMeters = 2000;

export const categories = [
  { name: 'Концерти', value: 'CONCERTS' },
  { name: 'Майстер класи', value: 'MASTER_CLASS' },
  { name: 'Спортивні заходи', value: 'SPORTS_EVENTS' },
  { name: 'Stand-up', value: 'STAND_UP' },
  { name: 'Бізнес та нетворкінг', value: 'BUSINESS_NETWORKING' },
  { name: 'Інше', value: 'OTHER' },
];

export const imageTypes = [
  'image/jpeg',
  'image/webp',
  'image/svg',
  'image/png',
];
