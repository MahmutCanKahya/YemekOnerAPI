import pandas as pd 
import sys
import json
import requests 
from scipy.sparse import csr_matrix
from sklearn.neighbors import NearestNeighbors
from pandas.io.json import json_normalize
  
# api-endpoint 
URL = "http://35.228.102.158:3000/api/v1/Restaurant/ratings"
  
# location given here 
# sending get request and saving the response as response object 
r = requests.get(url = URL) 
  
# extracting data in json format 
data = r.json() 

df = pd.DataFrame(data['data'], columns= ['id','price','rating','meal_name','restaurant_name','user_id'])


#
#count=df.groupby(['meal_name','restaurant_name'])['rating'].count()
mean=df.groupby(['meal_name','restaurant_name'])['rating'].mean()

df_meal_features = df.pivot_table(index ='user_id', 
              columns =['meal_name'], values ='rating').fillna(0) 
  
  
mat_meal_features = csr_matrix(df_meal_features.values)

#print(mat_meal_features)


#### model and fit

model_knn = NearestNeighbors(metric='cosine', algorithm='brute', n_neighbors=20, n_jobs=-1)
# fit the dataset
model_knn.fit(mat_meal_features)





def find_similar_user(model_knn, data, user):
    n_recommendations=5
    # fit
    model_knn.fit(data)
    distances, indices = model_knn.kneighbors(data[user], n_neighbors=n_recommendations+1)
    
    #raw_recommends = \
    #    sorted(list(zip(df_meal_features.index[indices.squeeze().tolist()], distances.squeeze().tolist())), key=lambda x: x[1])[:0:-1]
    # get reverse mapper
    arr =[]
    for i in df_meal_features.index[indices.squeeze().tolist()] :
        arr.append(i)
    # print recommendations
    arr.pop(0)
    return arr


def make_recommendation(users):
    dp_user = df.pivot_table(index ='meal_name', 
              columns ='user_id', values ='rating').fillna(0) 


    recommend = dp_user[users[0]]
    recommend = pd.merge(recommend,dp_user[users[1]],on=['meal_name'])
    recommend = pd.merge(recommend, dp_user[users[2]], on=['meal_name'])

    return recommend.mean(axis=1).sort_values(ascending = False).head(10)

x=list(make_recommendation(find_similar_user(model_knn,mat_meal_features,df_meal_features.index.get_loc("-M1ZWxpZUJrgyFr45F4_"))).index)

y = json.dumps(x)
    
print(y)
#print(df.loc[df["user_id"]==array[0]])
