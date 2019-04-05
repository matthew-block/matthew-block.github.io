FROM ruby:2.6.2

WORKDIR /usr/src/app

COPY Gemfile Gemfile ./
#COPY Gemfile.lock Gemfile.lock ./
RUN bundle install

COPY . .

CMD [ "bundle", "exec", "jekyll", "serve", "--force_polling", "-H", "0.0.0.0" ]