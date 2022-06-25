type Date = "mm-yyyy";

export interface PunkApi {
  id: string; // (id|id|...)	Returns all beers matching the supplied ID's. You can pass in multiple ID's by separating them with a | symbol.
  abv_gt: number; // Returns all beers with ABV greater than the supplied number
  abv_lt: number; // Returns all beers with ABV less than the supplied number
  ibu_gt: number; // Returns all beers with IBU greater than the supplied number
  ibu_lt: number; // Returns all beers with IBU less than the supplied number
  ebc_gt: number; // Returns all beers with EBC greater than the supplied number
  ebc_lt: number; // Returns all beers with EBC less than the supplied number
  name: string; // Returns all beers matching the supplied name (this will match partial strings as well so e.g punk will return Punk IPA), if you need to add spaces just add an underscore (_).
  yeast: string; // Returns all beers matching the supplied yeast name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
  brewed_before: Date; // Returns all beers brewed before this date, the date format is mm-yyyy e.g 10-2011
  brewed_after: Date; // Returns all beers brewed after this date, the date format is mm-yyyy e.g 10-2011
  hops: string; // Returns all beers matching the supplied hops name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
  malt: string; // Returns all beers matching the supplied malt name, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
  food: string; // Returns all beers matching the supplied food string, this performs a fuzzy match, if you need to add spaces just add an underscore (_).
  image_url: string;
  description: string;
}
