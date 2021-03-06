FROM ruby:2.6.5

RUN apt-get update && \
  apt-get install -y net-tools

# Set locale
ENV LANG C.UTF-8

# Install gems
ENV APP_HOME /app
ENV HOME /root
RUN mkdir $APP_HOME
WORKDIR $APP_HOME
COPY Gemfile* $APP_HOME/
RUN bundle install

# Upload source
COPY . $APP_HOME


RUN useradd ruby
USER ruby

# Start server
ENV PORT 3000
EXPOSE 3000
CMD ["ruby", "app.rb"]
