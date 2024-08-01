import pandas as pd
from textblob import TextBlob
import requests
from bs4 import BeautifulSoup


def newsndtvscrapper():
    url = "https://www.ndtv.com/top-stories#pfrom=home-ndtv_topstories"
    response = requests.get(url)
    soup = BeautifulSoup(response.text, "html.parser")

    h2_tags = soup.find_all("h2")
    h2_text = []
    h2_tags = soup.find_all("h2")
    for h2 in h2_tags:
        h2_text.append(h2.text)



    # print(len(h2_text))

    p_tags = soup.find_all("p")

    p_text = []
    p_tags = soup.find_all("p")
    for p in p_tags:
        p_text.append(p.text)

    p_text = p_text[:10]
    h2_text = h2_text[:10]

    a_text = []

    div_tags = soup.find_all('div', {'class': 'news_Itm-cont'})

    # Find the <a> tag inside the div
    for div in div_tags:
        a_tag = div.find('a')
        link = a_tag['href']
        a_text.append(link)

    data = {'Heading': h2_text, 'Paragraph': p_text}
    df = pd.DataFrame(data)

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
    for i in range(10):
        data1.append(
            {"Heading": h2_text[i], "Paragraph": p_text[i], "Link": a_text[i], "Sentiment": sentiment_list[i],
             "Polarity": polarity_list[i]})

    return data1


