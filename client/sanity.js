import {
    createCurrentUserHook,
    createClient,
} from "next-sanity";

import createImageUrlBuilder from '@sanity/image-url'

export const config = {
    dataset: process.env.NEXT_PUBLIC_SANITY_DATASET || "production",
    projectId: process.env.NEXT_PUBLIC_SANITY_PROJECT_ID || "n6repj5a",
    apiVersion: "2022-06-14",
    useCdn: process.env.NODE_ENV === "production",
};

export const sanityClient = createClient(config);

export const urlFor = (source) => createImageUrlBuilder(config).image(source);

export const useCurrentUser = createCurrentUserHook(config);

