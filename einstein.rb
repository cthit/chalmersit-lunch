require 'nokogiri'
require 'open-uri'

class Einstein
  class << self
    include Nokogiri
    include OpenURI
    
    EINSTEIN_URL = "http://butlercatering.se/print/6"
        
    def meals
      @meals ||= fetch_data
    end
    
    private

    def title
      if Date.today.friday?
        'Einstein 🍨' 
      else
        'Einstein'
      end
    end
    
    def fetch_data
      menu = Nokogiri.HTML(open(EINSTEIN_URL))
      meals = parse_meals(menu)
      
      if meals.empty?
        []
      else
        @meals = [{ name: title, meals: meals, location: "Johanneberg" }]
      end
    end
    
    def parse_meals(menu)
      week = menu.css('h2.lunch-titel').first.content.scan(/\d/).join('').to_i
      
      menu.css('div.field-day')
      .select { |day| valid_date?(week, day) }
      .flat_map do |day|
        day.css('p').to_a
        .map{ |p| strip_invalid_chars(p) }
        .reject { |m| invalid_meal?(m) }
        .map { |m| classify_food(m) }
      end
    end

    def strip_invalid_chars(meal)
      meal.content.gsub(/\s+\Z/, '').gsub(/[\s\u00A0]/, ' ').strip
    end
    
    def invalid_meal?(meal)
      meal.length < 5 || meal.downcase =~ /dagens sallad|glassbuff[eé]|dagens asiatiska buffé/
    end
    
    def wday_to_date(year, week, day)
      days = %w(måndag tisdag onsdag torsdag fredag lördag söndag)
      Date.commercial(year, week, days.index(day) + 1)
    end
    
    def valid_date?(week, day_block)
      today = Date.today
      day = day_block.css('h3.field-label').first.content.downcase
      date = wday_to_date(today.year, week, day)
      date == today
    end
    
    def classify_food(food)
      title = if food.downcase.start_with? 'veg:'
      food.gsub! /[Vv]eg: ?/, ''
      "veg"
    elsif food.downcase =~ /fisk|torsk|spätta|skaldjur|lubb|kolja|lax/
      "fish"
    elsif food.downcase =~ /kött|fläsk|färs|karr[eé]|kyckling|rev|biff/
      "meat"
    else
      "default"
    end
    
    { title: title, lang: 'sv', summary: food, allergens: nil }
  end
end
end