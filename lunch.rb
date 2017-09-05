require_relative './chalmrest'
require_relative './einstein'

class Lunch
  class << self
    def today
      Chalmrest.meals + Einstein.meals
    end

    def today_filter_locale(locale)
      today.map do |rest|
        rest = rest.dup
        rest[:meals] = rest[:meals].select { |m| m[:lang] == locale }
        rest
      end
    end
  end
end