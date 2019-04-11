from bs4 import BeautifulSoup
import urllib3

url = "https://chalmerskonferens.se/lunchmenyer-johanneberg/"

http = urllib3.PoolManager()
response = http.request('get', url)
soup = BeautifulSoup(response.data)

def test():
    return soup.findAll("div", {"class": "siteorigin-widget-tinymce textwidget"})[5].find_all(['table'])[2].find_all('tr')[1].td.div.string

