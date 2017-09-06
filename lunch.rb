require_relative './chalmrest'
require_relative './einstein'
require_relative './wijkanders'

class Lunch
  class << self
    def today
      Chalmrest.meals + Einstein.meals + Wijkanders.meals
    end

    def today_filter_locale(locale)
      today.map do |rest|
        rest.merge({
          meals: rest[:meals].select { |m| m[:lang] == locale }
        })
      end
    end
  end
end