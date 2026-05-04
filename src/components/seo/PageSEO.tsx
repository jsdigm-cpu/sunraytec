interface Props {
  title: string;
  description: string;
  keywords?: string[];
  ogImage?: string;
  canonical?: string;
  ogType?: 'website' | 'article' | 'product';
}

const SITE_NAME = '썬레이텍';
const SITE_URL = 'https://www.sunraytec.co.kr';
const DEFAULT_OG_IMAGE = `${SITE_URL}/images/hero/hero_1.jpg`;

export default function PageSEO({
  title,
  description,
  keywords,
  ogImage = DEFAULT_OG_IMAGE,
  canonical,
  ogType = 'website',
}: Props) {
  const fullTitle = title.includes(SITE_NAME) ? title : `${title} | ${SITE_NAME}`;
  const canonicalUrl = canonical
    ? canonical.startsWith('http')
      ? canonical
      : `${SITE_URL}${canonical}`
    : undefined;

  return (
    <>
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      {keywords && keywords.length > 0 ? (
        <meta name="keywords" content={keywords.join(', ')} />
      ) : null}
      {canonicalUrl ? <link rel="canonical" href={canonicalUrl} /> : null}

      <meta property="og:site_name" content={SITE_NAME} />
      <meta property="og:type" content={ogType} />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:image" content={ogImage} />
      {canonicalUrl ? <meta property="og:url" content={canonicalUrl} /> : null}
      <meta property="og:locale" content="ko_KR" />

      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />
    </>
  );
}
