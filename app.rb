require 'rack/cache'
require 'sinatra'
require 'sinatra/json'

require_relative 'lunch'

use Rack::Cache

set :bind, '0.0.0.0'


helpers do
	def	cache_today!
		cache_control :public, max_age: 1860
	end
end

get '/' do
	cache_today!

	if params['locale']
		json Lunch.today_filter_locale(params['locale'])
	else
		json Lunch.today
	end
end
