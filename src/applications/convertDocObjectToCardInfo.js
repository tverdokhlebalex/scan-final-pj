export const convertDocObjectToCard = (docs) =>
  docs.map((doc) => ({
    date: new Date(doc.ok.issueDate).toLocaleDateString(),
    articleUrl: doc.ok.url,
    articleUrlTitle: doc.ok.source.name,
    articleTitle: doc.ok.title.text,
    articleTags: getArtTags(doc.ok.attributes),
    articleContent: parseXml(doc.ok.content.markup),
    imageUrl: parseImageUrl(doc.ok.content.markup),
    wordCount: doc.ok.attributes.wordCount,
  }));

const imgParseRegExp = /<img\s[^>]*?src\s*=\s*['"]([^'"]*?)['"][^>]*?>/gm;

const parseXml = (xml) => {
  const xmlDoc = new DOMParser().parseFromString(xml, 'text/html');
  const imgs = xmlDoc.documentElement.textContent.match(imgParseRegExp);
  return imgs
    ? imgs.reduce((text, el) => text.replace(el, ''), xmlDoc.documentElement.textContent)
    : xmlDoc.documentElement.textContent;
};

const parseImageUrl = (xml) => {
  const xmlDoc = new DOMParser().parseFromString(xml, 'text/html');
  const imgs = xmlDoc.documentElement.textContent.match(imgParseRegExp);
  const imagesSources = imgs?.map((img) => img.match(/src\s*=\s*"([^"]+)"/)?.[1]);
  return imagesSources ? imagesSources[0] : null;
};

const getArtTags = (artType) => {
  const tagMap = {
    isTechNews: 'технические новости',
    isAnnouncement: 'анонсы и события',
    isDigest: 'сводки новостей',
  };
  return Object.entries(artType).filter(([key, value]) => value && tagMap[key]).map(([key]) => tagMap[key]);
};
