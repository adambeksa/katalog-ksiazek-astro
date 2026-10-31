import pl from './translations/pl.json';

type Messages = { [key: string]: string | Messages };

// Zamiennik vue-i18n: t('banner.title'), t('products.pagination.pageInfo', { page, total })
export const t = (key: string, params: Record<string, string | number> = {}): string => {
  const message = key
    .split('.')
    .reduce<string | Messages | undefined>(
      (node, part) => (typeof node === 'object' ? node[part] : undefined),
      pl as Messages,
    );

  if (typeof message !== 'string') return key;

  return message.replace(/\{(\w+)\}/g, (match, name) =>
    name in params ? String(params[name]) : match,
  );
};
