import pandas as pd
from sklearn.metrics.pairwise import cosine_similarity
from sklearn.feature_extraction.text import CountVectorizer

f_df = pd.read_json('./movie.json')

df = pd.DataFrame(list(f_df['fields']))

df = df[['title','overview','genres']]
df['bag_of_words'] = ""

for row in df.iterrows():
    row[1][2] = ' '.join(map(str,row[1][2]))
    row[1][3] = row[1][1] + " " + row[1][2]

df.drop(columns=['overview','genres'], inplace=True)

count = CountVectorizer()
count_matrix = count.fit_transform(df['bag_of_words'])

cosine_sim = cosine_similarity(count_matrix, count_matrix)

indices = pd.Series(df.title)

def recommendations(title, cosine_sim = cosine_sim):
    recommended_movies  = []

    idx = indices[indices == title].index[0]

    score_series = pd.Series(cosine_sim[idx]).sort_values(ascending=True)

    top_10_indexes = list(score_series.iloc[1:11].index)
    for i in top_10_indexes:
        recommended_movies.append(list(df.title)[i])

    return recommended_movies

# print(recommendations(title='프랑스여자'))

