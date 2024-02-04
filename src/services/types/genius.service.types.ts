export interface GeniusSearchResponse {
  meta: Meta;
  response: Response;
}
export interface Meta {
  status: number;
}
export interface Response {
  hits?: HitsEntity[] | null;
}
export type SuggestionType = "album" | "song";

export interface HitsEntity {
  highlights?: null[] | null;
  index: SuggestionType;
  type: SuggestionType;
  result: Result;
}
export interface Result {
  annotation_count: number;
  api_path: string;
  artist_names: string;
  full_title: string;
  header_image_thumbnail_url: string;
  header_image_url: string;
  id: number;
  lyrics_owner_id: number;
  lyrics_state: string;
  path: string;
  pyongs_count: number;
  relationships_index_url: string;
  release_date_for_display: string;
  release_date_with_abbreviated_month_for_display: string;
  song_art_image_thumbnail_url: string;
  song_art_image_url: string;
  title: string;
  title_with_featured: string;
  url: string;
  stats?: Stats;
  primary_artist: PrimaryArtistOrFeaturedArtistsEntity;
  release_date_components?: ReleaseDateComponents;
  featured_artists?: (FeaturedArtistsEntity | null)[] | null;
}
export interface ReleaseDateComponents {
  year: number;
  month: number;
  day: number;
}
export interface Stats {
  unreviewed_annotations: number;
  hot: boolean;
  pageviews: number;
  concurrents?: number | null;
}
export interface FeaturedArtistsEntity {
  api_path: string;
  header_image_url: string;
  id: number;
  image_url: string;
  is_meme_verified: boolean;
  is_verified: boolean;
  name: string;
  url: string;
  iq?: number | null;
}
export interface PrimaryArtistOrFeaturedArtistsEntity {
  id: number;
  image_url: string;
  name: string;
  url: string;
  header_image_url?: string;
  is_meme_verified?: boolean;
  is_verified?: boolean;
  api_path?: string;
  iq?: number;
}
