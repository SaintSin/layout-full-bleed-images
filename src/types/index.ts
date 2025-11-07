export interface MetaData {
	title: string;
	description: string;
	image?: string;
	canonicalURL?: URL | string;
}

export interface PageProps {
	metaData: MetaData;
}
