# Code for Resume matching for visually impaired

import os

import requests
import  docx2txt
from sklearn.feature_extraction.text import CountVectorizer
from sklearn.metrics.pairwise import cosine_similarity
import re

# Load and Store the resume into a variable
resume = docx2txt.process("Resume.docx")
#print(resume)

# Store the job description into a variable
jobDescription = docx2txt.process("job_description.docx")
#print(jobDescription)

# A list of text
text = [resume, jobDescription]

## Create a count vectorizer and convert the text  to a matrix of token counts.
cv = CountVectorizer()
count_matrix = cv.fit_transform(text)

#Compute cosine similarity between samples in text and jobDescription 
print("\nThe Similarity Score between the resume and the job description is:",round((cosine_similarity(count_matrix)[0][1]),4))


#get the match percentage
matchPercentage = cosine_similarity(count_matrix)[0][1] * 100
matchPercentage = round(matchPercentage, 2) # round to two decimal
print("Your resume matches about "+ str(matchPercentage)+ "% of the job description.")

# Sample data to get "Employer may supports Visually imparied candidates"
#visionImpraired = ["flexible"]

# Sample data to get Employer supports Visually imparied candidates 
#visionImpraired = ["flexible", "Elevators"]

# Sample data to get "Employer strongly supports Visually imparied candidates"
visionImpraired = ["flexible", "Employer will Provide either a refreshable Braille display or a Braille embosser or Screen Reader or CCTV", "public", "Elevators" , "computer screen"]

## degree to which the employer supports people with disability
c = 0
for text in visionImpraired:
    c = c+1

if c == 1:
    print("Based on the information provided in the job description, employer may supports Visually imparied candidates")
elif c ==2:
    print("Based on the information provided in the job description, employer supports Visually imparied candidates")
elif c >2:
    print("Based on the information provided in the job description, employer Strongly supports Visually imparied candidates")









