require 'net/http'
require 'json'
require 'date'

class Chalmrest
  class << self
    include JSON

    CHALMERS_RESTAURANTS = [
    {name: "Linsen", id: "b672efaf-032a-4bb8-d2a5-08d558129279", location: "Johanneberg"},
    {name: "Kårrestaurangen", id: "21f31565-5c2b-4b47-d2a1-08d558129279", location: "Johanneberg"},
    {name: "L's kitchen", id: "c74da2cf-aa1a-4d3a-9ba6-08d5569587a1", location: "Lindholmen"},
    {name: "Express", id: "3d519481-1667-4cad-d2a3-08d558129279", location: "Johanneberg"},
    {name: "L's Resto", id: "c6742862-3cc5-47b1-d2a4-08d558129279", location: "Lindholmen"},
    {name: "Kokboken", id: "4dce0df9-c6e7-46cf-d2a7-08d558129279", location: "Lindholmen"}
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

  GQL_URI = URI.parse("https://heimdallprod.azurewebsites.net/graphql")

  def meals
    fetch_data
  end

  private

  def fetch_data
    Net::HTTP.start(GQL_URI.host, GQL_URI.port, use_ssl: true) do |http|
      CHALMERS_RESTAURANTS.map do |restaurant|
        {
          name: restaurant[:name],
          meals: {en: [], sv: []}.merge(fetch_restaurant_by_id(http, restaurant[:id])),
          location: restaurant[:location]
        }
      end
    end
  end

  def fetch_restaurant_by_id(http, id)
    searchDate = "2019-10-21"
    request = Net::HTTP::Post.new GQL_URI
    request['Content-Type'] = 'application/json'
    query = <<-GQL
      query MealQuery($mealProvidingUnitID: String, $startDate: String, $endDate: String) {
        dishOccurrencesByTimeRange(mealProvidingUnitID: $mealProvidingUnitID, startDate: $startDate, endDate: $endDate) {
          displayNames {
            sortOrder
            name
            categoryName
          }
          startDate
          dishType {
            name
          }
        }
      }
    GQL

    request.body = {
      query: query,
      operationName: "MealQuery",
      variables: {
        startDate: searchDate,
        endDate: searchDate,
        mealProvidingUnitID: id
      }
    }.to_json

    response = http.request request

    result = JSON.parse(response.body)["data"]["dishOccurrencesByTimeRange"]

    return transform_meals(result).select{ |m| m[:date] == searchDate }.group_by{ |m| m[:lang] }

  rescue => e
    puts "Error: #{e}"

    return {}
  end

  def transform_meals(json)
    return [] if json.nil?

    json.flat_map do |json|
      json["displayNames"].map do |meal|
        make_meal(
          json["dishType"]["name"],
          meal["categoryName"] == "Swedish" ? :sv : :en,
          json["startDate"],
          meal["name"]
        )
      end
    end
  end

  def make_meal(title, lang, date, summary)
    {
      title: title,
      lang: lang,
      date: Date.strptime(date, "%m/%d/%Y %I:%M:%S %p").to_s,
      summary: summary
    }
  end

end
end
