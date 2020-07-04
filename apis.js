import { apiKeys } from './keys';

export const getNews = async (tag) => {
    try {
        let result = await fetch(`http://newsapi.org/v2/${tag}&apiKey=${apiKeys.newsKey}`);
        let data = await result.json();
        let articleNum = Math.floor(Math.random() * data.articles.length);
        return data.articles[articleNum].title + '\n\n\n' + data.articles[articleNum].description + '\n\n\n' + data.articles[articleNum].url;
    } catch (error) {
        return "I could not fetch the news right now."
    }
}

export const getNewGiphy = async (tag, rating) => {
    try {
        const giphy = {
            baseURL: "https://api.giphy.com/v1/gifs/",
            apiKey: "0UTRbFtkMxAplrohufYco5IY74U8hOes",
            tag: tag,
            type: "random",
            rating: rating
        };
        let giphyURL = encodeURI(
            giphy.baseURL +
            giphy.type +
            "?api_key=" +
            giphy.apiKey +
            "&tag=" +
            giphy.tag +
            "&rating=" +
            giphy.rating
        );
        let result = await fetch(giphyURL);
        let data = await result.json();
        return data.data;
    } catch (error) {
        return "I could not get a gif at the moment.";
    }
};

export const getWeather = async (city) => {
    try {
        let result = await fetch(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=imperial&appid=${apiKeys.weatherKey}`);
        let data = await result.json();
        let weather = 'Right now in ' + city + ' it is ' + data.main.temp + ' degrees Fahrenheit with ' + data.weather[0].description;
        return weather;
    } catch (error) {
        return `Sorry, I could not get the weather right now. Did you ever tell me your city? "my city is ..." `;
    }
};

export const getNewQuote = async (tag) => {
    try {
        if (tag == "engineering") {
            let result = await fetch("http://quotes.stormconsultancy.co.uk/random.json");
            let data = await result.json();
            const quote = data.quote + " -" + data.author;
            return quote;
        } else if (tag == "trump") {
            let result = await fetch("http://api.whatdoestrumpthink.com/api/v1/quotes/random");
            let data = await result.json();
            const quote = data.message + " -Trump";
            return quote;
        } else if (tag == "ofTheDay") {
            let result = await fetch("http://quotes.rest/qod?category=inspire");
            let data = await result.json();
            const quote = data.contents.quotes[0].quote + " -" + data.contents.quotes[0].author + " (credit to They Said So)";
            return quote;
        } else if (tag == "random") {
            let result = await fetch("http://type.fit/api/quotes");
            let data = await result.json();
            let row = data[Math.floor(Math.random() * 1642)];
            let author = row.author
            if (author == null) {
                author = "unknown"
            }
            return row.text + " -" + author;
        } else {
            return "I could not think of any quotes right now."
        }
    } catch (error) {
        return "I could not think of any quotes right now."
    }
};  