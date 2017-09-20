require 'json'
require 'open-uri'

class Chalmrest
  class << self
    include JSON
    include OpenURI

    CHALMERS_RESTAURANTS = [
    {name: "Linsen", id: 33, location: "Johanneberg"},
    {name: "Kårrestaurangen", id: 5, location: "Johanneberg"},
    {name: "L's kitchen", id: 8, location: "Lindholmen"},
    {name: "Express", id: 7, location: "Johanneberg"},
    {name: "L's Resto", id: 32, location: "Lindholmen"},
    {name: "Kokboken", id: 35, location: "Lindholmen"}
  ]

  # Allergies supported in API
  # https://chalmerskonferens.se/en/api/
  ALLERGY_IDS = {
    1 => "gluten",
    2 => "lactose",
    3 => "egg",
    4 => "rennet",
    5 => "nuts",
    6 => "fish"
  }

  def build_chalmrest_url(restaurant_id)
    "https://carboncloudrestaurantapi.azurewebsites.net/api/menuscreen/getdataday?restaurantid=#{restaurant_id}"
  end

  def meals
    fetch_data
  end

  private

  def fetch_data
    CHALMERS_RESTAURANTS.map do |resturant|
      {
      name: resturant[:name],
      meals: {en: [], sv:[]}.merge(fetch_meals_for_id(resturant[:id])),
      location: resturant[:location]
      }
    end
  end

  def fetch_meals_for_id(id)
    url = build_chalmrest_url(id)

    transform_meals JSON.parse(open(url).read)
  end

  def transform_meals(json)
    return {} if json["recipeCategories"].nil?

    json["recipeCategories"].flat_map do |category|

      category["recipes"].flat_map do |recipe|
        allergens = get_allergens(recipe["allergens"])
        id = category["id"]

        [
          make_meal(
            category["name"],
            :sv,
            strip_invalid_chars(recipe["displayNames"][0]["displayName"]),
            allergens
          ),
          make_meal(
            category["nameEnglish"],
            :en,
            strip_invalid_chars(recipe["displayNames"][1]["displayName"]),
            allergens
          )
        ]
      end
    end.group_by{ |m| m[:lang] }
  end

  def make_meal(title, lang, summary, allergens)
    {
      title: title,
      lang: lang,
      summary: summary,
      allergens: allergens
    }
  end

  def strip_invalid_chars(meal)
    meal.gsub '”', '"'
  end

  def get_allergens(allergens_entry)
    allergens_entry.map { |entry| ALLERGY_IDS[entry["id"]] }.compact
  end
end
end