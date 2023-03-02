import { createClient } from 'next-sanity';
import imageUrlBuilder from '@sanity/image-url';
export const client = createClient({
  projectId: 'm4x5wjv9',
  dataset: 'production',
  apiVersion: '2023-03-01',
  useCdn: false,
  token: process.env.NEXT_PUBLIC_SANITY_TOKEN,
});

const builder: any = imageUrlBuilder(client);

export const urlFor = (source: {}) => {
  return builder.image(source);
};
