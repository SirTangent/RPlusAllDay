from bs4 import BeautifulSoup as bs
from selenium import webdriver
from selenium.webdriver.common.keys import Keys
import time
import math
import csv

driver = webdriver.Chrome()
url = "https://www.youtube.com/playlist?list=PLA8Uqm50HlWslzqF2vp27XKv2NIL_8ORa"
driver.get(url)
elem = driver.find_element_by_tag_name('html')

vids = 1200

for i in range(math.ceil(vids / 100)):
    elem.send_keys(Keys.END)
    time.sleep(3)

innerHTML = driver.execute_script("return document.body.innerHTML")

page_soup = bs(innerHTML, 'html.parser')
res = page_soup.find_all('span',{'class':'style-scope ytd-playlist-video-renderer'})

data = []
for video in res:
    if video.get('title') != None:
        data.append([video.get('title').encode('ascii', 'ignore').decode('ascii'), video.parent.parent.parent.get('href')])

print(data)

driver.close()

with open('vines.csv', 'w+') as csv_file:
    writer = csv.writer(csv_file)
    for row in data:
        writer.writerow(row)

csv_file.close()