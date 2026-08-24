export const GET_SITE_SETTINGS = `*[_type == "siteSettings"][0]`;

export const GET_HOMEPAGE = `*[_type == "homepage"][0]`;

export const pageImagesQuery = `*[_type == "pageImages"] | order(_updatedAt desc)[0] {
  aboutPageImage,
  visitPageImage,
  communityPageImage,
  homepageVisitImage
}`;

export const GET_FEATURED_EVENTS = `*[_type == "event" && featured == true && startDateTime > now()] | order(startDateTime asc) [0...5] {
  _id, title, startDateTime, location, category, isOnline, onlineLink
}`;

export const GET_EVENTS = `*[_type == "event" && defined(slug.current)] | order(startDateTime asc)`;

export const GET_UPCOMING_EVENTS = `*[_type == "event" && startDateTime > now()] | order(startDateTime asc) [0...5]`;

export const GET_EVENT_BY_SLUG = `*[_type == "event" && slug.current == $slug][0]`;

export const GET_SERMONS = `*[_type == "sermon" && defined(slug.current)] | order(date desc)`;

export const GET_SERMON_BY_SLUG = `*[_type == "sermon" && slug.current == $slug][0]`;

export const GET_POSTS = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc)`;

export const GET_LATEST_POSTS = `*[_type == "post" && defined(slug.current)] | order(publishedAt desc) [0...3]`;

export const GET_POST_BY_SLUG = `*[_type == "post" && slug.current == $slug][0] {
  title,
  slug,
  category,
  author->,
  publishedAt,
  heroImage,
  excerpt,
  body,
  gallery,
  featured
}`;

export const GET_RELATED_POSTS = `*[_type == "post" && category == $category && slug.current != $slug] | order(publishedAt desc) [0...2]`;

export const GET_TEAM_MEMBERS = `*[_type == "teamMember"] | order(order asc)`;

export const GET_COMMUNITY_GROUPS = `*[_type == "communityGroup" && defined(slug.current)] | order(_createdAt asc) [0...4]`;

export const GET_ALL_COMMUNITY_GROUPS = `*[_type == "communityGroup" && defined(slug.current)]`;
