export const photos_public = (tags = "") => `
    https://www.flickr.com/services/feeds/photos_public.gne?format=json&nojsoncallback=1${
      tags ? `&tags=${tags}` : ""
    }
`;
