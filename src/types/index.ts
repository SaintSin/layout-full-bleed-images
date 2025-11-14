export interface MetaData {
  title: string;
  description: string;
  image?: string;
  imageOG?: string;
  altOG?: string;
  canonicalURL?: URL | string;
}

export interface PageProps {
  metaData: MetaData;
}
