export const photos_public = (tags = "") => `
    https://www.flickr.com/services/feeds/photos_public.gne?format=json${
      tags ? `&tags=${tags}` : ""
    }
`;
