import type { Product } from '../../types/product';

interface OrganizationProps {
  type: 'organization';
}

interface ProductProps {
  type: 'product';
  product: Product;
}

interface BreadcrumbProps {
  type: 'breadcrumb';
  items: Array<{ name: string; url: string }>;
}

interface FaqProps {
  type: 'faq';
  items: Array<{ question: string; answer: string }>;
}

type Props = OrganizationProps | ProductProps | BreadcrumbProps | FaqProps;

const SITE_URL = 'https://www.sunraytec.com';

export default function JsonLd(props: Props) {
  const data = buildSchema(props);
  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(data) }}
    />
  );
}

function buildSchema(props: Props): Record<string, unknown> {
  if (props.type === 'organization') {
    return {
      '@context': 'https://schema.org',
      '@type': 'Organization',
      name: '(주)썬레이텍',
      alternateName: 'SUNRAYTEC Co., Ltd.',
      url: SITE_URL,
      logo: `${SITE_URL}/images/copmany_logo.png`,
      foundingDate: '2009',
      description:
        '2009년부터 16년간 산업·공공·교육시설 복사난방을 책임져온 패널형 히터 전문 제조사. 조달청 우수제품, MAS 다수공급자 등록.',
      address: {
        '@type': 'PostalAddress',
        streetAddress: '능안말길 40, 2층',
        addressLocality: '서초구',
        addressRegion: '서울특별시',
        addressCountry: 'KR',
      },
      contactPoint: {
        '@type': 'ContactPoint',
        telephone: '+82-1688-2520',
        contactType: 'customer service',
        areaServed: 'KR',
        availableLanguage: ['Korean'],
      },
      email: 'master@sunraytec.net',
      sameAs: [],
    };
  }

  if (props.type === 'product') {
    const { product } = props;
    return {
      '@context': 'https://schema.org',
      '@type': 'Product',
      name: product.name,
      description: product.summary,
      category: product.category,
      brand: { '@type': 'Brand', name: '썬레이텍' },
      manufacturer: { '@type': 'Organization', name: '(주)썬레이텍' },
      sku: product.id,
      ...(product.procurementId
        ? { gtin: product.procurementId, mpn: product.procurementId }
        : {}),
      image: product.thumbnailImage ?? product.detailImage,
      url: `${SITE_URL}/products/${product.id}`,
      additionalProperty: [
        { '@type': 'PropertyValue', name: '소비전력', value: `${product.specs.powerW}W` },
        { '@type': 'PropertyValue', name: '난방면적', value: product.specs.heatingArea },
        { '@type': 'PropertyValue', name: '크기', value: product.specs.sizeMm },
        { '@type': 'PropertyValue', name: '전압', value: product.specs.voltage },
        ...(product.specs.weightKg
          ? [{ '@type': 'PropertyValue', name: '무게', value: `${product.specs.weightKg}kg` }]
          : []),
      ],
    };
  }

  if (props.type === 'breadcrumb') {
    return {
      '@context': 'https://schema.org',
      '@type': 'BreadcrumbList',
      itemListElement: props.items.map((item, index) => ({
        '@type': 'ListItem',
        position: index + 1,
        name: item.name,
        item: item.url.startsWith('http') ? item.url : `${SITE_URL}${item.url}`,
      })),
    };
  }

  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    mainEntity: props.items.map((item) => ({
      '@type': 'Question',
      name: item.question,
      acceptedAnswer: {
        '@type': 'Answer',
        text: item.answer,
      },
    })),
  };
}
