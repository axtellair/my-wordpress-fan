/**
 * AXTELL FAN — Product & Application Data
 * Static data module for all products and configurations
 */

export const CEILING_FANS = [
  { model: 'CF-1000', image: 'https://picsum.photos/seed/CF1000/400/250', diameter: 1000, power: 0.75, speed: 120, airflow: 150, noise: 42, weight: 25 },
  { model: 'CF-2000', image: 'https://picsum.photos/seed/CF2000/400/250', diameter: 2000, power: 0.85, speed: 110, airflow: 220, noise: 43, weight: 32 },
  { model: 'CF-3000', image: 'https://picsum.photos/seed/CF3000/400/250', diameter: 3000, power: 1.00, speed: 95,  airflow: 320, noise: 45, weight: 41 },
  { model: 'CF-4000', image: 'https://picsum.photos/seed/CF4000/400/250', diameter: 4000, power: 1.10, speed: 85,  airflow: 410, noise: 46, weight: 52 },
  { model: 'CF-5000', image: 'https://picsum.photos/seed/CF5000/400/250', diameter: 5000, power: 1.20, speed: 75,  airflow: 520, noise: 47, weight: 64 },
  { model: 'CF-6000', image: 'https://picsum.photos/seed/CF6000/400/250', diameter: 6000, power: 1.30, speed: 65,  airflow: 640, noise: 48, weight: 78 },
  { model: 'CF-7000', image: 'https://picsum.photos/seed/CF7000/400/250', diameter: 7000, power: 1.40, speed: 58,  airflow: 760, noise: 49, weight: 92 },
  { model: 'CF-8000', image: 'https://picsum.photos/seed/CF8000/400/250', diameter: 7300, power: 1.50, speed: 52,  airflow: 880, noise: 50, weight: 108 }
];

export const MOBILE_FANS = [
  { model: 'MF-150', image: 'https://picsum.photos/seed/MF150/400/250', diameter: 1500, power: 0.45, speed: 280, airflow: 180, noise: 54, weight: 18 },
  { model: 'MF-250', image: 'https://picsum.photos/seed/MF250/400/250', diameter: 2500, power: 0.65, speed: 240, airflow: 260, noise: 56, weight: 26 },
  { model: 'MF-350', image: 'https://picsum.photos/seed/MF350/400/250', diameter: 3500, power: 0.90, speed: 200, airflow: 360, noise: 58, weight: 38 },
  { model: 'MF-450', image: 'https://picsum.photos/seed/MF450/400/250', diameter: 4500, power: 1.10, speed: 170, airflow: 470, noise: 60, weight: 52 },
  { model: 'MF-550', image: 'https://picsum.photos/seed/MF550/400/250', diameter: 5500, power: 1.30, speed: 140, airflow: 580, noise: 62, weight: 68 }
];

export const ACCESSORIES = [
  { model: 'Remote Controller', image: 'https://picsum.photos/seed/Remote/400/250', desc: 'Wireless RF remote with 6-speed control and timer scheduling.' },
  { model: 'Wall Mount Bracket', image: 'https://picsum.photos/seed/Bracket/400/250', desc: 'Heavy-gauge steel bracket for secure mobile-fan placement.' },
  { model: 'Extension Rod', image: 'https://picsum.photos/seed/Rod/400/250', desc: 'Telescopic downrod in 0.5–1.5 m lengths for high ceilings.' },
  { model: 'Safety Cable', image: 'https://picsum.photos/seed/Cable/400/250', desc: 'Galvanised steel safety cable rated to 500 kg load.' },
  { model: 'Speed Controller', image: 'https://picsum.photos/seed/SpeedCtrl/400/250', desc: 'Variable-frequency drive for smooth, stepless airflow tuning.' },
  { model: 'Blade Set', image: 'https://picsum.photos/seed/BladeSet/400/250', desc: 'Replacement aerodynamic blade set, sold per fan model.' },
  { model: 'Motor Cover', image: 'https://picsum.photos/seed/MotorCover/400/250', desc: 'Weather-sealed cover protecting the motor in humid environments.' },
  { model: 'Installation Kit', image: 'https://picsum.photos/seed/InstallKit/400/250', desc: 'Complete mounting hardware kit with templates and fasteners.' }
];

export const APPLICATIONS = [
  { image: 'https://picsum.photos/seed/app-manufacturing/600/375', icon: 'fa-industry', title: 'Manufacturing Plants', text: 'Clear heat and fumes from production lines, improving worker comfort and safety.' },
  { image: 'https://picsum.photos/seed/app-warehouse/600/375', icon: 'fa-warehouse', title: 'Warehouses & Logistics', text: 'Even out temperature layers in high-bay storage to protect goods and reduce spoilage.' },
  { image: 'https://picsum.photos/seed/app-sports/600/375', icon: 'fa-volleyball', title: 'Sports Halls', text: 'Quiet, powerful airflow keeps athletes cool and spectators comfortable during events.' },
  { image: 'https://picsum.photos/seed/app-exhibition/600/375', icon: 'fa-building', title: 'Exhibition Centers', text: 'Condition vast open spans without ductwork, maintaining comfort across the space.' },
  { image: 'https://picsum.photos/seed/app-agriculture/600/375', icon: 'fa-seedling', title: 'Agricultural Facilities', text: 'Circulate air through barns and greenhouses to support livestock and crop growth.' },
  { image: 'https://picsum.photos/seed/app-mall/600/375', icon: 'fa-cart-shopping', title: 'Shopping Malls', text: 'Deliver a premium ambient experience in atriums and retail concourses, quietly.' }
];

export const TAB_CONFIGS = [
  { id: 'ceiling', label: 'Ceiling Fan', icon: 'fa-fan' },
  { id: 'mobile', label: 'Mobile Fan', icon: 'fa-truck-medical' },
  { id: 'accessory', label: 'Accessories', icon: 'fa-screwdriver-wrench' }
];

export const CATEGORY_LABELS = {
  ceiling: 'Ceiling Fan',
  mobile: 'Mobile Fan',
  accessory: 'Accessory'
};

export const CATEGORY_ICONS = {
  ceiling: 'fa-fan',
  mobile: 'fa-truck-medical',
  accessory: 'fa-screwdriver-wrench'
};
