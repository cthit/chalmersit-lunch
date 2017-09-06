require 'nokogiri'
require 'open-uri'

class Wijkanders
  class << self
    include Nokogiri
    include OpenURI
    
    WIJKANDERS_URL = "http://www.wijkanders.se/restaurangen/"

    VEG_LABEL = 'VEGETARISK:'
    FISH_LABEL = 'FISK:'
    MEAT_LABEL = 'KÖTT:'
        
    def meals
      @meals ||= fetch_data
    end
    
    private

    def title
      'Wijkanders'
    end
    
    def fetch_data
      menu = Nokogiri.HTML(open(WIJKANDERS_URL))
      meals = parse_meals(menu)
      
      if meals.empty?
        []
      else
        @meals = [{ name: title, meals: meals, location: "Johanneberg" }]
      end
    end
    
    def parse_meals(menu)
      paragraphs = menu.css('.post-content > p').drop(6).take(5)

      weekday = today_weekday
      meals_today = paragraphs.select{ |p| p.text =~ /#{weekday}/ }.first.text.split(/\n/).drop(1)

      meals_today.each_slice(2).flat_map do |sv_food, en_food|  
        title = classify_food(sv_food)

        sv_food.gsub! /(#{MEAT_LABEL}|#{FISH_LABEL}|#{VEG_LABEL}) ?/, ''
        en_food.gsub! /[\(\)]/, ''

        [
          make_meal(title, sv_food, 'sv'),
          make_meal(title, en_food, 'en')
        ]
      end
    end

    def make_meal(title, summary, lang)
      { title: title, lang: lang, summary: summary, allergens: nil }
    end

    def today_weekday
      days = %w(SÖNDAG MÅNDAG TISDAG ONSDAG TORSDAG FREDAG LÖRDAG)
      wday = Time.now.wday
      days[wday]
    end
    
    def classify_food(food)
      if food.start_with? VEG_LABEL
        "veg"
      elsif food.start_with? FISH_LABEL
        "fish"
      elsif food.start_with? MEAT_LABEL
        "meat"
      else
        "default"
      end
    end
end
end