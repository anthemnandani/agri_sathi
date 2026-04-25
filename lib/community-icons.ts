/**
 * Community icons and category mapping
 * Used for visual consistency across the communities feature
 */

export const CATEGORY_ICONS: Record<string, string> = {
  crop: '🌾',
  location: '📍',
  problem: '⚠️',
  other: '💬',
};

export const CATEGORY_COLORS: Record<string, { bg: string; text: string; border: string }> = {
  crop: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-800',
  },
  location: {
    bg: 'bg-blue-50 dark:bg-blue-950',
    text: 'text-blue-700 dark:text-blue-300',
    border: 'border-blue-200 dark:border-blue-800',
  },
  problem: {
    bg: 'bg-green-50 dark:bg-green-950',
    text: 'text-green-700 dark:text-green-300',
    border: 'border-green-200 dark:border-green-800',
  },
  other: {
    bg: 'bg-purple-50 dark:bg-purple-950',
    text: 'text-purple-700 dark:text-purple-300',
    border: 'border-purple-200 dark:border-purple-800',
  },
};

export const STATUS_ICONS: Record<string, string> = {
  pending: '⏳',
  approved: '✅',
  active: '🟢',
  inactive: '⭕',
  rejected: '❌',
};

export const STATUS_COLORS: Record<string, { bg: string; text: string }> = {
  pending: {
    bg: 'bg-yellow-100 dark:bg-yellow-900',
    text: 'text-yellow-800 dark:text-yellow-200',
  },
  approved: {
    bg: 'bg-green-100 dark:bg-green-900',
    text: 'text-green-800 dark:text-green-200',
  },
  active: {
    bg: 'bg-green-100 dark:bg-green-900',
    text: 'text-green-800 dark:text-green-200',
  },
  inactive: {
    bg: 'bg-gray-100 dark:bg-gray-800',
    text: 'text-gray-800 dark:text-gray-200',
  },
  rejected: {
    bg: 'bg-red-100 dark:bg-red-900',
    text: 'text-red-800 dark:text-red-200',
  },
};

export const MODERATION_ICONS: Record<string, string> = {
  strict: '🔒',
  moderate: '⚖️',
  relaxed: '🔓',
};

export const ROLE_ICONS: Record<string, string> = {
  admin: '👑',
  moderator: '🛡️',
  member: '👤',
  farmer: '🚜',
};

export const ACTION_ICONS: Record<string, string> = {
  reply: '↩️',
  pin: '📌',
  delete: '🗑️',
  report: '🚩',
  edit: '✏️',
  share: '📤',
  like: '👍',
  approve: '✅',
  reject: '❌',
};

export function getCategoryIcon(category: string): string {
  return CATEGORY_ICONS[category] || CATEGORY_ICONS.other;
}

export function getCategoryColor(category: string) {
  return CATEGORY_COLORS[category] || CATEGORY_COLORS.other;
}

export function getStatusIcon(status: string): string {
  return STATUS_ICONS[status] || '❓';
}

export function getStatusColor(status: string) {
  return STATUS_COLORS[status] || STATUS_COLORS.inactive;
}

export function getModerationIcon(level: string): string {
  return MODERATION_ICONS[level] || MODERATION_ICONS.moderate;
}

export function getRoleIcon(role: string): string {
  return ROLE_ICONS[role] || ROLE_ICONS.member;
}

export function getActionIcon(action: string): string {
  return ACTION_ICONS[action] || '⚙️';
}
