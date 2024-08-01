import pandas as pd
from textblob import TextBlob
import requests
from bs4 import BeautifulSoup


def newsindiatodayscrapper():

    url = "https://www.indiatoday.in/"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    h2_text = []
    h2_tags = soup.find_all("h2")
    for h2 in h2_tags:
        h2_text.append(h2.text)

    p_text = []
    p_tags = soup.find_all("p")
    for p in p_tags:
        p_text.append(p.text)

    p_text = p_text[:11]
    h2_text = h2_text[:11]

    data = {'Heading': h2_text, 'Paragraph': p_text}
    df = pd.DataFrame(data)

    a_text = []

    div_tags = soup.find_all('div', {'class': 'B1S3_content__wrap__9mSB6'})

    # Find the <a> tag inside the div
    for div in div_tags:
        a_tag = div.find('a')
        link = a_tag['href']
        a_text.append("https://www.indiatoday.in"+link)

    # create an empty list to store the sentiment results
    sentiment_list = []
    polarity_list = []

    # loop through the rows of the CSV file
    for index, row in df.iterrows():
        # create a TextBlob object
        blob = TextBlob(row['Heading'])
        blob_1 = TextBlob(row['Paragraph'])
        polarity = (blob.sentiment.polarity + blob_1.sentiment.polarity) / 2
        if polarity > 0:
            sentiment = "Positive"
        elif polarity == 0:
            sentiment = "Neutral"
        else:
            sentiment = "Negative"
        sentiment_list.append(sentiment)
        polarity_list.append(polarity)

    data1 = []
    for i in range(1, 11):
        data1.append(
            {"Heading": h2_text[i], "Paragraph": p_text[i-1], "Link": a_text[i-1], "Sentiment": sentiment_list[i],
             "Polarity": polarity_list[i]})

    return data1
