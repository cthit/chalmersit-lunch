require 'sinatra'
require 'sinatra/json'

require_relative 'lunch'

set :bind, '0.0.0.0'

get '/' do
	if params['locale']
		json Lunch.today_filter_locale(params['locale'])
	else
		json Lunch.today
	end
end
